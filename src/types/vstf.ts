export type GrammaticalRole =
  | 'subject'
  | 'predicate'
  | 'object'
  | 'complement'
  | 'prepositional'
  | 'modifier'
  | 'dependent'
  | 'introductory'
  | 'conjunction'
  | 'relative_clause'
  | 'subordinate_clause';

export type GrammarTermMode = 'student' | 'teacher';

export const STUDENT_ROLE_NAMES: Record<GrammaticalRole, string> = {
  subject: '누가 / 무엇이',
  predicate: '한다 / 이다',
  object: '무엇을 / 누구를',
  complement: '어떤 상태 / 누구',
  prepositional: '어디서 / 언제 / 어떻게',
  modifier: '꾸며주는 말',
  dependent: '이어지는 내용',
  introductory: '시작 배경 (시간·장소)',
  conjunction: '이어주는 말 (접속사)',
  relative_clause: '어떤 대상인지 설명',
  subordinate_clause: '왜 / 만약 / 비록 ~라면'
};

export const TEACHER_ROLE_NAMES: Record<GrammaticalRole, string> = {
  subject: '주어 (Subject)',
  predicate: '술어/동사 (Predicate)',
  object: '목적어 (Object)',
  complement: '보어 (Complement)',
  prepositional: '전치사구 (Prepositional)',
  modifier: '수식어 (Modifier)',
  dependent: '종속 성분 (Dependent)',
  introductory: '도입 부사구 (Introductory)',
  conjunction: '접속사 (Conjunction)',
  relative_clause: '관계사절 (Relative Clause)',
  subordinate_clause: '종속절 (Subordinate Clause)'
};

export function getRoleDisplayName(role: GrammaticalRole, mode: GrammarTermMode): string {
  if (mode === 'student') {
    return STUDENT_ROLE_NAMES[role] || '부가 내용';
  }
  return TEACHER_ROLE_NAMES[role] || role;
}

export interface VSTFLine {
  id: string;
  text: string;
  indent: number; // 0, 1, 2, 3, etc.
  role: GrammaticalRole;
  roleKorean: string; // e.g. '주어 (Subject)', '술어/동사 (Predicate)', '종속 전치사구'
  principle?: 1 | 2 | 3 | 4;
  parentLineId?: string; // Head line for Principle 2
  alignedWithLineId?: string; // Aligned Subject-Predicate line for Principle 1
  isConjunctionOffset?: boolean; // Principle 4 offset
  isIntroductory?: boolean; // Principle 3 intro
  groupId?: string; // Principle 4 parallel group
  explanation?: string; // Educational annotation
}

export interface VSTFSentence {
  id: string;
  originalText: string;
  translationKo?: string;
  lines: VSTFLine[];
  principlesApplied: {
    principle1?: string;
    principle2?: string;
    principle3?: string;
    principle4?: string;
  };
  syntaxSummary?: string;
  vocabulary?: Array<{ word: string; meaning: string; pos?: string }>;
}

export interface VSTFParseResponse {
  sentences: VSTFSentence[];
  source?: 'ai' | 'heuristic';
  rawCascadeText: string;
}
