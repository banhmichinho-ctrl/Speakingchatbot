export type TestMode = 'full' | 'part1' | 'part2' | 'part3';

export type InteractionAppMode = 'practice' | 'exam'; // Practice (re-record allowed) vs Exam (no re-record)

export type TestPhase = 
  | 'idle'
  | 'identity_check'
  | 'part1'
  | 'part2_prep'
  | 'part2_speech'
  | 'part3'
  | 'evaluating'
  | 'completed';

export interface CandidateIdentity {
  fullName: string;
  idNumber: string;
  idPhotoUrl?: string;
  passportNumber?: string;
  verified: boolean;
}

export interface QuestionPrompt {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  questionText: string;
  category?: 'description' | 'liking' | 'disliking' | 'types_of' | 'it_depends' | 'yes_no' | 'would' | 'comparing' | 'predicting' | 'why' | 'advantages' | 'disadvantages' | 'problems' | 'solutions';
  suggestedPhrasalVerbs?: string[];
  cueCardBulletPoints?: string[];
}

export interface TurnMessage {
  id: string;
  sender: 'examiner' | 'candidate';
  text: string;
  audioUrl?: string;
  timestamp: number;
  part: 1 | 2 | 3 | 'id_check';
  durationSeconds?: number;
}

export interface CriteriaScore {
  band: number; // 1.0 - 9.0
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface DetailedImprovement {
  originalText: string;
  correctedText?: string;
  upgradedTextText: string;
  phoneticIPA?: string;
  pronunciationNotes?: string;
  explanation: string;
  category: 'FC' | 'LR' | 'GRA' | 'PR';
}

export interface MispronouncedWord {
  word: string;
  spokenPhonetic?: string;
  correctIPA: string;
  errorExplanation: string;
  howToFix: string;
}

export interface LineByLineAnalysis {
  turnIndex: number;
  originalSpokenText: string;
  sttFixes?: string;
  correctedText: string;
  upgradedText: string;
  mispronouncedWords?: MispronouncedWord[];
  keyWordsIPA: { word: string; ipa: string; meaningVi: string }[];
  grammarNotes: string;
  pronunciationNotes: string;
  scoreEstimate: number;
}

export interface IELTSEvaluation {
  overallBand: number; // e.g. 7.5
  fluencyAndCoherence: CriteriaScore;
  lexicalResource: CriteriaScore;
  grammaticalRangeAndAccuracy: CriteriaScore;
  pronunciation: CriteriaScore;
  generalSummary: string;
  keyPhrasalVerbsUsed: string[];
  recommendedPhrasalVerbs: string[];
  detailedUpgrades: DetailedImprovement[];
  lineByLineAnalysis?: LineByLineAnalysis[];
  matClarkTechniquesFeedback: {
    leadInPhrasesUsed: boolean;
    pointingPhrasesUsed: boolean;
    situationalContrastUsed: boolean;
    secondConditionalsUsed: boolean;
    complexConnectivesUsed: boolean;
    notes: string;
  };
}

export type MainDomain = 
  | 'daily_life'          // 1. Cá nhân & Quen thuộc
  | 'social_issues'       // 2. Xã hội & Đương đại
  | 'academic_specialized'// 3. Chuyên môn & Khó
  | 'philosophy_mind';    // 4. Triết lý & Trừu tượng

export interface TopicItem {
  id: string;
  title: string;
  yearCategory: string; // e.g. '2026 Forecast Q2', '2026 Forecast Q3', '2027 Forecast Q1', '2026-2027 New'
  tag: string;
  domain?: MainDomain;
  subCategoryVi?: string;
  youthAngleNote?: string; // How this topic is framed for youth/students
  part1Questions: string[];
  part2CueCard: {
    topic: string;
    bullets: string[];
  };
  part3Questions: string[];
  keyVocabulary: {
    word: string;
    meaning: string;
    ipa?: string;
    example: string;
    type: 'phrasal_verb' | 'idiom' | 'collocation' | 'uncommon_noun' | 'adjective';
  }[];
  sampleAnswerBand8: string;
}

export interface PracticeSessionRecord {
  id: string;
  date: string;
  mode: TestMode;
  topicTitle: string;
  overallBand: number;
  fcBand: number;
  lrBand: number;
  graBand: number;
  prBand: number;
  turns: TurnMessage[];
  evaluation: IELTSEvaluation;
  candidateIdentity?: CandidateIdentity;
}
