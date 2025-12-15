
import { PillarData, BlogPost, Product, WeekPlan, BookChapterPreview, DayPlan, AssessmentCategory, CommunityPost } from './types';

export const TRANSLATIONS = {
  nav: {
    home: { ar: 'الرئيسية', en: 'HEADQUARTERS', fr: 'QG' },
    blueprint: { ar: 'المخطط', en: 'THE BLUEPRINT', fr: 'LE PLAN' },
    philosophy: { ar: 'الكود', en: 'THE CODE', fr: 'LE CODE' },
    library: { ar: 'المتجر', en: 'SUPPLY STORE', fr: 'MAGASIN' },
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
    name: { ar: 'أبراهام مقلد', en: 'Abraham Meklad', fr: 'Abraham Meklad' },
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
        fr: 'Ce projet est un plan d\'exécution pour la restructuration.'
    }
};

export const LANDING_CONTENT = {
  hero: {
    headline: { en: 'You Are Not Broken. You Are Poorly Designed.', ar: 'أنت لست مكسوراً. أنت سيء التصميم.' },
    desc: { en: 'Human beings don\'t break randomly. They collapse architecturally.\nYou need structural engineering—not interior decoration—to rebuild your life from the foundation up.', ar: 'البشر لا ينهارون عشوائياً، بل إنشائياً. أنت بحاجة لهندسة هيكلية—وليس ديكوراً داخلياً—لإعادة بناء حياتك من الأساس.' },
    cta: { en: 'TAKE YOUR STRUCTURAL INTEGRITY AUDIT', ar: 'ابدأ فحص السلامة الإنشائية' },
    subCta: { en: "WATCH SARAH'S STORY", ar: 'شاهد قصة سارة' }
  },
  collapse: {
    title: { en: 'You Are Not Broken. You Are Poorly Designed.', ar: 'أنت لست مكسوراً. أنت سيء التصميم.' },
    quote: { en: 'Human beings don’t break randomly. They collapse architecturally.', ar: 'البشر لا ينكسرون عشوائياً. هم ينهارون معمارياً.' },
    story: {
        en: 'Sarah Mitchell—venture capitalist, marathon runner—stood in her kitchen watching her hands shake while pouring coffee. "I have built a life I cannot inhabit," she whispered. She had a pristine facade, but the internal load-bearing walls were rotting.',
        ar: 'سارة ميتشل—مستثمرة وعداءة—وقفت في مطبخها تشاهد يديها ترتجفان أثناء سكب القهوة. همست: "لقد بنيت حياة لا أستطيع السكن فيها". كانت تملك واجهة مثالية، لكن الجدران الحاملة الداخلية كانت تتآكل.'
    },
    cta: { en: 'Take Your Structural Integrity Audit →', ar: 'ابدأ فحص السلامة الإنشائية ←' }
  },
  system: {
    title: { en: 'The Complete Rebuild System', ar: 'نظام إعادة البناء الكامل' },
    subtitle: { en: '58 Days of Structural Transformation', ar: '٥٨ يوماً من التحول الهيكلي' },
    components: [
        {
            title: { en: 'Phase 1: The Blueprint', ar: 'المخطط (نظري)' },
            desc: { en: 'Digital + Print Book. The Owner’s Manual.', ar: 'كتاب ديجيتال + مطبوع. دليل المالك لفهم الانهيار.' },
            price: '$14.99'
        },
        {
            title: { en: 'Phase 2: The Workbook', ar: 'الوورك بوك (تطبيقي)' },
            desc: { en: '28-Day Log. Digital is FREE. Print is paid.', ar: 'سجل ٢٨ يوم. الديجيتال مجاني، المطبوع برسوم.' },
            price: 'Free / $25'
        },
        {
            title: { en: 'Phase 3: The System', ar: 'النظام (هجين)' },
            desc: { en: 'Print Book + Digital Book + Online Dashboard.', ar: 'كتاب مطبوع + ديجيتال + لوحة تحكم تفاعلية.' },
            price: '$397'
        }
    ],
    footer: { en: 'This is not self-help. This is human engineering.', ar: 'هذا ليس تطوير ذات. هذه هندسة بشرية.' }
  },
  transformation: {
    title: { en: 'From Collapse to Architecture', ar: 'من الانهيار إلى العمارة' },
    quote: { en: 'After 28 days: Foundation stable.\nAfter 30 more: Running a half-marathon—not to prove anything, but because her body could finally carry her.', ar: 'بعد ٢٨ يوماً: الأساسات استقرت.\nبعد ٣٠ يوماً أخرى: ركضت نصف ماراثون—ليس لتثبت شيئاً، بل لأن جسدها أصبح قادراً أخيراً على حملها.' },
    cta: { en: 'Start Your Rebuild →', ar: 'ابدأ إعادة البناء ←' }
  },
  pricing: {
      title: { en: 'Choose Your Level of Reconstruction', ar: 'اختر مستوى إعادة البناء' }
  },
  guarantee: {
      title: { en: 'The Architect’s Guarantee', ar: 'ضمان المعماري' },
      text: { 
          en: 'If you complete the 28-Day Protocol and the 30-Day Accelerator with full engagement, and you don’t feel structurally different—in your body, mind, emotion, and purpose—I will refund every dollar. But I’ve never had to.',
          ar: 'إذا أتممت بروتوكول الـ ٢٨ يوماً وبرنامج التسريع (٣٠ يوماً) بالتزام كامل، ولم تشعر باختلاف هيكلي جذري—في جسدك، عقلك، مشاعرك، وهدفك—سأعيد لك كل دولار. لكنني لم أضطر لذلك أبداً.'
      },
      cta: { en: 'Begin Your Reconstruction Today →', ar: 'ابدأ عملية إعادة البناء اليوم ←' },
      trust: { en: 'Secure Checkout | Lifetime Access | 2,300+ Builders Worldwide', ar: 'دفع آمن | وصول مدى الحياة | ٢٣٠٠+ بناء حول العالم' }
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

// PRODUCT CATALOG UPDATED TO REFLECT HYBRID NATURE AND INDIVIDUAL ITEMS
export const PRODUCTS: Product[] = [
  // --- INDIVIDUAL ITEMS (A LA CARTE) ---
  {
    id: 'book_digital',
    category: 'book',
    name: { ar: 'الكتاب (PDF)', en: 'The Blueprint (Digital)', fr: 'Livre PDF' },
    description: { ar: 'نسخة رقمية فورية.', en: 'Instant Digital Download.', fr: 'Téléchargement.' },
    price: 14.99,
    type: 'digital',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80',
    status: 'available'
  },
  {
    id: 'book_print',
    category: 'book',
    name: { ar: 'الكتاب (مطبوع)', en: 'The Blueprint (Print)', fr: 'Livre Imprimé' },
    description: { ar: 'نسخة ورقية فاخرة تصل لباب بيتك.', en: 'Premium Hardcover shipped to you.', fr: 'Livre relié.' },
    price: 29.99,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
    status: 'available'
  },
  {
    id: 'workbook_print',
    category: 'tool',
    name: { ar: 'الوورك بوك (مطبوع)', en: '28-Day Workbook (Print)', fr: 'Cahier Imprimé' },
    description: { ar: 'دفتر تطبيقات عملي ورقي.', en: 'Physical Construction Log.', fr: 'Journal physique.' },
    price: 24.99,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80',
    status: 'available'
  },
  {
    id: 'system_hybrid',
    category: 'course',
    name: { ar: 'نظام الـ 30 يوم (هجين)', en: '30-Day Hybrid System', fr: 'Système Hybride' },
    description: { ar: 'كتاب مطبوع + ديجيتال + منصة.', en: 'Print + Digital + Dashboard.', fr: 'Complet.' },
    price: 197,
    type: 'hybrid',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
    status: 'available'
  },

  // --- BUNDLES ---
  {
    id: 'bundle_master',
    category: 'bundle',
    name: { ar: 'إعادة البناء الكامل', en: 'The Complete Rebuild', fr: 'Le Système Complet' },
    description: { 
      ar: 'الباقة الشاملة: كل الكتب (مطبوع وديجيتال) + النظام + المجتمع.', 
      en: 'All-in-One: Print/Digital Books + System + Community.',
      fr: 'Le système complet.' 
    },
    price: 397, 
    originalPrice: 550,
    type: 'hybrid',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
    status: 'available',
    isBestSeller: true,
    features: [
        { ar: 'الكتاب (نسخة مطبوعة + PDF)', en: 'The Blueprint Book (Print + PDF)', fr: 'Livre' },
        { ar: 'الوورك بوك 28 يوم (PDF مجاني)', en: '28-Day Workbook (Free PDF)', fr: 'Cahier PDF' },
        { ar: 'نظام الـ 30 يوم (كتاب مطبوع + منصة)', en: '30-Day System (Print Book + Dashboard)', fr: 'Système Hybride' },
        { ar: 'عضوية دائمة في Builders Guild', en: 'Lifetime Access to Builders Guild', fr: 'Accès Guilde' },
        { ar: 'شهادة إتمام هندسية', en: 'Certificate of Completion', fr: 'Certificat' }
    ]
  },
  {
    id: 'bundle_coach',
    category: 'bundle',
    name: { ar: 'كبير المعماريين', en: 'The Master Architect', fr: 'L\'Architecte Maître' },
    description: { 
      ar: 'الباقة الكاملة + توجيه فردي.', 
      en: 'Complete Bundle + 1:1 Coaching.',
      fr: 'Tout + Coaching.' 
    },
    price: 997, 
    originalPrice: 1500,
    type: 'hybrid',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    status: 'available',
    features: [
        { ar: 'كل مميزات باقة "إعادة البناء الكامل"', en: 'Everything in Complete Rebuild', fr: 'Tout inclus' },
        { ar: 'جلسات توجيه فردية (1:1)', en: '1:1 Private Coaching Sessions', fr: 'Coaching 1:1' },
        { ar: 'مراجعة شخصية للمخطط', en: 'Personal Blueprint Audit', fr: 'Audit Personnel' }
    ]
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
