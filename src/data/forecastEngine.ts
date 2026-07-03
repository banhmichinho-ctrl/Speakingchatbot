import { TopicItem, MainDomain } from '../types';

export interface QuarterYear {
  quarter: number; // 1, 2, 3, or 4
  year: number;    // e.g. 2026, 2027, 2028
}

// Get real-time current quarter and year
export function getCurrentQuarterYear(): QuarterYear {
  const now = new Date();
  const month = now.getMonth(); // 0 to 11
  const year = now.getFullYear();
  const quarter = Math.floor(month / 3) + 1;
  return { quarter, year };
}

export function formatQuarterString(qy: QuarterYear): string {
  return `Q${qy.quarter}/${qy.year}`;
}

export function formatYearCategory(qy: QuarterYear): string {
  return `${qy.year} Forecast Q${qy.quarter}`;
}

// Storage key for perpetually generated forecast topics
const STORAGE_KEY_FORECAST = 'ielts_perpetual_forecast_topics_v1';

// Load stored forecast topics from localStorage
export function loadStoredForecastTopics(): TopicItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FORECAST);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load stored forecast topics:', err);
  }
  return [];
}

// Save forecast topics to localStorage
export function saveForecastTopics(topics: TopicItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_FORECAST, JSON.stringify(topics));
  } catch (err) {
    console.error('Failed to save forecast topics:', err);
  }
}

// Topic themes bank for perpetual procedural forecast generation
interface ForecastBlueprint {
  titlePattern: string;
  domain: MainDomain;
  subCategoryVi: string;
  tag: string;
  youthAngle: string;
  p1: string[];
  p2Topic: string;
  p2Bullets: string[];
  p3: string[];
  vocab: { word: string; meaning: string; ipa: string; example: string; type: 'collocation' | 'idiom' | 'phrasal_verb' }[];
  sampleTemplate: (qStr: string) => string;
}

const FORECAST_BLUEPRINTS: ForecastBlueprint[] = [
  {
    titlePattern: 'Digital Wellness & Screen Time Management',
    domain: 'daily_life',
    subCategoryVi: 'Sức Khỏe & Lối Sống',
    tag: 'Sức Khỏe & Lối Sống',
    youthAngle: 'Sử dụng smartphone, cai nghiện mạng xã hội, chế độ Do Not Disturb & cân bằng cuộc sống.',
    p1: [
      'How much time do you spend on your phone every day?',
      'Have you ever tried to limit your screen time?',
      'Do you prefer digital reading or physical paper books?',
      'How do you feel when you leave your phone at home?'
    ],
    p2Topic: 'Describe a time when you decided to take a break from social media or electronic devices.',
    p2Bullets: [
      'when and why you decided to disconnect',
      'what you did instead during your screen-free time',
      'how hard or easy it was to stick to your decision',
      'and explain how this digital detox affected your mood and productivity.'
    ],
    p3: [
      'Why do young people find it so difficult to detach from smartphones?',
      'How does constant notification clutter impact students\' attention spans in lectures?',
      'Should schools implement mandatory phone-free zones during study hours?'
    ],
    vocab: [
      { word: 'digital detox', meaning: 'Cai nghiện thiết bị điện tử / mạng xã hội', ipa: '/ˈdɪdʒ.ɪ.təl ˈdiː.tɒks/', example: 'Taking a weekend digital detox rejuvenated my focus.', type: 'collocation' },
      { word: 'cut down on', meaning: 'Cắt giảm mức độ sử dụng', ipa: '/kʌt daʊn ɒn/', example: 'I am trying to cut down on late-night scrolling.', type: 'phrasal_verb' },
      { word: 'hit the nail on the head', meaning: 'Nói chính xác bản chất vấn đề', ipa: '/hɪt ðə neɪl ɒn ðə hed/', example: 'The article hit the nail on the head regarding phone addiction.', type: 'idiom' }
    ],
    sampleTemplate: (qStr) => `Well, in the context of ${qStr}, screen time has become a massive topic among my university peers. Last month, I noticed my daily usage was exceeding six hours, so I initiated a four-day digital detox. Instead of endless scrolling, I went back to reading physical paperbacks and playing guitar. It was a refreshing breath of fresh air that restored my concentration.`
  },
  {
    titlePattern: 'AI-Powered Learning Tools & Academic Integrity',
    domain: 'social_issues',
    subCategoryVi: 'Công Nghệ & Trí Tuệ Nhân Tạo',
    tag: 'Công Nghệ & Đổi Mới',
    youthAngle: 'Ứng dụng AI trợ lý học tập (ChatGPT/Gemini), làm bài essay, trung thực trong thi cử & kỹ năng tương lai.',
    p1: [
      'Do you use AI tools like chatbots for your daily study?',
      'How do your teachers or professors feel about artificial intelligence?',
      'Do you think AI will replace human teachers in the future?',
      'What is your favourite digital app for studying English?'
    ],
    p2Topic: 'Describe an artificial intelligence tool or digital software that has helped you in your education.',
    p2Bullets: [
      'what tool or app it is',
      'how you learned about it',
      'how you use it to solve academic problems',
      'and explain whether you think it gives students an unfair advantage.'
    ],
    p3: [
      'How can educational institutions balance AI assistance with student critical thinking?',
      'Will traditional written examinations become obsolete due to AI generative tools?',
      'What ethical guidelines should be established for students using AI in research papers?'
    ],
    vocab: [
      { word: 'game changer', meaning: 'Yếu tố thay đổi hoàn toàn cuộc chơi', ipa: '/ˈɡeɪm ˌtʃeɪn.dʒər/', example: 'Generative AI has been a complete game changer for student research.', type: 'collocation' },
      { word: 'brush up on', meaning: 'Ôn tập, củng cố lại kiến thức', ipa: '/brʌʃ ʌp ɒn/', example: 'I use AI prompts to brush up on complex grammar rules.', type: 'phrasal_verb' },
      { word: 'double-edged sword', meaning: 'Con dao hai lưỡi (vừa lợi vừa hại)', ipa: '/ˈdʌb.əl ˌedʒd sɔːd/', example: 'AI in education is a double-edged sword.', type: 'idiom' }
    ],
    sampleTemplate: (qStr) => `To be fair, AI productivity software has been an absolute game changer in ${qStr}. I personally use intelligent assistants to summarize academic literature and brush up on key concepts. However, it is definitely a double-edged sword; if students rely on it blindly without exercising critical thinking, their independent problem-solving skills will degrade.`
  },
  {
    titlePattern: 'Sustainable Fashion, Thrift Shopping & Eco-Lifestyle',
    domain: 'daily_life',
    subCategoryVi: 'Thời Trang & Mua Sắm',
    tag: 'Thời Trang & Trang Phục',
    youthAngle: 'Săn đồ 2nd hand, thời trang nhanh vs thời trang bền vững, săn deal Shopee/TikTok shop & bảo vệ môi trường.',
    p1: [
      'Do you care about whether your clothes are eco-friendly?',
      'Have you ever bought second-hand clothes or visited a thrift shop?',
      'What kind of clothes do you wear when you attend formal events?',
      'How often do you purchase new clothes online?'
    ],
    p2Topic: 'Describe a item of clothing or outfit you bought second-hand or on a discount sale that you really enjoy wearing.',
    p2Bullets: [
      'what the clothing item is',
      'where and how you bought it',
      'why you decided to purchase it',
      'and explain why you feel proud wearing it.'
    ],
    p3: [
      'Why is thrift fashion becoming overwhelmingly popular among Gen Z consumers?',
      'How can fast-fashion brands be held accountable for textile waste in developing nations?',
      'Do you agree that personal style matters more than expensive brand logos?'
    ],
    vocab: [
      { word: 'sustainable choice', meaning: 'Lựa chọn bền vững với môi trường', ipa: '/səˈsteɪ.nə.bəl tʃɔɪs/', example: 'Buying vintage jackets is a great sustainable choice.', type: 'collocation' },
      { word: 'snap up', meaning: 'Nhanh tay mua được đồ hời', ipa: '/snæp ʌp/', example: 'I managed to snap up a designer jacket at half price.', type: 'phrasal_verb' },
      { word: 'cost an arm and a leg', meaning: 'Rất đắt đỏ, tốn kém', ipa: '/kɒst æn ɑːm ænd ə leg/', example: 'Trendy fast-fashion fast fashion can cost an arm and a leg over time.', type: 'idiom' }
    ],
    sampleTemplate: (qStr) => `In this ${qStr} period, sustainable fashion has exploded in popularity. I recently snapped up a vintage denim jacket at a local thrift market. It didn't cost an arm and a leg, yet the denim quality is vastly superior to mass-produced items. I feel proud wearing it because it aligns with my commitment to minimizing environmental footprint.`
  },
  {
    titlePattern: 'Gig Economy, Side Hustles & Youth Career Paths',
    domain: 'social_issues',
    subCategoryVi: 'Nghề Nghiệp & Công Việc',
    tag: 'Giáo Dục & Nghề Nghiệp',
    youthAngle: 'Làm thêm sinh viên, sáng tạo nội dung, freelancer, đa nhiệm (slash career) & cân bằng cuộc sống.',
    p1: [
      'Do many students in your country work part-time jobs while studying?',
      'What kind of part-time job would you like to do in the future?',
      'Do you prefer working independently or in a team?',
      'Is it easy for university graduates to find their dream job nowadays?'
    ],
    p2Topic: 'Describe a flexible or part-time job that you have done or would like to try in the future.',
    p2Bullets: [
      'what job or project it is',
      'what skills are needed for this work',
      'how it fits into a student schedule',
      'and explain why you think this experience is valuable for your future career.'
    ],
    p3: [
      'What are the advantages and disadvantages of the gig economy for young workers?',
      'Should universities provide more practical job placement modules alongside theoretical lectures?',
      'How will remote work and digital nomadism redefine traditional office employment by 2030?'
    ],
    vocab: [
      { word: 'side hustle', meaning: 'Nghề tay trái, công việc làm thêm sáng tạo', ipa: '/ˈsaɪd ˌhʌs.əl/', example: 'Graphic design is my favourite side hustle.', type: 'collocation' },
      { word: 'gain upper hand', meaning: 'Chiếm ưu thế, có lợi thế cạnh tranh', ipa: '/ɡeɪn ˈʌp.ər hænd/', example: 'Internships help graduates gain the upper hand.', type: 'idiom' },
      { word: 'carve out time', meaning: 'Chắt chiu, thu xếp thời gian', ipa: '/kɑːv aʊt taɪm/', example: 'It requires discipline to carve out time for study and work.', type: 'phrasal_verb' }
    ],
    sampleTemplate: (qStr) => `Looking at job trends for ${qStr}, running a side hustle while completing a degree has become the norm. I personally do freelance content editing on weekends. Balancing deadlines requires learning to carve out time efficiently, but gaining real-world experience gives students the upper hand when entering the job market.`
  },
  {
    titlePattern: 'Space Exploration, Sci-Fi Movies & Cosmic Curiosity',
    domain: 'academic_specialized',
    subCategoryVi: 'Khoa Học & Vũ Trụ',
    tag: 'Khoa Học & Vũ Trụ',
    youthAngle: 'Trạm vũ trụ, khám phá sao Hỏa, phim viễn tưởng Interstellar, ngắm sao đêm & đầu tư khoa học.',
    p1: [
      'Are you interested in space research or astronomy?',
      'Have you ever watched sci-fi movies about space travel?',
      'Would you like to travel into space if you had the chance?',
      'Did you learn about planets and stars in primary school?'
    ],
    p2Topic: 'Describe a sci-fi movie or documentary about outer space or futuristic technology that impressed you.',
    p2Bullets: [
      'what movie or documentary it was',
      'when and where you watched it',
      'what key story or visual effects stood out',
      'and explain why it triggered your curiosity about the universe.'
    ],
    p3: [
      'Is spending billions of dollars on interplanetary travel justified when Earth faces environmental crises?',
      'How can space technology research yield unexpected benefits for everyday human technology?',
      'Will commercial space tourism ever become accessible to ordinary citizens?'
    ],
    vocab: [
      { word: 'out of this world', meaning: 'Tuyệt vời vượt ngoài mong đợi, phi thường', ipa: '/aʊt əv ðɪs wɜːld/', example: 'The visual effects in Interstellar were truly out of this world.', type: 'idiom' },
      { word: 'push the boundaries', meaning: 'Thúc đẩy và vươn tới những giới hạn mới', ipa: '/pʊʃ ðə ˈbaʊn.dər.iz/', example: 'Space agencies continue to push the boundaries of science.', type: 'collocation' },
      { word: 'look up to', meaning: 'Ngước nhìn / Kính trọng các nhà khoa học', ipa: '/lʊk ʌp tuː/', example: 'Young students look up to astronauts as role models.', type: 'phrasal_verb' }
    ],
    sampleTemplate: (qStr) => `In this ${qStr} forecast topic on space science, I always recall watching Christopher Nolan\'s Interstellar. The cinematography and scientific accuracy were out of this world. It inspires humanity to push the boundaries of knowledge rather than staying complacent within our comfort zone.`
  },
  {
    titlePattern: 'Generational Emotional Intelligence (EQ) & Empathy',
    domain: 'philosophy_mind',
    subCategoryVi: 'Tâm Trí Con Người & EQ',
    tag: 'Triết Lý & Trừu Tượng',
    youthAngle: 'Quản lý cảm xúc khi bị burnout, lắng nghe thấu cảm, áp lực peer pressure & giãi bày tâm sự.',
    p1: [
      'Is it easy for you to share your feelings with friends?',
      'What do you usually do when you feel overwhelmed with stress?',
      'Who do you talk to when you need wise advice?',
      'Do you think people today are more emotionally open than in the past?'
    ],
    p2Topic: 'Describe a time when you helped a friend or acquaintance deal with a difficult emotional situation.',
    p2Bullets: [
      'who the person was and what problem they faced',
      'how you listened and offered comfort or support',
      'what advice or practical help you provided',
      'and explain how this experience strengthened your bond.'
    ],
    p3: [
      'Why is emotional intelligence considered as vital as academic IQ in modern leadership?',
      'How does social media influence how young people express vulnerability and sadness?',
      'Can empathy and active listening skills be taught in formal school curricula?'
    ],
    vocab: [
      { word: 'emotional intelligence', meaning: 'Trí tuệ cảm xúc (EQ)', ipa: '/ɪˈməʊ.ʃən.əl ɪnˈtel.ɪ.dʒəns/', example: 'Developing emotional intelligence helps resolve conflict smoothly.', type: 'collocation' },
      { word: 'open up to', meaning: 'Mở lòng tâm sự chân thành', ipa: '/ˈəʊ.pən ʌp tuː/', example: 'It takes courage to open up to someone about mental burnout.', type: 'phrasal_verb' },
      { word: 'see eye to eye', meaning: 'Đồng quan điểm, thấu hiểu nhau', ipa: '/siː aɪ tuː aɪ/', example: 'Good friends don\'t always see eye to eye, but they respect each other.', type: 'idiom' }
    ],
    sampleTemplate: (qStr) => `This ${qStr} topic on emotional intelligence touches close to home. Recently, my roommate was struggling with academic burnout. I invited them for tea and encouraged them to open up to me. Listening attentively without judgment made me realize that emotional empathy is what truly connects human beings.`
  }
];

// Generate dynamic dynamic forecast topics for ANY targeted quarter & year
export function generateForecastForQuarter(qy: QuarterYear, count: number = 8): TopicItem[] {
  const qStr = formatQuarterString(qy);
  const yearCat = formatYearCategory(qy);
  const generated: TopicItem[] = [];

  for (let i = 0; i < count; i++) {
    const blueprint = FORECAST_BLUEPRINTS[i % FORECAST_BLUEPRINTS.length];
    const uniqueId = `forecast-${qy.year}-q${qy.quarter}-${blueprint.domain}-${i + 1}-${Date.now().toString(36)}`;

    generated.push({
      id: uniqueId,
      title: `${blueprint.titlePattern} (${qStr} Live Forecast)`,
      yearCategory: yearCat,
      tag: blueprint.tag,
      domain: blueprint.domain,
      subCategoryVi: blueprint.subCategoryVi,
      youthAngleNote: `${blueprint.youthAngle} (Được biên soạn chuẩn IELTS Forecast ${qStr} dành cho HSSV).`,
      part1Questions: blueprint.p1,
      part2CueCard: {
        topic: blueprint.p2Topic,
        bullets: blueprint.p2Bullets
      },
      part3Questions: blueprint.p3,
      keyVocabulary: blueprint.vocab,
      sampleAnswerBand8: blueprint.sampleTemplate(qStr)
    });
  }

  return generated;
}
