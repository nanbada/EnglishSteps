import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { parseLocalVSTF } from './src/lib/vstfLocalParser.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK with required telemetry User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instruction explaining the 4 VSTF principles precisely
const VSTF_SYSTEM_INSTRUCTION = `
You are an expert computational linguist and English syntax specialist adhering to the Visual-Syntactic Text Format (VSTF / Cascade Format).
Your task is to decompose English sentences into hierarchical, cascading lines following these 4 fundamental VSTF principles:

1. Principle 1: Subjects and Predicates are aligned (동일한 들여쓰기 수직 정렬)
   - The Subject and its matching Predicate/Verb are aligned on the EXACT same indentation level.
   - For embedded clauses, relative clauses, or subordinate clauses, the clause's subject and predicate are also aligned on their own indentation level.
   - Example:
     Line 1: "The girl" (indent 0)
     Line 2: "hopes" (indent 0)
     Line 3: "her teacher" (indent 1)
     Line 4: "understands" (indent 1)
     Line 5: "how hard" (indent 2)
     Line 6: "she" (indent 3)
     Line 7: "worked." (indent 3)
   - When a relative clause modifies a subject, the main verb returns to the subject's base indentation level:
     Line 1: "The singer" (indent 0)
     Line 2: "who" (indent 1)
     Line 3: "enjoys" (indent 1)
     Line 4: "performing" (indent 2)
     Line 5: "live" (indent 2)
     Line 6: "played" (indent 0 - aligned with "The singer"!)
     Line 7: "an extra encore." (indent 1)

2. Principle 2: Dependents are indented under their head (종속 성분의 하위 들여쓰기)
   - Objects, prepositional phrases, complements, and modifiers are indented under the word/phrase they modify or depend on.
   - If a prepositional phrase modifies a preceding noun phrase, it cascades deeper under that noun phrase:
     Line 1: "Jackie" (indent 0)
     Line 2: "donated" (indent 0)
     Line 3: "a book" (indent 1)
     Line 4: "about early immigrants" (indent 2)
     Line 5: "to Florida" (indent 3)
     Line 6: "to the town library." (indent 1 - directly modifies donated)

3. Principle 3: Introductory information is indented (도입부/배경 정보 들여쓰기)
   - Introductory adverbial phrases, participial phrases, or subordinate conjunction clauses at the beginning of a sentence are indented (indent >= 1).
   - The main clause's subject resets to baseline (indent 0):
     Line 1: "After school," (indent 1)
     Line 2: "Janie" (indent 0)
     Line 3: "ordered" (indent 0)
     Line 4: "a sandwich." (indent 1)
   - For an introductory subordinate clause:
     Line 1: "Although Seth" (indent 1)
     Line 2: "knew" (indent 1)
     Line 3: "his wife" (indent 2)
     Line 4: "needed" (indent 2)
     Line 5: "a vacation," (indent 3)
     Line 6: "he" (indent 0 - main subject resets to 0!)
     Line 7: "couldn't afford" (indent 0)
     Line 8: "one." (indent 1)

4. Principle 4: Words in a group are aligned, and the entire group moves together (병렬 그룹 정렬 & 접속사 오프셋)
   - Coordinated words or phrases (joined by 'and', 'but', 'or') are vertically aligned together.
   - The coordinating conjunction is offset to the left:
     Line 1: "My daughter" (indent 0)
     Line 2: "likes" (indent 0)
     Line 3: "dogs" (indent 2)
     Line 4: "and" (indent 1 - offset to left!)
     Line 5: "cats." (indent 2 - aligned with dogs)
   - For compound sentences:
     Line 1: "Jonathan" (indent 0)
     Line 2: "asked" (indent 0)
     Line 3: "for a new bike" (indent 1)
     Line 4: "but" (indent 0 - offset left)
     Line 5: "his parents" (indent 0)
     Line 6: "couldn't afford" (indent 0)
     Line 7: "it." (indent 1)

Provide natural Korean translation and clear explanation of which principle applied to each line.
`;

// API: Parse sentence(s) into VSTF format
app.post('/api/vstf/parse', async (req: Request, res: Response) => {
  try {
    const { text, mode } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(400).json({ error: 'Text input is required' });
      return;
    }

    if (!ai) {
      res.status(503).json({
        error: 'Gemini API is not configured on the server. Using local heuristic engine instead.',
        fallback: true
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Parse the following English sentence(s) into precise VSTF (Visual-Syntactic Text Format / Cascade) lines following the 4 principles.
Sentence to parse:
"""${text.trim()}"""
`,
      config: {
        systemInstruction: VSTF_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  originalText: { type: Type.STRING },
                  translationKo: { type: Type.STRING },
                  syntaxSummary: { type: Type.STRING },
                  principlesApplied: {
                    type: Type.OBJECT,
                    properties: {
                      principle1: { type: Type.STRING },
                      principle2: { type: Type.STRING },
                      principle3: { type: Type.STRING },
                      principle4: { type: Type.STRING }
                    }
                  },
                  lines: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        text: { type: Type.STRING },
                        indent: { type: Type.INTEGER },
                        role: {
                          type: Type.STRING,
                          description: "One of: subject, predicate, object, complement, prepositional, modifier, introductory, conjunction, relative_clause, subordinate_clause"
                        },
                        roleKorean: { type: Type.STRING },
                        principle: { type: Type.INTEGER, description: "1, 2, 3, or 4" },
                        parentLineId: { type: Type.STRING, description: "Head line id for Principle 2" },
                        alignedWithLineId: { type: Type.STRING, description: "Aligned subject/predicate line id for Principle 1" },
                        isConjunctionOffset: { type: Type.BOOLEAN, description: "True if conjunction offset left (Principle 4)" },
                        isIntroductory: { type: Type.BOOLEAN, description: "True if introductory clause/phrase (Principle 3)" },
                        explanation: { type: Type.STRING, description: "Brief Korean note on grammatical role" }
                      },
                      required: ['id', 'text', 'indent', 'role', 'roleKorean']
                    }
                  }
                },
                required: ['id', 'originalText', 'lines']
              }
            }
          },
          required: ['sentences']
        }
      }
    });

    const parsedJson = JSON.parse(response.text?.trim() || '{}');
    res.json({
      source: 'ai',
      ...parsedJson
    });
  } catch (error: any) {
    console.error('Error in /api/vstf/parse, applying reliable local parser:', error?.message);
    const localResult = parseLocalVSTF(req.body.text || '');
    res.json({
      source: 'local-fallback',
      sentences: [localResult],
      notice: 'AI 서버 일시적 지연으로 고정밀 로컬 통사 엔진으로 자동 변환되었습니다.'
    });
  }
});

// Setup Vite in development or serve static in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`VSTF Cascade server running on http://localhost:${PORT} (${isDev ? 'development' : 'production'})`);
  });
}

startServer();
