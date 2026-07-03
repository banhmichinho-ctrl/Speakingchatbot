import { TopicItem, MainDomain } from '../types';

export interface DomainMetadata {
  id: MainDomain;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  subCategories: {
    id: string;
    nameVi: string;
    nameEn: string;
    youthAngle: string;
  }[];
}

export const DOMAINS_CONFIG: DomainMetadata[] = [
  {
    id: 'daily_life',
    titleVi: '1. Cá Nhân & Quen Thuộc (Daily Life)',
    titleEn: 'Personal & Daily Life',
    descriptionVi: 'Chủ đề sát sườn với đời sống hàng ngày, dễ bắt đầu và chia sẻ trải nghiệm cá nhân.',
    subCategories: [
      { id: 'family_personal', nameVi: 'Bản Thân & Gia Đình', nameEn: 'Personality & Relationships', youthAngle: 'Tính cách, thói quen sinh hoạt, quan hệ bạn bè & gia đình lứa tuổi trẻ' },
      { id: 'health_lifestyle', nameVi: 'Sức Khỏe & Lối Sống', nameEn: 'Health & Wellness', youthAngle: 'Ăn uống lành mạnh, gym, giấc ngủ, chánh niệm & quản lý stress học đường' },
      { id: 'social_leisure', nameVi: 'Giao Tiếp Xã Giao', nameEn: 'Socializing & Leisure', youthAngle: 'Thời tiết, bạn bè, trò chuyện, xả stress cuối tuần' },
      { id: 'fashion_clothing', nameVi: 'Thời Trang & Trang Phục', nameEn: 'Fashion & Clothing', youthAngle: 'Quần áo T-shirt, thời trang casual, đồng hồ, phụ kiện & phong cách cá nhân' },
      { id: 'food_dining', nameVi: 'Ẩm Thực & Bữa Ăn', nameEn: 'Food & Dining', youthAngle: 'Món ăn yêu thích, bánh ngọt, cà phê, ăn ngoài vs nấu ăn tại nhà' },
      { id: 'shopping_finance', nameVi: 'Mua Sắm & Tài Chính', nameEn: 'Shopping & Personal Finance', youthAngle: 'Săn sale Shopee, chi tiêu sinh viên, tiết kiệm & mua sắm đồ 2nd-hand' },
      { id: 'home_accommodation', nameVi: 'Nhà Cửa & Không Gian Sống', nameEn: 'Home & Living Space', youthAngle: 'Phòng trọ, căn hộ, trang trí gương, giữ gìn nhà cửa gọn gàng' },
      { id: 'entertainment_media', nameVi: 'Giải Trí, Phim Ảnh & Âm Nhạc', nameEn: 'Entertainment, Movies & Music', youthAngle: 'Xem phim rạp solo, nghe nhạc headphone, show hài kịch, idol thần tượng' }
    ]
  },
  {
    id: 'social_issues',
    titleVi: '2. Xã Hội & Đương Đại (Social Issues)',
    titleEn: 'Social Issues & Modern Society',
    descriptionVi: 'Đòi hỏi sự quan sát thực tế, trải nghiệm và tư duy phân tích phản biện xã hội.',
    subCategories: [
      { id: 'education_major', nameVi: 'Giáo Dục & Chọn Ngành', nameEn: 'Education & Academic Majors', youthAngle: 'Chọn ngành học đại học, thầy cô truyền cảm hứng, phương pháp tự học' },
      { id: 'career_work', nameVi: 'Nghề Nghiệp & Công Việc', nameEn: 'Career & Work Environment', youthAngle: 'Việc làm bán thời gian, định hướng nghề mơ ước, khởi nghiệp & Work-Life balance' },
      { id: 'tech_ai', nameVi: 'Công Nghệ & Trí Tuệ Nhân Tạo', nameEn: 'Technology & AI Gadgets', youthAngle: 'Ứng dụng AI (ChatGPT/Gemini), máy tính laptop, thiết bị điện tử & sự cố kỹ thuật' },
      { id: 'social_media_comm', nameVi: 'Mạng Xã Hội & Truyền Thông', nameEn: 'Social Media & Digital Footprint', youthAngle: 'Đăng hình Instagram/TikTok, nhắn tin không hồi đáp (left on read), quảng cáo' },
      { id: 'env_urban', nameVi: 'Môi Trường & Công Viên', nameEn: 'Environment & Public Parks', youthAngle: 'Luật bảo vệ môi trường, công viên cây xanh đô thị, sống xanh zero-waste' },
      { id: 'transport_cities', nameVi: 'Giao Thông & Phương Tiện', nameEn: 'Traffic, Cars & Transport', youthAngle: 'Kẹt xe giờ cao điểm, đi xe đạp/ô tô/xe buýt, quy hoạch thành phố' },
      { id: 'culture_tourism', nameVi: 'Văn Hóa, Du Lịch & Di Sản', nameEn: 'Culture, Travel & Heritage', youthAngle: 'Du lịch tự túc, quê hương, giới thiệu địa điểm & trải nghiệm văn hóa' },
      { id: 'rules_law', nameVi: 'Quy Định, Nội Quy & Pháp Luật', nameEn: 'Rules, Laws & Regulations', youthAngle: 'Nội quy trường học, văn hóa xếp hàng, luật mới mong muốn ban hành' }
    ]
  },
  {
    id: 'academic_specialized',
    titleVi: '3. Chuyên Môn & Khó (Specialized & Academic)',
    titleEn: 'Academic & Specialized Topics',
    descriptionVi: 'Yêu cầu từ vựng academic, tư duy logic và khả năng lập luận đa chiều.',
    subCategories: [
      { id: 'economy_global', nameVi: 'Kinh Tế & Toàn Cầu Hóa', nameEn: 'Economics & Globalization', youthAngle: 'Lạm phát ảnh hưởng chi tiêu, công ty đa quốc gia & tài trợ khởi nghiệp' },
      { id: 'science_space', nameVi: 'Khoa Học & Vũ Trụ', nameEn: 'Science & Space Exploration', youthAngle: 'Khám phá vũ trụ, phim viễn tưởng Sci-Fi, ngắm sao & môn khoa học yêu thích' },
      { id: 'history_museums', nameVi: 'Lịch Sử & Bảo Tàng', nameEn: 'History & Historical Sites', youthAngle: 'Học môn lịch sử qua phim, tham quan bảo vệ di tích lịch sử' },
      { id: 'medical_biology', nameVi: 'Y Tế, Sinh Học & Ngành Y', nameEn: 'Healthcare & Medical Field', youthAngle: 'Định hướng học ngành Y, bác sĩ, sức khỏe cộng đồng' },
      { id: 'architecture_buildings', nameVi: 'Kiến Trúc & Tòa Nhà', nameEn: 'Architecture & Tall Buildings', youthAngle: 'Tòa nhà cao tầng, nhà cổ xưa vs hiện đại, thiết kế không gian' },
      { id: 'ethics_ai', nameVi: 'Đạo Đức AI & Bản Quyền', nameEn: 'AI Ethics & Copyright', youthAngle: 'Đạo đức sử dụng AI trong bài thi, bản quyền nội dung sáng tạo' }
    ]
  },
  {
    id: 'philosophy_mind',
    titleVi: '4. Triết Lý & Trừu Tượng (Philosophy & Deep Mind)',
    titleEn: 'Philosophy & Abstract Concepts',
    descriptionVi: 'Đỉnh cao tư duy IELTS Band 8.0+: Nhận thức sâu sắc, phản biện không có đáp án tuyệt đối.',
    subCategories: [
      { id: 'life_meaning', nameVi: 'Ý Nghĩa Cuộc Sống', nameEn: 'Meaning of Life & Happiness', youthAngle: 'Độ tuổi hạnh phúc nhất, mục đích sống, định nghĩa thành công' },
      { id: 'youth_pressure_plans', nameVi: 'Áp Lực Tuổi Trẻ & Kế Hoạch', nameEn: 'Youth Pressure & Planning', youthAngle: 'Lên kế hoạch tương lai, thay đổi dự định, quyết định quan trọng' },
      { id: 'spirituality_universe', nameVi: 'Tâm Linh & Vũ Trụ', nameEn: 'Spirituality & Universe', youthAngle: 'Ý nghĩa giấc mơ, năng lượng vũ trụ & niềm tin cá nhân' },
      { id: 'impermanence_lettinggo', nameVi: 'Sự Vô Thường & Thay Đổi', nameEn: 'Impermanence & Change', youthAngle: 'Thay đổi quan điểm sống, thay đổi thói quen, đối diện biến cố' },
      { id: 'human_mind_eq', nameVi: 'Tâm Trí Con Người & EQ', nameEn: 'Human Mind, EQ & Help', youthAngle: 'Trí tuệ cảm xúc, giúp đỡ người khác, cho lời khuyên, sự tự hào' },
      { id: 'imagination_creativity', nameVi: 'Trí Tưởng Tượng & Sáng Tạo', nameEn: 'Imagination & Art', youthAngle: 'Khả năng tưởng tượng, vẽ tranh, nghệ thuật & cảm hứng sáng tạo' }
    ]
  }
];

// Rich Curated Topics across ALL 28 Subcategories
export const CURATED_TOPICS_BANK: TopicItem[] = [
  // 1. Bản Thân & Gia Đình
  {
    id: 'topic-family-habits',
    title: 'Daily Habits & Personality Growth',
    yearCategory: '2026-2027 New',
    tag: 'Bản Thân & Gia Đình',
    domain: 'daily_life',
    subCategoryVi: 'Bản Thân & Gia Đình',
    youthAngleNote: 'Gần gũi với HSSV: Thói quen dậy sớm, quản lý thời gian học tập & mối quan hệ với cha mẹ.',
    part1Questions: [
      'What is your typical morning routine before going to school or work?',
      'How has your personality changed since you were a child?',
      'Do you prefer spending your free time with family members or close friends?',
      'Is there any habit you are currently trying to build or break?'
    ],
    part2CueCard: {
      topic: 'Describe a positive habit that has improved your daily life.',
      bullets: [
        'what the habit is and when you started doing it',
        'how difficult it was to build this habit initially',
        'how it affects your daily energy and relationships',
        'and explain why you would recommend this habit to other young people.'
      ]
    },
    part3Questions: [
      'Why do young adults often find it challenging to balance personal independence with family obligations?',
      'How do parenting styles in modern society differ from those 30 years ago?',
      'In what ways do friends influence a teenager’s personality development?'
    ],
    keyVocabulary: [
      { word: 'kick off', meaning: 'Bắt đầu một ngày hoặc hoạt động', ipa: '/kɪk ɒf/', example: 'I kick off my morning with a quick 10-minute stretch.', type: 'phrasal_verb' },
      { word: 'stick to', meaning: 'Kiên trì theo đuổi một thói quen/kế hoạch', ipa: '/stɪk tuː/', example: 'It requires self-discipline to stick to a daily study routine.', type: 'phrasal_verb' },
      { word: 'emotional maturity', meaning: 'Sự trưởng thành về mặt cảm xúc', ipa: '/ɪˈməʊ.ʃən.əl məˈtʃʊə.rə.ti/', example: 'Developing emotional maturity helps students handle family conflicts gracefully.', type: 'collocation' },
      { word: 'turn over a new leaf', meaning: 'Bắt đầu đổi mới bản thân theo hướng tốt hơn', ipa: '/tɜːn ˈəʊ.vər ə njuː liːf/', example: 'At the start of the semester, I decided to turn over a new leaf regarding sleep schedules.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Well, if I were to talk about a habit that truly turned over a new leaf in my life, it would definitely be morning journaling. I kicked off this habit around six months ago during a stressful exam period. To be completely candid, sticking to it every morning required tremendous discipline at first, but it has dramatically boosted my emotional clarity and productivity.`
  },

  // 2. Sức Khỏe & Lối Sống
  {
    id: 'topic-health-mindfulness',
    title: 'Mindful Eating & Stress Management',
    yearCategory: '2026-2027 New',
    tag: 'Sức Khỏe & Lối Sống',
    domain: 'daily_life',
    subCategoryVi: 'Sức Khỏe & Lối Sống',
    youthAngleNote: 'Gần gũi với bạn trẻ: Quản lý áp lực thi cử, chế độ ăn healthy & tập thể thao giải tỏa căng thẳng.',
    part1Questions: [
      'How do you usually relax when you feel stressed by studies or deadlines?',
      'Do you pay attention to the nutrition content of the food you eat?',
      'How many hours of sleep do you get on average during exam periods?',
      'What physical activity or sport do you enjoy to keep fit?'
    ],
    part2CueCard: {
      topic: 'Describe a healthy routine or activity you do to reduce stress.',
      bullets: [
        'what the activity or routine is',
        'where and when you practice it',
        'how it helps clear your mind from academic or work pressures',
        'and explain why physical and mental wellness should be prioritized by students.'
      ]
    },
    part3Questions: [
      'Why are fast food diets so prevalent among university students nowadays?',
      'Should schools integrate mandatory mindfulness and mental health courses into the curriculum?',
      'How does prolonged screen usage before bedtime impact youth sleep quality?'
    ],
    keyVocabulary: [
      { word: 'burn out', meaning: 'Kiệt sức vì quá tải áp lực học tập/công việc', ipa: '/bɜːn aʊt/', example: 'Without proper rest, students can easily burn out before final exams.', type: 'phrasal_verb' },
      { word: 'wind down', meaning: 'Thư giãn nghỉ ngơi sau thời gian làm việc căng thẳng', ipa: '/waɪnd daʊn/', example: 'I like to wind down in the evening by listening to ambient music.', type: 'phrasal_verb' },
      { word: 'holistic wellness', meaning: 'Sức khỏe toàn diện cả thể chất lẫn tinh thần', ipa: '/həʊˈlɪs.tɪk ˈwel.nəs/', example: 'Yoga promotes holistic wellness by aligning body and breathing.', type: 'collocation' },
      { word: 'recharge one’s batteries', meaning: 'Nạp lại năng lượng tinh thần', ipa: '/riːˈtʃɑːdʒ bæt.ər.iz/', example: 'A weekend nature hike helps me recharge my batteries for the upcoming week.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Well, to be honest, as a student who often deals with heavy workloads, I place a huge emphasis on winding down effectively. One activity that helps me recharge my batteries is evening yoga paired with deep breathing exercises. Whenever I feel on the verge of burning out, taking 20 minutes to stretch completely clears my headspace.`
  },

  // 3. Giao Tiếp Xã Giao
  {
    id: 'topic-social-leisure',
    title: 'Small Talk, Friendships & Leisure Activities',
    yearCategory: '2026-2027 New',
    tag: 'Giao Tiếp Xã Giao',
    domain: 'daily_life',
    subCategoryVi: 'Giao Tiếp Xã Giao',
    youthAngleNote: 'Gần gũi với bạn trẻ: Tán gẫu quán cà phê, kết bạn mới tại đại học & xả stress cuối tuần.',
    part1Questions: [
      'Do you enjoy making small talk with strangers at coffee shops or events?',
      'How do you usually catch up with old school friends?',
      'What leisure activities do you look forward to on weekends?',
      'Is weather a common conversation topic in your country?'
    ],
    part2CueCard: {
      topic: 'Describe an enjoyable conversation you had with a new acquaintance.',
      bullets: [
        'who you talked with and where you met',
        'what interesting topics you discussed',
        'why the conversation flowed so naturally',
        'and explain how this interaction broadened your social perspective.'
      ]
    },
    part3Questions: [
      'Why do some introverts find large social gatherings draining?',
      'How has digital communication altered face-to-face small talk etiquette?',
      'Is spending leisure time alone as beneficial as socializing with friends?'
    ],
    keyVocabulary: [
      { word: 'catch up with', meaning: 'Gặp gỡ tán gẫu cập nhật tin tức với bạn bè', ipa: '/kætʃ ʌp wɪð/', example: 'We met at a cafe to catch up with each other’s university lives.', type: 'phrasal_verb' },
      { word: 'break the ice', meaning: 'Mở lời phá tan bầu không khí e ngại ban đầu', ipa: '/breɪk ðə aɪs/', example: 'Asking about favourite music is a great way to break the ice.', type: 'idiom' },
      { word: 'meaningful rapport', meaning: 'Mối quan hệ thấu hiểu và gắn kết sâu sắc', ipa: '/ˈmiː.nɪŋ.fəl ræpˈɔːr/', example: 'Building a meaningful rapport takes active listening.', type: 'collocation' },
      { word: 'hit it off', meaning: 'Tâm đầu ý hợp ngay lần đầu gặp mặt', ipa: '/hɪt ɪt ɒf/', example: 'We hit it off instantly because we both love indie rock music.', type: 'phrasal_verb' }
    ],
    sampleAnswerBand8: `I recall meeting an exchange student at an orientation workshop last term. To break the ice, I asked about her impressions of Vietnamese street food. We hit it off immediately and spent two hours catching up on shared musical interests. It was a delightful interaction that reminded me how valuable spontaneous small talk can be.`
  },

  // 4. Thời Trang & Trang Phục
  {
    id: 'topic-fashion-style',
    title: 'Personal Style, Casual Fashion & Thrift Shopping',
    yearCategory: '2026-2027 New',
    tag: 'Thời Trang & Trang Phục',
    domain: 'daily_life',
    subCategoryVi: 'Thời Trang & Trang Phục',
    youthAngleNote: 'Gần gũi với HSSV: Outfit học đường, mua đồ 2nd-hand, giày sneakers & thể hiện cá tính.',
    part1Questions: [
      'What type of clothes do you prefer wearing to university lectures or work?',
      'Do you pay much attention to current fashion trends on social media?',
      'Have you ever bought vintage or secondhand clothes from thrift stores?',
      'What is your favourite accessory or item of clothing?'
    ],
    part2CueCard: {
      topic: 'Describe an item of clothing you really enjoy wearing on special occasions.',
      bullets: [
        'what the clothing item is and what it looks like',
        'where and when you purchased it',
        'how you style it for formal or casual events',
        'and explain why this outfit makes you feel confident.'
      ]
    },
    part3Questions: [
      'Why is thrift fashion becoming overwhelmingly popular among Gen Z consumers?',
      'Do you agree that formal dress codes in corporate workplaces are becoming obsolete?',
      'How does fast fashion contribute to global environmental pollution?'
    ],
    keyVocabulary: [
      { word: 'dress up', meaning: 'Ăn mặc diện, chỉn chu cho dịp đặc biệt', ipa: '/dres ʌp/', example: 'I love dressing up in traditional Ao Dai for Lunar New Year.', type: 'phrasal_verb' },
      { word: 'snap up', meaning: 'Nhanh tay chộp lấy món đồ tốt/hời', ipa: '/snæp ʌp/', example: 'I managed to snap up a vintage denim jacket at a local flea market.', type: 'phrasal_verb' },
      { word: 'signature style', meaning: 'Phong cách thời trang mang dấu ấn cá nhân', ipa: '/ˈsɪɡ.nə.tʃər staɪl/', example: 'Minimalist casual chic has become my signature style.', type: 'collocation' },
      { word: 'cost an arm and a leg', meaning: 'Rất đắt đỏ, tốn kém', ipa: '/kɒst æn ɑːm ænd ə leg/', example: 'Designer streetwear doesn’t have to cost an arm and a leg if you shop smart.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Well, when it comes to fashion, I lean heavily towards sustainable casual wear. Recently, I snapped up a vintage oversized blazer at a local flea market. It didn’t cost an arm and a leg, yet it easily elevates my daily outfits. Wearing clothes that reflect my signature style gives me a authentic boost of confidence.`
  },

  // 5. Ẩm Thực & Bữa Ăn
  {
    id: 'topic-food-dining',
    title: 'Culinary Cultures, Home Cooking & Street Food',
    yearCategory: '2026-2027 New',
    tag: 'Ẩm Thực & Bữa Ăn',
    domain: 'daily_life',
    subCategoryVi: 'Ẩm Thực & Bữa Ăn',
    youthAngleNote: 'Gần gũi với bạn trẻ: Quán ăn vặt cổng trường, bún chả/phở, tự nấu ăn tại phòng trọ & cà phê muối.',
    part1Questions: [
      'What is your favourite home-cooked dish prepared by your family?',
      'Do you prefer eating street food with friends or dining in formal restaurants?',
      'How often do you cook your own meals at home?',
      'Is coffee or tea more popular among young people in your city?'
    ],
    part2CueCard: {
      topic: 'Describe a memorable meal or culinary experience you shared with friends.',
      bullets: [
        'what food was served and where you ate it',
        'who prepared the meal or recommended the eatery',
        'what made the atmosphere and flavors special',
        'and explain why sharing food strengthens social bonds.'
      ]
    },
    part3Questions: [
      'How has food delivery technology altered family dining traditions in urban cities?',
      'Why are international cuisines like Korean and Italian so attractive to young diners?',
      'What measures can be taken to promote healthy eating habits in school canteens?'
    ],
    keyVocabulary: [
      { word: 'whip up', meaning: 'Nhanh chóng nấu được một món ăn ngon', ipa: '/wɪp ʌp/', example: 'After late lectures, I usually whip up a quick pasta dish.', type: 'phrasal_verb' },
      { word: 'eat out', meaning: 'Đi ăn ở nhà hàng, quán xá bên ngoài', ipa: '/iːt aʊt/', example: 'Students love eating out at lively night markets on Friday evenings.', type: 'phrasal_verb' },
      { word: 'culinary heritage', meaning: 'Di sản văn hóa ẩm thực', ipa: '/ˈkʌl.ɪ.nər.i ˈher.ɪ.tɪdʒ/', example: 'Vietnamese street food represents a vibrant culinary heritage.', type: 'collocation' },
      { word: 'mouth-watering', meaning: 'Ngon chảy nước miếng, hấp dẫn kích thích vị giác', ipa: '/ˈmaʊθˌwɔː.tər.ɪŋ/', example: 'The smell of freshly roasted Pho beef broth was mouth-watering.', type: 'idiom' }
    ],
    sampleAnswerBand8: `I’d love to describe a memorable street food outing with my high school friends at a famous Pho stall in Hanoi. The rich, aromatic beef broth was absolutely mouth-watering. Cooking at home is great, but eating out surrounded by local culinary heritage and laughter with friends is an irreplaceable experience.`
  },

  // 6. Mua Sắm & Tài Chính
  {
    id: 'topic-shopping-finance',
    title: 'Student Budgeting & E-Commerce Deals',
    yearCategory: '2026-2027 New',
    tag: 'Mua Sắm & Tài Chính',
    domain: 'daily_life',
    subCategoryVi: 'Mua Sắm & Tài Chính',
    youthAngleNote: 'Gần gũi với HSSV: Săn sale Shopee/TikTok shop, quản lý ngân sách tháng & ví điện tử Momo/ZaloPay.',
    part1Questions: [
      'Do you find it easy or difficult to save money as a student?',
      'What do you usually spend most of your monthly allowance on?',
      'Did your parents teach you how to manage money when you were younger?',
      'Do you prefer paying with cash or mobile banking e-wallets?'
    ],
    part2CueCard: {
      topic: 'Describe something valuable you saved up money to purchase.',
      bullets: [
        'what the item was and how much it cost',
        'how long you saved your money for it',
        'what sacrifices or budgeting choices you made',
        'and explain how you felt when you finally bought it.'
      ]
    },
    part3Questions: [
      'Why should financial literacy be taught in secondary schools?',
      'How do cashless payment methods and e-wallets alter young people’s spending behavior?',
      'Is impulse buying more common among Gen Z due to targeted social media ads?'
    ],
    keyVocabulary: [
      { word: 'save up for', meaning: 'Tiết kiệm tiền để mua thứ gì đó', ipa: '/seɪv ʌp fɔːr/', example: 'I saved up for six months to buy a high-performance laptop.', type: 'phrasal_verb' },
      { word: 'cut down on', meaning: 'Cắt giảm bớt khoản chi tiêu không cần thiết', ipa: '/kʌt daʊn ɒn/', example: 'I had to cut down on daily boba tea to keep within budget.', type: 'phrasal_verb' },
      { word: 'financial literacy', meaning: 'Kiến thức/kỹ năng quản lý tài chính', ipa: '/faɪˈnæn.ʃəl ˈlɪt.ər.ə.si/', example: 'Financial literacy empowers students to avoid debt.', type: 'collocation' },
      { word: 'tighten one’s belt', meaning: 'Thắt lưng buộc bụng, tiết kiệm chi tiêu', ipa: '/ˈtaɪ.tən belt/', example: 'During exam months, I have to tighten my belt.', type: 'idiom' }
    ],
    sampleAnswerBand8: `I guess I could start off by describing my experience saving up for my noise-canceling headphones. As a student on a modest allowance, I had to tighten my belt and cut down on impulse dining out. Developing financial literacy early on turned out to be an invaluable skill that gave me a genuine sense of financial independence.`
  },

  // 7. Nhà Cửa & Không Gian Sống
  {
    id: 'topic-home-living-space',
    title: 'Cozy Living Spaces, Dormitories & Interior Decor',
    yearCategory: '2026-2027 New',
    tag: 'Nhà Cửa & Không Gian Sống',
    domain: 'daily_life',
    subCategoryVi: 'Nhà Cửa & Không Gian Sống',
    youthAngleNote: 'Gần gũi với HSSV: Phòng trọ sinh viên, trang trí góc học tập, cây xanh mini & dọn dẹp phòng.',
    part1Questions: [
      'Do you live in a house or an apartment room?',
      'What is your favourite room in your home to study or rest?',
      'How have you decorated your personal study desk?',
      'Do you prefer living in a quiet suburban area or a vibrant city center?'
    ],
    part2CueCard: {
      topic: 'Describe your ideal room or living space for studying and relaxing.',
      bullets: [
        'what the room looks like and how it is furnished',
        'what color scheme and lighting you would choose',
        'what personal items (books, plants, art) you would put inside',
        'and explain why a comfortable living environment boosts academic focus.'
      ]
    },
    part3Questions: [
      'Why are small micro-apartments becoming common for young adults in major metropolitan cities?',
      'How does living independently in university dormitories prepare students for adulthood?',
      'Do you agree that a cluttered physical workspace leads to a cluttered mind?'
    ],
    keyVocabulary: [
      { word: 'spruce up', meaning: 'Trang trí, dọn dẹp làm đẹp không gian sống', ipa: '/spruːs ʌp/', example: 'I bought indoor succulents to spruce up my study desk.', type: 'phrasal_verb' },
      { word: 'tidy up', meaning: 'Dọn dẹp ngăn nắp phòng xá', ipa: '/ˈtaɪ.di ʌp/', example: 'Tidying up my room every Sunday sets a positive tone for the week.', type: 'phrasal_verb' },
      { word: 'sanctuary of peace', meaning: 'Nơi chốn bình yên, thư thái tâm hồn', ipa: '/ˈsæŋk.tʃu.ər.i ɒv piːs/', example: 'My bedroom serves as a personal sanctuary of peace after long lectures.', type: 'collocation' },
      { word: 'make oneself at home', meaning: 'Tự nhiên thoải mái như ở nhà mình', ipa: '/meɪk wʌnˈself æt həʊm/', example: 'Adding soft lighting helped me make myself at home in my new dorm.', type: 'idiom' }
    ],
    sampleAnswerBand8: `My bedroom is definitely my personal sanctuary of peace. Last month, I decided to spruce it up by adding warm LED ambient lights and minimalist wooden shelves. Tidying up my workspace creates a serene atmosphere where I can fully immerse myself in reading and creative writing.`
  },

  // 8. Giải Trí, Phim Ảnh & Âm Nhạc
  {
    id: 'topic-entertainment-music',
    title: 'Cinema Experiences, Live Concerts & Music Playlists',
    yearCategory: '2026-2027 New',
    tag: 'Giải Trí, Phim Ảnh & Âm Nhạc',
    domain: 'daily_life',
    subCategoryVi: 'Giải Trí, Phim Ảnh & Âm Nhạc',
    youthAngleNote: 'Gần gũi với HSSV: Đi xem phim rạp cuối tuần, nhạc Lofi học bài, concert idol & Netflix/YouTube.',
    part1Questions: [
      'What genre of music do you listen to when studying or commuting?',
      'Do you prefer watching movies in a cinema or streaming at home?',
      'Have you ever attended a live music concert or music festival?',
      'Who is your favourite musical artist or movie director?'
    ],
    part2CueCard: {
      topic: 'Describe a movie, documentary, or concert performance that impressed you deeply.',
      bullets: [
        'what the movie, documentary, or show was',
        'when and where you watched it',
        'what key story elements or sound effects stood out to you',
        'and explain why this entertainment experience made a lasting impression.'
      ]
    },
    part3Questions: [
      'How have music streaming algorithms changed the way listeners discover independent indie artists?',
      'Do blockbuster action films hold more artistic value than small-budget indie cinema?',
      'Why is music considered a universal language that transcends cultural barriers?'
    ],
    keyVocabulary: [
      { word: 'tune in to', meaning: 'Lắng nghe/bật đài podcast, bản nhạc', ipa: '/tjuːn ɪn tuː/', example: 'I tune in to Lofi playlists to boost my concentration during study sessions.', type: 'phrasal_verb' },
      { word: 'blow someone away', meaning: 'Làm ai đó vô cùng kinh ngạc và ấn tượng', ipa: '/bləʊ əˈweɪ/', example: 'The live vocal performance completely blew me away.', type: 'phrasal_verb' },
      { word: 'cathartic release', meaning: 'Sự giải tỏa cảm xúc dồn nén qua nghệ thuật', ipa: '/kəˈθɑː.tɪk rɪˈliːs/', example: 'Singing along at a live concert offers a powerful cathartic release.', type: 'collocation' },
      { word: 'music to my ears', meaning: 'Điều ngọt ngào tuyệt vời khi nghe được', ipa: '/ˈmjuː.zɪk tuː maɪ ɪəz/', example: 'Hearing that my favourite band was touring locally was music to my ears.', type: 'idiom' }
    ],
    sampleAnswerBand8: `I recall attending an outdoor indie rock concert last autumn. The lead singer’s emotional energy completely blew me away. Whenever I tune in to their live albums on Spotify now, it recreates that sense of cathartic release and brings back fond memories of high school celebrations.`
  },

  // 9. Giáo Dục & Chọn Ngành
  {
    id: 'topic-education-major',
    title: 'University Major Selection & Modern Learning Methods',
    yearCategory: '2026-2027 New',
    tag: 'Giáo Dục & Chọn Ngành',
    domain: 'social_issues',
    subCategoryVi: 'Giáo Dục & Chọn Ngành',
    youthAngleNote: 'Gần gũi với HSSV: Chọn ngành đại học theo đam mê vs kỳ vọng gia đình, tự học online & thầy cô truyền cảm hứng.',
    part1Questions: [
      'What academic subject did you enjoy most during secondary school?',
      'How did you choose your current university major or field of study?',
      'Do you prefer traditional classroom lectures or online self-paced courses?',
      'Has an inspirational teacher ever impacted your career choice?'
    ],
    part2CueCard: {
      topic: 'Describe a course, workshop, or educational subject you found extremely rewarding.',
      bullets: [
        'what the course or subject was and who taught it',
        'what key knowledge or practical skills you gained',
        'how the learning method differed from standard classes',
        'and explain why this subject enriched your academic journey.'
      ]
    },
    part3Questions: [
      'Why do many university students experience doubt or regret regarding their chosen major?',
      'How can higher education institutions balance theoretical academic rigor with real-world vocational training?',
      'Is self-directed lifelong learning more critical today than having a formal diploma?'
    ],
    keyVocabulary: [
      { word: 'major in', meaning: 'Theo học chuyên ngành tại đại học', ipa: '/ˈmeɪ.dʒər ɪn/', example: 'I decided to major in Computer Science because of my passion for coding.', type: 'phrasal_verb' },
      { word: 'brush up on', meaning: 'Ôn luyện củng cố lại kiến thức cũ', ipa: '/brʌʃ ʌp ɒn/', example: 'I take online tutorials to brush up on my English grammar skills.', type: 'phrasal_verb' },
      { word: 'academic rigor', meaning: 'Sự nghiêm túc và chuẩn mực trong học thuật', ipa: '/ˌæk.əˈdem.ɪk ˈrɪɡ.ər/', example: 'University research demands high academic rigor and critical analysis.', type: 'collocation' },
      { word: 'learn the ropes', meaning: 'Nắm vững các kỹ năng/quy trình cơ bản', ipa: '/lɜːn ðə rəʊps/', example: 'My first semester was spent learning the ropes of university research methods.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Choosing to major in International Business was a pivotal milestone for me. During my first year, I focused on learning the ropes of academic research and market analysis. Combining classroom lectures with online workshops allowed me to brush up on practical skills with high academic rigor.`
  },

  // 10. Nghề Nghiệp & Công Việc
  {
    id: 'topic-career-work',
    title: 'Part-time Jobs, Freelancing & Dream Careers',
    yearCategory: '2026-2027 New',
    tag: 'Nghề Nghiệp & Công Việc',
    domain: 'social_issues',
    subCategoryVi: 'Nghề Nghiệp & Công Việc',
    youthAngleNote: 'Gần gũi với HSSV: Việc làm gia sư/pha chế bán thời gian, freelancer, tạo CV & cân bằng học-làm.',
    part1Questions: [
      'Is it common for university students in your country to work part-time jobs?',
      'What kind of part-time job would you recommend to a teenager?',
      'Do you prefer working in a quiet office setting or remotely from home?',
      'What skills do you think employers value most in recent graduates?'
    ],
    part2CueCard: {
      topic: 'Describe a job role or work experience you would like to try in the future.',
      bullets: [
        'what the work or job role is',
        'what responsibilities and daily tasks it involves',
        'what qualifications or soft skills are required',
        'and explain why this work experience would be valuable for your personal growth.'
      ]
    },
    part3Questions: [
      'How is the rise of the gig economy and freelance platforms changing youth employment expectations?',
      'Should companies provide flexible working hours to support employee work-life integration?',
      'What challenges do young professionals face when stepping into competitive corporate environments?'
    ],
    keyVocabulary: [
      { word: 'take on', meaning: 'Đảm nhận thêm công việc/trách nhiệm mới', ipa: '/teɪk ɒn/', example: 'I took on a part-time tutoring job to cover my textbook expenses.', type: 'phrasal_verb' },
      { word: 'carve out', meaning: 'Tự gầy dựng sự nghiệp cá nhân', ipa: '/kɑːv aʊt/', example: 'Freelancing allows creative graduates to carve out independent career paths.', type: 'phrasal_verb' },
      { word: 'competitive edge', meaning: 'Lợi thế cạnh tranh vượt trội', ipa: '/kəmˈpet.ə.tɪv edʒ/', example: 'Hands-on internship experience gives candidates a strong competitive edge.', type: 'collocation' },
      { word: 'hit the ground running', meaning: 'Thích nghi và bắt tay vào việc hiệu quả tức thì', ipa: '/hɪt ðə ɡraʊnd ˈrʌn.ɪŋ/', example: 'Real-world practical projects prepare students to hit the ground running.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Taking on a part-time barista job during my sophomore year was an eye-opening experience. It taught me time management and client communication under pressure. Having practical work experience gives students a clear competitive edge and enables them to hit the ground running when entering the full-time job market.`
  },

  // 11. Công Nghệ & Trí Tuệ Nhân Tạo
  {
    id: 'topic-tech-ai',
    title: 'AI Chatbots, Smart Devices & Tech Gadgets',
    yearCategory: '2026-2027 New',
    tag: 'Công Nghệ & Trí Tuệ Nhân Tạo',
    domain: 'social_issues',
    subCategoryVi: 'Công Nghệ & Trí Tuệ Nhân Tạo',
    youthAngleNote: 'Gần gũi với HSSV: Dùng ChatGPT/Gemini học tập, laptop gaming, tai nghe chống ồn & xử lý sự cố máy tính.',
    part1Questions: [
      'What electronic gadget do you use most frequently every day?',
      'Do you use artificial intelligence tools like ChatGPT or Gemini for your studies?',
      'Have you ever experienced a technical glitch or computer crash before a deadline?',
      'How do you feel when you leave your phone at home for a whole day?'
    ],
    part2CueCard: {
      topic: 'Describe an AI software or smart technological device that makes your daily life easier.',
      bullets: [
        'what the device or app is and how long you have used it',
        'how you learned to use its main features',
        'how it helps you solve study or organization problems',
        'and explain whether humanity relies too heavily on technology.'
      ]
    },
    part3Questions: [
      'How will generative AI redefine traditional jobs in graphic design, translation, and programming?',
      'What privacy risks are associated with smart home devices and facial recognition tech?',
      'Should schools teach prompt engineering and digital ethics in secondary education?'
    ],
    keyVocabulary: [
      { word: 'keep up with', meaning: 'Theo kịp sự phát triển của công nghệ', ipa: '/kiːp ʌp wɪð/', example: 'It is essential to keep up with rapid breakthroughs in artificial intelligence.', type: 'phrasal_verb' },
      { word: 'glitch out', meaning: 'Bị lỗi hệ thống, trục trặc phần mềm', ipa: '/ɡlɪtʃ aʊt/', example: 'My laptop glitched out right before I submitted my online assignment.', type: 'phrasal_verb' },
      { word: 'technological literacy', meaning: 'Trình độ hiểu biết và làm chủ công nghệ', ipa: '/ˌtek.nəˈlɒdʒ.ɪ.kəl ˈlɪt.ər.ə.si/', example: 'Fostering technological literacy prepares students for futuristic industries.', type: 'collocation' },
      { word: 'double-edged sword', meaning: 'Con dao hai lưỡi (vừa lợi vừa hại)', ipa: '/ˈdʌb.əl ˌedʒd sɔːd/', example: 'AI in education is a double-edged sword that requires ethical guidelines.', type: 'idiom' }
    ],
    sampleAnswerBand8: `AI learning assistants have become an integral part of my study workflow. I use them to summarize dense academic papers and check my coding syntax. While AI is undeniably a double-edged sword, developing high technological literacy enables students to keep up with modern innovations responsibly.`
  },

  // 12. Mạng Xã Hội & Truyền Thông
  {
    id: 'topic-social-media',
    title: 'Social Media Habits, Digital Footprint & Messaging',
    yearCategory: '2026-2027 New',
    tag: 'Mạng Xã Hội & Truyền Thông',
    domain: 'social_issues',
    subCategoryVi: 'Mạng Xã Hội & Truyền Thông',
    youthAngleNote: 'Gần gũi với HSSV: Đăng hình Instagram/TikTok, nhắn tin không hồi đáp (left on read) & nghiện notification.',
    part1Questions: [
      'Which social media app do you check most often throughout the day?',
      'Do you prefer posting photos publicly or keeping your digital profile private?',
      'How do you feel when someone leaves your message "on read" for hours?',
      'Have you ever taken a temporary break from social networks?'
    ],
    part2CueCard: {
      topic: 'Describe a time when you saw or shared something interesting on social media.',
      bullets: [
        'what content or post caught your attention',
        'which platform you saw it on (e.g., TikTok, Instagram, Threads)',
        'why you decided to share or comment on it',
        'and explain how social media algorithms influence public opinion.'
      ]
    },
    part3Questions: [
      'Why are short-form video algorithms (TikTok/Reels) so addictive for young audiences?',
      'How does digital cyberbullying affect teenage mental health, and what precautions should be taken?',
      'In what ways has social media transformed modern news reporting and journalism?'
    ],
    keyVocabulary: [
      { word: 'scroll through', meaning: 'Lướt xem nội dung trên màn hình điện thoại', ipa: '/skrəʊl θruː/', example: 'I often scroll through short videos during commuting breaks.', type: 'phrasal_verb' },
      { word: 'cut back on', meaning: 'Cắt giảm thời gian dùng mạng xã hội', ipa: '/kʌt bæk ɒn/', example: 'I am trying to cut back on late-night screen time.', type: 'phrasal_verb' },
      { word: 'digital footprint', meaning: 'Dấu chân kỹ thuật số (lịch sử đăng tải online)', ipa: '/ˈdɪdʒ.ɪ.təl ˈfʊt.prɪnt/', example: 'Young adults should be mindful of their digital footprint when applying for jobs.', type: 'collocation' },
      { word: 'hit the nail on the head', meaning: 'Phản ánh/nói chính xác thực trạng', ipa: '/hɪt ðə neɪl ɒn ðə hed/', example: 'A viral thread hit the nail on the head regarding university burnout.', type: 'idiom' }
    ],
    sampleAnswerBand8: `I recently read an insightful thread on social media concerning screen addiction among university students. It really hit the nail on the head. Scrolling through short videos can consume hours without realizing it, so I decided to cut back on social media and manage my digital footprint more intentionally.`
  },

  // 13. Môi Trường & Công Viên
  {
    id: 'topic-env-parks',
    title: 'Urban Green Parks, Recycling & Zero-Waste Living',
    yearCategory: '2026-2027 New',
    tag: 'Môi Trường & Công Viên',
    domain: 'social_issues',
    subCategoryVi: 'Môi Trường & Công Viên',
    youthAngleNote: 'Gần gũi với bạn trẻ: Công viên chạy bộ, phân loại rác tại nguồn, bình nước cá nhân & cây xanh.',
    part1Questions: [
      'Are there any public green parks near your home or university?',
      'What activities do you enjoy doing when visiting a city park?',
      'Do you carry a reusable water bottle or tote bag when going out?',
      'How can citizens help keep local parks clean and free of litter?'
    ],
    part2CueCard: {
      topic: 'Describe a public park or natural green space you enjoy visiting.',
      bullets: [
        'where the park is located and how often you go there',
        'what facilities (benches, walking paths, trees) it offers',
        'what you usually do when you spend time there',
        'and explain why urban green spaces are vital for mental well-being.'
      ]
    },
    part3Questions: [
      'How do city green parks help reduce the urban heat island effect?',
      'What policies can local governments enforce to achieve zero-waste recycling targets?',
      'Why is environmental education essential in shaping eco-conscious young citizens?'
    ],
    keyVocabulary: [
      { word: 'head over to', meaning: 'Đi tới công viên hoặc địa điểm thiên nhiên', ipa: '/hed ˈəʊ.vər tuː/', example: 'On Sunday mornings, I love heading over to the central botanical park.', type: 'phrasal_verb' },
      { word: 'phase out', meaning: 'Từng bước loại bỏ đồ nhựa dùng một lần', ipa: '/feɪz aʊt/', example: 'Universities should phase out plastic cups in cafeterias.', type: 'phrasal_verb' },
      { word: 'urban oasis', meaning: 'Ốc đảo xanh giữa lòng thành phố', ipa: '/ˈɜː.bən əʊˈeɪ.sɪs/', example: 'The central park acts as a peaceful urban oasis amidst bustling traffic.', type: 'collocation' },
      { word: 'a breath of fresh air', meaning: 'Làn gió mới, không khí trong lành dễ chịu', ipa: '/breθ ɒv freʃ eə/', example: 'Walking under lush trees after exam week felt like a breath of fresh air.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Heading over to the central botanical park every weekend is my favorite way to decompress. It serves as a serene urban oasis amidst bustling high-rises. Strolling under the shade of ancient trees is a true breath of fresh air that completely resets my mental energy.`
  },

  // 14. Giao Thông & Phương Tiện
  {
    id: 'topic-traffic-transport',
    title: 'Traffic Congestion, Public Transit & Bicycles',
    yearCategory: '2026-2027 New',
    tag: 'Giao Thông & Phương Tiện',
    domain: 'social_issues',
    subCategoryVi: 'Giao Thông & Phương Tiện',
    youthAngleNote: 'Gần gũi với HSSV: Đi xe buýt/Metro, kẹt xe giờ cao điểm, xe máy điện & văn hóa tham gia giao thông.',
    part1Questions: [
      'How do you usually commute to university or work every day?',
      'Is traffic congestion a serious issue in your city during peak hours?',
      'Do you prefer riding a motorbike, taking the bus, or cycling?',
      'Have you ever ridden a subway metro train in your city?'
    ],
    part2CueCard: {
      topic: 'Describe a memorable journey or commute experience using public transport.',
      bullets: [
        'what mode of transport you took and where you traveled',
        'who you traveled with or what you observed during the trip',
        'what went smoothly or what delays you encountered',
        'and explain how public transport can be improved in your town.'
      ]
    },
    part3Questions: [
      'How can municipal governments encourage citizens to switch from private motorbikes to electric buses?',
      'What are the urban planning solutions to mitigate severe traffic gridlocks in mega-cities?',
      'Will autonomous self-driving vehicles eliminate traffic accidents in the future?'
    ],
    keyVocabulary: [
      { word: 'get stuck in', meaning: 'Bị mắc kẹt trong đám kẹt xe', ipa: '/ɡet stʌk ɪn/', example: 'Commuters often get stuck in heavy gridlock during rush hour.', type: 'phrasal_verb' },
      { word: 'opt for', meaning: 'Lựa chọn phương tiện công cộng', ipa: '/ɒpt fɔːr/', example: 'Many students opt for electric buses to reduce travel expenses.', type: 'phrasal_verb' },
      { word: 'transit infrastructure', meaning: 'Hạ tầng giao thông công cộng', ipa: '/ˈtræn.zɪt ˈɪn.frəˌstrʌk.tʃər/', example: 'Investing in modern transit infrastructure alleviates urban congestion.', type: 'collocation' },
      { word: 'in the driver’s seat', meaning: 'Nắm quyền chủ động, làm chủ tình hình', ipa: '/ɪn ðə ˈdraɪ.vəz siːt/', example: 'Expanding subway networks puts city planners in the driver’s seat of sustainable growth.', type: 'idiom' }
    ],
    sampleAnswerBand8: `To avoid getting stuck in rush-hour traffic gridlocks, I usually opt for the new electric bus route to university. It’s quiet, air-conditioned, and affordable. Modernizing transit infrastructure is crucial because it puts urban planning in the driver’s seat of sustainable city development.`
  },

  // 15. Văn Hóa, Du Lịch & Di Sản
  {
    id: 'topic-culture-travel',
    title: 'Solo Travel, Cultural Heritage & Local Festivals',
    yearCategory: '2026-2027 New',
    tag: 'Văn Hóa, Du Lịch & Di Sản',
    domain: 'social_issues',
    subCategoryVi: 'Văn Hóa, Du Lịch & Di Sản',
    youthAngleNote: 'Gần gũi với bạn trẻ: Phượt du lịch tự túc, lễ hội truyền thống, giới thiệu đặc sản quê hương & chụp ảnh di tích.',
    part1Questions: [
      'Do you enjoy traveling to historical towns or scenic natural spots?',
      'Have you ever gone on a solo trip or backpacking trip with friends?',
      'What traditional festival in your country do you look forward to most?',
      'How do you prepare before traveling to a new destination?'
    ],
    part2CueCard: {
      topic: 'Describe a memorable cultural festival or travel destination you visited.',
      bullets: [
        'where the destination or festival was located',
        'who you went with and what cultural activities took place',
        'what unique local customs, music, or traditional food you experienced',
        'and explain why preserving cultural heritage is essential for national identity.'
      ]
    },
    part3Questions: [
      'How does over-tourism harm local ecosystems and historical monuments?',
      'Why is eco-tourism becoming popular among environmentally conscious travelers?',
      'In what ways does international travel broaden cross-cultural understanding?'
    ],
    keyVocabulary: [
      { word: 'set off for', meaning: 'Khởi hành chuyến đi du lịch', ipa: '/set ɒf fɔːr/', example: 'We set off for Hoi An early in the morning to beat the crowds.', type: 'phrasal_verb' },
      { word: 'soak up', meaning: 'Hấp thụ, tận hưởng không khí/văn hóa địa phương', ipa: '/səʊk ʌp/', example: 'I love wandering through ancient alleys to soak up the local heritage atmosphere.', type: 'phrasal_verb' },
      { word: 'cultural immersion', meaning: 'Sự hòa nhập đắm mình vào văn hóa bản địa', ipa: '/ˈkʌl.tʃər.əl ɪˈmɜː.ʃən/', example: 'Backpacking offers genuine cultural immersion compared to resort tours.', type: 'collocation' },
      { word: 'off the beaten track', meaning: 'Nơi hoang sơ hẻo lánh ít người biết đến', ipa: '/ɒf ðə ˈbiː.tən træk/', example: 'Exploring villages off the beaten track yielded unforgettable memories.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Setting off for the ancient town of Hoi An with my university classmates was a highlight of my summer. We spent three days soaking up the lantern-lit atmosphere and tasting local street delicacies. Seeking out destinations off the beaten track offers rich cultural immersion that no textbook can match.`
  },

  // 16. Quy Định, Nội Quy & Pháp Luật
  {
    id: 'topic-rules-law',
    title: 'School Regulations, Queueing Etiquette & Laws',
    yearCategory: '2026-2027 New',
    tag: 'Quy Định, Nội Quy & Pháp Luật',
    domain: 'social_issues',
    subCategoryVi: 'Quy Định, Nội Quy & Pháp Luật',
    youthAngleNote: 'Gần gũi với HSSV: Nội quy đồng phục trường học, văn hóa xếp hàng mua vé & luật giao thông đường bộ.',
    part1Questions: [
      'Did your high school have strict regulations regarding uniforms or mobile phone usage?',
      'How do you feel when people line up and queue patiently in public places?',
      'Do you think traffic laws regarding helmet usage are strictly enforced in your town?',
      'What new rule or policy would you introduce at your university?'
    ],
    part2CueCard: {
      topic: 'Describe a rule or regulation at school or work that you think is beneficial.',
      bullets: [
        'what the rule or regulation is',
        'why it was introduced and who enforces it',
        'how students or employees react to this rule',
        'and explain why rules are necessary for maintaining order and fairness.'
      ]
    },
    part3Questions: [
      'Why do some young adults resist or challenge strict social rules and authority?',
      'How can governments balance public safety laws with personal individual freedoms?',
      'What role does civic education play in cultivating law-abiding citizens?'
    ],
    keyVocabulary: [
      { word: 'abide by', meaning: 'Tôn trọng và tuân thủ quy định/pháp luật', ipa: '/əˈbaɪd baɪ/', example: 'All students are expected to abide by the university code of conduct.', type: 'phrasal_verb' },
      { word: 'crack down on', meaning: 'Xử lý nghiêm khắc hành vi vi phạm', ipa: '/kræk daʊn ɒn/', example: 'Authorities are cracking down on reckless speeding in school zones.', type: 'phrasal_verb' },
      { word: 'civic responsibility', meaning: 'Trách nhiệm công dân đối với cộng đồng', ipa: '/ˈsɪv.ɪk rɪˌspɒn.səˈbɪl.ə.ti/', example: 'Queueing politely in public demonstrates civic responsibility.', type: 'collocation' },
      { word: 'play by the rules', meaning: 'Chơi đúng luật, xử sự đàng hoàng công bằng', ipa: '/pleɪ baɪ ðə ruːlz/', example: 'When everyone plays by the rules, society functions harmoniously.', type: 'idiom' }
    ],
    sampleAnswerBand8: `At my university, there is a strict policy prohibiting academic plagiarism. All students must abide by this code to maintain intellectual honesty. While some find guidelines rigid, playing by the rules fosters a sense of fairness and instills genuine civic responsibility.`
  },

  // 17. Kinh Tế & Toàn Cầu Hóa
  {
    id: 'topic-economy-globalization',
    title: 'Inflation, Global Supply Chains & Living Costs',
    yearCategory: '2026-2027 New',
    tag: 'Kinh Tế & Toàn Cầu Hóa',
    domain: 'academic_specialized',
    subCategoryVi: 'Kinh Tế & Toàn Cầu Hóa',
    youthAngleNote: 'Gần gũi với HSSV: Lạm phát giá thuê nhà/ăn uống, thương hiệu quốc tế & chi tiêu tiết kiệm.',
    part1Questions: [
      'Have you noticed prices for everyday items or food rising in your city recently?',
      'How often do you shop on e-commerce platforms like Shopee or TikTok Shop?',
      'Do you prefer supporting local neighborhood markets or shopping at global supermarket chains?',
      'Is it common for students in your country to do freelance side-hustles?'
    ],
    part2CueCard: {
      topic: 'Describe a change in living costs or economic trends you observed among young adults.',
      bullets: [
        'what changes or cost increases you noticed',
        'how these changes affect students and young professionals',
        'what strategies young people use to manage these economic pressures',
        'and explain your perspective on global trade impact on everyday prices.'
      ]
    },
    part3Questions: [
      'How does inflation impact young graduates entering the housing and rental market?',
      'What are the advantages and drawbacks of global economic integration for developing nations?',
      'How can youth entrepreneurship drive national economic innovation?'
    ],
    keyVocabulary: [
      { word: 'drive up', meaning: 'Đẩy giá cả leo thang', ipa: '/draɪv ʌp/', example: 'Rising fuel prices drive up everyday food costs.', type: 'phrasal_verb' },
      { word: 'scrape by', meaning: 'Sống chật vật, vừa đủ trang trải', ipa: '/skreɪp baɪ/', example: 'Many students scrape by on modest part-time wages.', type: 'phrasal_verb' },
      { word: 'soaring inflation', meaning: 'Lạm phát tăng vọt', ipa: '/ˈsɔː.rɪŋ ɪnˈfleɪ.ʃən/', example: 'Soaring inflation forces households to reconsider expenditures.', type: 'collocation' },
      { word: 'feel the pinch', meaning: 'Cảm nhận rõ áp lực tài chính khó khăn', ipa: '/fiːl ðə pɪntʃ/', example: 'When dormitory rents increased by 15%, students immediately felt the pinch.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Over the past year, soaring inflation has driven up rental prices for student dormitories. Many of my classmates have felt the pinch when trying to balance tuition fees with daily living expenses. Learning to budget carefully is essential for navigating modern global economic realities.`
  },

  // 18. Khoa Học & Vũ Trụ
  {
    id: 'topic-science-space',
    title: 'Space Exploration, Astronomy & Clean Energy',
    yearCategory: '2026-2027 New',
    tag: 'Khoa Học & Vũ Trụ',
    domain: 'academic_specialized',
    subCategoryVi: 'Khoa Học & Vũ Trụ',
    youthAngleNote: 'Gần gũi với bạn trẻ: Ước mơ khám phá vũ trụ, pin mặt trời, xe điện & phim Sci-Fi Interstellar.',
    part1Questions: [
      'Were you interested in space, stars, and planets when you were a child?',
      'Would you ever buy a ticket for commercial space tourism if you could afford it?',
      'What science subject did you enjoy most at high school?',
      'Do you think electric vehicles (EVs) will completely replace petrol cars soon?'
    ],
    part2CueCard: {
      topic: 'Describe a scientific discovery or technological innovation that fascinates you.',
      bullets: [
        'what the discovery or invention is (e.g., James Webb telescope, solar microgrids, gene editing)',
        'how you first learned about it',
        'what potential benefits it brings to humanity',
        'and explain why scientific curiosity is important for the younger generation.'
      ]
    },
    part3Questions: [
      'Is spending billions of dollars on space exploration justified when poverty exists on Earth?',
      'How will fusion energy and solar technology revolutionize global power grids?',
      'Why should governments invest heavily in fundamental scientific research?'
    ],
    keyVocabulary: [
      { word: 'break through', meaning: 'Đạt được đột phá khoa học quan trọng', ipa: '/breɪk θruː/', example: 'Scientists hope to break through current solar cell efficiency limits.', type: 'phrasal_verb' },
      { word: 'pave the way for', meaning: 'Mở đường cho sự phát triển tương lai', ipa: '/peɪv ðə weɪ/', example: 'Deep space telescopes pave the way for discovering habitable exoplanets.', type: 'phrasal_verb' },
      { word: 'quantum leap', meaning: 'Bước tiến vĩ đại vượt bậc', ipa: '/ˈkwɒn.təm liːp/', example: 'Modern astrophysics represents a quantum leap in understanding cosmic origins.', type: 'collocation' },
      { word: 'reach for the stars', meaning: 'Vươn tới những ước mơ vĩ đại', ipa: '/riːtʃ fɔːr ðə stɑːz/', example: 'Science education inspires young minds to reach for the stars.', type: 'idiom' }
    ],
    sampleAnswerBand8: `I’ve always been captivated by deep space astronomy and satellite technology. In my view, missions like the James Webb Telescope represent a quantum leap in human ingenuity. Space research paves the way for breakthrough technologies in clean solar energy and global communications.`
  },

  // 19. Lịch Sử & Bảo Tàng
  {
    id: 'topic-history-museums',
    title: 'Visiting Museums, Historical Artifacts & Documentaries',
    yearCategory: '2026-2027 New',
    tag: 'Lịch Sử & Bảo Tàng',
    domain: 'academic_specialized',
    subCategoryVi: 'Lịch Sử & Bảo Tàng',
    youthAngleNote: 'Gần gũi với bạn trẻ: Tham quan bảo tàng di tích, học lịch sử qua phim điện ảnh & giữ gìn cổ vật.',
    part1Questions: [
      'Did you enjoy learning history subjects during your school years?',
      'How often do you visit museums or historical sites when traveling?',
      'Do you prefer interactive digital museum displays or traditional artifact showcases?',
      'Is there a historical figure from your country whom you admire?'
    ],
    part2CueCard: {
      topic: 'Describe a historical museum or site you visited that left a strong impression.',
      bullets: [
        'where the museum or historical site was located',
        'what key artifacts or historical exhibits you saw inside',
        'what historical period or story was portrayed',
        'and explain why learning history helps young people understand the present.'
      ]
    },
    part3Questions: [
      'Should entrance tickets to national history museums be free for students?',
      'How can digital virtual reality (VR) technologies make history education engaging for teenagers?',
      'Why is it important to protect historical heritage buildings from urban demolition?'
    ],
    keyVocabulary: [
      { word: 'pass down', meaning: 'Lưu truyền giá trị lịch sử qua các thế hệ', ipa: '/pɑːs daʊn/', example: 'Cultural stories and historical traditions are passed down through generations.', type: 'phrasal_verb' },
      { word: 'dig into', meaning: 'Nghiên cứu tìm hiểu sâu tài liệu lịch sử', ipa: '/dɪɡ ˈɪn.tuː/', example: 'Visiting museums allowed me to dig into my country’s heroic past.', type: 'phrasal_verb' },
      { word: 'historical preservation', meaning: 'Sự bảo tồn di tích lịch sử', ipa: '/hɪˈstɒr.ɪ.kəl ˌprez.əˈveɪ.ʃən/', example: 'Governments should invest in historical preservation to honor national heritage.', type: 'collocation' },
      { word: 'blast from the past', meaning: 'Ký ức lịch sử ùa về đầy xao xuyến', ipa: '/blɑːst frəm ðə pɑːst/', example: 'Seeing 19th-century vintage photographs was a fascinating blast from the past.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Visiting the Vietnam National History Museum last year was a memorable experience. Seeing preserved ancient artifacts was a vivid blast from the past. Digging into history helps us appreciate the sacrifices of previous generations and reinforces the importance of historical preservation.`
  },

  // 20. Y Tế, Sinh Học & Ngành Y
  {
    id: 'topic-medical-biology',
    title: 'Healthcare System, Medical Advances & Public Health',
    yearCategory: '2026-2027 New',
    tag: 'Y Tế, Sinh Học & Ngành Y',
    domain: 'academic_specialized',
    subCategoryVi: 'Y Tế, Sinh Học & Ngành Y',
    youthAngleNote: 'Gần gũi với HSSV: Định hướng chọn ngành Y, vắc-xin, tầm soát sức khỏe & lòng biết ơn bác sĩ.',
    part1Questions: [
      'Do you know anyone in your family or friend circle who works in healthcare?',
      'How often do you go for routine health checkups?',
      'Did you enjoy biology classes when studying at school?',
      'What habits do you practice to boost your immune system during flu season?'
    ],
    part2CueCard: {
      topic: 'Describe a medical professional or healthcare worker you respect.',
      bullets: [
        'who this person is and where they work',
        'what difficult tasks or duties they perform daily',
        'how they demonstrated compassion or dedication',
        'and explain why medical workers deserve high social recognition.'
      ]
    },
    part3Questions: [
      'How will AI diagnostics and telemedicine transform rural healthcare access?',
      'Why should governments allocate a larger percentage of GDP to public health infrastructure?',
      'What steps can be taken to reduce medical worker burnout in emergency hospitals?'
    ],
    keyVocabulary: [
      { word: 'bounce back', meaning: 'Hồi phục sức khỏe sau cơn ốm', ipa: '/baʊns bæk/', example: 'Adequate rest enables patients to bounce back quickly.', type: 'phrasal_verb' },
      { word: 'look after', meaning: 'Chăm sóc người bệnh chu đáo', ipa: '/lʊk ˈɑːf.tər/', example: 'Nurses work tirelessly around the clock to look after patients.', type: 'phrasal_verb' },
      { word: 'medical breakthrough', meaning: 'Đột phá y khoa quan trọng', ipa: '/ˈmed.ɪ.kəl ˈbreɪk.θruː/', example: 'Gene therapy represents a major medical breakthrough in treating rare diseases.', type: 'collocation' },
      { word: 'a shot in the arm', meaning: 'Cú hích tiếp thêm sức mạnh/động lực', ipa: '/ʃɒt ɪn ðə ɑːm/', example: 'Increased health research funding was a shot in the arm for public hospitals.', type: 'idiom' }
    ],
    sampleAnswerBand8: `I have immense respect for my cousin who works as an emergency room doctor. Watching her look after patients with boundless compassion is inspiring. Recent medical breakthroughs in AI diagnostics have provided a real shot in the arm for public healthcare efficiency.`
  },

  // 21. Kiến Trúc & Tòa Nhà
  {
    id: 'topic-architecture-buildings',
    title: 'Modern Skyscrapers vs Ancient Heritage Architecture',
    yearCategory: '2026-2027 New',
    tag: 'Kiến Trúc & Tòa Nhà',
    domain: 'academic_specialized',
    subCategoryVi: 'Kiến Trúc & Tòa Nhà',
    youthAngleNote: 'Gần gũi với HSSV: Tòa nhà cao tầng Landmark/Bitexco, quán cà phê phong cách Indochine & góc chụp ảnh đẹp.',
    part1Questions: [
      'What type of architecture do you prefer: glass skyscrapers or wooden heritage houses?',
      'Is there an iconic building or landmark in your hometown?',
      'Would you like to design your own house in the future?',
      'Do you pay attention to interior design and natural lighting when entering a building?'
    ],
    part2CueCard: {
      topic: 'Describe an impressive building or architectural landmark you visited.',
      bullets: [
        'where the building is located and what it is used for',
        'what architectural features (façade, height, materials) stood out',
        'what you did when you visited or explored inside',
        'and explain why iconic architectural landmarks define a city’s skyline.'
      ]
    },
    part3Questions: [
      'Should historic buildings be preserved even if they occupy prime real estate in city centers?',
      'How can green architecture and eco-friendly building materials reduce carbon emissions?',
      'Why do modern high-rise glass towers look so similar across global metropolitan cities?'
    ],
    keyVocabulary: [
      { word: 'stand out', meaning: 'Nổi bật vươn cao trên bầu trời thành phố', ipa: '/stænd aʊt/', example: 'The glass skyscraper stands out dramatically on the city skyline.', type: 'phrasal_verb' },
      { word: 'blend in with', meaning: 'Hài hòa quyện vào cảnh quan kiến trúc xung quanh', ipa: '/blend ɪn wɪð/', example: 'Modern eco-friendly designs should blend in with natural surroundings.', type: 'phrasal_verb' },
      { word: 'architectural marvel', meaning: 'Tuyệt tác kỳ quan kiến trúc', ipa: '/ˌɑː.kɪˈtek.tʃər.əl ˈmɑː.vəl/', example: 'Landmark 81 is considered a modern architectural marvel in Vietnam.', type: 'collocation' },
      { word: 'state of the art', meaning: 'Hiện đại đỉnh cao công nghệ', ipa: '/steɪt ɒv ðə ɑːt/', example: 'The new university library features state-of-the-art acoustic design.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Visiting the Bitexco Financial Tower in Ho Chi Minh City was unforgettable. As an architectural marvel featuring a state-of-the-art glass façade inspired by the lotus bud, it stands out proudly on the skyline while symbolizing Vietnam’s rapid modernization.`
  },

  // 22. Đạo Đức AI & Bản Quyền
  {
    id: 'topic-ethics-ai',
    title: 'Academic Integrity, AI Copyright & Intellectual Property',
    yearCategory: '2026-2027 New',
    tag: 'Đạo Đức AI & Bản Quyền',
    domain: 'academic_specialized',
    subCategoryVi: 'Đạo Đức AI & Bản Quyền',
    youthAngleNote: 'Gần gũi với HSSV: Đạo văn khi làm essay, quyền tác giả hình ảnh/âm nhạc AI & dùng AI trung thực.',
    part1Questions: [
      'How do teachers at your school ensure students do not copy homework from the internet?',
      'Do you think AI-generated artwork should be eligible for copyright protection?',
      'Have you ever cited an AI tool in your academic assignments?',
      'Why is intellectual property important for artists and authors?'
    ],
    part2CueCard: {
      topic: 'Describe a situation where honesty and academic integrity were tested.',
      bullets: [
        'what the assignment, exam, or project was',
        'what temptation or easy shortcut (e.g., plagiarism, AI copy) existed',
        'how you chose to adhere to honest work guidelines',
        'and explain why ethical integrity builds genuine personal competency.'
      ]
    },
    part3Questions: [
      'How should educational institutions establish clear ethical boundaries for AI usage in research papers?',
      'Who owns the copyright when an AI algorithm generates a song using sampled voice data of famous singers?',
      'What are the long-term societal consequences if intellectual property rights are neglected?'
    ],
    keyVocabulary: [
      { word: 'pass off as', meaning: 'Mạo nhận tác phẩm của AI/người khác là của mình', ipa: '/pɑːs ɒf æz/', example: 'Students should never pass off AI-generated essays as their own original work.', type: 'phrasal_verb' },
      { word: 'clamp down on', meaning: 'Thắt chặt và xử lý triệt để hành vi đạo văn', ipa: '/klæmp daʊn ɒn/', example: 'Universities are clamping down on academic dishonesty using AI detectors.', type: 'phrasal_verb' },
      { word: 'academic integrity', meaning: 'Sự trung thực chuẩn mực trong học thuật', ipa: '/ˌæk.əˈdem.ɪk ɪnˈteɡ.rə.ti/', example: 'Upholding academic integrity is fundamental for scholarly credibility.', type: 'collocation' },
      { word: 'give credit where credit is due', meaning: 'Tôn trọng bản quyền, ghi nhận công sức tác giả', ipa: '/ɡɪv ˈkred.ɪt wear ˈkred.ɪt ɪz djuː/', example: 'When citing research sources, always give credit where credit is due.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Maintaining academic integrity is something I take very seriously in university assignments. With generative AI tools readily available, it’s easy for some to pass off automated text as original work. However, clamping down on plagiarism and giving credit where credit is due ensures authentic skill development.`
  },

  // 23. Ý Nghĩa Cuộc Sống
  {
    id: 'topic-life-meaning',
    title: 'Defining Success, Inner Happiness & Purpose',
    yearCategory: '2026-2027 New',
    tag: 'Ý Nghĩa Cuộc Sống',
    domain: 'philosophy_mind',
    subCategoryVi: 'Ý Nghĩa Cuộc Sống',
    youthAngleNote: 'Gần gũi với HSSV: Tìm kiếm đam mê vs thu nhập, vượt qua áp lực đồng lứa & định nghĩa thành công.',
    part1Questions: [
      'What makes you feel truly happy and content at the end of a busy day?',
      'Do you think happiness comes from material achievements or inner peace?',
      'Do you ever feel pressured by social media posts showing other people’s success?',
      'Is it more important to choose a job you love or one that pays a high salary?'
    ],
    part2CueCard: {
      topic: 'Describe a moment when you realized what truly matters to you in life.',
      bullets: [
        'when and where this realization happened',
        'what situation or event triggered this perspective shift',
        'how it changed your priorities or choices afterwards',
        'and explain why finding personal purpose is crucial for young adults.'
      ]
    },
    part3Questions: [
      'Why is peer pressure and fear of missing out (FOMO) so intense among modern teenagers?',
      'How does societal definition of success differ between Western and Eastern cultures?',
      'Can money buy genuine happiness, or does it merely provide comfort and security?'
    ],
    keyVocabulary: [
      { word: 'figure out', meaning: 'Tìm ra, thấu hiểu ý nghĩa bản thân', ipa: '/ˈfɪɡ.ər aʊt/', example: 'It takes time for young adults to figure out their true calling in life.', type: 'phrasal_verb' },
      { word: 'measure up to', meaning: 'Đạt tới kỳ vọng/tiêu chuẩn của người khác', ipa: '/ˈmeʒ.ər ʌp tuː/', example: 'Constant comparison makes people feel they never measure up to societal expectations.', type: 'phrasal_verb' },
      { word: 'intrinsic fulfillment', meaning: 'Sự thỏa mãn từ sâu bên trong tâm hồn', ipa: '/ɪnˈtrɪn.zɪk fʊlˈfɪl.mənt/', example: 'True happiness stems from intrinsic fulfillment rather than superficial praise.', type: 'collocation' },
      { word: 'keep up with the Joneses', meaning: 'Chạy theo hào nhoáng thi đua với bạn bè', ipa: '/kiːp ʌp wɪð ðə ˈdʒəʊnzɪz/', example: 'Trying to keep up with the Joneses on social media causes anxiety.', type: 'idiom' }
    ],
    sampleAnswerBand8: `I realized what truly matters to me during my university prep year. I used to exhaust myself trying to keep up with the Joneses and measure up to societal expectations. However, I soon figured out that intrinsic fulfillment—doing work that genuinely sparks passion—is far more valuable than material status.`
  },

  // 24. Áp Lực Tuổi Trẻ & Kế Hoạch
  {
    id: 'topic-youth-pressure-plans',
    title: 'Handling Peer Pressure, Future Planning & Major Choices',
    yearCategory: '2026-2027 New',
    tag: 'Áp Lực Tuổi Trẻ & Kế Hoạch',
    domain: 'philosophy_mind',
    subCategoryVi: 'Áp Lực Tuổi Trẻ & Kế Hoạch',
    youthAngleNote: 'Gần gũi với HSSV: Áp lực thi cử, lập kế hoạch 5 năm, sợ tụt hậu (FOMO) & tự tin vào bản thân.',
    part1Questions: [
      'Do you like making detailed plans for your future or prefer taking things step by step?',
      'How do you handle feelings of doubt when making an important decision?',
      'Do you feel pressured when comparing your achievements with your classmates?',
      'What advice would you give your younger self about managing stress?'
    ],
    part2CueCard: {
      topic: 'Describe an important goal or plan you set for yourself and how you pursued it.',
      bullets: [
        'what the goal or plan was (e.g., getting IELTS score, learning coding, university entrance)',
        'what obstacles or pressure you faced along the way',
        'what action steps you took to stay disciplined and focused',
        'and explain how achieving or working towards this plan boosted your confidence.'
      ]
    },
    part3Questions: [
      'Why are young people today experiencing higher levels of anxiety regarding future employment?',
      'How can parents support teenagers in setting realistic career targets without imposing undue pressure?',
      'Is flexibility in changing life goals more advantageous than sticking rigidly to a 10-year plan?'
    ],
    keyVocabulary: [
      { word: 'map out', meaning: 'Lên kế hoạch chi tiết cho tương lai', ipa: '/mæp aʊt/', example: 'I mapped out my study timetable two months before final exams.', type: 'phrasal_verb' },
      { word: 'push through', meaning: 'Nỗ lực vượt qua giai đoạn khó khăn áp lực', ipa: '/pʊʃ θruː/', example: 'Reminding myself of my goals helped me push through exam fatigue.', type: 'phrasal_verb' },
      { word: 'peer pressure', meaning: 'Áp lực từ bạn bè đồng lứa', ipa: '/pɪər ˈpreʃ.ər/', example: 'Overcoming peer pressure requires strong self-belief.', type: 'collocation' },
      { word: 'take something in stride', meaning: 'Bình tĩnh đón nhận khó khăn không hề nao núng', ipa: '/teɪk ˈstraɪd/', example: 'Learning to take unexpected setbacks in stride builds mental resilience.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Mapping out a study strategy for my English proficiency test was a major goal last year. Navigating peer pressure and exam fatigue was tough, but reminding myself of my long-term aspirations helped me push through. Taking challenges in stride empowered me to build solid self-confidence.`
  },

  // 25. Tâm Linh & Vũ Trụ
  {
    id: 'topic-spirituality-universe',
    title: 'Cosmic Curiosity, Dreams & Universal Energy',
    yearCategory: '2026-2027 New',
    tag: 'Tâm Linh & Vũ Trụ',
    domain: 'philosophy_mind',
    subCategoryVi: 'Tâm Linh & Vũ Trụ',
    youthAngleNote: 'Gần gũi với bạn trẻ: Ý nghĩa giấc mơ, năng lượng tích cực (Manifestation), vũ trụ & trực giác cá nhân.',
    part1Questions: [
      'Do you often remember your dreams when you wake up in the morning?',
      'Are you curious about astronomy, stars, or the vastness of the universe?',
      'Do you believe in personal intuition or "gut feelings" when making choices?',
      'What do you do to recharge your positive spiritual energy?'
    ],
    part2CueCard: {
      topic: 'Describe a vivid dream or cosmic experience that made you think deeply.',
      bullets: [
        'what happened in the dream or experience',
        'when you experienced it and how it felt',
        'what symbolic meaning or personal insight you derived from it',
        'and explain why human beings are naturally intrigued by cosmic mysteries.'
      ]
    },
    part3Questions: [
      'Why is "manifestation" and spiritual mindfulness gaining popularity among Gen Z on social media?',
      'How does scientific reasoning complement or contradict personal spiritual beliefs?',
      'In what ways does contemplating the scale of the universe foster personal humility?'
    ],
    keyVocabulary: [
      { word: 'reflect on', meaning: 'Suy ngẫm thấu đáo về cuộc sống/vũ trụ', ipa: '/rɪˈflekt ɒn/', example: 'Stargazing on clear nights encourages me to reflect on human existence.', type: 'phrasal_verb' },
      { word: 'tune into', meaning: 'Lắng nghe trực giác và cảm xúc nội tâm', ipa: '/tjuːn ˈɪn.tuː/', example: 'Meditation helps practitioners tune into their inner state of mind.', type: 'phrasal_verb' },
      { word: 'cosmic awe', meaning: 'Sự kinh ngạc thành kính trước vẻ đẹp vũ trụ', ipa: '/ˈkɒz.mɪk ɔː/', example: 'Looking at photos of distant galaxies inspires a sense of cosmic awe.', type: 'collocation' },
      { word: 'down to earth', meaning: 'Chân thật, thực tế không ảo tưởng', ipa: '/daʊn tuː ɜːθ/', example: 'While I enjoy spiritual theories, I remain down to earth when solving practical problems.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Stargazing in the countryside during summer vacation filled me with a profound sense of cosmic awe. It inspired me to reflect on human life and tune into my inner intuition. While I enjoy exploring spiritual concepts, I strive to remain down to earth in my daily study habits.`
  },

  // 26. Sự Vô Thường & Thay Đổi
  {
    id: 'topic-impermanence-lettinggo',
    title: 'Accepting Change, Resilience & Letting Go',
    yearCategory: '2026-2027 New',
    tag: 'Sự Vô Thường & Thay Đổi',
    domain: 'philosophy_mind',
    subCategoryVi: 'Sự Vô Thường & Thay Đổi',
    youthAngleNote: 'Gần gũi với bạn trẻ: Chấp nhận sự thay đổi, chia tay mối quan hệ toxic, vượt qua thất bại đầu đời.',
    part1Questions: [
      'How do you usually handle sudden changes or unexpected plans?',
      'Have you ever had to say goodbye to a school friend who moved away?',
      'Do you keep old objects and photos for sentimental reasons or prefer letting them go?',
      'What advice would you give a friend who is going through a tough failure?'
    ],
    part2CueCard: {
      topic: 'Describe a significant transition in your life that taught you acceptance.',
      bullets: [
        'what the change or transition was (e.g., changing schools, ending a friendship)',
        'how you initially reacted and felt about it',
        'how you learned to accept the new reality and move forward',
        'and explain what this experience taught you about impermanence.'
      ]
    },
    part3Questions: [
      'Why do humans naturally fear change and cling to past routines?',
      'How does understanding "impermanence" help people navigate grief and emotional loss?',
      'In what ways can experiencing early setbacks make young individuals more resilient?'
    ],
    keyVocabulary: [
      { word: 'bounce back', meaning: 'Phục hồi, gượng dậy sau thất bại/biến cố', ipa: '/baʊns bæk/', example: 'Resilient students learn how to bounce back stronger after failing a test.', type: 'phrasal_verb' },
      { word: 'let go of', meaning: 'Buông bỏ những vướng mắc/quá khứ', ipa: '/let ɡəʊ ɒv/', example: 'To move forward, one must let go of past regrets and bitter memories.', type: 'phrasal_verb' },
      { word: 'emotional resilience', meaning: 'Sức bền và khả năng chịu đựng cảm xúc', ipa: '/ɪˈməʊ.ʃən.əl rɪˈzɪl.jəns/', example: 'Understanding impermanence fosters emotional resilience during life transitions.', type: 'collocation' },
      { word: 'every cloud has a silver lining', meaning: 'Trong cái rủi có cái may / Sau cơn mưa trời lại sáng', ipa: '/ˈev.ri klaʊd hæz ə ˈsɪl.vər ˈlaɪ.nɪŋ/', example: 'Even though changing schools was daunting, every cloud has a silver lining.', type: 'idiom' }
    ],
    sampleAnswerBand8: `Moving to a new city for university was a major transition for me. At first, I struggled to let go of my old routine and felt overwhelmed. However, accepting that life is inherently impermanent helped me adapt. It taught me emotional resilience and proved that every cloud has a silver lining.`
  },

  // 27. Tâm Trí Con Người & EQ
  {
    id: 'topic-human-mind-eq',
    title: 'Emotional Intelligence, Empathy & Active Listening',
    yearCategory: '2026-2027 New',
    tag: 'Tâm Trí Con Người & EQ',
    domain: 'philosophy_mind',
    subCategoryVi: 'Tâm Trí Con Người & EQ',
    youthAngleNote: 'Gần gũi với bạn trẻ: Trí tuệ cảm xúc (EQ) khi giao tiếp online, lắng nghe bản ngã & rèn luyện sự tập trung.',
    part1Questions: [
      'Do you consider yourself an empathetic person who easily understands others’ feelings?',
      'How do you stay focused when studying in a noisy environment or with smartphone notifications?',
      'Do you think emotional intelligence (EQ) is more important than IQ for success in life?',
      'What do you do when you notice yourself getting defensive during an argument?'
    ],
    part2CueCard: {
      topic: 'Describe a situation where managing your emotions (EQ) led to a positive outcome.',
      bullets: [
        'what the situation or conflict was',
        'how you managed your ego or anger at that moment',
        'what you said or did to resolve the problem calmly',
        'and explain why controlling one’s mind and reactions is an essential life skill.'
      ]
    },
    part3Questions: [
      'How does constant digital stimulation shorten attention spans, and how can youth retrain focus?',
      'What is the difference between healthy self-esteem and an inflated ego in relationships?',
      'Why is empathy becoming a highly sought-after leadership quality in modern organizations?'
    ],
    keyVocabulary: [
      { word: 'calm down', meaning: 'Bình tĩnh lại trước khi phản ứng', ipa: '/kɑːm daʊn/', example: 'Taking three deep breaths helps you calm down during a heated debate.', type: 'phrasal_verb' },
      { word: 'think over', meaning: 'Cân nhắc kỹ lưỡng trước khi phát biểu/hành động', ipa: '/θɪŋk ˈəʊ.vər/', example: 'High EQ individuals always think over their words before speaking.', type: 'phrasal_verb' },
      { word: 'emotional intelligence', meaning: 'Trí tuệ cảm xúc (EQ)', ipa: '/ɪˈməʊ.ʃən.əl ɪnˈtel.ɪ.dʒəns/', example: 'Emotional intelligence enables students to build harmonious relationships.', type: 'collocation' },
      { word: 'keep a cool head', meaning: 'Giữ một cái đầu lạnh, tỉnh táo', ipa: '/kiːp ə kuːl hed/', example: 'Under high-pressure exam conditions, it is crucial to keep a cool head.', type: 'idiom' }
    ],
    sampleAnswerBand8: `During a university group presentation where team members had conflicting opinions, I made a conscious effort to keep a cool head and listen empathetically. Exercising emotional intelligence allowed us to synthesize our ideas smoothly and resolve tensions amicably.`
  },

  // 28. Trí Tưởng Tượng & Sáng Tạo
  {
    id: 'topic-imagination-creativity',
    title: 'Artistic Expression, Creative Writing & Imagination',
    yearCategory: '2026-2027 New',
    tag: 'Trí Tưởng Tượng & Sáng Tạo',
    domain: 'philosophy_mind',
    subCategoryVi: 'Trí Tưởng Tượng & Sáng Tạo',
    youthAngleNote: 'Gần gũi với bạn trẻ: Vẽ tranh digital, sáng tác truyện, làm video TikTok & nuôi dưỡng trí tưởng tượng.',
    part1Questions: [
      'Did you enjoy drawing, painting, or creative writing as a child?',
      'How do you generate new ideas when working on a creative project?',
      'Do you think artificial intelligence can ever match human artistic imagination?',
      'What creative hobby would you like to pick up in the future?'
    ],
    part2CueCard: {
      topic: 'Describe a creative piece of art, story, or project you created yourself.',
      bullets: [
        'what you created (e.g., digital drawing, story, video, musical piece)',
        'what inspired you to make it and what tools you used',
        'how long it took to complete and what challenges you overcame',
        'and explain why creative expression is vital for human emotional health.'
      ]
    },
    part3Questions: [
      'Why is imagination considered equally important as scientific logic in human progress?',
      'How can primary schools foster boundless creative thinking instead of rote memorization?',
      'In what ways does engaging in artistic pursuits relieve psychological stress?'
    ],
    keyVocabulary: [
      { word: 'come up with', meaning: 'Nảy ra ý tưởng sáng tạo độc đáo', ipa: '/kʌm ʌp wɪð/', example: 'Brainstorming session helped us come up with an innovative concept.', type: 'phrasal_verb' },
      { word: 'channel into', meaning: 'Gửi gắm, gửi trọn cảm xúc vào tác phẩm sáng tạo', ipa: '/ˈtʃæn.əl ˈɪn.tuː/', example: 'I channel my stress into digital painting on my tablet.', type: 'phrasal_verb' },
      { word: 'artistic expression', meaning: 'Sự bộc lộ cá tính qua biểu đạt nghệ thuật', ipa: '/ɑːˈtɪs.tɪk ɪkˈspreʃ.ən/', example: 'Artistic expression provides an authentic outlet for youth emotions.', type: 'collocation' },
      { word: 'think outside the box', meaning: 'Tư duy đột phá ngoài khuôn khổ thông thường', ipa: '/θɪŋk aʊtˈsaɪd ðə bɒks/', example: 'Solving modern problems requires learning to think outside the box.', type: 'idiom' }
    ],
    sampleAnswerBand8: `When working on a digital illustration project last semester, I tried to think outside the box and experiment with vibrant color palettes. Channeling my emotions into artistic expression allowed me to come up with a piece that won a university poster design prize.`
  }
];

// --- DYNAMIC 10,000+ TOPIC GENERATOR ENGINE ---
// This engine procedurally constructs valid structured IELTS topics for ANY subcategory or query
export function generateProceduralTopic(
  domainId: MainDomain,
  subCategoryId: string,
  subCategoryNameVi: string,
  customTitle?: string
): TopicItem {
  const topicId = `gen-topic-${domainId}-${subCategoryId}-${Date.now()}`;
  const title = customTitle || `${subCategoryNameVi}: Deep Exploration & Perspective`;

  const templates = {
    part1: [
      `How often do you engage in discussions or activities related to ${subCategoryNameVi} in your daily life?`,
      `Did your interest in topics like ${subCategoryNameVi} change as you grew up?`,
      `Do young people in your country pay significant attention to ${subCategoryNameVi}?`,
      `Would you like to learn more or take a specialized course about ${subCategoryNameVi} in the future?`
    ],
    part2: {
      topic: `Describe an experience, lesson, or event related to ${subCategoryNameVi} that influenced your mindset.`,
      bullets: [
        `what the situation or aspect of ${subCategoryNameVi} was`,
        `when and where you encountered or practiced it`,
        `how it impacted your personal perspective, habits, or understanding`,
        `and explain why this aspect of ${subCategoryNameVi} is particularly meaningful for young people today.`
      ]
    },
    part3: [
      `In what ways does ${subCategoryNameVi} shape the development and lifestyle of modern society?`,
      `What challenges do young adults face when navigating issues related to ${subCategoryNameVi}?`,
      `How might public perception and governmental policies regarding ${subCategoryNameVi} evolve over the next decade?`
    ],
    vocab: [
      { word: 'wrap one’s head around', meaning: 'Thấu hiểu thấu đáo một vấn đề phức tạp', ipa: '/ræp hed əˈraʊnd/', example: 'It took me a while to wrap my head around the core concepts.', type: 'idiom' as const },
      { word: 'delve into', meaning: 'Đi sâu nghiên cứu, tìm hiểu chi tiết', ipa: '/delv ˈɪn.tuː/', example: 'Students are encouraged to delve into real-world case studies.', type: 'phrasal_verb' as const },
      { word: 'transformative perspective', meaning: 'Góc nhìn mang tính thay đổi toàn diện', ipa: '/trænsˈfɔː.mə.tɪv pəˈspek.tɪv/', example: 'Gaining a transformative perspective empowers youth to lead positive change.', type: 'collocation' as const },
      { word: 'broaden one’s horizons', meaning: 'Mở rộng tầm mắt và tri thức', ipa: '/ˈbrɔː.dən həˈraɪ.zənz/', example: 'Exploring diverse topics genuinely broadens one’s intellectual horizons.', type: 'idiom' as const }
    ]
  };

  return {
    id: topicId,
    title: title,
    yearCategory: '2026-2027 New',
    tag: subCategoryNameVi,
    domain: domainId,
    subCategoryVi: subCategoryNameVi,
    youthAngleNote: `Góc nhìn HSSV & Bạn trẻ: Khám phá sâu sắc ${subCategoryNameVi} phù hợp tâm lý & đời sống người trẻ.`,
    part1Questions: templates.part1,
    part2CueCard: templates.part2,
    part3Questions: templates.part3,
    keyVocabulary: templates.vocab,
    sampleAnswerBand8: `Well, if I were to delve into this topic, I’d say exploring ${subCategoryNameVi} has genuinely broadened my intellectual horizons. It took me a while to wrap my head around its nuances, but gaining a transformative perspective has enabled me to make well-informed choices in my daily life as a young adult.`
  };
}
