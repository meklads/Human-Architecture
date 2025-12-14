
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

export const ABOUT_CONTENT = {
    title: { ar: 'المعماري', en: 'The Architect', fr: 'L\'Architecte' },
    name: { ar: 'أبراهام مقلد', en: 'Abraham Meklad', fr: 'Abraham Meklad' },
    titles: { ar: 'معماري | فنان بصري | CEO Graphics House', en: 'Architect | Visual Artist | CEO Graphics House', fr: 'Architecte | Artiste | CEO Graphics House' },
    bio: {
        ar: 'مهندس معماري وفنان متعدد التخصصات، يشغل منصب رئيس مجلس إدارة "جرافيكس هاوس". يجمع أبراهام بين دقة الخطوط الهندسية وعمق الرؤية الفنية. لا يرى العالم كمجموعة من الأشكال، بل كنظم وعلاقات إنشائية. قضى سنوات في دراسة كيف يمكن للفلسفة المعمارية أن تُطبق على النفس البشرية، مؤمناً بأن الإنسان هو أعقد وأقدس بنيان على وجه الأرض.',
        en: 'Architect, multidisciplinary artist, and CEO of Graphics House. Abraham combines the precision of engineering lines with the depth of artistic vision. He does not see the world as shapes, but as systems and structural relationships. He has spent years studying how architectural philosophy applies to the human psyche, believing that the human being is the most complex and sacred structure on earth.',
        fr: 'Architecte et artiste multidisciplinaire, CEO de Graphics House.'
    },
    philosophyTitle: { ar: 'عن المشروع: لماذا "عمارة الإنسان"؟', en: 'The Project: Why Human Architecture?', fr: 'Pourquoi?' },
    philosophy: {
        ar: 'هذا المشروع ليس مجرد موقع إلكتروني، ولا هو دورة في التنمية البشرية التقليدية. إنه "مخطط تنفيذي" لإعادة الهيكلة. نحن نعيش في عالم يحاول ترميم "المظهر" (الواجهة)، بينما تتآكل "الأساسات" في صمت. "عمارة الإنسان" هي دعوة للعودة إلى المبادئ الإنشائية الأولى: المتانة، المنفعة، والجمال. نحن نساعدك على التحول من ساكن عشوائي في جسدك، إلى المهندس المسؤول عن صيانته وتطويره، طوبة تلو الأخرى.',
        en: 'This project is not just a website, nor traditional self-help. It is an "Execution Blueprint" for restructuring. We live in a world fixing the "facade" while foundations erode in silence. "Human Architecture" is a call to return to first structural principles: Firmitas, Utilitas, Venustas. We shift you from a random occupant of your body to the Lead Architect responsible for its maintenance and development, brick by brick.',
        fr: 'Ce projet est un plan d\'exécution pour la restructuration.'
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
    // Abstract Mind/Structure - Tech/Abstract
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80',
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
    // UPDATED: Sculpture/Torso to represent "Human as Structure" (Replaces Girl)
    image: 'https://images.unsplash.com/photo-1563409257650-77990b793710?auto=format&fit=crop&q=80',
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
    // UPDATED: Reliable Interior Light
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
    // Facade - Modern Architecture
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

// NOTE: Replace these placeholder tasks with your specific book content!
export const THIRTY_DAY_PROGRAM: WeekPlan[] = [
    {
        id: 1,
        title: { ar: 'المرحلة 1: الأساسات', en: 'Phase 1: Foundation', fr: 'Fondation' },
        focus: { ar: 'الترميم الجسدي', en: 'Physical Restoration', fr: 'Restauration Physique' },
        days: [
            {
                day: 1,
                title: { ar: 'فحص التربة', en: 'Soil Testing', fr: 'Test de Sol' },
                task: { ar: 'سجل كل مدخلاتك اليوم (طعام، معلومات، محادثات).', en: 'Log all inputs today (food, info, chats).', fr: 'Enregistrez tout.' },
                visualConcept: { ar: 'المصفاة', en: 'The Sieve', fr: 'Le Tamis' },
                isLocked: false,
                bookPageRef: 24 
            },
            {
                day: 2,
                title: { ar: 'صب الخرسانة', en: 'Pouring Concrete', fr: 'Béton' },
                task: { ar: 'تطبيق بروتوكول النوم بدقة (قاعدة 10-3-2-1).', en: 'Strict sleep protocol (10-3-2-1 rule).', fr: 'Sommeil strict.' },
                isLocked: true,
                bookPageRef: 32
            },
            {
                day: 3,
                title: { ar: 'حديد التسليح', en: 'Reinforcement', fr: 'Renforcement' },
                task: { ar: 'رفع نسبة الماء وحذف السكريات المكررة.', en: 'Increase hydration, remove refined sugars.', fr: 'Hydratation.' },
                isLocked: true,
                bookPageRef: 38
            },
            {
                day: 4,
                title: { ar: 'اختبار الأحمال', en: 'Load Bearing', fr: 'Charge' },
                task: { ar: 'حركة بدنية لمدة 20 دقيقة (مشي أو تمارين مقاومة).', en: '20 min physical load (walk or resistance).', fr: 'Mouvement.' },
                isLocked: true,
                bookPageRef: 45
            },
            {
                day: 5,
                title: { ar: 'عزل الاهتزازات', en: 'Vibration Control', fr: 'Vibrations' },
                task: { ar: 'صيام رقمي لمدة 3 ساعات قبل النوم.', en: 'Digital fast 3 hours before bed.', fr: 'Jeûne numérique.' },
                isLocked: true,
                bookPageRef: 51
            },
            {
                day: 6,
                title: { ar: 'زمن التصلب', en: 'Curing Time', fr: 'Temps de Prise' },
                task: { ar: 'يوم راحة نشطة (تأمل أو قراءة خفيفة).', en: 'Active rest day (meditation or light reading).', fr: 'Repos actif.' },
                isLocked: true,
                bookPageRef: 58
            },
            {
                day: 7,
                title: { ar: 'فحص المتانة', en: 'Integrity Audit', fr: 'Audit' },
                task: { ar: 'مراجعة الأسبوع وتعديل المخطط للأسبوع القادم.', en: 'Review the week and adjust blueprint.', fr: 'Revue.' },
                isLocked: true,
                bookPageRef: 65
            }
        ]
    },
    {
        id: 2,
        title: { ar: 'المرحلة 2: الهيكل', en: 'Phase 2: Structure', fr: 'Structure' },
        focus: { ar: 'النظام العقلي', en: 'Mental Framework', fr: 'Cadre Mental' },
        days: [
            {
                day: 8,
                title: { ar: 'رسم المخطط', en: 'The Blueprint', fr: 'Le Plan' },
                task: { ar: 'تحديد 3 أهداف كبرى لهذا الربع السنوي.', en: 'Define 3 major goals for this quarter.', fr: 'Objectifs.' },
                isLocked: true,
                bookPageRef: 72
            },
            {
                day: 9,
                title: { ar: 'محاذاة الأعمدة', en: 'Column Alignment', fr: 'Alignement' },
                task: { ar: 'تحديد ساعات "العمل العميق" بلا مقاطعات.', en: 'Block "Deep Work" hours without interruptions.', fr: 'Travail profond.' },
                isLocked: true,
                bookPageRef: 78
            },
            {
                day: 10,
                title: { ar: 'إزالة الأنقاض', en: 'Debris Removal', fr: 'Débris' },
                task: { ar: 'كتابة وتفنيد 3 أفكار سلبية تعيقك.', en: 'Write and refute 3 limiting beliefs.', fr: 'Croyances limitantes.' },
                isLocked: true,
                bookPageRef: 84
            },
            {
                day: 11,
                title: { ar: 'اختبار الضغط', en: 'Stress Testing', fr: 'Test de Stress' },
                task: { ar: 'إنجاز مهمة مؤجلة صعبة في جلسة واحدة.', en: 'Complete one difficult procrastinated task.', fr: 'Tâche difficile.' },
                isLocked: true,
                bookPageRef: 90
            },
            {
                day: 12,
                title: { ar: 'العزل الحراري', en: 'Insulation', fr: 'Isolation' },
                task: { ar: 'تنظيف بيئة العمل من المشتتات البصرية.', en: 'Declutter workspace from visual noise.', fr: 'Déclutter.' },
                isLocked: true,
                bookPageRef: 95
            },
            {
                day: 13,
                title: { ar: 'نظام التهوية', en: 'Ventilation', fr: 'Ventilation' },
                task: { ar: 'تعلم معلومة جديدة (قراءة 10 صفحات).', en: 'Learn something new (Read 10 pages).', fr: 'Lecture.' },
                isLocked: true,
                bookPageRef: 101
            },
            {
                day: 14,
                title: { ar: 'فحص الاستقرار', en: 'Stability Check', fr: 'Stabilité' },
                task: { ar: 'تقييم الإنجاز العقلي للأسبوع.', en: 'Evaluate mental output for the week.', fr: 'Évaluation.' },
                isLocked: true,
                bookPageRef: 108
            }
        ]
    },
    {
        id: 3,
        title: { ar: 'المرحلة 3: التصميم الداخلي', en: 'Phase 3: Interior', fr: 'Intérieur' },
        focus: { ar: 'الترميم الروحي', en: 'Spiritual Design', fr: 'Design Spirituel' },
        days: [
            {
                day: 15,
                title: { ar: 'تحليل الإضاءة', en: 'Light Analysis', fr: 'Lumière' },
                task: { ar: 'كتابة 3 أشياء تمتن لها بصدق.', en: 'Write 3 things you are truly grateful for.', fr: 'Gratitude.' },
                isLocked: true,
                bookPageRef: 120
            },
            {
                day: 16,
                title: { ar: 'تخطيط المساحات', en: 'Space Planning', fr: 'Espace' },
                task: { ar: 'تفريغ الذهن بالكتابة الحرة (Journaling).', en: 'Brain dump via free journaling.', fr: 'Journaling.' },
                isLocked: true,
                bookPageRef: 126
            },
            {
                day: 17,
                title: { ar: 'الديكور', en: 'Decor', fr: 'Décor' },
                task: { ar: 'فعل شيء واحد لطيف لنفسك (Self-Care).', en: 'Do one act of self-care.', fr: 'Soin de soi.' },
                isLocked: true,
                bookPageRef: 132
            },
            {
                day: 18,
                title: { ar: 'عزل الصوت', en: 'Acoustics', fr: 'Acoustique' },
                task: { ar: 'الجلوس في صمت تام لمدة 10 دقائق.', en: 'Sit in total silence for 10 minutes.', fr: 'Silence.' },
                isLocked: true,
                bookPageRef: 138
            },
            {
                day: 19,
                title: { ar: 'الصيانة', en: 'Maintenance', fr: 'Maintenance' },
                task: { ar: 'مسامحة شخص أو موقف قديم.', en: 'Forgive a person or past situation.', fr: 'Pardon.' },
                isLocked: true,
                bookPageRef: 144
            },
            {
                day: 20,
                title: { ar: 'جودة الهواء', en: 'Air Quality', fr: 'Qualité de l\'air' },
                task: { ar: 'تمارين تنفس عميق (Breathwork).', en: 'Practice deep breathwork.', fr: 'Respiration.' },
                isLocked: true,
                bookPageRef: 150
            },
            {
                day: 21,
                title: { ar: 'فحص الراحة', en: 'Comfort Check', fr: 'Confort' },
                task: { ar: 'قياس مستوى الرضا الداخلي.', en: 'Measure internal satisfaction level.', fr: 'Satisfaction.' },
                isLocked: true,
                bookPageRef: 156
            }
        ]
    },
    {
        id: 4,
        title: { ar: 'المرحلة 4: الواجهة', en: 'Phase 4: Exterior', fr: 'Extérieur' },
        focus: { ar: 'الأثر الاجتماعي', en: 'Social Impact', fr: 'Impact Social' },
        days: [
            {
                day: 22,
                title: { ar: 'تصميم الواجهة', en: 'Facade Design', fr: 'Façade' },
                task: { ar: 'تحسين مظهرك الخارجي ليعكس قيمك.', en: 'Align appearance with your values.', fr: 'Apparence.' },
                isLocked: true,
                bookPageRef: 168
            },
            {
                day: 23,
                title: { ar: 'المداخل', en: 'Entryways', fr: 'Entrées' },
                task: { ar: 'تحديد حدود واضحة في علاقة واحدة.', en: 'Set clear boundaries in one relationship.', fr: 'Limites.' },
                isLocked: true,
                bookPageRef: 174
            },
            {
                day: 24,
                title: { ar: 'الجسور', en: 'Bridges', fr: 'Ponts' },
                task: { ar: 'التواصل مع شخص ملهم أو مرشد.', en: 'Reach out to a mentor or peer.', fr: 'Mentorat.' },
                isLocked: true,
                bookPageRef: 180
            },
            {
                day: 25,
                title: { ar: 'أنظمة الأمن', en: 'Security Systems', fr: 'Sécurité' },
                task: { ar: 'قول "لا" لطلب يستنزف طاقتك.', en: 'Say "No" to a draining request.', fr: 'Non.' },
                isLocked: true,
                bookPageRef: 186
            },
            {
                day: 26,
                title: { ar: 'تنسيق الموقع', en: 'Landscaping', fr: 'Paysage' },
                task: { ar: 'تقديم مساعدة لشخص دون مقابل.', en: 'Help someone without expecting return.', fr: 'Aide.' },
                isLocked: true,
                bookPageRef: 192
            },
            {
                day: 27,
                title: { ar: 'التلميع النهائي', en: 'Final Polish', fr: 'Finition' },
                task: { ar: 'صقل مهارة اجتماعية أو تواصلية.', en: 'Refine a communication skill.', fr: 'Communication.' },
                isLocked: true,
                bookPageRef: 198
            },
            {
                day: 28,
                title: { ar: 'تحضير الافتتاح', en: 'Grand Opening Prep', fr: 'Ouverture' },
                task: { ar: 'مراجعة شاملة للأثر الخارجي.', en: 'Review external impact.', fr: 'Impact.' },
                isLocked: true,
                bookPageRef: 204
            },
             {
                day: 29,
                title: { ar: 'التفتيش النهائي', en: 'Final Inspection', fr: 'Inspection Finale' },
                task: { ar: 'تدقيق كامل لجميع الأركان الأربعة.', en: 'Full audit of all four pillars.', fr: 'Audit complet.' },
                isLocked: true,
                bookPageRef: 210
            },
            {
                day: 30,
                title: { ar: 'التسليم', en: 'Handover', fr: 'Livraison' },
                task: { ar: 'احتفل! أنت الآن المهندس المسؤول.', en: 'Celebrate! You are now the Architect.', fr: 'Célébration.' },
                isLocked: true,
                bookPageRef: 216
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
