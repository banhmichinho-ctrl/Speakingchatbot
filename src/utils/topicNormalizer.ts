import { TopicItem } from '../types';

/**
 * Ensures that EVERY single topic in the app has complete, high-quality questions
 * for Part 1, Part 2 Cue Card (with bullet points), Part 3, Key Vocabulary, and Sample Answer.
 * If any part is missing or empty, it automatically generates rich questions.
 */
export function ensureCompleteTopicQuestions(topic: TopicItem): TopicItem {
  if (!topic) return topic;

  const topicName = topic.title || 'General IELTS Speaking Topic';
  const category = topic.subCategoryVi || topic.tag || 'Luyện Tập IELTS';

  // 1. Validate / Populate Part 1 Questions
  let p1 = topic.part1Questions;
  if (!Array.isArray(p1) || p1.length === 0) {
    p1 = [
      `How often do you encounter or think about ${topicName} in your daily routine?`,
      `Did your interest in topics related to ${topicName} change as you grew up?`,
      `Do young people in your country pay significant attention to ${topicName}?`,
      `Would you like to learn more or gain more experience regarding ${topicName} in the future?`
    ];
  }

  // 2. Validate / Populate Part 2 Cue Card
  let p2 = topic.part2CueCard;
  if (!p2 || typeof p2 !== 'object' || !p2.topic || !Array.isArray(p2.bullets) || p2.bullets.length === 0) {
    p2 = {
      topic: `Describe an memorable experience, event, or situation related to ${topicName}.`,
      bullets: [
        `what the experience or event regarding ${topicName} was`,
        `when and where it happened or took place`,
        `how it impacted your personal mindset, habits, or daily routine`,
        `and explain why this experience with ${topicName} remains memorable to you.`
      ]
    };
  }

  // 3. Validate / Populate Part 3 Questions
  let p3 = topic.part3Questions;
  if (!Array.isArray(p3) || p3.length === 0) {
    p3 = [
      `In what ways does ${topicName} shape the lifestyle and mindset of modern young adults?`,
      `What challenges do individuals face when dealing with issues related to ${topicName}?`,
      `How might public perception and governmental policies regarding ${topicName} evolve in the next 10 years?`
    ];
  }

  // 4. Validate / Populate Key Vocabulary
  let vocab = topic.keyVocabulary;
  if (!Array.isArray(vocab) || vocab.length === 0) {
    vocab = [
      {
        word: 'delve into',
        meaning: 'Đi sâu nghiên cứu, tìm hiểu chi tiết vấn đề',
        ipa: '/delv ˈɪn.tuː/',
        example: `It is essential for students to delve into ${topicName} with an open mind.`,
        type: 'phrasal_verb'
      },
      {
        word: 'broaden one’s horizons',
        meaning: 'Mở rộng tầm mắt và tri thức sâu sắc',
        ipa: '/ˈbrɔː.dən həˈraɪ.zənz/',
        example: `Exploring diverse perspectives on ${topicName} truly broadens one's intellectual horizons.`,
        type: 'idiom'
      },
      {
        word: 'game changer',
        meaning: 'Yếu tố làm thay đổi cục diện / mang tính đột phá',
        ipa: '/ˈɡeɪm ˌtʃeɪn.dʒər/',
        example: `Fresh insights into ${topicName} can act as a complete game changer for youth.`,
        type: 'collocation'
      },
      {
        word: 'keep a cool head',
        meaning: 'Giữ một cái đầu lạnh, tỉnh táo sáng suốt',
        ipa: '/kiːp ə kuːl hed/',
        example: `When discussing controversial topics like ${topicName}, it is crucial to keep a cool head.`,
        type: 'idiom'
      }
    ];
  }

  // 5. Validate / Populate Sample Answer
  let sample = topic.sampleAnswerBand8;
  if (!sample || typeof sample !== 'string' || sample.trim() === '') {
    sample = `Well, if I were to delve into ${topicName}, I would say it has been a complete game changer in broadening my intellectual horizons. To be quite honest, navigating this topic required me to keep a cool head and analyze things from multiple angles. Overall, gaining a deeper perspective on ${topicName} has empowered me to make much wiser choices in my academic and personal life.`;
  }

  return {
    ...topic,
    part1Questions: p1,
    part2CueCard: p2,
    part3Questions: p3,
    keyVocabulary: vocab,
    sampleAnswerBand8: sample
  };
}

/**
 * Normalizes an array of topics to guarantee no null or incomplete items.
 */
export function normalizeTopicArray(topics: TopicItem[]): TopicItem[] {
  if (!Array.isArray(topics)) return [];
  return topics.map(t => ensureCompleteTopicQuestions(t));
}
