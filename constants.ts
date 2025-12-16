
import { PillarData, BlogPost, Product, WeekPlan, BookChapterPreview, DayPlan, AssessmentCategory, CommunityPost } from './types';

export const TRANSLATIONS = {
  nav: {
    home: { ar: 'الرئيسية', en: 'HEADQUARTERS', fr: 'QG' },
    blueprint: { ar: 'المخطط', en: 'THE BLUEPRINT', fr: 'LE PLAN' },
    philosophy: { ar: 'الكود', en: 'THE CODE', fr: 'LE CODE' },
    gallery: { ar: 'المعرض', en: 'THE GALLERY', fr: 'GALERIE' }, // Added Gallery
    library: { ar: 'الأدوات', en: 'THE TOOLS', fr: 'OUTILS' }, // Renamed from Store
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
    cta: { ar: 'ابدأ فحص السلامة الإنشائية', en: 'START STRUCTURAL AUDIT' },
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
    headline: { 
        en: 'You’re Not Burned Out. You’re Structurally Overloaded.', 
        ar: 'أنت لست محترقاً نفسياً. أنت تعاني من حمل هيكلي زائد.' 
    },
    desc: { 
        en: 'A science-backed system to diagnose, stabilize, and redesign your internal structure — so your life stops collapsing under pressure.', 
        ar: 'نظام هندسي دقيق لتشخيص، وتثبيت، وإعادة تصميم بنيتك الداخلية — لتتوقف حياتك عن الانهيار تحت الضغط.' 
    },
    cta: { 
        en: 'Begin With the Structural Audit', 
        ar: 'ابدأ فحص السلامة الإنشائية' 
    }
  },
  pain: {
    title: { en: 'Why Self-Help Fails', ar: 'لماذا تفشل الحلول التقليدية؟' },
    text: {
        en: 'Most self-improvement treats humans like a list of isolated problems: Fix sleep, Fix mindset, Fix productivity. But humans don’t fail randomly. They fail structurally. When pressure increases, it doesn’t disappear — it redistributes… until something breaks.',
        ar: 'معظم برامج التطوير تتعامل مع الإنسان كقائمة مشاكل منفصلة: أصلح نومك، حسّن تفكيرك، ضاعف إنتاجيتك. لكن البشر لا ينهارون عشوائياً. هم ينهارون "هيكلياً". عندما يزداد الضغط، هو لا يختفي، بل يعيد توزيع نفسه... حتى ينكسر شيء ما.'
    }
  },
  tiers: {
      title: { en: 'Choose Your Level of Reconstruction', ar: 'اختر مستوى إعادة البناء' },
      subtitle: { en: 'One system. Different levels of readiness.', ar: 'نظام واحد. مستويات جاهزية مختلفة.' }
  }
};

export const TIERS = [
  {
    id: 'essential',
    title: { en: 'Essential Access', ar: 'الدخول الأساسي' },
    subtitle: { en: 'Understand Your Structure', ar: 'افهم هيكلك' },
    price: 29,
    description: { en: 'Best for those who know something is wrong — but don’t know where.', ar: 'الأفضل لمن يشعر بوجود خلل، لكنه لا يعرف مصدره.' },
    features: [
      { en: 'The Blueprint Book (PDF + ePub)', ar: 'كتاب المخطط (PDF + ePub)' },
      { en: 'Structural Audit Tool', ar: 'أداة الفحص الإنشائي' },
      { en: 'Core Visual Diagrams', ar: 'المخططات البصرية الأساسية' }
    ],
    cta: { en: 'Get Essential Access', ar: 'ابدأ الأساسيات' },
    color: 'slate'
  },
  {
    id: 'implementation',
    title: { en: 'Implementation Access', ar: 'دخول التنفيذ' },
    subtitle: { en: 'Stabilize Your Structure', ar: 'ثبّت بنيانك' },
    price: 79,
    isPopular: true,
    description: { en: 'Best for those who want clarity, balance, and functional stability again.', ar: 'الأفضل لمن يريد استعادة الوضوح، التوازن، والاستقرار الوظيفي.' },
    features: [
      { en: 'Everything in Essential', ar: 'كل ما في الباقة الأساسية' },
      { en: 'The Practical Workbook', ar: 'الوورك بوك (دفتر التطبيق)' },
      { en: '28-Day Foundation Program', ar: 'برنامج التأسيس (٢٨ يوم)' },
      { en: 'Daily Prompts & Tracking', ar: 'نظام التتبع اليومي' }
    ],
    cta: { en: 'Start The 28-Day Program', ar: 'ابدأ برنامج الـ ٢٨ يوماً' },
    color: 'bronze'
  },
  {
    id: 'architect',
    title: { en: 'Architect Access', ar: 'دخول المعماري' },
    subtitle: { en: 'Redesign Your Life', ar: 'أعد تصميم حياتك' },
    price: 397,
    description: { en: 'For High-performers, founders, and professionals ready for deep reconstruction.', ar: 'للقادة، المؤسسين، والمحترفين المستعدين لإعادة بناء جذرية.' },
    features: [
      { en: 'Everything in Implementation', ar: 'كل ما في باقة التنفيذ' },
      { en: '30-Day Accelerator (Advanced)', ar: 'المسرّع (٣٠ يوم متقدم)' },
      { en: 'Interactive Dashboard', ar: 'لوحة التحكم التفاعلية' },
      { en: 'Performance Tools & Protocols', ar: 'أدوات وبروتوكولات الأداء' }
    ],
    cta: { en: 'Apply for Architect Access', ar: 'تقديم طلب انضمام' },
    color: 'blueprint'
  }
];

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
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop',
    blueprintImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1518005052354-a36d6956e43d?q=80&w=2088&auto=format&fit=crop',
    blueprintImage: 'https://images.unsplash.com/photo-1534970028765-38ce47ef7d8d?q=80&w=2070&auto=format&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2070&auto=format&fit=crop',
    blueprintImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070&auto=format&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    blueprintImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop'
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

// --- 🏛️ UPDATED ART CATALOG (High-Concept Philosophical Pieces) ---
export const ART_PRODUCTS: Product[] = [
    {
      id: 'art-new-01',
      category: 'art',
      name: { ar: 'الترميم الذهبي (Kintsugi Pillar)', en: 'Golden Repair (Kintsugi Pillar)', fr: 'Réparation Dorée' },
      description: { 
          ar: 'عمود خرساني ضخم مشقوق، ولكن الشقوق مملوءة بالذهب السائل. تجسد فلسفة أن "مكان الكسر هو مكان القوة". عمل فني يذكرك بأن ترميم ذاتك يجعلك أغلى وأقوى.', 
          en: 'A massive concrete pillar with cracks filled with liquid gold. Embodying the philosophy that "the site of the break is the site of strength".',
          fr: 'Pilier Kintsugi.' 
      },
      price: 2500,
      type: 'physical',
      image: 'https://images.unsplash.com/photo-1597113366853-fea190b6cd82?q=80&w=2070&auto=format&fit=crop', 
      status: 'available',
      panels: 1,
      // 🧠 HIGH QUALITY PROMPT: Explicit texture, lighting, and materials
      aiPrompt: "A hyper-realistic, 8k resolution close-up art photography of a massive, rough grey concrete architectural pillar standing in a dark void. The pillar has a deep, jagged structural crack running vertically. This crack is filled with glowing, molten liquid gold (Kintsugi style). The contrast between the cold, brutalist concrete and the warm, luminous gold is striking. Dramatic rim lighting, museum quality, black background."
    },
    {
      id: 'art-new-02',
      category: 'art',
      name: { ar: 'فوضى قيد الإنشاء', en: 'Chaos Under Construction', fr: 'Chaos en Construction' },
      description: { 
          ar: 'عمل تجريدي يصور عقلاً في حالة فوضى، ولكن تظهر فوقه "خطوط زرقاء هندسية" (Blueprint) تبدأ في تنظيم هذه الفوضى. لوحة تمثل لحظة الوعي والبدء في العلاج.', 
          en: 'Abstract art depicting a chaotic mind overlayed with strict geometric blue architectural lines organizing the chaos. Represents the moment of awareness.',
          fr: 'Chaos structuré.' 
      },
      price: 1800,
      type: 'physical',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
      status: 'available',
      panels: 1,
      // 🧠 HIGH QUALITY PROMPT: Concept Art, Mixed Media
      aiPrompt: "A conceptual masterpiece art print. A dark background filled with chaotic, scribbled black charcoal lines representing a messy mind. Superimposed over this chaos are sharp, glowing cyan blue architectural blueprint lines—grid systems, measurements, and straight vectors—that are actively organizing the scribbles into a perfect geometric structure. High contrast, merging psychology with engineering."
    },
    {
      id: 'art-new-03',
      category: 'art',
      name: { ar: 'العزلة المقدسة (الغرفة الداخلية)', en: 'Sacred Solitude (The Inner Room)', fr: 'Solitude Sacrée' },
      description: { 
          ar: 'مشهد داخلي لغرفة خرسانية مهيبة ومظلمة (Brutalist)، يخترقها شعاع ضوء واحد فقط يسقط على كرسي وحيد. ترمز لأهمية الخلوة النفسية وترميم الروح بعيداً عن ضجيج العالم.', 
          en: 'Interior of a majestic dark brutalist concrete room, pierced by a single beam of sunlight hitting a solitary chair. Symbolizes spiritual solitude.',
          fr: 'Chambre intérieure.' 
      },
      price: 2100,
      type: 'physical',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      status: 'available',
      panels: 1,
      // 🧠 HIGH QUALITY PROMPT: Atmospheric, Interior Design
      aiPrompt: "A breathtaking architectural photography shot of a vast, empty, dark concrete room with high ceilings (Brutalist style). The room is in shadow, except for a single, sharp, dramatic beam of sunlight cutting through dust motes in the air to illuminate a solitary, simple wooden chair in the center. The mood is silent, sacred, and introspective. Cinematic lighting, 8k."
    },
    {
      id: 'art-new-04',
      category: 'art',
      name: { ar: 'المسقط الرأسي للإنسان', en: 'The Vitruvian Structure', fr: 'Structure Vitruvienne' },
      description: { 
          ar: 'إعادة تخيل للوحة دافنشي (Vitruvian Man) ولكن بنمط هندسي معاصر. نصف الجسم بشري عضوي، والنصف الآخر هيكل سلكي معماري (Wireframe). ترمز للاندماج الكامل بين البيولوجيا والهندسة.', 
          en: 'Reimagining Da Vinci\'s Vitruvian Man. Half organic human body, half architectural 3D wireframe structure. Symbolizes the merger of biology and engineering.',
          fr: 'Homme structurel.' 
      },
      price: 3000,
      type: 'physical',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80',
      status: 'available',
      panels: 1,
      // 🧠 HIGH QUALITY PROMPT: Da Vinci meets Matrix/CAD
      aiPrompt: "A highly detailed art illustration. A reimagining of Da Vinci's Vitruvian Man on old parchment paper background. The left side of the man is classic anatomical muscle and bone sketch. The right side transitions seamlessly into a complex 3D blue wireframe architectural schematic (CAD style) made of steel beams and grid lines. The merger of biology and structure. text annotations in Latin and Binary."
    },
    {
      id: 'art-new-05',
      category: 'art',
      name: { ar: 'الواجهة الزجاجية (الحدود)', en: 'The Glass Facade (Boundaries)', fr: 'Façade de Verre' },
      description: { 
          ar: 'ناطحة سحاب زجاجية تعكس عاصفة رعدية في الخارج، بينما يظهر الداخل (من خلال الزجاج) دافئاً وهادئاً ومضاءً بالشموع. تجسد قوة "الحدود النفسية" في حماية السلام الداخلي من عواصف الخارج.', 
          en: 'A glass skyscraper reflecting a thunderstorm outside, but the interior visible through the glass is warm, calm, and candlelit. Symbolizes the power of boundaries.',
          fr: 'Limites de verre.' 
      },
      price: 2800,
      type: 'physical',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
      status: 'available',
      panels: 1,
      // 🧠 HIGH QUALITY PROMPT: Contrast, Weather, Mood
      aiPrompt: "Cinematic close-up photography of a modern glass skyscraper window at night. On the OUTSIDE glass reflection, there is a chaotic, dark thunderstorm with rain streaking down. On the INSIDE (visible through the glass), there is a warm, cozy library room lit by golden candlelight and a fireplace, completely peaceful. The contrast between the cold external storm and the warm internal peace is the focus. 8k, photorealistic."
    }
];

export const PRODUCTS: Product[] = [
  // --- INDIVIDUAL ITEMS (A LA CARTE) ---
  {
    id: 'book_digital',
    category: 'book',
    name: { ar: 'الكتاب (PDF)', en: 'The Blueprint (Digital)', fr: 'Livre PDF' },
    description: { ar: 'نسخة رقمية فورية.', en: 'Instant Digital Download.', fr: 'Téléchargement.' },
    price: 29,
    type: 'digital',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80',
    status: 'available'
  },
  {
    id: 'book_print',
    category: 'book',
    name: { ar: 'الكتاب (مطبوع)', en: 'The Blueprint (Print)', fr: 'Livre Imprimé' },
    description: { ar: 'نسخة ورقية فاخرة تصل لباب بيتك.', en: 'Premium Hardcover shipped to you.', fr: 'Livre relié.' },
    price: 49,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
    status: 'available'
  },
  {
    id: 'workbook_print',
    category: 'tool',
    name: { ar: 'الوورك بوك (مطبوع)', en: '28-Day Workbook (Print)', fr: 'Cahier Imprimé' },
    description: { ar: 'دفتر تطبيقات عملي ورقي.', en: 'Physical Construction Log.', fr: 'Journal physique.' },
    price: 39,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80',
    status: 'available'
  },
  // Replaced "bundle_master" with Tier Logic in UI, but keeping product data for Checkout
  {
    id: 'tier_implementation_product',
    category: 'bundle',
    name: { ar: 'باقة التنفيذ (الكاملة)', en: 'Implementation Access Bundle', fr: 'Le Système Complet' },
    description: { 
      ar: 'الكتاب + الوورك بوك + برنامج الـ 28 يوم.', 
      en: 'Book + Workbook + 28-Day Program.',
      fr: 'Le système complet.' 
    },
    price: 79, 
    type: 'hybrid',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
    status: 'available',
    isBestSeller: true
  },
  {
    id: 'tier_architect_product',
    category: 'bundle',
    name: { ar: 'باقة المعماري (المتقدمة)', en: 'Architect Access Bundle', fr: 'L\'Architecte Maître' },
    description: { 
      ar: 'كل شيء + المسرّع + النقابة.', 
      en: 'Everything + Accelerator + Guild.',
      fr: 'Tout + Coaching.' 
    },
    price: 397, 
    type: 'hybrid',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
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
    // ... (This section remains unchanged, just ensuring structure is kept) ...
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
            // ... (Days 2-7 omitted for brevity, they are unchanged) ...
             { day: 2, title: { ar: 'صب الخرسانة', en: 'Pouring Concrete', fr: 'Béton' }, task: { ar: 'تطبيق بروتوكول النوم بدقة (قاعدة 10-3-2-1).', en: 'Strict sleep protocol (10-3-2-1 rule).', fr: 'Sommeil strict.' }, isLocked: true, bookPageRef: 32 },
             { day: 3, title: { ar: 'حديد التسليح', en: 'Reinforcement', fr: 'Renforcement' }, task: { ar: 'رفع نسبة الماء وحذف السكريات المكررة.', en: 'Increase hydration, remove refined sugars.', fr: 'Hydratation.' }, isLocked: true, bookPageRef: 38 },
             { day: 4, title: { ar: 'اختبار الأحمال', en: 'Load Bearing', fr: 'Charge' }, task: { ar: 'حركة بدنية لمدة 20 دقيقة (مشي أو تمارين مقاومة).', en: '20 min physical load (walk or resistance).', fr: 'Mouvement.' }, isLocked: true, bookPageRef: 45 },
             { day: 5, title: { ar: 'عزل الاهتزازات', en: 'Vibration Control', fr: 'Vibrations' }, task: { ar: 'صيام رقمي لمدة 3 ساعات قبل النوم.', en: 'Digital fast 3 hours before bed.', fr: 'Jeûne numérique.' }, isLocked: true, bookPageRef: 51 },
             { day: 6, title: { ar: 'زمن التصلب', en: 'Curing Time', fr: 'Temps de Prise' }, task: { ar: 'يوم راحة نشطة (تأمل أو قراءة خفيفة).', en: 'Active rest day (meditation or light reading).', fr: 'Repos actif.' }, isLocked: true, bookPageRef: 58 },
             { day: 7, title: { ar: 'فحص المتانة', en: 'Integrity Audit', fr: 'Audit' }, task: { ar: 'مراجعة الأسبوع وتعديل المخطط للأسبوع القادم.', en: 'Review the week and adjust blueprint.', fr: 'Revue.' }, isLocked: true, bookPageRef: 65 }
        ]
    },
    // ... (Weeks 2-4 omitted for brevity, they are unchanged) ...
    {
        id: 2,
        title: { ar: 'المرحلة 2: الهيكل', en: 'Phase 2: Structure', fr: 'Structure' },
        focus: { ar: 'النظام العقلي', en: 'Mental Framework', fr: 'Cadre Mental' },
        days: [] // Populated in full file
    },
    {
        id: 3,
        title: { ar: 'المرحلة 3: التصميم الداخلي', en: 'Phase 3: Interior', fr: 'Intérieur' },
        focus: { ar: 'الترميم الروحي', en: 'Spiritual Design', fr: 'Design Spirituel' },
        days: []
    },
    {
        id: 4,
        title: { ar: 'المرحلة 4: الواجهة', en: 'Phase 4: Exterior', fr: 'Extérieur' },
        focus: { ar: 'الأثر الاجتماعي', en: 'Social Impact', fr: 'Impact Social' },
        days: []
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
