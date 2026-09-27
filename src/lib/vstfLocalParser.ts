import { VSTFSentence, VSTFLine, GrammaticalRole } from '../types/vstf';

export type SchoolGrade = 'all' | 'elem' | 'mid1' | 'mid2' | 'mid3' | 'principle';

export interface PresetBenchmark {
  id: string;
  title: string;
  category: string;
  grade: SchoolGrade;
  gradeLabel: string;
  grammarPoint: string;
  principles: number[];
  sentence: string;
  translation: string;
  description: string;
}

export const PRESET_BENCHMARKS: PresetBenchmark[] = [
  // 🌟 초등 기본 (초5~6 필수 구문)
  {
    id: 'elem-dog-sofa',
    title: '1형식 주어-동사와 장소 전치사구',
    category: '초등 기본',
    grade: 'elem',
    gradeLabel: '🌟 초등 기본',
    grammarPoint: '1형식 (주어+동사+장소)',
    principles: [1, 2],
    sentence: 'My dog sleeps on the soft sofa.',
    translation: '나의 개는 푹신한 소파에서 잔다.',
    description: '주어(My dog)와 동사(sleeps)가 왼쪽 기둥에 수직 정렬되고, 장소 전치사구(on the soft sofa)가 동사 아래로 한 칸 들여쓰기됩니다.'
  },
  {
    id: 'elem-apples-oranges',
    title: '3형식 목적어와 and 병렬 연결',
    category: '초등 기본',
    grade: 'elem',
    gradeLabel: '🌟 초등 기본',
    grammarPoint: '3형식 + and 병렬',
    principles: [1, 4],
    sentence: 'Minho likes sweet apples and oranges.',
    translation: '민호는 달콤한 사과와 오렌지를 좋아한다.',
    description: '주어(Minho)와 동사(likes)가 정렬되고, and는 좌측으로 오프셋되며 sweet apples와 oranges가 같은 계단에 나란히 정렬됩니다.'
  },
  {
    id: 'elem-kitchen-pizza',
    title: '3형식 목적어와 장소 부사구',
    category: '초등 기본',
    grade: 'elem',
    gradeLabel: '🌟 초등 기본',
    grammarPoint: '3형식 (목적어+장소)',
    principles: [1, 2],
    sentence: 'We eat delicious pizza in the kitchen.',
    translation: '우리는 부엌에서 맛있는 피자를 먹는다.',
    description: 'We eat의 본동사 아래로 목적어(delicious pizza)와 장소(in the kitchen)가 차례대로 종속됩니다.'
  },

  // 📘 중1 기초
  {
    id: 'mid1-soccer-friends',
    title: '도입부 시간 부사구와 주절 정렬',
    category: '중1 기초',
    grade: 'mid1',
    gradeLabel: '📘 중1 기초',
    grammarPoint: '도입부 시간 부사구',
    principles: [3, 1, 2],
    sentence: 'After school, Tom plays soccer with his best friends.',
    translation: '방과 후에, 톰은 가장 친한 친구들과 축구를 한다.',
    description: '도입부 시간 부사구(After school,)가 들여쓰기되어 배경을 나타내고, 주절(Tom plays)은 왼쪽 기준선으로 복귀합니다.'
  },
  {
    id: 'mid1-visit-london',
    title: 'to부정사 명사적 용법 (목적어)',
    category: '중1 기초',
    grade: 'mid1',
    gradeLabel: '📘 중1 기초',
    grammarPoint: 'to부정사 목적어',
    principles: [1, 2],
    sentence: 'I want to visit London next summer.',
    translation: '나는 내년 여름에 런던을 방문하기를 원한다.',
    description: 'want의 목적어로 to visit London이 종속되고, 시간 부사구(next summer)가 그 하위로 계단식 들여쓰기됩니다.'
  },
  {
    id: 'mid1-study-exam',
    title: '이유를 나타내는 부사절 (because)',
    category: '중1 기초',
    grade: 'mid1',
    gradeLabel: '📘 중1 기초',
    grammarPoint: '이유 부사절 (because)',
    principles: [1, 2],
    sentence: 'My sister studied English hard because she had an exam.',
    translation: '내 여동생은 시험이 있었기 때문에 영어를 열심히 공부했다.',
    description: '주절(My sister studied English) 아래로 because 종속 부사절 전체가 계단식으로 들여쓰기됩니다.'
  },

  // 📗 중2 발전
  {
    id: 'mid2-violin-boy',
    title: '주격 관계대명사(who) 삽입과 주절 동사',
    category: '중2 발전',
    grade: 'mid2',
    gradeLabel: '📗 중2 발전',
    grammarPoint: '주격 관계대명사 (who)',
    principles: [1, 2],
    sentence: 'The boy who lives next door plays the violin very well.',
    translation: '옆집에 사는 그 소년은 바이올린을 아주 잘 연주한다.',
    description: 'The boy와 멀리 떨어진 본동사 plays가 레벨 0에서 수직 정렬되어 문장의 핵심 뼈대가 즉각 드러납니다.'
  },
  {
    id: 'mid2-tell-book',
    title: '5형식 동사 tell + 목적어 + to부정사 보어',
    category: '중2 발전',
    grade: 'mid2',
    gradeLabel: '📗 중2 발전',
    grammarPoint: '5형식 (목적격 보어 to-v)',
    principles: [1, 2],
    sentence: 'My teacher told me to read this interesting book.',
    translation: '선생님은 나에게 이 흥미로운 책을 읽으라고 말씀하셨다.',
    description: 'told의 목적어(me) 아래로 목적어가 할 동작인 목적격 보어(to read this book)가 계단식으로 연결됩니다.'
  },
  {
    id: 'mid2-rain-stopped',
    title: '시간 부사절(When)과 to부정사 부사적 용법',
    category: '중2 발전',
    grade: 'mid2',
    gradeLabel: '📗 중2 발전',
    grammarPoint: '시간 부사절 + to부정사 목적',
    principles: [3, 1, 2],
    sentence: 'When the rain stopped, the children ran outside to play.',
    translation: '비가 그쳤을 때, 아이들은 놀기 위해 밖으로 달려 나갔다.',
    description: 'When절이 배경으로 도입되고, 주절 the children ran이 기준선에 정렬된 후 to play가 목적 수식어로 종속됩니다.'
  },

  // 📙 중3 심화
  {
    id: 'mid3-difficult-test',
    title: '양보 부사절(Although)과 주절 대명사 목적어',
    category: '중3 심화',
    grade: 'mid3',
    gradeLabel: '📙 중3 심화',
    grammarPoint: '양보 접속사절 (Although)',
    principles: [3, 1, 2],
    sentence: 'Although the test was very difficult, all students passed it.',
    translation: '시험이 매우 어려웠음에도 불구하고, 모든 학생들이 통과했다.',
    description: 'Although절이 배경으로 들여쓰기되고, 주절 all students passed it이 주어-동사 축을 형성합니다.'
  },

  // 🎓 4대 원칙 벤치마크
  {
    id: 'p1-nested-clause',
    title: '내포절 및 절 내부 주어-동사 정렬 (Principle 1 & 2)',
    category: '원칙 1: 주어-술어 수직 정렬',
    grade: 'principle',
    gradeLabel: '🎓 4대 원칙',
    grammarPoint: '간접의문문 내포절',
    principles: [1, 2],
    sentence: 'The girl hopes her teacher understands how hard she worked.',
    translation: '그 소녀는 선생님이 자신이 얼마나 열심히 노력했는지 이해해 주기를 바란다.',
    description: '주절의 주어-동사(The girl / hopes), 내포절의 주어-동사(her teacher / understands), 관계절의 주어-동사(she / worked)가 각자의 계층에서 수직 정렬됩니다.'
  },
  {
    id: 'p1-relative-clause',
    title: '관계대명사절 삽입 및 주절 동사 복귀 (Principle 1 & 2)',
    category: '원칙 1: 주어-술어 수직 정렬',
    grade: 'principle',
    gradeLabel: '🎓 4대 원칙',
    grammarPoint: '관계대명사 삽입절',
    principles: [1, 2],
    sentence: 'The singer who enjoys performing live played an extra encore.',
    translation: '라이브 공연을 즐기는 그 가수는 추가 앙코르 곡을 연주했다.',
    description: '주어(The singer)와 삽입절 후 나오는 주절 동사(played)가 동일한 기본 들여쓰기 라인(레벨 0)에 정렬되고, 관계사절(who enjoys)은 독립된 하위 레벨에서 주어-동사가 수직 정렬됩니다.'
  },
  {
    id: 'p2-prepositional-cascade',
    title: '전치사구 연쇄 종속 수식 구조 (Principle 2)',
    category: '원칙 2: 종속 성분의 하위 들여쓰기',
    grade: 'principle',
    gradeLabel: '🎓 4대 원칙',
    grammarPoint: '연쇄 전치사구',
    principles: [2],
    sentence: 'Jackie donated a book about early immigrants to Florida to the town library.',
    translation: '재키는 마을 도서관에 플로리다 초기 이민자들에 관한 책 한 권을 기증했다.',
    description: 'donated의 목적어(a book) 아래로 전치사구(about early immigrants)와 그 하위 전치사구(to Florida)가 계단식으로 들여쓰기되며, 동사의 또 다른 전치사구(to the town library)는 donated 직속 종속 위치에 정렬됩니다.'
  },
  {
    id: 'p3-introductory-adverbial',
    title: '도입부 부사구와 주절의 기준선 복귀 (Principle 3)',
    category: '원칙 3: 도입부/배경 정보 들여쓰기',
    grade: 'principle',
    gradeLabel: '🎓 4대 원칙',
    grammarPoint: '도입부 부사구',
    principles: [3],
    sentence: 'After school, Janie ordered a sandwich.',
    translation: '방과 후에 제니는 샌드위치를 주문했다.',
    description: '도입부 부사구(After school,)가 들여쓰기되어 배경 정보임을 나타내고, 주절 주어(Janie)는 왼쪽 기준선(레벨 0)으로 복귀하여 주종 관계가 즉각 드러납니다.'
  },
  {
    id: 'p3-introductory-clause',
    title: '양보 부사절과 주절의 주종 구조 (Principle 3 & 1)',
    category: '원칙 3: 도입부/배경 정보 들여쓰기',
    grade: 'principle',
    gradeLabel: '🎓 4대 원칙',
    grammarPoint: '양보 부사절',
    principles: [3, 1],
    sentence: "Although Seth knew his wife needed a vacation, he couldn't afford one.",
    translation: '세스는 아내에게 휴식이 필요하다는 것을 알았지만, 휴가를 보낼 여유가 없었다.',
    description: '도입부 접속사절 전체가 들여쓰기된 상태에서 절 내부 주어-동사(Seth knew, wife needed)가 정렬되고, 주절(he couldn\'t afford)은 기준선으로 돌아옵니다.'
  },
  {
    id: 'p4-coordinate-words',
    title: '병렬 어휘 그룹 정렬 및 접속사 오프셋 (Principle 4)',
    category: '원칙 4: 병렬 그룹 정렬 & 접속사 오프셋',
    grade: 'principle',
    gradeLabel: '🎓 4대 원칙',
    grammarPoint: 'and 병렬 그룹',
    principles: [4],
    sentence: 'My daughter likes dogs and cats.',
    translation: '내 딸은 개와 고양이를 좋아한다.',
    description: '등위접속사(and)를 좌측으로 살짝 빼고(Offset), 대등한 목적어 항목들(dogs, cats)을 동일한 수직선에 정렬하여 하나의 묶음 그룹임을 시각화합니다.'
  },
  {
    id: 'p4-coordinate-clauses',
    title: '등위접속사(but)로 연결된 중문 구조 (Principle 4 & 1)',
    category: '원칙 4: 병렬 그룹 정렬 & 접속사 오프셋',
    grade: 'principle',
    gradeLabel: '🎓 4대 원칙',
    grammarPoint: 'but 등위 중문',
    principles: [4, 1],
    sentence: "Jonathan asked for a new bike but his parents couldn't afford it.",
    translation: '조너선은 새 자전거를 사달라고 부탁했지만, 그의 부모님은 그럴 형편이 되지 못했다.',
    description: '두 개의 독립절이 대등하게 위치하고, 접속사(but)는 왼쪽 축에 오프셋되어 문장의 거대한 논리적 분기점을 명확히 구분합니다.'
  }
];

export function parseLocalVSTF(sentence: string): VSTFSentence {
  const clean = sentence.trim();
  if (!clean) {
    return {
      id: 'empty',
      originalText: '',
      lines: [],
      principlesApplied: {}
    };
  }

  // 1. Check exact match or close match with preset benchmarks for 100% textbook accuracy
  const benchmark = PRESET_BENCHMARKS.find(
    (b) => b.sentence.toLowerCase().replace(/[.,!]/g, '') === clean.toLowerCase().replace(/[.,!]/g, '')
  );

  if (benchmark) {
    return buildBenchmarkSentence(benchmark);
  }

  // 2. Dynamic heuristic parsing based on syntax patterns
  return parseDynamicSentence(clean);
}

function buildBenchmarkSentence(b: PresetBenchmark): VSTFSentence {
  const id = b.id;

  if (id === 'p1-nested-clause') {
    // The girl
    //   hopes
    //     her teacher
    //     understands
    //       how hard
    //         she
    //         worked.
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '주절 [The girl hopes] 내포절 [her teacher understands] 목적어 간접의문절 [how hard she worked]',
      principlesApplied: {
        principle1: 'The girl-hopes 수직 정렬, her teacher-understands 수직 정렬, she-worked 수직 정렬',
        principle2: 'hopes 아래로 내포절 들여쓰기, understands 아래로 간접의문절 들여쓰기'
      },
      lines: [
        { id: 'l1', text: 'The girl', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l2', explanation: '주절의 주어' },
        { id: 'l2', text: 'hopes', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l1', explanation: '주절의 본동사 (The girl과 수직 정렬)' },
        { id: 'l3', text: 'her teacher', indent: 1, role: 'subject', roleKorean: '내포절 주어', principle: 1, parentLineId: 'l2', alignedWithLineId: 'l4', explanation: 'hopes의 목적어 절 주어' },
        { id: 'l4', text: 'understands', indent: 1, role: 'predicate', roleKorean: '내포절 술어', principle: 1, parentLineId: 'l2', alignedWithLineId: 'l3', explanation: '내포절 동사 (her teacher와 수직 정렬)' },
        { id: 'l5', text: 'how hard', indent: 2, role: 'modifier', roleKorean: '의문 부사구', principle: 2, parentLineId: 'l4', explanation: 'understands의 종속 의문 부사구' },
        { id: 'l6', text: 'she', indent: 3, role: 'subject', roleKorean: '하위절 주어', principle: 1, parentLineId: 'l5', alignedWithLineId: 'l7', explanation: '간접의문절 주어' },
        { id: 'l7', text: 'worked.', indent: 3, role: 'predicate', roleKorean: '하위절 술어', principle: 1, parentLineId: 'l5', alignedWithLineId: 'l6', explanation: '간접의문절 동사 (she와 수직 정렬)' }
      ]
    };
  }

  if (id === 'p1-relative-clause') {
    // The singer
    //   who
    //   enjoys
    //     performing
    //     live
    // played
    //   an extra encore.
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '주어 [The singer]에 관계사절 [who enjoys performing live] 삽입 후 주절 동사 [played an extra encore] 복귀',
      principlesApplied: {
        principle1: 'The singer와 주절 동사 played가 레벨 0에 수직 정렬, 관계사절 내 who와 enjoys가 레벨 1에 정렬',
        principle2: 'who enjoys 아래로 준동사구 performing live 들여쓰기, played 아래로 목적어 an extra encore 들여쓰기'
      },
      lines: [
        { id: 'l1', text: 'The singer', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l6', explanation: '주절의 주어' },
        { id: 'l2', text: 'who', indent: 1, role: 'relative_clause', roleKorean: '관계대명사/주어', principle: 1, parentLineId: 'l1', alignedWithLineId: 'l3', explanation: '선행사를 수식하는 관계사절 주어' },
        { id: 'l3', text: 'enjoys', indent: 1, role: 'predicate', roleKorean: '관계사절 술어', principle: 1, parentLineId: 'l1', alignedWithLineId: 'l2', explanation: '관계사절 동사 (who와 수직 정렬)' },
        { id: 'l4', text: 'performing', indent: 2, role: 'object', roleKorean: '동명사 목적어', principle: 2, parentLineId: 'l3', explanation: 'enjoys의 목적어' },
        { id: 'l5', text: 'live', indent: 2, role: 'modifier', roleKorean: '부사 (Modifier)', principle: 2, parentLineId: 'l4', explanation: 'performing을 수식하는 부사' },
        { id: 'l6', text: 'played', indent: 0, role: 'predicate', roleKorean: '주절 술어 동사', principle: 1, alignedWithLineId: 'l1', explanation: '주절 주어 The singer와 수직 정렬되는 본동사' },
        { id: 'l7', text: 'an extra encore.', indent: 1, role: 'object', roleKorean: '목적어 (Object)', principle: 2, parentLineId: 'l6', explanation: 'played의 목적어 (하위 들여쓰기)' }
      ]
    };
  }

  if (id === 'p2-prepositional-cascade') {
    // Jackie
    // donated
    //   a book
    //     about early immigrants
    //       to Florida
    //   to the town library.
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '주어-동사 [Jackie donated] -> 목적어 [a book] -> 수식 전치사구 [about early immigrants] -> 장소 전치사구 [to Florida] 및 수여 전치사구 [to the town library]',
      principlesApplied: {
        principle1: 'Jackie와 donated 수직 정렬',
        principle2: '상위어(Head) 아래로 종속성분(Dependents)이 엘보우 형태로 계단식 들여쓰기'
      },
      lines: [
        { id: 'l1', text: 'Jackie', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l2', explanation: '주절 주어' },
        { id: 'l2', text: 'donated', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l1', explanation: '주절 본동사' },
        { id: 'l3', text: 'a book', indent: 1, role: 'object', roleKorean: '직접목적어 (Head)', principle: 2, parentLineId: 'l2', explanation: 'donated의 목적어' },
        { id: 'l4', text: 'about early immigrants', indent: 2, role: 'prepositional', roleKorean: '전치사구 (형용사적 수식)', principle: 2, parentLineId: 'l3', explanation: 'a book을 수식하는 전치사구' },
        { id: 'l5', text: 'to Florida', indent: 3, role: 'prepositional', roleKorean: '전치사구 (장소)', principle: 2, parentLineId: 'l4', explanation: 'immigrants를 수식하는 전치사구' },
        { id: 'l6', text: 'to the town library.', indent: 1, role: 'prepositional', roleKorean: '전치사구 (부사적 수식)', principle: 2, parentLineId: 'l2', explanation: 'donated에 직접 종속되는 장소/수여 전치사구' }
      ]
    };
  }

  if (id === 'p3-introductory-adverbial') {
    // After school,
    // Janie
    // ordered
    //   a sandwich.
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '도입부 부사구 [After school,] + 주절 [Janie ordered a sandwich.]',
      principlesApplied: {
        principle3: '도입부 부사구(After school,)를 들여쓰기하여 배경 정보임을 시각화',
        principle1: '주절 주어(Janie)와 술어(ordered)는 기본 레벨 0에 수직 정렬',
        principle2: '목적어(a sandwich.)는 동사 아래로 들여쓰기'
      },
      lines: [
        { id: 'l1', text: 'After school,', indent: 1, role: 'introductory', roleKorean: '도입부 부사구 (Introductory)', principle: 3, isIntroductory: true, explanation: '문두 도입부 시간 부사구 (우측 들여쓰기)' },
        { id: 'l2', text: 'Janie', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l3', explanation: '주절 주어 (좌측 기본선 복귀)' },
        { id: 'l3', text: 'ordered', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l2', explanation: '주절 본동사 (Janie와 수직 정렬)' },
        { id: 'l4', text: 'a sandwich.', indent: 1, role: 'object', roleKorean: '목적어 (Object)', principle: 2, parentLineId: 'l3', explanation: 'ordered의 직접목적어' }
      ]
    };
  }

  if (id === 'p3-introductory-clause') {
    // Although Seth
    // knew
    //   his wife
    //   needed
    //     a vacation,
    // he
    // couldn't afford
    //   one.
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '도입부 양보 부사절 [Although Seth knew his wife needed a vacation,] + 주절 [he couldn\'t afford one.]',
      principlesApplied: {
        principle3: '도입부 종속접속사절 전체가 들여쓰기되고 주절(he couldn\'t afford)은 기준선 복귀',
        principle1: '절 내부 주어-술어 수직 정렬 (Seth-knew, wife-needed, he-couldn\'t afford)'
      },
      lines: [
        { id: 'l1', text: 'Although Seth', indent: 1, role: 'introductory', roleKorean: '접속사 + 종속절 주어', principle: 3, isIntroductory: true, alignedWithLineId: 'l2', explanation: '도입부 양보절 접속사와 주어' },
        { id: 'l2', text: 'knew', indent: 1, role: 'predicate', roleKorean: '종속절 술어', principle: 1, alignedWithLineId: 'l1', explanation: '종속절 동사 (Seth와 수직 정렬)' },
        { id: 'l3', text: 'his wife', indent: 2, role: 'subject', roleKorean: '내포절 주어', principle: 1, parentLineId: 'l2', alignedWithLineId: 'l4', explanation: 'knew의 목적절 주어' },
        { id: 'l4', text: 'needed', indent: 2, role: 'predicate', roleKorean: '내포절 술어', principle: 1, parentLineId: 'l2', alignedWithLineId: 'l3', explanation: '내포절 동사 (his wife와 수직 정렬)' },
        { id: 'l5', text: 'a vacation,', indent: 3, role: 'object', roleKorean: '내포절 목적어', principle: 2, parentLineId: 'l4', explanation: 'needed의 목적어' },
        { id: 'l6', text: 'he', indent: 0, role: 'subject', roleKorean: '주절 주어 (Subject)', principle: 1, alignedWithLineId: 'l7', explanation: '주절 주어 (기준선 레벨 0으로 복귀)' },
        { id: 'l7', text: "couldn't afford", indent: 0, role: 'predicate', roleKorean: '주절 술어 (Predicate)', principle: 1, alignedWithLineId: 'l6', explanation: '주절 술어 동사 (he와 수직 정렬)' },
        { id: 'l8', text: 'one.', indent: 1, role: 'object', roleKorean: '주절 목적어', principle: 2, parentLineId: 'l7', explanation: 'couldn\'t afford의 목적어 대명사' }
      ]
    };
  }

  if (id === 'p4-coordinate-words') {
    // My daughter
    // likes
    //     dogs
    //   and
    //     cats.
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '주어-동사 [My daughter likes] + 병렬 목적어 그룹 [dogs and cats]',
      principlesApplied: {
        principle4: '등위접속사 and를 좌측으로 오프셋(-1)하고 대등 목적어 dogs와 cats를 동일 수직선에 정렬'
      },
      lines: [
        { id: 'l1', text: 'My daughter', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l2', explanation: '주절 주어' },
        { id: 'l2', text: 'likes', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l1', explanation: '주절 본동사' },
        { id: 'l3', text: 'dogs', indent: 2, role: 'object', roleKorean: '병렬 항목 1 (Group Member)', principle: 4, groupId: 'g1', parentLineId: 'l2', explanation: '병렬 목적어 첫 번째 항목' },
        { id: 'l4', text: 'and', indent: 1, role: 'conjunction', roleKorean: '등위접속사 (Offset)', principle: 4, isConjunctionOffset: true, groupId: 'g1', explanation: '좌측으로 오프셋된 등위접속사' },
        { id: 'l5', text: 'cats.', indent: 2, role: 'object', roleKorean: '병렬 항목 2 (Group Member)', principle: 4, groupId: 'g1', parentLineId: 'l2', explanation: '병렬 목적어 두 번째 항목 (dogs와 수직 정렬)' }
      ]
    };
  }

  if (id === 'p4-coordinate-clauses') {
    // Jonathan
    // asked
    //   for a new bike
    // but:
    // his parents
    // couldn't afford
    //   it.
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '절 1 [Jonathan asked for a new bike] + 접속사 [but] + 절 2 [his parents couldn\'t afford it]',
      principlesApplied: {
        principle4: '등위접속사 but이 독립절 사이에서 분기점으로 위치하며 두 절의 주어-동사가 수직 정렬선 공유',
        principle1: '각 절 내부의 Jonathan-asked, his parents-couldn\'t afford 수직 정렬'
      },
      lines: [
        { id: 'l1', text: 'Jonathan', indent: 0, role: 'subject', roleKorean: '절 1 주어', principle: 1, alignedWithLineId: 'l2', explanation: '첫 번째 절 주어' },
        { id: 'l2', text: 'asked', indent: 0, role: 'predicate', roleKorean: '절 1 술어', principle: 1, alignedWithLineId: 'l1', explanation: '첫 번째 절 동사' },
        { id: 'l3', text: 'for a new bike', indent: 1, role: 'prepositional', roleKorean: '전치사구 (목적)', principle: 2, parentLineId: 'l2', explanation: 'asked에 종속되는 전치사구' },
        { id: 'l4', text: 'but', indent: 0, role: 'conjunction', roleKorean: '등위접속사 (Coordinator)', principle: 4, isConjunctionOffset: true, explanation: '두 개의 독립절을 잇는 등위접속사' },
        { id: 'l5', text: 'his parents', indent: 0, role: 'subject', roleKorean: '절 2 주어', principle: 1, alignedWithLineId: 'l6', explanation: '두 번째 절 주어' },
        { id: 'l6', text: "couldn't afford", indent: 0, role: 'predicate', roleKorean: '절 2 술어', principle: 1, alignedWithLineId: 'l5', explanation: '두 번째 절 동사' },
        { id: 'l7', text: 'it.', indent: 1, role: 'object', roleKorean: '목적어', principle: 2, parentLineId: 'l6', explanation: "couldn't afford의 목적어" }
      ]
    };
  }

  if (id === 'elem-dog-sofa') {
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '1형식 [My dog sleeps] + 장소 전치사구 [on the soft sofa.]',
      principlesApplied: {
        principle1: '주어(My dog)와 술어(sleeps)의 수직 정렬',
        principle2: '장소 수식구(on the soft sofa.)의 계단식 하위 들여쓰기'
      },
      lines: [
        { id: 'l1', text: 'My dog', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l2', explanation: '누가 (주어)' },
        { id: 'l2', text: 'sleeps', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l1', explanation: '한다 (동사)' },
        { id: 'l3', text: 'on the soft sofa.', indent: 1, role: 'prepositional', roleKorean: '전치사구 (장소)', principle: 2, parentLineId: 'l2', explanation: '어디서 (장소 수식어)' }
      ]
    };
  }

  if (id === 'elem-apples-oranges') {
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '3형식 [Minho likes] + 병렬 목적어 [sweet apples and oranges.]',
      principlesApplied: {
        principle1: '주어(Minho)와 술어(likes)의 수직 정렬',
        principle4: '등위접속사(and) 좌측 오프셋 및 목적어 항목들(apples, oranges) 수직 정렬'
      },
      lines: [
        { id: 'l1', text: 'Minho', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l2', explanation: '누가 (주어)' },
        { id: 'l2', text: 'likes', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l1', explanation: '한다 (좋아한다)' },
        { id: 'l3', text: 'sweet apples', indent: 2, role: 'object', roleKorean: '목적어 1', principle: 4, groupId: 'g1', parentLineId: 'l2', explanation: '무엇을 1' },
        { id: 'l4', text: 'and', indent: 1, role: 'conjunction', roleKorean: '등위접속사 (Offset)', principle: 4, isConjunctionOffset: true, groupId: 'g1', explanation: '이어주는 말' },
        { id: 'l5', text: 'oranges.', indent: 2, role: 'object', roleKorean: '목적어 2', principle: 4, groupId: 'g1', parentLineId: 'l2', explanation: '무엇을 2' }
      ]
    };
  }

  if (id === 'elem-kitchen-pizza') {
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '3형식 [We eat] + 목적어 [delicious pizza] + 장소 [in the kitchen.]',
      principlesApplied: {
        principle1: '주어(We)와 동사(eat)의 수직 정렬',
        principle2: '목적어와 장소 부사구의 순차적 종속 들여쓰기'
      },
      lines: [
        { id: 'l1', text: 'We', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l2', explanation: '누가 (주어)' },
        { id: 'l2', text: 'eat', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l1', explanation: '한다 (먹는다)' },
        { id: 'l3', text: 'delicious pizza', indent: 1, role: 'object', roleKorean: '목적어 (Object)', principle: 2, parentLineId: 'l2', explanation: '무엇을 (목적어)' },
        { id: 'l4', text: 'in the kitchen.', indent: 1, role: 'prepositional', roleKorean: '전치사구 (장소)', principle: 2, parentLineId: 'l2', explanation: '어디서 (장소)' }
      ]
    };
  }

  if (id === 'mid1-soccer-friends') {
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '도입부 시간 부사구 [After school,] + 주절 [Tom plays soccer with his best friends.]',
      principlesApplied: {
        principle3: '도입부 시간 부사구 들여쓰기 (배경 정보)',
        principle1: '주절 주어(Tom)와 동사(plays) 기준선 정렬',
        principle2: '목적어(soccer)와 동반 전치사구(with his best friends) 종속'
      },
      lines: [
        { id: 'l1', text: 'After school,', indent: 1, role: 'introductory', roleKorean: '도입 부사구 (시간)', principle: 3, isIntroductory: true, explanation: '언제 (도입 배경)' },
        { id: 'l2', text: 'Tom', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l3', explanation: '누가 (주어)' },
        { id: 'l3', text: 'plays', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l2', explanation: '한다 (플레이한다)' },
        { id: 'l4', text: 'soccer', indent: 1, role: 'object', roleKorean: '목적어 (Object)', principle: 2, parentLineId: 'l3', explanation: '무엇을 (축구)' },
        { id: 'l5', text: 'with his best friends.', indent: 2, role: 'prepositional', roleKorean: '전치사구 (동반)', principle: 2, parentLineId: 'l4', explanation: '누구와 함께' }
      ]
    };
  }

  if (id === 'mid1-visit-london') {
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '주어-동사 [I want] + to부정사 목적어 [to visit London] + 시간 부사구 [next summer.]',
      principlesApplied: {
        principle1: 'I와 want 수직 정렬',
        principle2: 'want 아래로 to부정사 목적어 및 시간 수식어 종속 들여쓰기'
      },
      lines: [
        { id: 'l1', text: 'I', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l2', explanation: '누가 (나)' },
        { id: 'l2', text: 'want', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l1', explanation: '한다 (원한다)' },
        { id: 'l3', text: 'to visit London', indent: 1, role: 'object', roleKorean: 'to부정사 목적어', principle: 2, parentLineId: 'l2', explanation: '무엇을 하기를 (to부정사)' },
        { id: 'l4', text: 'next summer.', indent: 2, role: 'prepositional', roleKorean: '시간 부사구', principle: 2, parentLineId: 'l3', explanation: '언제 (내년 여름에)' }
      ]
    };
  }

  if (id === 'mid2-violin-boy') {
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '주어 [The boy] + 관계사절 [who lives next door] + 본동사 [plays the violin very well.]',
      principlesApplied: {
        principle1: 'The boy와 멀리 떨어진 본동사 plays가 레벨 0에 수직 정렬',
        principle2: 'who lives 관계사절 독립 들여쓰기 및 목적어/부사 종속'
      },
      lines: [
        { id: 'l1', text: 'The boy', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l5', explanation: '누가 (그 소년)' },
        { id: 'l2', text: 'who', indent: 1, role: 'relative_clause', roleKorean: '관계대명사 (주격)', principle: 1, parentLineId: 'l1', alignedWithLineId: 'l3', explanation: '어떤 소년인지 설명' },
        { id: 'l3', text: 'lives', indent: 1, role: 'predicate', roleKorean: '관계사절 술어', principle: 1, parentLineId: 'l1', alignedWithLineId: 'l2', explanation: '산다 (동사)' },
        { id: 'l4', text: 'next door', indent: 2, role: 'prepositional', roleKorean: '장소 부사구', principle: 2, parentLineId: 'l3', explanation: '어디에 (옆집에)' },
        { id: 'l5', text: 'plays', indent: 0, role: 'predicate', roleKorean: '주절 술어 동사', principle: 1, alignedWithLineId: 'l1', explanation: '연주한다 (The boy의 본동사 수직 정렬!)' },
        { id: 'l6', text: 'the violin', indent: 1, role: 'object', roleKorean: '목적어 (Object)', principle: 2, parentLineId: 'l5', explanation: '무엇을 (바이올린)' },
        { id: 'l7', text: 'very well.', indent: 2, role: 'modifier', roleKorean: '정도 부사구', principle: 2, parentLineId: 'l6', explanation: '어떻게 (아주 잘)' }
      ]
    };
  }

  if (id === 'mid2-tell-book') {
    return {
      id,
      originalText: b.sentence,
      translationKo: b.translation,
      syntaxSummary: '5형식 [My teacher told me to read this interesting book.]',
      principlesApplied: {
        principle1: 'My teacher와 told 수직 정렬',
        principle2: 'told 아래로 목적어 me와 목적격 보어 to read this interesting book 종속'
      },
      lines: [
        { id: 'l1', text: 'My teacher', indent: 0, role: 'subject', roleKorean: '주어 (Subject)', principle: 1, alignedWithLineId: 'l2', explanation: '누가 (선생님)' },
        { id: 'l2', text: 'told', indent: 0, role: 'predicate', roleKorean: '술어 동사 (Predicate)', principle: 1, alignedWithLineId: 'l1', explanation: '말씀하셨다' },
        { id: 'l3', text: 'me', indent: 1, role: 'object', roleKorean: '목적어 (Object)', principle: 2, parentLineId: 'l2', explanation: '누구에게 (나에게)' },
        { id: 'l4', text: 'to read this interesting book.', indent: 2, role: 'complement', roleKorean: '목적격 보어 (to-v)', principle: 2, parentLineId: 'l3', explanation: '무엇을 하라고 (목적어가 할 동작)' }
      ]
    };
  }

  // Fallback
  return parseDynamicSentence(b.sentence);
}

/**
 * Intelligent client-side syntactic cascading parser
 */
export function parseDynamicSentence(sentence: string): VSTFSentence {
  const text = sentence.trim();
  const lines: VSTFLine[] = [];
  const principlesApplied: Record<string, string> = {};

  // Check compound coordinate conjunctions (Principle 4)
  const compoundMatch = text.match(/^(.*?)[,;]?\s+\b(but|and yet|so|or)\b\s+(.*)$/i);
  if (compoundMatch) {
    const [, clause1, conj, clause2] = compoundMatch;
    const sub1 = parseDynamicSentence(clause1.trim());
    const sub2 = parseDynamicSentence(clause2.trim());

    principlesApplied.principle4 = `등위접속사 '${conj}'를 통해 두 개의 독립절을 대등하게 연결하고 분기점을 표시합니다.`;

    // Add first clause lines
    lines.push(...sub1.lines);

    // Conjunction line
    lines.push({
      id: `conj-${Date.now()}`,
      text: conj.toLowerCase(),
      indent: 0,
      role: 'conjunction',
      roleKorean: '등위접속사',
      principle: 4,
      isConjunctionOffset: true,
      explanation: '독립절을 연결하는 등위접속사'
    });

    // Add second clause lines
    lines.push(...sub2.lines.map((l, i) => ({ ...l, id: `c2-l${i}` })));

    return {
      id: `dyn-${Date.now()}`,
      originalText: text,
      lines,
      principlesApplied,
      syntaxSummary: `등위접속사 '${conj}'로 연결된 중문 구조`
    };
  }

  // Check introductory adverbial or subordinate clause (Principle 3)
  const introMatch = text.match(/^((?:After|Before|When|Although|Though|Even though|Because|If|While|Since|During|In|On|At|With|Without|To)\s+[^,]+),\s*(.*)$/i);
  if (introMatch) {
    const [, introPart, mainPart] = introMatch;
    principlesApplied.principle3 = `도입부/배경 정보 '${introPart},'를 1단계 들여쓰고 주절은 기본선(레벨 0)에 정렬합니다.`;

    // Check if intro is a subordinate clause with its own subject & verb (e.g. "Although Seth knew his wife needed a vacation")
    const isSubClause = /^(Although|Though|Even though|Because|When|While|If|Since|Before|After)\b/i.test(introPart);

    if (isSubClause) {
      const subTokens = introPart.split(/\s+/);
      const subConn = subTokens[0];
      const subRest = subTokens.slice(1).join(' ');
      const subParsed = parseSimpleClause(subRest, 1);

      if (subParsed.length > 0) {
        subParsed[0].text = `${subConn} ${subParsed[0].text}`;
        subParsed[0].isIntroductory = true;
        subParsed[0].roleKorean = '도입 종속절 주어';
        lines.push(...subParsed);
      } else {
        lines.push({
          id: `intro-${Date.now()}`,
          text: `${introPart},`,
          indent: 1,
          role: 'introductory',
          roleKorean: '도입부 종속절',
          principle: 3,
          isIntroductory: true,
          explanation: '문두 도입부 종속절 (Principle 3)'
        });
      }
    } else {
      lines.push({
        id: `intro-${Date.now()}`,
        text: `${introPart},`,
        indent: 1,
        role: 'introductory',
        roleKorean: '도입부 부사구',
        principle: 3,
        isIntroductory: true,
        explanation: '문두 도입부 시간/장소 부사구 (Principle 3)'
      });
    }

    // Main clause at level 0
    const mainLines = parseSimpleClause(mainPart, 0);
    lines.push(...mainLines);

    principlesApplied.principle1 = '주절의 주어와 술어 동사가 기준선(레벨 0)에 수직 정렬됩니다.';
    principlesApplied.principle2 = '종속 목적어 및 수식구가 상위어 아래로 계층적 들여쓰기됩니다.';

    return {
      id: `dyn-${Date.now()}`,
      originalText: text,
      lines,
      principlesApplied,
      syntaxSummary: `도입부 [${introPart},] + 주절 [${mainPart}]`
    };
  }

  // Regular single clause
  const clauseLines = parseSimpleClause(text, 0);
  lines.push(...clauseLines);
  principlesApplied.principle1 = '주어와 본동사가 수직 정렬됩니다.';
  principlesApplied.principle2 = '목적어 및 종속 수식어구가 상위어 아래로 들여쓰기됩니다.';

  return {
    id: `dyn-${Date.now()}`,
    originalText: text,
    lines,
    principlesApplied,
    syntaxSummary: '단문 및 수식 구조'
  };
}

const COMMON_AUX = new Set([
  'is', 'are', 'was', 'were', 'am', 'be', 'been', 'being',
  'has', 'have', 'had', 'do', 'does', 'did',
  'will', 'would', 'can', 'could', 'should', 'may', 'might', 'must',
  "can't", "couldn't", "won't", "wouldn't", "shouldn't", "hasn't", "haven't", "didn't", "doesn't", "don't"
]);

const PREPOSITIONS = new Set([
  'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'from', 'of', 'into', 'onto',
  'under', 'over', 'through', 'between', 'among', 'across', 'against', 'during'
]);

function parseSimpleClause(clauseText: string, baseIndent: number): VSTFLine[] {
  const result: VSTFLine[] = [];
  const tokens = clauseText.trim().split(/\s+/);
  if (tokens.length === 0) return result;

  // Check for parallel group inside (e.g. "likes dogs and cats")
  const parallelMatch = clauseText.match(/^(.*?)\s+([a-zA-Z0-9'-]+)\s+and\s+([a-zA-Z0-9'-]+[.,!?]?)$/i);
  if (parallelMatch && tokens.length <= 8) {
    const [, lead, item1, item2] = parallelMatch;
    const leadLines = parseSimpleClause(lead, baseIndent);
    result.push(...leadLines);

    const parentId = leadLines.length > 0 ? leadLines[leadLines.length - 1].id : undefined;

    result.push({
      id: `p-item1-${Date.now()}`,
      text: item1,
      indent: baseIndent + 2,
      role: 'object',
      roleKorean: '병렬 항목 1',
      principle: 4,
      parentLineId: parentId,
      groupId: 'grp-1'
    });
    result.push({
      id: `p-conj-${Date.now()}`,
      text: 'and',
      indent: baseIndent + 1,
      role: 'conjunction',
      roleKorean: '등위접속사 (오프셋)',
      principle: 4,
      isConjunctionOffset: true,
      groupId: 'grp-1'
    });
    result.push({
      id: `p-item2-${Date.now()}`,
      text: item2,
      indent: baseIndent + 2,
      role: 'object',
      roleKorean: '병렬 항목 2',
      principle: 4,
      parentLineId: parentId,
      groupId: 'grp-1'
    });
    return result;
  }

  // Locate the main verb index
  let verbIdx = -1;
  for (let i = 1; i < tokens.length; i++) {
    const lower = tokens[i].toLowerCase().replace(/[.,!?:;]$/, '');
    if (COMMON_AUX.has(lower)) {
      verbIdx = i;
      break;
    }
  }

  if (verbIdx === -1) {
    // Try finding regular verb endings (-ed, -s, -ing or common transitive verbs)
    const COMMON_VERBS = new Set([
      'donated', 'ordered', 'asked', 'likes', 'hopes', 'enjoys', 'played', 'understands', 'worked',
      'bought', 'built', 'read', 'wrote', 'saw', 'knew', 'made', 'took', 'gave', 'found', 'thought',
      'created', 'designed', 'sent', 'received', 'opened', 'closed', 'started', 'finished'
    ]);

    for (let i = 1; i < tokens.length; i++) {
      const lower = tokens[i].toLowerCase().replace(/[.,!?:;]$/, '');
      if (COMMON_VERBS.has(lower) || lower.endsWith('ed') || (lower.endsWith('s') && !lower.endsWith('ss') && i <= 3)) {
        verbIdx = i;
        break;
      }
    }
  }

  if (verbIdx === -1) {
    // Fallback: word 1 is subject, word 2 is verb if length >= 2
    verbIdx = tokens.length > 1 ? 1 : 0;
  }

  // Check if verb is multi-word (e.g., "couldn't afford", "has donated", "will play")
  let verbLength = 1;
  if (verbIdx < tokens.length - 1) {
    const nextWord = tokens[verbIdx + 1].toLowerCase().replace(/[.,!?:;]$/, '');
    if (COMMON_AUX.has(tokens[verbIdx].toLowerCase()) && !PREPOSITIONS.has(nextWord)) {
      verbLength = 2;
    }
  }

  const subjText = tokens.slice(0, verbIdx).join(' ');
  const verbText = tokens.slice(verbIdx, verbIdx + verbLength).join(' ');
  const restTokens = tokens.slice(verbIdx + verbLength);

  const subjId = `subj-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
  const verbId = `verb-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

  if (subjText) {
    result.push({
      id: subjId,
      text: subjText,
      indent: baseIndent,
      role: 'subject',
      roleKorean: '주어 (Subject)',
      principle: 1,
      alignedWithLineId: verbId,
      explanation: '주어 (술어와 수직 정렬)'
    });
  }

  result.push({
    id: verbId,
    text: verbText,
    indent: baseIndent,
    role: 'predicate',
    roleKorean: '술어 동사 (Predicate)',
    principle: 1,
    alignedWithLineId: subjText ? subjId : undefined,
    explanation: '술어 동사 (주어와 수직 정렬)'
  });

  // Now process dependents (direct object, prepositional phrases)
  if (restTokens.length > 0) {
    const chunks = splitIntoDependents(restTokens);
    let currentHeadId = verbId;
    let currentIndent = baseIndent + 1;

    for (let cIdx = 0; cIdx < chunks.length; cIdx++) {
      const chunk = chunks[cIdx];
      const isPrep = PREPOSITIONS.has(chunk.words[0].toLowerCase());
      const role: GrammaticalRole = isPrep ? 'prepositional' : 'object';

      // If this is a preposition modifying the previous noun phrase (e.g. "a book" -> "about early immigrants")
      let lineIndent = currentIndent;
      let parentId = currentHeadId;

      if (cIdx > 0 && isPrep) {
        // Cascade deeper under the noun phrase
        lineIndent = Math.min(baseIndent + 4, currentIndent + cIdx);
        parentId = result[result.length - 1].id;
      }

      result.push({
        id: `dep-${Date.now()}-${cIdx}`,
        text: chunk.text,
        indent: lineIndent,
        role,
        roleKorean: isPrep ? '전치사구 (Dependent)' : '목적어 (Object)',
        principle: 2,
        parentLineId: parentId,
        explanation: `${isPrep ? '수식 전치사구' : '목적어'} (Principle 2: 하위 들여쓰기)`
      });
    }
  }

  return result;
}

function splitIntoDependents(tokens: string[]): Array<{ text: string; words: string[] }> {
  const chunks: Array<{ text: string; words: string[] }> = [];
  let currentWords: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const word = tokens[i];
    const lower = word.toLowerCase();

    // If starting a prepositional phrase and we already have words
    if (PREPOSITIONS.has(lower) && currentWords.length > 0) {
      chunks.push({ text: currentWords.join(' '), words: [...currentWords] });
      currentWords = [word];
    } else {
      currentWords.push(word);
    }
  }

  if (currentWords.length > 0) {
    chunks.push({ text: currentWords.join(' '), words: [...currentWords] });
  }

  return chunks;
}
