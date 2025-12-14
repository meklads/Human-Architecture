
import { PillarData, BlogPost, Product, WeekPlan, BookChapterPreview, DayPlan, AssessmentCategory, CommunityPost } from './types';

export const TRANSLATIONS = {
  nav: {
    home: { ar: 'الرئيسية', en: 'Headquarters', fr: 'QG' },
    philosophy: { ar: 'الكود الهندسي', en: 'The Code', fr: 'Le Code' },
    library: { ar: 'المتجر', en: 'Supply Store', fr: 'Magasin' },
    journal: { ar: 'سجل الموقع', en: 'Site Log', fr: 'Journal' },
    architect: { ar: 'عن المعماري', en: 'The Architect', fr: "L'Architecte" },
    contact: { ar: 'مكتب الاستشارات', en: 'Consultancy', fr: 'Consultation' },
    community: { ar: 'نقابة البنائين', en: 'Builders Guild', fr: 'Guilde' }
  },
  hero: {
    line1: { ar: 'أنت لا تعاني من نقص في الإرادة...', en: 'You do not lack willpower...', fr: 'Vous ne manquez pas de volonté...' },
    line2: { ar: 'أنت تعاني من فشل إنشائي.', en: 'You have a structural failure.', fr: 'Vous avez une défaillance structurelle.' },
    cta: { ar: 'استلام المخطط التنفيذي', en: 'Acquire The Blueprint', fr: 'Obtenir le Plan' },
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

export const LANDING_CONTENT = {
  hero: {
    headline: { ar: 'حياتك ليست عشوائية. إنها مشروع هندسي.', en: 'Your Life is Not Random. It is an Engineering Project.', fr: 'Votre vie n\'est pas un hasard.' },
    subheadline: { 
      ar: 'أوقف محاولات "إصلاح الذات" العشوائية. ابدأ في تطبيق منهجية (IHAM™) لإعادة البناء من القواعد.', 
      en: 'Stop random "self-improvement." Start applying the IHAM™ protocol to rebuild from the foundation up.',
      fr: 'Arrêtez l\'auto-amélioration aléatoire.'
    },
    badge: { ar: 'النظام الهندسي المتكامل', en: 'The Integrated System', fr: 'Le Système Intégré' }
  },
  problem: {
    title: { ar: 'لماذا تنهار ناطحات السحاب البشرية؟', en: 'Why Human Skyscrapers Collapse', fr: 'Pourquoi les gratte-ciel humains s\'effondrent' },
    text: { 
      ar: 'أنت تحاول بناء ناطحة سحاب (طموحاتك) على أساسات كوخ خشبي (عاداتك). هذا ليس خطأ في الشخصية، إنه خطأ في التصميم.', 
      en: 'You are trying to build a skyscraper (your ambitions) on the foundation of a wooden shack (your habits). This is not a character flaw. It is a design error.',
      fr: 'Ce n\'est pas un défaut de caractère. C\'est une erreur de conception.'
    }
  },
  bundles: {
    title: { ar: 'اختر أدوات البناء', en: 'Select Your Tools', fr: 'Sélectionnez vos outils' },
    guarantee: { ar: 'ضمان الجودة الهندسية', en: 'Structural Integrity Guarantee', fr: 'Garantie d\'intégrité' }
  }
};

export const REPAIR_PROTOCOLS = {
    [AssessmentCategory.FOUNDATION]: {
        severity: { ar: 'تصدع في القواعد', en: 'Foundation Cracks' },
        prescription: { 
            ar: 'الجسد هو الأرضية التي تحمل المبنى. أنت بحاجة لتدعيم الخرسانة فوراً.', 
            en: 'The body is the bedrock. Immediate concrete reinforcement required.' 
        },
        action: { ar: 'تطبيق بروتوكول النوم 10-3-2-1.', en: 'Deploy 10-3-2-1 Sleep Protocol.' },
        ref: 'Spec: Chapter 04'
    },
    [AssessmentCategory.STRUCTURE]: {
        severity: { ar: 'إجهاد في الأعمدة', en: 'Column Fatigue' },
        prescription: { 
            ar: 'الأعمدة العقلية تحت ضغط عالٍ. خطر الانهيار الوشيك بسبب الأحمال الزائدة.', 
            en: 'Cognitive load exceeds capacity. Imminent risk of collapse.' 
        },
        action: { ar: 'تفعيل نظام "عزل الضوضاء".', en: 'Activate Noise Insulation Systems.' },
        ref: 'Spec: Chapter 05'
    },
    [AssessmentCategory.INTERIOR]: {
        severity: { ar: 'عتمة داخلية', en: 'Interior Void' },
        prescription: { 
            ar: 'النظام الروحي معطل. الضوء لا يدخل، مما يسبب العفن في الغرف الداخلية.', 
            en: 'Spiritual HVAC malfunction. Lack of light causing internal decay.' 
        },
        action: { ar: 'فتح "منافذ المعنى" يومياً.', en: 'Open Meaning Vents daily.' },
        ref: 'Spec: Chapter 07'
    },
    [AssessmentCategory.EXTERIOR]: {
        severity: { ar: 'واجهة متآكلة', en: 'Facade Erosion' },
        prescription: { 
            ar: 'الحدود الخارجية متهالكة، مما يسمح للمتطفلين بتخريب الموقع.', 
            en: 'Perimeter fence compromised. Unauthorized entry detected.' 
        },
        action: { ar: 'إعادة رسم حدود الملكية.', en: 'Reinforce Perimeter Walls.' },
        ref: 'Spec: Chapter 08'
    }
};

export const PILLARS: PillarData[] = [
  {
    id: 'mind',
    title: { ar: 'غرفة التحكم (العقل)', en: 'Control Room (Mind)', fr: 'Salle de Contrôle' },
    channelId: 'SECTOR-A',
    description: { 
      ar: 'إعادة برمجة أنظمة التشغيل العقلية.', 
      en: 'Reprogramming cognitive operating systems.', 
      fr: 'Reprogrammation cognitive.' 
    },
    // Updated Image: Tech/Abstract
    image: 'https://images.unsplash.com/photo-1555679427-1f6dfcce943b?auto=format&fit=crop&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80'
  },
  {
    id: 'body',
    title: { ar: 'الأساسات (الجسد)', en: 'Foundation (Body)', fr: 'Fondation' },
    channelId: 'SECTOR-B',
    description: { 
      ar: 'صب القواعد الخرسانية للطاقة الحيوية.', 
      en: 'Pouring concrete bases for bio-energy.', 
      fr: 'Coulage des bases.' 
    },
    // Updated Image: Concrete/Strength
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1534970028765-38ce47ef7d8d?auto=format&fit=crop&q=80'
  },
  {
    id: 'spirit',
    title: { ar: 'التصميم الداخلي (الروح)', en: 'Interiors (Spirit)', fr: 'Intérieurs' },
    channelId: 'SECTOR-C',
    description: { 
      ar: 'توجيه المبنى نحو الشمال الحقيقي.', 
      en: 'Orienting the structure to True North.', 
      fr: 'Orientation vers le Nord.' 
    },
    // Updated Image: Interior/Light
    image: 'https://images.unsplash.com/photo-1507643179173-617d67456fd3?auto=format&fit=crop&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80'
  },
  {
    id: 'social',
    title: { ar: 'الواجهة (العلاقات)', en: 'Facade (Social)', fr: 'Façade' },
    channelId: 'SECTOR-D',
    description: { 
      ar: 'أنظمة الحماية والاتصال بالعالم الخارجي.', 
      en: 'Protection systems and external interfaces.', 
      fr: 'Systèmes de protection.' 
    },
    // Updated Image: Facade/Glass
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80'
  }
];

export const PHASES = [
    {
        id: '01',
        title: { ar: 'مسح الموقع', en: 'Site Survey', fr: 'Enquête sur site' },
        desc: { 
            ar: 'تحليل التربة النفسية واكتشاف التصدعات المخفية.',
            en: 'Analyzing psychological soil and detecting hidden fractures.',
            fr: 'Analyse du sol.'
        },
        ref: 'Specs: 01-03'
    },
    {
        id: '02',
        title: { ar: 'الهدم والإزالة', en: 'Demolition', fr: 'Démolition' },
        desc: { 
            ar: 'إزالة المعتقدات القديمة التي لا يمكن البناء عليها.',
            en: 'Removing obsolete beliefs that cannot support new load.',
            fr: 'Suppression des croyances.'
        },
        ref: 'Specs: 04-06'
    },
    {
        id: '03',
        title: { ar: 'الإنشاءات', en: 'Construction', fr: 'Construction' },
        desc: { 
            ar: 'تركيب الأعمدة الأربعة وفقاً للمخطط الجديد.',
            en: 'Installing the four pillars according to the new blueprint.',
            fr: 'Installation des piliers.'
        },
        ref: 'Specs: 07-10'
    }
];

export const PRODUCTS: Product[] = [
  {
    id: 'bundle_master',
    category: 'bundle',
    name: { ar: 'حزمة المهندس المعماري (شاملة)', en: 'The Master Architect Bundle', fr: 'Le Pack Architecte' },
    description: { 
      ar: 'النظام المتكامل: الكتاب (النظرية) + الوورك بوك (التنفيذ) + البرنامج الرقمي (التسريع).', 
      en: 'The Complete System: The Book (Theory) + The Workbook (Execution) + The 30-Day Digital Accelerator.',
      fr: 'Le système complet.' 
    },
    price: 67, 
    originalPrice: 99,
    type: 'hybrid',
    // Updated Image: Books/Plans
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
    status: 'available',
    isBestSeller: true,
    features: [
        { ar: 'كتاب "عمارة الإنسان" (غلاف مقوى)', en: 'The Human Architecture Book (Hardcover)', fr: 'Livre relié' },
        { ar: 'الوورك بوك التنفيذي "سجل الموقع" (نسخة ورقية)', en: 'The "Site Log" Workbook (Physical)', fr: 'Cahier d\'exercices' },
        { ar: 'دخول حصري لبرنامج الـ 30 يوماً الرقمي', en: 'Exclusive Access to 30-Day Digital Accelerator', fr: 'Accès numérique' },
        { ar: 'بطاقات المهام اليومية (PDF)', en: 'Daily Task Cards (PDF)', fr: 'Cartes de tâches' }
    ]
  },
  {
    id: 'book_only',
    category: 'book',
    name: { ar: 'المخطط فقط (الكتاب)', en: 'The Blueprint Only (Book)', fr: 'Le Livre Seul' },
    description: { 
      ar: 'المواصفات الفنية والنظرية الكاملة. (بدون أدوات التنفيذ).', 
      en: 'Complete technical specifications and theory. (Execution tools not included).',
      fr: 'Spécifications techniques.' 
    },
    price: 35,
    originalPrice: 45,
    type: 'physical',
    // Updated Image: Single Book
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
    status: 'available',
    features: [
        { ar: 'كتاب "عمارة الإنسان" (غلاف مقوى)', en: 'The Human Architecture Book (Hardcover)', fr: 'Livre relié' },
        { ar: 'نسخة رقمية (E-Book)', en: 'Digital Copy (E-Book)', fr: 'E-Book' }
    ]
  },
  {
    id: 'kit_cards_30',
    category: 'tool',
    name: { ar: 'مجموعة بطاقات ٣٠ يوماً', en: '30-Day Card Deck', fr: 'Jeu de 30 Jours' },
    description: {
        ar: 'مجموعة بطاقات عملية لكل يوم من البرنامج.',
        en: 'A practical deck of cards for each day of the program.',
        fr: 'Jeu de cartes pratique.'
    },
    price: 15,
    type: 'physical',
    // Updated Image: Cards/Hands
    image: 'https://images.unsplash.com/photo-1621360841016-0e9f4e245648?auto=format&fit=crop&q=80',
    status: 'available'
  }
];

export const BOOK_CHAPTERS: BookChapterPreview[] = [
    { 
        id: 'c1', 
        number: '01', 
        title: { ar: 'فيزياء الانهيار', en: 'The Physics of Collapse', fr: 'Physique de l\'Effondrement' }, 
        desc: { ar: 'تحليل ميكانيكي للفشل البشري.', en: 'Mechanical analysis of human failure.', fr: 'Analyse mécanique.' }, 
        isLocked: false
    },
    { 
        id: 'c2', 
        number: '02', 
        title: { ar: 'المسح الطبوغرافي', en: 'Topographical Survey', fr: 'Levé Topographique' }, 
        desc: { ar: 'رسم خريطة الذات الحالية.', en: 'Mapping the current self.', fr: 'Cartographie de soi.' }, 
        isLocked: false
    },
    { 
        id: 'c3', 
        number: '03', 
        title: { ar: 'قانون الأحمال', en: 'Load Bearing Laws', fr: 'Lois de Charge' }, 
        desc: { ar: 'كيفية توزيع الضغط النفسي.', en: 'Distributing psychological pressure.', fr: 'Distribution de pression.' }, 
        isLocked: true
    }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    category: 'mind',
    title: { ar: 'لماذا تفشل الحلول السطحية؟', en: 'Why Surface Solutions Fail', fr: 'Pourquoi les solutions superficielles échouent' },
    date: 'OCT 12, 2024',
    excerpt: { 
      ar: 'محاولة إصلاح التفكير بإيجابية زائفة تشبه طلاء جدار متصدع. الحل في ترميم الأساس.', 
      en: 'Trying to fix thinking with toxic positivity is like painting a cracked wall. The solution is foundation repair.',
      fr: 'Réparer la pensée.' 
    },
    content: {
        ar: '<p>المحتوى الكامل هنا...</p>',
        en: '<p>Full content here...</p>',
        fr: '<p>Contenu complet...</p>'
    },
    // Updated Image: Surface/Wall
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    category: 'body',
    title: { ar: 'هندسة النوم', en: 'The Architecture of Sleep', fr: 'L\'architecture du sommeil' },
    date: 'OCT 20, 2024',
    excerpt: { 
      ar: 'النوم ليس توقفاً عن العمل، بل هو وقت صيانة الهيكل الخرساني للجسد.', 
      en: 'Sleep is not stopping work, it is maintenance time for the body\'s concrete structure.',
      fr: 'Le sommeil est maintenance.' 
    },
    content: {
        ar: '<p>المحتوى الكامل هنا...</p>',
        en: '<p>Full content here...</p>',
        fr: '<p>Contenu complet...</p>'
    },
    // Updated Image: Rest/Structure
    image: 'https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&q=80'
  }
];

export const THEORY_CARDS: DayPlan[] = [
    {
        day: 1,
        title: { ar: 'قانون الجاذبية النفسية', en: 'Law of Psych-Gravity', fr: 'Loi de la Gravité' },
        task: { ar: 'ما تقاومه يزداد ثقلاً. تعلم فن تحويل الأحمال بدلاً من حملها.', en: 'What you resist persists. Learn to distribute loads instead of carrying them.', fr: 'Ce que vous résistez persiste.' },
        visualConcept: { ar: 'الرافعة', en: 'The Lever', fr: 'Le Levier' },
        isLocked: false
    }
];

export const THIRTY_DAY_PROGRAM: WeekPlan[] = [
    {
        id: 1,
        title: { ar: 'الأساسات', en: 'Foundation', fr: 'Fondation' },
        focus: { ar: 'الترميم الجسدي', en: 'Physical Restoration', fr: 'Restauration Physique' },
        days: [
            {
                day: 1,
                title: { ar: 'فحص التربة', en: 'Soil Testing', fr: 'Test de Sol' },
                task: { ar: 'سجل كل مدخلاتك اليوم (طعام، معلومات، محادثات).', en: 'Log all inputs today (food, info, chats).', fr: 'Enregistrez tout.' },
                visualConcept: { ar: 'المصفاة', en: 'The Sieve', fr: 'Le Tamis' },
                isLocked: false
            },
            {
                day: 2,
                title: { ar: 'صب الخرسانة', en: 'Pouring Concrete', fr: 'Béton' },
                task: { ar: 'تطبيق بروتوكول النوم بدقة.', en: 'Strict sleep protocol.', fr: 'Sommeil strict.' },
                isLocked: true
            }
        ]
    }
];

export const TOP_BUILDERS = [
    { id: 'u1', name: 'Sarah A.', rank: { ar: 'مهندس أول', en: 'Senior Architect', fr: 'Architecte Senior' }, projectsCompleted: 12, avatarChar: 'S' },
    { id: 'u2', name: 'Karim M.', rank: { ar: 'بناء محترف', en: 'Pro Builder', fr: 'Bâtisseur Pro' }, projectsCompleted: 8, avatarChar: 'K' },
    { id: 'u3', name: 'Lina K.', rank: { ar: 'بناء', en: 'Builder', fr: 'Bâtisseur' }, projectsCompleted: 5, avatarChar: 'L' }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
    {
        id: 'p1',
        author: 'Ahmed Z.',
        role: { ar: 'بناء', en: 'Builder', fr: 'Bâtisseur' },
        rankLevel: 1,
        phase: 'Foundation',
        title: { ar: 'اكتشاف شروخ في روتين الصباح', en: 'Found cracks in morning routine', fr: 'Fissures matinales' },
        content: { ar: 'حاولت البناء على أساسات هشة، والآن أعيد الصب.', en: 'Tried building on weak foundations, now repouring.', fr: 'Refaire les fondations.' },
        endorsements: 12,
        reviews: [],
        tags: ['Foundation'],
        timestamp: '2h ago',
        type: 'standard'
    },
    {
        id: 'p2',
        author: 'Mona L.',
        role: { ar: 'مهندس مبتدئ', en: 'Novice', fr: 'Novice' },
        rankLevel: 0,
        phase: 'Structure',
        title: { ar: 'انهيار كامل في جدار التركيز', en: 'Total collapse of focus wall', fr: 'Effondrement' },
        content: { ar: 'أواجه صعوبة في تثبيت عمود "العمل العميق". كلما بدأت، تنهار القلعة بسبب المقاطعات. أحتاج لدعم هندسي عاجل.', en: 'Struggling to fix the Deep Work pillar. Need urgent structural advice.', fr: 'Besoin d\'aide.' },
        endorsements: 5,
        reviews: [],
        tags: ['Focus', 'Structure'],
        timestamp: '15m ago',
        type: 'emergency',
        isSolved: false
    }
];

export const RESTORATION_LOGS = [
    {
        id: 'LOG-001',
        name: { ar: 'محمد ع.', en: 'Mohamed A.', fr: 'Mohamed A.' },
        role: { ar: 'مهندس برمجيات', en: 'Software Engineer', fr: 'Ingénieur' },
        status: { ar: 'تم الترميم', en: 'Restored', fr: 'Restauré' },
        report: { 
            ar: 'كنت أعتقد أن التعب هو "ضريبة النجاح". اكتشفت أنه مجرد "سوء تصميم" لليوم.', 
            en: 'I thought fatigue was the "tax of success". Discovered it was just "bad design" of the day.',
            fr: 'Mauvaise conception.' 
        }
    },
    {
        id: 'LOG-002',
        name: { ar: 'نور س.', en: 'Nour S.', fr: 'Nour S.' },
        role: { ar: 'طبيبة', en: 'Doctor', fr: 'Médecin' },
        status: { ar: 'تحت الإنشاء', en: 'Under Construction', fr: 'En Construction' },
        report: { 
            ar: 'بدأت للتو في مرحلة الهدم. إزالة التوقعات القديمة مؤلمة لكنها ضرورية.', 
            en: 'Just started demolition phase. Removing old expectations is painful but necessary.',
            fr: 'Démolition en cours.' 
        }
    }
];
