# 🪜 루트원 영어 계단 (EnglishSteps)

> **시각적-통사적 텍스트 포맷 (VSTF / Visual-Syntactic Text Format)** 기반 계층형 구문 독해 & 수업 지원 시스템  
> 복잡한 영어 문장의 통사 구조(주어-동사 정렬, 종속절, 수식어구)를 계단식 들여쓰기로 시각화하여 초·중등 학생들의 직관적인 독해력과 구문 습득을 돕는 에듀테크 플랫폼입니다.

---

## ✨ 주요 기능

1. **실시간 VSTF 계단식 문장 변환**:
   - 4대 통사 원칙(주어-동사 수직 정렬, 종속절 계단식 들여쓰기, 도입부 배경 오프셋, 병렬 그룹 정렬)에 따른 즉시 시각화.
   - Gemini AI 기반 심층 통사 정밀 구문분석 연동.
2. **초·중등 학교 수업 맞춤 지원**:
   - **🐣 학생용 쉬운 문법 용어 스위치**: '주어/동사/목적어' ➔ '누가/한다/무엇을' 직관적 전환.
   - **📚 교과과정별 대표 예문 탭**: 초등 기본, 중1 기초, 중2 발전, 중3 심화, 4대 원칙 벤치마크.
   - **🖥️ 전자칠판 단계별 계단 공개(Step Reveal)**: 한 줄씩 계단을 펼치며 능동적 발표 수업 진행 (Spacebar 단축키 지원).
   - **🎧 0.8x 느린 듣기 & 줄 단위 반복 듣기**: 초등/기초 학습자를 위한 또렷한 음성 청취.
3. **능동적 훈련 & 수업 자료 내보내기**:
   - 사다리 구조 기반 **빈칸 완성 퀴즈 모드** (동사/목적어, 술어 동사, 접속사 등 난이도별 훈련).
   - 긴 지문 및 시험문제 한 번에 분석하는 **지문 일괄 파싱**.
   - 학교 시험지/학습지용 **A4 인쇄 서식 & 한글(HWP)/워드 복사**.

---

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React
- **Backend / Proxy**: Express, Node.js (Vite middleware integration)
- **AI Engine**: Google Gen AI SDK (`@google/genai`)
- **Speech**: Web Speech API TTS (속도 조절 및 문맥 읽기)

---

## 🚀 시작하기

### 1. 패키지 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 Gemini API 키를 입력합니다:
```bash
cp .env.example .env
```

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
PORT=3000
```

> **보안 주의**: 실제 발급받은 API Key는 절대 Git 저장소에 커밋하지 마세요. `.env`는 `.gitignore`에 등록되어 자동으로 제외됩니다.

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000` 접속

### 4. 프로덕션 빌드 & 실행
```bash
npm run build
npm start
```

---

## 🛡️ 라이선스
MIT License
