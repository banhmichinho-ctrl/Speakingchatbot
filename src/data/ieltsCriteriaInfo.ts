export interface CriteriaDetail {
  band: number;
  fc: string;
  lr: string;
  gra: string;
  pr: string;
}

export const OFFICIAL_BAND_DESCRIPTORS: CriteriaDetail[] = [
  {
    band: 9.0,
    fc: 'Speaks fluently with only rare repetition or self-correction. Any hesitation is content-related rather than to find words. Speaks coherently with fully appropriate cohesive features. Develops topics fully and appropriately.',
    lr: 'Uses vocabulary with full flexibility and precision in all topics. Uses idiomatic language naturally and accurately. Rare minor errors only as slips.',
    gra: 'Uses a full range of structures naturally and appropriately. Produces consistently accurate structures with rare slips or minor non-systematic errors.',
    pr: 'Uses a full range of pronunciation features with precision and subtlety. Sustains flexible use of features throughout. Effortlessly understood everywhere.'
  },
  {
    band: 8.0,
    fc: 'Speaks fluently with only occasional repetition or self-correction; hesitation is usually content-related. Develops topics coherently and appropriately with good linking devices.',
    lr: 'Uses a wide vocabulary resource readily and flexibly to convey precise meaning. Uses less common and idiomatic vocabulary skillfully with occasional inaccuracies. Effective paraphrase.',
    gra: 'Uses a wide range of complex structures flexibly. Produces a majority of error-free sentences with good control of tenses.',
    pr: 'Uses a wide range of pronunciation features (stress, rhythm, intonation). Flexible delivery in chunks. Easy to understand throughout with native-like clarity.'
  },
  {
    band: 7.0,
    fc: 'Speaks at length without noticeable effort or loss of coherence. May demonstrate language hesitation or self-correction. Uses a range of connectives and discourse markers flexibly.',
    lr: 'Uses vocabulary resource flexibly to discuss a variety of topics. Uses some less common and idiomatic vocabulary (phrasal verbs, collocations) with awareness of style.',
    gra: 'Uses a range of complex structures with reasonable flexibility. Frequently produces error-free sentences, though some grammatical errors persist.',
    pr: 'Shows all positive features of Band 6 and some features of Band 8. Easy to understand, uses intonation and sentence stress to highlight key meaning.'
  },
  {
    band: 6.0,
    fc: 'Is willing to speak at length, though may lose coherence at times due to hesitation, repetition or self-correction. Uses a range of cohesive markers.',
    lr: 'Has a wide enough vocabulary to discuss topics at length and make meaning clear despite inaccuracies. Successfully uses paraphrase.',
    gra: 'Uses a mix of simple and complex structures, but with limited flexibility. May make frequent mistakes in complex structures without obscuring meaning.',
    pr: 'Uses a range of pronunciation features with mixed control. Shows effective use of stress and intonation though mispronunciations occur.'
  },
  {
    band: 5.0,
    fc: 'Usually maintains flow of speech but uses hesitation, repetition or slow speech to keep going. Overuses certain connectives and simple linkers.',
    lr: 'Manages to talk on familiar topics but with limited vocabulary flexibility. Frequently relies on basic words and struggles with unfamiliar topics.',
    gra: 'Produces basic sentence forms with reasonable accuracy. Uses limited complex structures that frequently contain errors.',
    pr: 'Shows basic pronunciation control. Mispronunciations reduce clarity at times, requiring listener effort.'
  }
];

export const MAT_CLARK_TIPS = [
  {
    title: '1. Avoid Direct "Short Answers"',
    description: 'Never give 1-3 word answers like "Yes, I do" or "In Hanoi". Expand with a lead-in phrase, pointing phrase, reason, and detail.'
  },
  {
    title: '2. Use Lead-in & Pointing Phrases',
    description: 'Use filler and discourse markers like "Well, first of all, the main thing you need to know is that...", "On top of that, I could also add that..."'
  },
  {
    title: '3. Master "It Depends" for Wh- / Frequency Questions',
    description: 'When asked "How often do you go to the cinema?", compare Situation A vs Situation B: "Well in all fairness, it really depends. If I have money, I will go twice a month, whereas in contrast if I am broke..."'
  },
  {
    title: '4. Produce Second Conditionals for "Would" Questions',
    description: 'When asked "Would you like to move?", ALWAYS use "If I had the chance, I would probably consider moving because..."'
  },
  {
    title: '5. Part 3 Strategy: Focus on Language Functions',
    description: 'Identify if Part 3 asks for Comparing, Predicting, Why Reasons, Advantages/Disadvantages, or Problems/Solutions. Use formal linking connectives.'
  }
];
