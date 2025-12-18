
import { PillarData, BlogPost, Product, WeekPlan, BookChapterPreview, DayPlan, AssessmentCategory, CommunityPost } from './types';

export const TRANSLATIONS = {
  nav: {
    home: { ar: 'الرئيسية', en: 'HEADQUARTERS', fr: 'QG' },
    blueprint: { ar: 'المخطط', en: 'THE BLUEPRINT', fr: 'LE PLAN' },
    philosophy: { ar: 'الكود', en: 'THE CODE', fr: 'LE CODE' },
    gallery: { ar: 'المعرض', en: 'THE GALLERY', fr: 'GALERIE' },
    library: { ar: 'الأدوات', en: 'THE TOOLS', fr: 'OUTILS' },
    journal: { ar: 'السجل', en: 'SITE LOG', fr: 'JOURNAL' },
    community: { ar: 'النقابة', en: 'BUILDERS GUILD', fr: 'GUILDE' },
    contact: { ar: 'استشارات', en: 'CONSULTANCY', fr: 'CONSULTATION' },
    architect: { ar: 'عن المعماري', en: 'THE ARCHITECT', fr: "L'ARCHITECTE" },
  },
  hero: {
    headline: { ar: 'أنت لست مكسوراً. أنت سيء التصميم.', en: 'You Are Not Broken. You Are Poorly Designed.' },
    line1: { ar: 'أنت لست مكسوراً.', en: 'You Are Not Broken.' },
    line2: { ar: 'أنت سيء التصميم.', en: 'You Are Poorly Designed.' },
    desc: { 
        ar: 'البشر لا ينهارون عشوائياً، بل إنشائياً. أنت بحاجة لهندسة هيكلية—وليس ديكوراً داخلياً—لإعادة بناء حياتك من الأساس.', 
        en: 'Human beings don\'t break randomly. They collapse architecturally.\nYou need structural engineering—not interior decoration—to rebuild your life from the foundation up.' 
    },
    cta: { ar: 'ابدأ فحص السلامة الإنشائية', en: 'TAKE YOUR STRUCTURAL INTEGRITY AUDIT' },
    subCta: { ar: 'شاهد قصة سارة', en: "WATCH SARAH'S STORY" }
  },
  assessment: {
    title: { ar: 'اختبار الإجهاد الهيكلي', en: 'Structural Stress Test', fr: 'Test de Stress Structurel' },
    start: { ar: 'بدء المعاينة', en: 'Initiate Inspection', fr: 'Lancer l\'Inspection' },
    resultTitle: { ar: 'تقرير الحالة الإنشائية', en: 'Structural Integrity Report', fr: 'Rapport d\'Intégrité' },
  },
  footer: {
    copyright: { ar: 'جميع الحقوق محفوظة © عمارة الإنسان', en: 'All Rights Reserved © Human Architecture', fr: 'Tous droits réservés © Architecture Humaine' },
  },
  contact: {
    title: { ar: 'طلب استشارة هندسية', en: 'Request Site Inspection', fr: 'Demander une inspection' },
    desc: { ar: 'نحن لا نقدم نصائح، نقدم حلولاً إنشائية.', en: 'We do not offer advice. We offer structural solutions.', fr: 'Nous offrons des solutions structurelles.' },
    form: {
      name: { ar: 'اسم المالك', en: 'Project Owner', fr: 'Propriétaire' },
      email: { ar: 'البريد الرسمي', en: 'Official Email', fr: 'E-mail officiel' },
      type: { ar: 'نوع المشروع', en: 'Project Category', fr: 'Catégorie de projet' },
      message: { ar: 'وصف الحالة الراهنة', en: 'Current Status Report', fr: 'Rapport d\'état' },
      submit: { ar: 'إرسال الطلب', en: 'Submit Request', fr: 'Soumettre' }
    }
  },
  checkout: {
      title: { ar: 'عقد التوريد', en: 'Procurement Contract', fr: 'Contrat d\'Acquisition' },
      summary: { ar: 'قائمة المواد', en: 'Material Manifest', fr: 'Manifeste Matériel' },
      total: { ar: 'إجمالي الاستثمار', en: 'Total Investment', fr: 'Investissement Total' },
      client: { ar: 'بيانات المهندس', en: 'Architect ID', fr: 'ID Architecte' },
      pay: { ar: 'توقيع وبدء التنفيذ', en: 'Sign & Execute', fr: 'Signer et Exécuter' },
      secure: { ar: 'بوابة مشفرة (PayPal)', en: 'Encrypted Gateway (PayPal)', fr: 'Paiement Sécurisé' },
      success: { ar: 'تم إصدار تصريح البناء', en: 'Construction Permit Issued', fr: 'Permis Délivré' },
      redirect: { ar: 'جاري تحويلك لغرفة العمليات...', en: 'Redirecting to Ops Room...', fr: 'Redirection...' }
  },
  community: {
      channels: { ar: 'قنوات الموقع', en: 'Site Channels', fr: 'Chaînes' },
      feed: { ar: 'السجل العام', en: 'Public Log', fr: 'Journal' },
      newPost: { ar: 'تدوين ملاحظة', en: 'Log Entry', fr: 'Ajouter' },
      actions: {
          endorse: { ar: 'ختم المصادقة', en: 'Stamp Approval', fr: 'Approuver' },
          review: { ar: 'مراجعة فنية', en: 'Peer Review', fr: 'Revue' }
      }
  }
};

export const ABOUT_CONTENT = {
    title: { ar: 'عن المعماري', en: 'The Architect', fr: 'L\'Architecte' },
    name: { ar: 'أ. مقلد', en: 'A. Meklad', fr: 'A. Meklad' },
    titles: { ar: 'مؤسس Graphics House | معماري وفنان', en: 'Founder of Graphics House | Architect & Artist', fr: 'Architecte | Artiste | CEO Graphics House' },
    bio: {
        ar: 'أنا معماري وفنان عاشق للجمال. قضيت عمراً طويلاً في رحاب الهندسة والعمارة، ولي شغف عميق بمجال الطب والصحة العامة. أسست شركة "جرافيكس هاوس" الإبداعية، حيث تشرفت بتنفيذ العديد من المشاريع الكبرى.',
        en: 'I am an architect and artist devoted to beauty. I have spent a lifetime in the fields of engineering and architecture, with a deep passion for medicine and health in general. I founded the creative firm "Graphics House" and have executed numerous major projects.',
        fr: 'Architecte et artiste multidisciplinaire, CEO de Graphics House.'
    },
    philosophyTitle: { ar: 'الرؤية: دمج العمارة بالطب', en: 'The Vision: Merging Architecture & Health', fr: 'Pourquoi?' },
    philosophy: {
        ar: 'هذا المشروع هو نتاج دمج خبرتي الطويلة في العمارة مع شغفي بالطب. "عمارة الإنسان" ليست مجرد فلسفة، بل هي تطبيق للمبادئ الهندسية الصارمة على الصحة النفسية والجسدية. كما يُبنى ناطحات السحاب على أسس متينة، يجب أن يُبنى الإنسان. أنا هنا لا لأقدم نصائح، بل لأعطيك "المخطط التنفيذي" لإعادة بناء ذاتك كتحفة معمارية.',
        en: 'This project is the result of merging my lifetime experience in architecture with my passion for medicine. "Human Architecture" is not just a philosophy; it is the application of strict engineering principles to mental and physical health. Just as skyscrapers are built on solid foundations, so must the human being. I am not here to offer advice, but to hand you the "Execution Blueprint" to rebuild yourself as a structural masterpiece.',
        fr: 'Ce projet est un plan\'exécution pour la restructuration.'
    }
};

export const PILLARS: PillarData[] = [
  {
    id: 'mind',
    title: { ar: 'غرفة التحكم (العقل)', en: 'Control Room (Mind)', fr: 'Salle de Contrôle' },
    channelId: 'SECTOR-A',
    description: { 
      ar: 'إعادة برمجة أنظمة التشغيل العقلية لتتحمل ضغوط الحياة الحديثة.', 
      en: 'Reprogramming cognitive operating systems to handle modern life pressures.', 
      fr: 'Reprogrammation cognitive.' 
    },
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop',
    blueprintImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'body',
    title: { ar: 'الأساسات (الجسد)', en: 'Foundation (Body)', fr: 'Fondation' },
    channelId: 'SECTOR-B',
    description: { 
      ar: 'صب القواعد الخرسانية للطاقة الحيوية والترميم الجسدي.', 
      en: 'Pouring concrete bases for bio-energy and physical restoration.', 
      fr: 'Coulage des bases.' 
    },
    image: 'https://images.unsplash.com/photo-1590004953392-5aba2e78b336?q=80&w=2070&auto=format&fit=crop',
    blueprintImage: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'spirit',
    title: { ar: 'التصميم الداخلي (الروح)', en: 'Interiors (Spirit)', fr: 'Intérieurs' },
    channelId: 'SECTOR-C',
    description: { 
      ar: 'توجيه المبنى نحو الشمال الحقيقي وإضاءة الغرف المظلمة.', 
      en: 'Orienting the structure to True North and lighting dark rooms.', 
      fr: 'Orientation vers le Nord.' 
    },
    image: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2070&auto=format&fit=crop',
    blueprintImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'social',
    title: { ar: 'الواجهة (العلاقات)', en: 'Facade (Social)', fr: 'Façade' },
    channelId: 'SECTOR-D',
    description: { 
      ar: 'أنظمة الحماية والاتصال بالعالم الخارجي عبر حدود متينة.', 
      en: 'Protection systems and external interfaces via solid boundaries.', 
      fr: 'Systèmes de protection.' 
    },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    blueprintImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'bundle_master',
    category: 'bundle',
    name: { ar: 'باقة المعماري الكاملة', en: 'Master Architect Bundle', fr: 'Pack Master' },
    description: { ar: 'كل شيء تحتاجه لإعادة بناء حياتك من الأساس.', en: 'Everything you need to rebuild your life from the foundation up.', fr: 'Tout pour reconstruire.' },
    price: 397,
    type: 'hybrid',
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'book_digital',
    category: 'book',
    name: { ar: 'المخطط (PDF)', en: 'The Blueprint (Digital)', fr: 'Le Plan (Digital)' },
    description: { ar: 'نسخة رقمية عالية الدقة من المخطط الأصلي.', en: 'High-res digital copy of the original blueprint.', fr: 'Copie numérique haute résolution.' },
    price: 29,
    type: 'digital',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'book_print',
    category: 'book',
    name: { ar: 'المخطط (مطبوع)', en: 'The Blueprint (Hardcover)', fr: 'Le Plan (Livre)' },
    description: { ar: 'نسخة ورقية فاخرة تجلد يدوياً.', en: 'Premium handcrafted hardcover edition.', fr: 'Édition reliée de luxe.' },
    price: 49,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop'
  },
  {
      id: 'workbook_print',
      category: 'book',
      name: { ar: 'الوورك بوك 28 يوم', en: '28-Day Workbook', fr: 'Cahier 28 Jours' },
      description: { ar: 'دليل التطبيق العملي اليومي للهدم والبناء.', en: 'Daily practical guide for demolition and construction.', fr: 'Guide pratique quotidien.' },
      price: 27,
      type: 'physical',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop'
  },
  {
      id: 'system_hybrid',
      category: 'bundle',
      name: { ar: 'النظام الهجين المتكامل', en: 'Complete Hybrid System', fr: 'Système Hybride Complet' },
      description: { ar: 'الباقة التي تجمع بين الكتاب والداشبورد التفاعلي.', en: 'The bundle combining the book and interactive dashboard.', fr: 'Pack livre et tableau de bord.' },
      price: 197,
      type: 'hybrid',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  }
];

export const ART_PRODUCTS: Product[] = [
  {
    id: 'art-new-01',
    category: 'art',
    name: { ar: 'السكينة الصامتة', en: 'Silent Serenity', fr: 'Sérénité Silencieuse' },
    description: { ar: 'لوحة تعبر عن توازن الأساسات العميقة في صمت البناء.', en: 'A painting expressing the balance of deep foundations in construction silence.', fr: 'Équilibre des bases.' },
    price: 1200,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop',
    aiPrompt: 'A minimalist abstract painting with soft beige, charcoal, and bronze textures representing internal peace and structural stability.'
  },
  {
    id: 'art-new-02',
    category: 'art',
    name: { ar: 'هيكل القوة', en: 'Structure of Strength', fr: 'Structure de Force' },
    description: { ar: 'تمثيل بصري للصلابة العقلية والوضوح الإنشائي.', en: 'Visual representation of mental rigidity and structural clarity.', fr: 'Force mentale.' },
    price: 1500,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop',
    aiPrompt: 'Geometric abstract art with sharp cerulean blue and grey concrete lines representing mental clarity and structural engineering.'
  },
  {
    id: 'art-new-03',
    category: 'art',
    name: { ar: 'تدفق الأحمال', en: 'Load Flow', fr: 'Flux de Charge' },
    description: { ar: 'توزيع القوى داخل الهيكل الإنساني.', en: 'Distribution of forces within the human structure.', fr: 'Flux de charge.' },
    price: 1800,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974&auto=format&fit=crop',
    aiPrompt: 'Dynamic abstract painting with flowing lines in gold and black on a textured white background, visualizing the flow of load.'
  }
];

export const THEORY_CARDS: DayPlan[] = [
  {
    day: 1,
    title: { ar: 'قانون الثبات الإنشائي', en: 'Law of Structural Stability', fr: 'Loi de Stabilité' },
    task: { ar: 'لا يمكن البناء على أرض متحركة. ابدأ بتثبيت موقعك الروحي قبل صب القواعد الجسدية.', en: 'You cannot build on shifting ground. Start by stabilizing your spiritual site before pouring physical bases.', fr: 'Pas de construction sur sol mouvant.' },
    isLocked: false
  },
  {
    day: 2,
    title: { ar: 'قانون توزيع الأحمال', en: 'Law of Load Distribution', fr: 'Loi de Distribution' },
    task: { ar: 'الضغط غير الموزع يؤدي للانهيار الحتمي. تعلم كيف تعزل المهام وتوزع الجهد على الأعمدة الأربعة.', en: 'Undistributed pressure leads to inevitable collapse. Learn how to isolate tasks and distribute effort.', fr: 'Pression mal répartie = effondrement.' },
    isLocked: false
  },
  {
    day: 3,
    title: { ar: 'قانون التوسع الهيكلي', en: 'Law of Structural Expansion', fr: 'Loi d\'Expansion' },
    task: { ar: 'الهيكل القوي هو الذي يسمح بالنمو دون فقدان التوازن. اختبر مرونة جدرانك العقلية اليوم.', en: 'A strong structure allows for growth without losing balance. Test the flexibility of your mental walls.', fr: 'Croissance et équilibre.' },
    isLocked: false
  },
  {
    day: 4,
    title: { ar: 'قانون الصيانة الدورية', en: 'Law of Routine Maintenance', fr: 'Loi de Maintenance' },
    task: { ar: 'أي مبنى يُترك دون صيانة ينهار تدريجياً. حدد "الصدأ" في عاداتك وقم بصنفرته فوراً.', en: 'Any building left without maintenance eventually collapses. Identify the rust in your habits and sand it off.', fr: 'Entretien du système.' },
    isLocked: false
  }
];

export const THIRTY_DAY_PROGRAM: WeekPlan[] = [
  {
    id: 1,
    title: { ar: 'الأسبوع 1: مسح الموقع', en: 'Week 1: Site Survey', fr: 'Semaine 1: Enquête' },
    focus: { ar: 'تحديد التصدعات الأساسية', en: 'Identifying core fractures', fr: 'Identifier les fissures' },
    days: [
      { day: 1, title: { ar: 'بداية الهدم', en: 'Demolition Start', fr: 'Début démolition' }, task: { ar: 'حدد 3 عادات تعيق بناءك وهدمها فوراً من جدولك.', en: 'Identify 3 habits hindering your structure and demolish them immediately.', fr: '3 habitudes à éliminer.' }, isLocked: false, bookPageRef: 12 },
      { day: 2, title: { ar: 'تحليل الأحمال', en: 'Load Analysis', fr: 'Analyse de charge' }, task: { ar: 'راقب مستويات التوتر اليومية وحدد مصدر الثقل الحقيقي على عمود العقل.', en: 'Monitor daily stress levels and identify the source of load.', fr: 'Surveiller le stress.' }, isLocked: false, bookPageRef: 18 },
      { day: 3, title: { ar: 'فحص التربة', en: 'Soil Testing', fr: 'Test de sol' }, task: { ar: 'حلل البيئة المحيطة بك؛ هل تدعم البناء أم تسبب التآكل؟', en: 'Analyze your environment; does it support building or cause erosion?', fr: 'Analyser l\'environnement.' }, isLocked: false, bookPageRef: 24 }
    ]
  },
  {
    id: 2,
    title: { ar: 'الأسبوع 2: صب القواعد', en: 'Week 2: Pouring Foundations', fr: 'Semaine 2: Fondations' },
    focus: { ar: 'تثبيت الأساس الجسدي', en: 'Stabilizing physical foundation', fr: 'Stabilisation physique' },
    days: [
      { day: 8, title: { ar: 'صب الخرسانة', en: 'Concrete Pouring', fr: 'Coulage' }, task: { ar: 'ابدأ بروتوكول التغذية الإنشائية؛ صب الوقود الصحيح في محركك.', en: 'Start structural nutrition protocol.', fr: 'Nutrition structurelle.' }, isLocked: true, bookPageRef: 45 },
      { day: 9, title: { ar: 'تدعيم الأعمدة', en: 'Column Reinforcement', fr: 'Renforcement' }, task: { ar: 'تمارين القوة الأساسية؛ الجسد هو الحامل لكل الأفكار.', en: 'Basic strength exercises.', fr: 'Force physique.' }, isLocked: true, bookPageRef: 52 }
    ]
  },
  {
    id: 3,
    title: { ar: 'الأسبوع 3: الهيكل الحديدي', en: 'Week 3: Steel Frame', fr: 'Semaine 3: Structure' },
    focus: { ar: 'بناء الانضباط العقلي', en: 'Building mental discipline', fr: 'Discipline mentale' },
    days: [
      { day: 15, title: { ar: 'عزل الضوضاء', en: 'Acoustic Insulation', fr: 'Isolation' }, task: { ar: 'صيام رقمي كامل لمدة 12 ساعة؛ اعزل عقلك عن المشتتات.', en: '12-hour digital detox.', fr: 'Détox digitale.' }, isLocked: true, bookPageRef: 78 }
    ]
  },
  {
    id: 4,
    title: { ar: 'الأسبوع 4: التشطيب النهائي', en: 'Week 4: Final Finishing', fr: 'Semaine 4: Finitions' },
    focus: { ar: 'التوجيه الروحي والجمال', en: 'Spiritual orientation and beauty', fr: 'Orientation spirituelle' },
    days: [
      { day: 22, title: { ar: 'إضاءة الغرف', en: 'Lighting Rooms', fr: 'Éclairage' }, task: { ar: 'حدد 3 قيم عليا توجه حياتك؛ هذه هي نوافذ الضوء.', en: 'Identify 3 core values.', fr: 'Valeurs fondamentales.' }, isLocked: true, bookPageRef: 110 }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    category: 'mind',
    title: { ar: 'هندسة النوم', en: 'The Architecture of Sleep', fr: 'Architecture du Sommeil' },
    date: '2024-03-20',
    excerpt: { ar: 'كيف تصمم ليلة تعيد بناء خلاياك وتثبت أعمدتك العقلية.', en: 'How to design a night that rebuilds your cells.', fr: 'Concevoir une nuit réparatrice.' },
    content: { ar: '<p>النوم ليس مجرد راحة، بل هو عملية ترميم إنشائية مكثفة تهدف إلى صيانة الذاكرة وترميم الأنسجة العصبية. في هذا المقال، نستعرض مخططاً زمنياً لتجهيز "غرفة المحرك" قبل الإقلاع نحو الأحلام.</p>', en: '<p>Sleep is not merely rest; it is an intensive structural restoration process aimed at maintaining memory and repairing neural tissues. In this entry, we examine a timeline for preparing the "engine room" before taking off into dreams.</p>', fr: '<p>Le sommeil est une restauration structurelle.</p>' },
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2060&auto=format&fit=crop'
  },
  {
    id: 'post-2',
    category: 'body',
    title: { ar: 'قوانين الأحمال النفسية', en: 'Laws of Psychological Loads', fr: 'Lois des charges' },
    date: '2024-03-25',
    excerpt: { ar: 'كيف تتعامل مع الضغوط دون أن ينهار هيكلك الداخلي.', en: 'Handling pressure without internal collapse.', fr: 'Gérer la pression.' },
    content: { ar: '<p>الضغط النفسي يشبه الحمل الميكانيكي على الجسور؛ إذا لم يتم توزيعه بشكل صحيح على الأعمدة (عقلك، جسدك، علاقاتك)، فسيحدث شرخ في أضعف نقطة. تعلم كيف تستخدم "المخمدات الهيكلية" لامتصاص صدمات الحياة.</p>', en: '<p>Stress is like mechanical load on bridges; if not properly distributed across pillars (mind, body, social), a fracture will occur at the weakest point. Learn how to use "structural dampers" to absorb life\'s shocks.</p>', fr: '<p>Le stress est une charge mécanique.</p>' },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'post-3',
    category: 'spirit',
    title: { ar: 'الواجهة الخارجية: هندسة العلاقات', en: 'The Social Facade: Relationship Engineering', fr: 'Façade Sociale' },
    date: '2024-04-02',
    excerpt: { ar: 'كيف تبني حدوداً تحمي هيكلك الداخلي وتسمح بتبادل صحي.', en: 'How to build boundaries that protect your internal structure.', fr: 'Ingénierie des relations.' },
    content: { ar: '<p>العلاقات هي واجهة المبنى؛ هي ما يراه الناس وما يتفاعلون معه. الحدود (Boundaries) ليست جدراناً صماء، بل هي أنظمة حماية ذكية تسمح بدخول "الضوء" وتمنع "التسلل" الذي يستنزف الطاقة الأساسية. في هذا السجل، نحدد مواصفات السياج الأمني لذاتك.</p>', en: '<p>Relationships are the building\'s facade; they are what people see and interact with. Boundaries are not solid walls, but intelligent protection systems that allow "light" in while preventing "intrusion" that drains core energy. In this log, we define the security fence specifications for your self.</p>', fr: '<p>Ingénierie des relations et limites.</p>' },
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'post-4',
    category: 'mind',
    title: { ar: 'ترميم الأعمدة العقلية', en: 'Restoring Cognitive Pillars', fr: 'Restauration Cognitive' },
    date: '2024-04-10',
    excerpt: { ar: 'تقنيات إصلاح شروخ الإجهاد في إطار اتخاذ القرار.', en: 'Techniques for repairing stress fractures in decision-making.', fr: 'Réparation des piliers.' },
    content: { ar: '<p>الضبابية العقلية هي علامة على إجهاد المعادن في أعمدتك العقلية. لاتخاذ قرارات حاسمة، يجب أن يكون الهيكل مستقراً. نستعرض تقنيات "الحقن الخرساني" لتعزيز المنطق وتثبيت الوضوح في أوقات الزلازل الوجودية.</p>', en: '<p>Mental fog is a sign of metal fatigue in your cognitive pillars. To make critical decisions, the structure must be stable. We explore "concrete injection" techniques to reinforce logic and stabilize clarity during existential earthquakes.</p>', fr: '<p>Réparer les piliers mentaux.</p>' },
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop'
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-sos-01',
    author: 'Architect Alpha',
    role: { ar: 'كبير المهندسين', en: 'Master Architect', fr: 'Maître Architecte' },
    rankLevel: 10,
    phase: 'Structure',
    title: { ar: 'تسرب في التركيز العالي', en: 'High Focus Leak Detected', fr: 'Fuite de concentration' },
    content: { ar: 'لاحظت انخفاضاً في عزم التركيز بعد الساعات الست الأولى. هل هناك تعديل في بروتوكول الصيانة؟', en: 'Noticed a drop in focus torque after the first 6 hours. Any adjustments to the maintenance protocol?', fr: 'Baisse de concentration après 6h.' },
    endorsements: 12,
    reviews: [],
    tags: ['Focus', 'Maintenance'],
    timestamp: '2h ago',
    type: 'emergency',
    status: 'approved'
  },
  {
    id: 'post-log-02',
    author: 'Sarah Jenkins',
    role: { ar: 'مهندس أول', en: 'Senior Architect', fr: 'Architecte Senior' },
    rankLevel: 8,
    phase: 'Foundation',
    title: { ar: 'نجاح في صب القواعد الجسدية', en: 'Physical Foundation Pour Successful', fr: 'Fondation Physique Réussie' },
    content: { ar: 'بعد 14 يوماً من الالتزام ببروتوكول النوم 10-3-2-1، انخفض معدل ضربات القلب أثناء الراحة بمقدار 15 نقطة. الهيكل أصبح أكثر ثباتاً.', en: 'After 14 days of adhering to the 10-3-2-1 sleep protocol, my resting HR dropped by 15 points. The structure is feeling significantly more stable.', fr: 'Sommeil amélioré, structure stable.' },
    endorsements: 24,
    reviews: [],
    tags: ['Sleep', 'Success'],
    timestamp: '5h ago',
    type: 'standard',
    status: 'approved'
  },
  {
    id: 'post-share-03',
    author: 'David Chen',
    role: { ar: 'مهندس ميداني', en: 'Field Architect', fr: 'Architecte de Terrain' },
    rankLevel: 5,
    phase: 'Interiors',
    title: { ar: 'مشاركة مخطط: عزل العلاقات السامة', en: 'Blueprint Share: Toxic Relationship Isolation', fr: 'Plan: Isolation Toxique' },
    content: { ar: 'قمت بتصميم نظام "صمامات أحادية الاتجاه" للتواصل مع المحيط السام؛ يسمح بخروج المعلومات الضرورية ويمنع دخول الطاقة السلبية.', en: 'Designed a "one-way valve" communication system for toxic environments; allows necessary info out while blocking negative inflow.', fr: 'Système d\'isolation énergétique.' },
    endorsements: 45,
    reviews: [],
    tags: ['Boundaries', 'Blueprint'],
    timestamp: 'Yesterday',
    type: 'standard',
    status: 'approved'
  },
  {
    id: 'post-sos-04',
    author: 'Marcus Aurel',
    role: { ar: 'متدرب بناء', en: 'Builder Apprentice', fr: 'Apprenti Bâtisseur' },
    rankLevel: 2,
    phase: 'Demolition',
    title: { ar: 'تحذير من إجهاد مادي في عمود الإرادة', en: 'Warning: Material Fatigue in Willpower Column', fr: 'Fatigue du Pilier Volonté' },
    content: { ar: 'أواجه صعوبة في هدم العادات الغذائية القديمة. يبدو أن عمود الإرادة لدي يظهر علامات تصدع مبكرة تحت الضغط.', en: 'Struggling with demolishing old dietary habits. My willpower column is showing early signs of fracture under pressure.', fr: 'Difficulté de démolition.' },
    endorsements: 8,
    reviews: [],
    tags: ['Willpower', 'Crisis'],
    timestamp: '1d ago',
    type: 'emergency',
    status: 'approved'
  }
];

export const LANDING_CONTENT = {
  header: {
    left: { ar: 'عمارة الإنسان', en: 'HUMAN ARCHITECTURE' },
    right: { ar: 'العودة للمقر', en: 'BACK TO HQ' },
    join: { ar: 'انضم للنقابة', en: 'JOIN THE GUILD' }
  },
  warning: { ar: 'تحذير: هذا ليس تطوير ذات تقليدي', en: 'WARNING: NOT TRADITIONAL SELF-HELP' },
  hero: {
    headline: { ar: 'توقف عن ترميم الشقوق.\nأعد صب الأساسات.', en: 'Stop Fixing Cracks.\nRe-Pour The Foundation.' },
    subheadline: { ar: 'النظام الهندسي الوحيد الذي يعيد هيكلة عقلك، جسدك، وروحك باستخدام بروتوكولات العمارة البشرية.', en: 'The only engineering-grade system to restructure your mind, body, and soul using Human Architecture protocols.' },
    support: { ar: 'مدعوم بمبادئ الهندسة الإنشائية', en: 'BACKED BY STRUCTURAL ENGINEERING PRINCIPLES' },
    videoLabel: { ar: 'شاهد العرض الهندسي', en: 'WATCH THE ARCHITECTURAL PRESENTATION' },
    videoDuration: { ar: 'المدة: 03:45', en: 'Duration: 03:45' },
    cta: { ar: 'أريد إعادة بناء حياتي الآن', en: 'I WANT TO REBUILD MY LIFE NOW' },
    guarantee: { ar: 'ضمان استرجاع 100%', en: '100% MONEY BACK GUARANTEE' }
  },
  problem: {
    headline: { ar: 'أنت تحاول "تزيين" مبنى ينهار.', en: 'You Are Decorating a\nCollapsing Building.' },
    body: { ar: 'التفكير الإيجابي والتوكيدات مثل طلاء الجدران في منزل أساساته متآكلة.', en: 'Positive thinking and affirmations are like painting the walls of a house with a rotting foundation.' },
    emphasis: { ar: 'إذا لم تصلح الأساس، فكل ما تبنيه فوقه سيزيد من سرعة الانهيار.', en: 'If you do not fix the foundation, everything you build on top only accelerates the collapse.' }
  },
  failure: {
    headline: { ar: 'لماذا تفشل التنمية البشرية؟', en: 'Why Traditional Self-Help Fails' },
    bullets: [
      { ar: 'تعالج الأعراض وليس الجذور', en: 'Treats symptoms, not roots' },
      { ar: 'تعتمد على التحفيز اللحظي', en: 'Relies on temporary motivation' },
      { ar: 'تفتقر للمخطط الإنشائي', en: 'Lacks a structural blueprint' }
    ],
    closing: { ar: 'أنت لا تحتاج لتحفيز، أنت تحتاج لهندسة.', en: 'You don\'t need motivation. You need engineering.' }
  },
  solution: {
    headline: { ar: 'الحل: عمارة الإنسان', en: 'The Solution: Human Architecture' },
    body: { ar: 'تطبيق قوانين الفيزياء والهندسة على الكيان البشري لتحقيق استقرار إنشائي حقيقي.', en: 'Applying laws of physics and engineering to the human entity for true structural stability.' }
  },
  pillars: {
    title: { ar: 'الأعمدة الأربعة للاستقرار', en: 'The 4 Pillars of Stability' },
    items: [
      { title: { ar: 'العقل', en: 'The Mind' }, desc: { ar: 'غرفة التحكم', en: 'Control Room' } },
      { title: { ar: 'الجسد', en: 'The Body' }, desc: { ar: 'الأساسات', en: 'Foundations' } },
      { title: { ar: 'الروح', en: 'The Spirit' }, desc: { ar: 'التصميم الداخلي', en: 'Interiors' } },
      { title: { ar: 'العلاقات', en: 'Social' }, desc: { ar: 'الواجهة', en: 'Facade' } }
    ],
    insight: { ar: 'انهيار عمود واحد يهدد سلامة الهيكل بالكامل.', en: 'The collapse of one pillar threatens the integrity of the entire structure.' }
  },
  journey: {
    title: { ar: 'خارطة الطريق الإنشائية', en: 'The Structural Roadmap' },
    intro: { ar: 'من التشخيص إلى التسليم النهائي.', en: 'From diagnosis to final delivery.' },
    steps: [
      { step: '01', name: { ar: 'التشخيص', en: 'Diagnosis' }, product: { ar: 'اختبار الإجهاد', en: 'Stress Test' }, purpose: { ar: 'تحديد الكسور', en: 'Identify Cracks' }, why: { ar: 'لا يمكن البدء دون مسح الموقع.', en: 'Cannot start without a site survey.' }, outcome: { ar: 'تقرير الحالة الإنشائية', en: 'Integrity Report' } }
    ]
  },
  testimonials: {
    headline: { ar: 'تقارير الميدان من البنائين', en: 'FIELD REPORTS FROM BUILDERS' },
    list: [
      { id: 'R-101', name: { ar: 'أحمد م.', en: 'Ahmed M.' }, before: { ar: 'إرهاق مزمن', en: 'Chronic Fatigue' }, after: { ar: 'طاقة مستقرة', en: 'Stable Energy' }, status: { ar: 'تم الترميم', en: 'Restored' } }
    ]
  },
  stack: {
    headline: { ar: 'ماذا تتضمن حزمة الترسانة؟', en: 'The Arsenal Stack' },
    items: [
      { name: { ar: 'كتاب المخطط', en: 'The Blueprint Book' }, desc: { ar: 'الدليل الهندسي الكامل.', en: 'The complete engineering guide.' } }
    ]
  },
  faq: {
    headline: { ar: 'المواصفات الفنية (الأسئلة)', en: 'Technical Specifications (FAQ)' },
    items: [
      { q: { ar: 'هل أحتاج لخبرة هندسية؟', en: 'Do I need engineering experience?' }, a: { ar: 'لا، المبادئ مشروحة ببساطة للتطبيق الشخصي.', en: 'No, principles are explained simply for personal application.' } }
    ]
  },
  qualifiers: {
    forYou: { title: { ar: 'هذا النظام لك إذا:', en: 'This is for you if:' }, items: [{ ar: 'تريد نتائج قابلة للقياس', en: 'You want measurable results' }] },
    notForYou: { title: { ar: 'هذا النظام ليس لك إذا:', en: 'Not for you if:' }, items: [{ ar: 'تبحث عن حلول سحرية سريعة', en: 'Looking for quick magic fixes' }] }
  }
};

export const RESTORATION_LOGS = [
    {
        id: 'LOG-001',
        name: { ar: 'محمد ع.', en: 'Mohamed A.', fr: 'Mohamed A.' },
        role: { ar: 'مهندس برمجيات', en: 'Software Engineer', fr: 'Ingénieur' },
        status: { ar: 'تم الترميم', en: 'Restored', fr: 'Restauré' },
        report: { ar: 'كنت أعتقد أن التعب هو ضريبة النجاح. اكتشفت أنه مجرد سوء تصميم لليوم.', en: 'I thought fatigue was the tax of success. Discovered it was just bad design of the day.', fr: 'Mauvaise conception.' }
    }
];

export const PHASES = [
    {
        id: '01',
        title: { ar: 'مسح الموقع', en: 'Site Survey', fr: 'Enquête sur site' },
        desc: { ar: 'تحليل التربة النفسية واكتشاف التصدعات المخفية.', en: 'Analyzing psychological soil and detecting hidden fractures.', fr: 'Analyse du sol.' },
        suffix: { ar: 'Ref: Specs-01', en: 'Ref: Specs-01' }
    }
];

export const REPAIR_PROTOCOLS = {
    [AssessmentCategory.FOUNDATION]: {
        severity: { ar: 'تصدع في القواعد', en: 'Foundation Cracks', fr: 'Fissures de fondation' },
        prescription: { ar: 'الجسد هو الأرضية التي تحمل المبنى. أنت بحاجة لتدعيم الخرسانة فوراً.', en: 'The body is the bedrock. Immediate concrete reinforcement required.', fr: 'Le corps est le socle. Renforcement immédiat.' },
        action: { ar: 'تطبيق بروتوكول النوم 10-3-2-1.', en: 'Deploy 10-3-2-1 Sleep Protocol.', fr: 'Déployer le protocole de sommeil 10-3-2-1.' },
        ref: 'Spec: Chapter 04'
    },
    [AssessmentCategory.STRUCTURE]: {
        severity: { ar: 'إجهاد في الأعمدة', en: 'Column Fatigue', fr: 'Fatigue des colonnes' },
        prescription: { ar: 'الأعمدة العقلية تحت ضغط عالٍ. خطر الانهيار الوشيك.', en: 'Cognitive load exceeds capacity. Imminent risk of collapse.', fr: 'La charge cognitive dépasse la capacité.' },
        action: { ar: 'تفعيل نظام "عزل الضوضاء".', en: 'Activate Noise Insulation Systems.', fr: 'Activer l\'isolation phonique.' },
        ref: 'Spec: Chapter 05'
    },
    [AssessmentCategory.INTERIOR]: {
        severity: { ar: 'عتمة داخلية', en: 'Interior Void', fr: 'Vide intérieur' },
        prescription: { ar: 'النظام الروحي معطل. الضوء لا يدخل.', en: 'Spiritual HVAC malfunction. Lack of light causing internal decay.', fr: 'Dysfonctionnement spirituel. Manque de lumière.' },
        action: { ar: 'فتح "منافذ المعنى" يومياً.', en: 'Open Meaning Vents daily.', fr: 'Ouvrir les évents de sens.' },
        ref: 'Spec: Chapter 07'
    },
    [AssessmentCategory.EXTERIOR]: {
        severity: { ar: 'واجهة متآكلة', en: 'Facade Erosion', fr: 'Érosion de façade' },
        prescription: { ar: 'الحدود الخارجية متهالكة.', en: 'Perimeter fence compromised. Unauthorized entry detected.', fr: 'Clôture compromise. Entrée non autorisée.' },
        action: { ar: 'إعادة رسم حدود الملكية.', en: 'Reinforce Perimeter Walls.', fr: 'Renforcer les murs périmétriques.' },
        ref: 'Spec: Chapter 08'
    }
};
