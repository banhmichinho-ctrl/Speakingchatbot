import { TopicItem } from '../types';
import { CURATED_TOPICS_BANK } from './topicBankData';
import { FORECAST_2026_TOPICS } from './forecast2026Topics';
import { loadStoredForecastTopics } from './forecastEngine';
import { normalizeTopicArray } from '../utils/topicNormalizer';

export const INITIAL_STANDARD_TOPICS: TopicItem[] = [
  {
    id: 'topic-ai-2026',
    title: 'Artificial Intelligence & Smart Automation (2026 Trend)',
    yearCategory: '2026-2027 New',
    tag: 'Công Nghệ & Đổi Mới',
    domain: 'social_issues',
    subCategoryVi: 'Công Nghệ & Đổi Mới',
    youthAngleNote: 'Gần gũi với HSSV: Ứng dụng AI trong học tập, trợ lý học tập cá nhân & chuẩn bị kỹ năng tương lai.',
    part1Questions: [
      'How often do you use artificial intelligence tools in your daily life or studies?',
      'Do you think AI makes everyday tasks easier or more complicated?',
      'What types of AI technology are popular among young people in your country?',
      'Would you like to work in an industry that develops artificial intelligence in the future?'
    ],
    part2CueCard: {
      topic: 'Describe an AI tool or automated system that you find useful.',
      bullets: [
        'what the AI tool or system is',
        'how you first learned about it',
        'what you use it for in your daily routine',
        'and explain why you think this AI tool is particularly beneficial or impactful.'
      ]
    },
    part3Questions: [
      'In what ways will AI and automation transform job markets by 2030?',
      'Do you think AI generated content will replace human artistic creativity?',
      'What are the main ethical risks associated with deepfakes and automated data processing?',
      'How should schools and universities adapt their exam systems to prevent AI cheating while fostering genuine critical thinking?'
    ],
    keyVocabulary: [
      { word: 'cutting-edge AI', meaning: 'Công nghệ trí tuệ nhân tạo tiên tiến nhất', ipa: '/ˈkʌt.ɪŋ.edʒ eɪ.aɪ/', example: 'I use cutting-edge AI software to transcribe my lecture notes.', type: 'collocation' },
      { word: 'hash out', meaning: 'Bàn bạc kỹ lưỡng để đi đến thống nhất', ipa: '/hæʃ aʊt/', example: 'Engineers spent hours hashing out the ethical protocols for automated vehicles.', type: 'phrasal_verb' },
      { word: 'chip in', meaning: 'Góp ý kiến hoặc giúp sức trong cuộc thảo luận', ipa: '/tʃɪp ɪn/', example: 'In tech seminars, many students chip in with creative prompt ideas.', type: 'phrasal_verb' },
      { word: 'indispensable asset', meaning: 'Một tài sản/công cụ không thể thiếu', ipa: '/ˌɪn.dɪˈspen.sə.bəl ˈæs.et/', example: 'AI assistants have become an indispensable asset in modern research.', type: 'collocation' },
      { word: 'turn out', meaning: 'Xảy ra theo một hướng/kết quả nhất định', ipa: '/tɜːn aʊt/', example: 'Initially I was skeptical, but the AI translation turned out to be remarkably accurate.', type: 'phrasal_verb' }
    ],
    sampleAnswerBand8: `Well, if I had to speak about a cutting-edge tool that has seamlessly integrated into my routine, I guess I could start off by touching on ChatGPT-5 and generative AI assistants. To be completely candid, I first stumbled upon this technology a couple of years ago during my university studies, and it turned out to be an absolute game-changer. Nowadays, I use it primarily for hashing out research outlines, brainstorming creative essay topics, and refining my English vocabulary. What I particularly admire about it is how it acts as an interactive sounding board—I can chip in with follow-up queries and receive immediate, customized explanations. In addition, it saves me hours of tedious administrative work, allowing me to focus on high-level analysis. Looking to the future, I suppose we will witness even deeper integration of AI in personalized education.`
  },
  {
    id: 'topic-smart-cities-2026',
    title: 'Smart Cities & Sustainable Living (2026 Trend)',
    yearCategory: '2026-2027 New',
    tag: 'Môi Trường & Đô Thị',
    domain: 'social_issues',
    subCategoryVi: 'Môi Trường & Đô Thị',
    youthAngleNote: 'Gần gũi với HSSV: Xe buýt điện, ứng dụng giao thông thông minh & không gian sống xanh đô thị.',
    part1Questions: [
      'Tell me about the area where you live. Is it a smart city or a traditional area?',
      'What do you like best about the public transportation or infrastructure in your city?',
      'Is there anything you would change about environmental conditions in your city?',
      'Would you prefer to live in a futuristic high-tech skyscraper or a quiet rural cottage?'
    ],
    part2CueCard: {
      topic: 'Describe an eco-friendly smart city feature or green initiative you know about.',
      bullets: [
        'what the feature or initiative is',
        'where it is implemented or being planned',
        'how it helps reduce carbon emissions or urban noise',
        'and explain why you believe this initiative is essential for modern urban dwellers.'
      ]
    },
    part3Questions: [
      'How do smart cities in 2026 compare to traditional cities 30 years ago?',
      'What environmental problems are caused by rapid urban expansion, and how can green technology solve them?',
      'Do you think governments or citizens bear greater responsibility for reducing urban waste?',
      'How will renewable energy sources like solar micro-grids shape the architecture of future homes?'
    ],
    keyVocabulary: [
      { word: 'eco-friendly infrastructure', meaning: 'Cơ sở hạ tầng thân thiện với môi trường', ipa: '/ˌiː.kəʊˈfrend.li ˈɪn.frəˌstrʌk.tʃər/', example: 'Modern metropolises require eco-friendly infrastructure like electric bus grids.', type: 'collocation' },
      { word: 'do up', meaning: 'Sửa sang, trang trí, tân trang lại (nhà cửa/đô thị)', ipa: '/duː ʌp/', example: 'The local municipality decided to do up the old industrial district into a solar park.', type: 'phrasal_verb' },
      { word: 'hustle and bustle', meaning: 'Sự nhộn nhịp hối hả của đời sống đô thị', ipa: '/ˈhʌs.əl ənd ˈbʌs.əl/', example: 'I like escaping the urban hustle and bustle by visiting green rooftops.', type: 'idiom' },
      { word: 'drop in on', meaning: 'Ghé thăm ai đó/nơi nào đó không cần hẹn trước', ipa: '/drɒp ɪn ɒn/', example: 'In smart walkable neighborhoods, citizens can drop in on communal gardens effortlessly.', type: 'phrasal_verb' }
    ],
    sampleAnswerBand8: `Right then, I'd like to kick off by highlighting an eco-friendly smart city initiative which is automated solar-powered public transit. In my city, the local council recently decided to do up the old bus fleet with autonomous zero-emission vehicles. To be quite honest, it has dramatically cut down both carbon footprint and noise pollution. What stands out most to me is how efficiently these buses operate via real-time GPS tracking apps. As a result, residents no longer waste time waiting in traffic, and the usual city hustle and bustle feels much more tranquil and pleasant. If other megacities adopt similar smart transport networks, it would undoubtedly revolutionize urban living.`
  },
  {
    id: 'topic-social-media-wellbeing',
    title: 'Social Media & Digital Well-being (2026 Trend)',
    yearCategory: '2026-2027 New',
    tag: 'Giao Tiếp Xã Giao',
    domain: 'daily_life',
    subCategoryVi: 'Giao Tiếp Xã Giao',
    youthAngleNote: 'Gần gũi với bạn trẻ: Lướt TikTok/Instagram, thuật toán đề xuất & cai nghiện smartphone (Digital detox).',
    part1Questions: [
      'How much time do you spend scrolling on social media apps every day?',
      'Do you prefer watching short video clips or reading detailed articles online?',
      'Is there anything you dislike about digital notifications or social algorithms?',
      'Have you ever tried a digital detox or turning off your phone for a weekend?'
    ],
    part2CueCard: {
      topic: 'Describe an online campaign or content creator that promotes digital well-being.',
      bullets: [
        'who or what the creator or campaign is',
        'what advice or content they share',
        'how you felt after following their advice',
        'and explain why digital well-being is increasingly important for young people today.'
      ]
    },
    part3Questions: [
      'Why are short-form video algorithms so addictive for teenagers nowadays?',
      'How do online interactions compare with face-to-face communication in building deep friendships?',
      'Should tech platforms be legally required to enforce screen-time limits for minors?',
      'What predictions can you make regarding how people will use social media in 10 years time?'
    ],
    keyVocabulary: [
      { word: 'rub someone up the wrong way', meaning: 'Làm ai đó khó chịu không cố ý', ipa: '/rʌb ʌp ðə rɒŋ weɪ/', example: 'Aggressive marketing notifications often rub users up the wrong way.', type: 'idiom' },
      { word: 'nod off', meaning: 'Thiu thiu ngủ, thiếp đi', ipa: '/nɒd ɒf/', example: 'Scrolling late at night before nodding off ruins sleep quality.', type: 'phrasal_verb' },
      { word: 'take to a habit', meaning: 'Nhanh chóng yêu thích và quen với thói quen', ipa: '/teɪk tuː/', example: 'I recently took to doing a 30-minute evening digital detox.', type: 'phrasal_verb' },
      { word: 'mind-numbing content', meaning: 'Nội dung vô bổ, làm mê muội đầu óc', ipa: '/ˈmaɪndˌnʌm.ɪŋ ˈkɒn.tent/', example: 'Binge-watching mind-numbing content can consume valuable free time.', type: 'collocation' }
    ],
    sampleAnswerBand8: `Of course, I suppose I should begin by highlighting a digital detox initiative called "Unplug & Flourish". It was designed to encourage teenagers to step away from mind-numbing algorithmic feeds and reconnect with offline hobbies. To be honest, I used to be guilty of endlessly scrolling through short videos before nodding off at midnight, which left me feeling exhausted the next day. However, after taking to this 1-hour screen-free evening routine, I noticed a dramatic improvement in my focus and mental clarity. In addition, it gave me time to take up guitar playing again.`
  }
];

export const IELTS_TOPICS_2026: TopicItem[] = normalizeTopicArray([
  ...loadStoredForecastTopics(),
  ...FORECAST_2026_TOPICS,
  ...CURATED_TOPICS_BANK,
  ...INITIAL_STANDARD_TOPICS
]);
