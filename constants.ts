
import { PillarData, BlogPost, Product, CommunityPost, WeekPlan, BookChapterPreview, DayPlan, GuildMember, AssessmentCategory } from './types';

export const TRANSLATIONS = {
  nav: {
    home: { ar: 'الرئيسية', en: 'Home', fr: 'Accueil' },
    philosophy: { ar: 'فلسفة البناء', en: 'The Philosophy', fr: 'La Philosophie' },
    library: { ar: 'المتجر والمعرض', en: 'The Gallery', fr: 'La Galerie' },
    journal: { ar: 'صحيفة الأحوال', en: 'Journal', fr: 'Journal' },
    community: { ar: 'نقابة البنائين', en: 'The Guild', fr: 'La Guilde' },
    architect: { ar: 'عن المعماري', en: 'The Architect', fr: "L'Architecte" },
    contact: { ar: 'ابدأ الترميم', en: 'Start Reconstruction', fr: 'Commencer la Reconstruction' },
  },
  hero: {
    line1: { ar: 'هل هذه هي الحياة...', en: 'Is this the life...', fr: 'Est-ce la vie...' },
    line2: { ar: 'التي صُممتَ لها حقاً؟', en: 'You were truly designed for?', fr: 'Pour laquelle vous avez été conçu ?' },
    cta: { ar: 'استلم المخطط الأصلي', en: 'Acquire Original Blueprint', fr: 'Obtenir le Plan Original' },
  },
  assessment: {
    title: { ar: 'مقياس الانهيار الهيكلي', en: 'Structural Fatigue Scale', fr: 'Échelle de Fatigue Structurelle' },
    start: { ar: 'بدء الفحص المعماري', en: 'Start Architectural Audit', fr: 'Démarrer l\'Audit Architectural' },
    resultTitle: { ar: 'تقرير حالتك البنائية', en: 'Your Structural Report', fr: 'Votre Rapport Structurel' },
  },
  footer: {
    copyright: { ar: 'جميع الحقوق محفوظة © عمارة الإنسان', en: 'All Rights Reserved © Human Architecture', fr: 'Tous droits réservés © Architecture Humaine' },
  },
  contact: {
    title: { ar: 'طلب معاينة موقع', en: 'Request Site Inspection', fr: 'Demander une inspection' },
    desc: { ar: 'تواصل معنا لبدء رحلة إعادة الإعمار.', en: 'Contact us to begin your reconstruction journey.', fr: 'Contactez-nous pour commencer votre reconstruction.' },
    form: {
      name: { ar: 'اسم المالك', en: 'Owner Name', fr: 'Nom du propriétaire' },
      email: { ar: 'البريد الإلكتروني', en: 'Email Address', fr: 'Adresse e-mail' },
      type: { ar: 'نوع المشروع', en: 'Project Type', fr: 'Type de projet' },
      message: { ar: 'وصف الحالة', en: 'Condition Report', fr: 'Rapport d\'état' },
      submit: { ar: 'إرسال المخطط', en: 'Submit Blueprint', fr: 'Soumettre le plan' }
    }
  },
  community: {
    title: { ar: 'نقابة البنائين', en: 'The Builders Guild', fr: 'La Guilde des Bâtisseurs' },
    subtitle: { ar: 'المقر الرئيسي لعمليات الترميم وإعادة البناء', en: 'Headquarters for Restoration and Reconstruction Operations', fr: 'Siège des opérations de restauration' },
    channels: { ar: 'قنوات العمل', en: 'Work Channels', fr: 'Canaux de travail' },
    feed: { ar: 'سجل الموقع', en: 'Site Log', fr: 'Journal du site' },
    newPost: { ar: 'طرح مخطط جديد', en: 'Submit New Blueprint', fr: 'Soumettre un nouveau plan' },
    actions: {
      endorse: { ar: 'اعتماد المخطط', en: 'Endorse Plan', fr: 'Approuver' },
      review: { ar: 'مراجعة الأقران', en: 'Peer Review', fr: 'Revoir' }
    }
  },
  checkout: {
      title: { ar: 'عقد الاستحواذ', en: 'Acquisition Contract', fr: 'Contrat d\'Acquisition' },
      summary: { ar: 'ملخص المواد', en: 'Material Summary', fr: 'Résumé du Matériel' },
      total: { ar: 'إجمالي التكلفة', en: 'Total Cost', fr: 'Coût Total' },
      client: { ar: 'بيانات العميل', en: 'Client Identification', fr: 'Identification du Client' },
      pay: { ar: 'دفع وتوقيع العقد', en: 'Pay & Sign Contract', fr: 'Payer et Signer' },
      secure: { ar: 'بوابة دفع آمنة (PayPal)', en: 'Secure Gateway (PayPal)', fr: 'Paiement Sécurisé' },
      success: { ar: 'تم إصدار التصريح', en: 'Permit Issued', fr: 'Permis Délivré' },
      redirect: { ar: 'جاري تحويلك للمخطط...', en: 'Redirecting to Blueprint...', fr: 'Redirection...' }
  }
};

export const LANDING_CONTENT = {
  hero: {
    headline: { ar: 'لا ترمم الشقوق.. أعد بناء الأساس.', en: 'Stop Repairing Cracks. Rebuild the Foundation.', fr: 'Arrêtez de réparer les fissures.' },
    subheadline: { 
      ar: 'الكتاب الذي يعاملك كمشروع هندسي، لا كضحية للمشاعر. المنهجية الكاملة (IHAM™) لإعادة هندسة الذات.', 
      en: 'The book that treats you as an architectural project, not a victim of emotions. The complete IHAM™ methodology for self-reengineering.',
      fr: 'Le livre qui vous traite comme un projet architectural.'
    },
    badge: { ar: 'المخطط الأصلي', en: 'The Master Blueprint', fr: 'Le Plan Directeur' }
  },
  problem: {
    title: { ar: 'لماذا تنهار المباني البشرية؟', en: 'Why Human Structures Collapse', fr: 'Pourquoi les structures s\'effondrent' },
    text: { 
      ar: 'معظم كتب المساعدة الذاتية تحاول طلاء الجدران المتهالكة بألوان "الإيجابية". لكن إذا كان الأساس مائلاً، فإن أجمل طلاء في العالم لن يمنع السقف من السقوط. هذا الكتاب لا يقدم لك "نصائح"، بل يقدم لك "معادلات إنشائية".', 
      en: 'Most self-help books try to paint crumbling walls with "positivity." But if the foundation is tilted, the finest paint in the world won\'t stop the roof from collapsing. This book offers "structural equations," not advice.',
      fr: 'La plupart des livres de développement personnel essaient de peindre des murs en ruine.'
    }
  },
  upsell: {
    title: { ar: 'صندوق العدة التنفيذي', en: 'The Execution Toolkit', fr: 'La Boîte à Outils' },
    desc: { 
      ar: 'النظريات تبني العقل، لكن الأدوات تبني الواقع. أضف مجموعة بطاقات المهام اليومية (٣٠ يوماً) لتسريع عملية الترميم.', 
      en: 'Theories build the mind, but tools build reality. Add the 30-Day Task Deck to accelerate your restoration process.',
      fr: 'Les théories construisent l\'esprit, mais les outils construisent la réalité.' 
    },
    offer: { ar: 'عرض خاص: خصم ٤٠٪ عند الشراء مع الكتاب', en: 'Special Offer: 40% OFF when purchased with the book', fr: 'Offre Spéciale : -40%' }
  }
};

export const REPAIR_PROTOCOLS = {
    [AssessmentCategory.FOUNDATION]: {
        severity: { ar: 'تصدع في القواعد', en: 'Foundation Cracks' },
        prescription: { 
            ar: 'الجسد هو الأرضية التي تحمل المبنى. أنت بحاجة لتدعيم الخرسانة فوراً.', 
            en: 'The body is the ground holding the building. You need immediate concrete reinforcement.' 
        },
        action: { ar: 'ابدأ ببروتوكول النوم 10-3-2-1.', en: 'Start with 10-3-2-1 Sleep Protocol.' },
        ref: 'Book: Chapter 04'
    },
    [AssessmentCategory.STRUCTURE]: {
        severity: { ar: 'إجهاد في الأعمدة', en: 'Column Stress' },
        prescription: { 
            ar: 'الأعمدة العقلية تحت ضغط عالٍ. خطر الانهيار الوشيك بسبب الأحمال الزائدة.', 
            en: 'Mental pillars are under high compression. Imminent risk of collapse due to overload.' 
        },
        action: { ar: 'تطبيق "تفريغ الأحمال" وعزل الضوضاء.', en: 'Apply "Load Shedding" and Noise Insulation.' },
        ref: 'Book: Chapter 05'
    },
    [AssessmentCategory.INTERIOR]: {
        severity: { ar: 'ظلام داخلي', en: 'Interior Darkness' },
        prescription: { 
            ar: 'النظام الروحي معطل. الضوء لا يدخل، مما يسبب العفن (الاستياء) في الغرف الداخلية.', 
            en: 'Spiritual system malfunction. Light is not entering, causing mold (resentment) in inner rooms.' 
        },
        action: { ar: 'فتح "نوافذ الامتنان" يومياً.', en: 'Open "Gratitude Windows" daily.' },
        ref: 'Book: Chapter 07'
    },
    [AssessmentCategory.EXTERIOR]: {
        severity: { ar: 'واجهة متآكلة', en: 'Eroded Facade' },
        prescription: { 
            ar: 'الحدود الخارجية (Boundaries) متهالكة، مما يسمح للمتطفلين بتخريب الموقع.', 
            en: 'External boundaries are dilapidated, allowing intruders to damage the site.' 
        },
        action: { ar: 'إعادة رسم حدود الملكية (The Power of No).', en: 'Redraw property lines (The Power of No).' },
        ref: 'Book: Chapter 08'
    }
};

export const PILLARS: PillarData[] = [
  {
    id: 'mind',
    title: { ar: 'غرفة العقل', en: 'The Mind Chamber', fr: 'La Chambre de l\'Esprit' },
    channelId: 'Structure',
    description: { 
      ar: 'إعادة هيكلة الأفكار وتدعيم أسقف الإدراك.', 
      en: 'Restructuring thoughts and reinforcing the ceilings of perception.', 
      fr: 'Restructurer les pensées et renforcer les plafonds de la perception.' 
    },
    fullContent: {
      ar: 'العقل ليس مجرد مخزن للمعلومات، بل هو غرفة العمليات التي تدير المبنى بالكامل. في عمارة الإنسان، نتعامل مع الأفكار كأعمدة إنشائية. الفكرة السامة هي شرخ في العمود، إذا لم يُعالج، قد يؤدي لانهيار السقف (الاكتئاب).',
      en: 'The mind is not just a storage for information, but the control room managing the entire building. In Human Architecture, we treat thoughts as structural pillars. A toxic thought is a crack in the pillar; if untreated, it may lead to roof collapse (depression).',
      fr: 'L\'esprit n\'est pas seulement un stockage d\'informations, mais la salle de contrôle gérant tout le bâtiment. En Architecture Humaine, nous traitons les pensées comme des piliers structurels.'
    },
    image: 'https://picsum.photos/seed/mindarch/600/800?grayscale'
  },
  {
    id: 'body',
    title: { ar: 'أساس الجسد', en: 'Body Foundation', fr: 'Fondation du Corps' },
    channelId: 'Foundation',
    description: { 
      ar: 'ترميم القواعد المادية التي تحمل ثقل الروح.', 
      en: 'Restoring the physical bases that carry the weight of the soul.', 
      fr: 'Restaurer les bases physiques qui portent le poids de l\'âme.' 
    },
    fullContent: {
      ar: 'لا يمكن بناء ناطحة سحاب على أرض رخوة. الجسد هو الأرضية. الغذاء، النوم، والحركة ليست رفاهية، بل هي الخرسانة المسلحة للقاعدة.',
      en: 'You cannot build a skyscraper on soft ground. The body is the foundation. Food, sleep, and movement are not luxuries, but the reinforced concrete of the base.',
      fr: 'On ne peut pas construire un gratte-ciel sur un sol mou. Le corps est la fondation.'
    },
    image: 'https://picsum.photos/seed/bodyarch/600/800?grayscale'
  },
  {
    id: 'spirit',
    title: { ar: 'فضاء الروح', en: 'Spirit Space', fr: 'Espace de l\'Esprit' },
    channelId: 'Interior',
    description: { 
      ar: 'تصميم الفراغات الداخلية لتسمح للنور بالدخول.', 
      en: 'Designing interior spaces to allow light to enter.', 
      fr: 'Concevoir des espaces intérieurs pour laisser entrer la lumière.' 
    },
    fullContent: {
      ar: 'الروح تحتاج إلى مساحات فارغة (Atrium) ليدخلها الضوء. الامتلاء المادي يسبب اختناقاً في التصميم الداخلي للإنسان.',
      en: 'The soul needs empty spaces (Atrium) for light to enter. Material clutter causes suffocation in the interior design of the human.',
      fr: 'L\'âme a besoin d\'espaces vides (Atrium) pour laisser entrer la lumière.'
    },
    image: 'https://picsum.photos/seed/spiritarch/600/800?grayscale'
  },
  {
    id: 'social',
    title: { ar: 'الواجهة الخارجية', en: 'The Facade', fr: 'La Façade' },
    channelId: 'Facade',
    description: { 
      ar: 'كيف يراك العالم، وهل تعكس واجهتك حقيقتك؟', 
      en: 'How the world sees you, and does your facade reflect your truth?', 
      fr: 'Comment le monde vous voit, et votre façade reflète-t-elle votre vérité ?' 
    },
    fullContent: {
      ar: 'الواجهة ليست للنفاق، بل للحماية والتعبير. المشكلة تقع عندما تكون الواجهة من الرخام الفاخر، والداخل من الخشب المتآكل.',
      en: 'The facade is not for hypocrisy, but for protection and expression. The problem arises when the facade is luxury marble, while the interior is rotting wood.',
      fr: 'La façade n\'est pas pour l\'hypocrisie, mais pour la protection et l\'expression.'
    },
    image: 'https://picsum.photos/seed/socialarch/600/800?grayscale'
  }
];

export const PHASES = [
    {
        id: '01',
        title: { ar: 'مرحلة التشخيص', en: 'Phase I: Diagnosis', fr: 'Phase I: Diagnostic' },
        desc: { 
            ar: 'فحص التربة وكشف الأحمال الميتة (Dead Loads) التي تهدد البنية. تحليل "تعب الهيكل" (Structural Fatigue).',
            en: 'Soil testing and exposing dead loads threatening the structure. Analyzing "Structural Fatigue".',
            fr: 'Test de sol et exposition des charges mortes.'
        },
        ref: 'Blueprint: Chapter 01-03'
    },
    {
        id: '02',
        title: { ar: 'مرحلة التفكيك', en: 'Phase II: Deconstruction', fr: 'Phase II: Déconstruction' },
        desc: { 
            ar: 'الإزالة الآمنة للمعتقدات الفاسدة والجدران النفسية المتصدعة دون التسبب بانهيار كلي.',
            en: 'Safe removal of corrupt beliefs and cracked psychological walls without causing total collapse.',
            fr: 'Suppression sécurisée des croyances corrompues.'
        },
        ref: 'Blueprint: Chapter 04-06'
    },
    {
        id: '03',
        title: { ar: 'مرحلة إعادة البناء', en: 'Phase III: Reconstruction', fr: 'Phase III: Reconstruction' },
        desc: { 
            ar: 'صب القواعد الخرسانية للجسد، وهيكلة أعمدة العقل، وتنظيم أنظمة النفس.',
            en: 'Pouring concrete foundations for the body, structuring mind pillars, and organizing emotional systems.',
            fr: 'Coulage des fondations en béton.'
        },
        ref: 'Blueprint: Chapter 07-10'
    },
    {
        id: '04',
        title: { ar: 'مرحلة الدمج', en: 'Phase IV: Integration', fr: 'Phase IV: Intégration' },
        desc: { 
            ar: 'ربط الأنظمة الأربعة (IHAM Model) لتعمل كوحدة واحدة متناغمة تحت القبة الروحية.',
            en: 'Connecting the four systems (IHAM Model) to work as a harmonious single unit under the spiritual dome.',
            fr: 'Connecter les quatre systèmes.'
        },
        ref: 'Blueprint: Chapter 11-12'
    },
    {
        id: '05',
        title: { ar: 'مرحلة الصيانة', en: 'Phase V: Maintenance', fr: 'Phase V: Maintenance' },
        desc: { 
            ar: 'تطبيق بروتوكول الـ 30 يوماً لضمان استدامة المبنى ومقاومة عوامل التعرية الزمنية.',
            en: 'Applying the 30-Day Protocol to ensure building sustainability and resist weathering.',
            fr: 'Application du protocole de 30 jours.'
        },
        ref: 'Blueprint: Chapter 13'
    }
];

export const BOOK_CHAPTERS: BookChapterPreview[] = [
    { 
        id: 'c1', 
        number: '01', 
        title: { ar: 'لماذا تتهاوى حياتنا؟', en: 'Why Our Lives Collapse', fr: 'Pourquoi nos vies s\'effondrent' }, 
        desc: { ar: 'تحليل الانهيار الداخلي ونظرية التعب الهيكلي.', en: 'Internal collapse analysis and Structural Fatigue theory.', fr: 'Analyse de l\'effondrement.' }, 
        isLocked: false,
        relatedArtId: 'art_crumbling',
        relatedBlogId: 'b1'
    },
    { 
        id: 'c2', 
        number: '02', 
        title: { ar: 'العمارة الداخلية', en: 'The Internal Architecture', fr: 'L\'Architecture Interne' }, 
        desc: { ar: 'شرح الأعمدة الأربعة: النموذج الأساسي.', en: 'The Four Pillars: The Core Model.', fr: 'Les Quatre Piliers.' }, 
        isLocked: false,
        relatedArtId: 'art_complete_arch',
        relatedBlogId: 'b2'
    },
    {
        id: 'c3',
        number: '03',
        title: { ar: 'فحص التربة', en: 'The Soil Report', fr: 'Rapport de Sol' },
        desc: { ar: 'تحليل الأحمال الميتة (الماضي) وجودة الأرضية.', en: 'Analyzing Dead Loads (The Past) and soil quality.', fr: 'Analyse des charges mortes.' },
        isLocked: true,
        relatedArtId: 'art_roots'
    },
    { 
        id: 'c4', 
        number: '04', 
        title: { ar: 'الصحة الجسدية: الأساسات', en: 'Physical Health: Foundations', fr: 'Santé Physique' }, 
        desc: { ar: 'بروتوكولات النوم والتغذية (Harvard/WHO).', en: 'Sleep & Nutrition Protocols (Harvard/WHO).', fr: 'Protocoles de sommeil.' }, 
        isLocked: true,
        relatedArtId: 'art_1_foundation',
        relatedBlogId: 'b_preview'
    },
    { 
        id: 'c5', 
        number: '05', 
        title: { ar: 'الصحة العقلية: الهيكل', en: 'Mental Health: Structure', fr: 'Santé Mentale' }, 
        desc: { ar: 'هندسة التركيز والقرار (Stanford/MIT).', en: 'Focus & Decision Engineering (Stanford/MIT).', fr: 'Ingénierie de la concentration.' }, 
        isLocked: true,
        relatedArtId: 'art_4_mind',
        relatedBlogId: 'b1'
    },
    { 
        id: 'c6', 
        number: '06', 
        title: { ar: 'الصحة النفسية: الأنظمة', en: 'Emotional Health: Systems', fr: 'Santé Émotionnelle' }, 
        desc: { ar: 'إدارة الأحمال الحية والميتة.', en: 'Managing Live and Dead Loads.', fr: 'Gestion des charges.' }, 
        isLocked: true,
        relatedArtId: 'art_5_emotional',
        relatedBlogId: 'b1'
    },
    {
        id: 'c7',
        number: '07',
        title: { ar: 'القبة الروحية', en: 'The Spiritual Dome', fr: 'Le Dôme Spirituel' },
        desc: { ar: 'إدخال النور إلى المبنى: الاتصال والمعنى.', en: 'Letting Light in: Connection and Meaning.', fr: 'Laisser entrer la lumière.' },
        isLocked: true,
        relatedArtId: 'art_11_atrium'
    },
    {
        id: 'c8',
        number: '08',
        title: { ar: 'الواجهة الاجتماعية', en: 'The Social Facade', fr: 'La Façade Sociale' },
        desc: { ar: 'هندسة العلاقات ورسم الحدود الخارجية.', en: 'Relationship engineering and external boundaries.', fr: 'Ingénierie des relations.' },
        isLocked: true,
        relatedArtId: 'art_facade'
    },
    {
        id: 'c9',
        number: '09',
        title: { ar: 'التصميم الداخلي', en: 'Interior Design', fr: 'Design Intérieur' },
        desc: { ar: 'تأثيث النفس بالقيم والمبادئ الجمالية.', en: 'Furnishing the soul with values and aesthetics.', fr: 'Meubler l\'âme.' },
        isLocked: true,
        relatedArtId: 'art_16_glass'
    },
    {
        id: 'c10',
        number: '10',
        title: { ar: 'المرافق والخدمات', en: 'Utilities & Services', fr: 'Utilitaires' },
        desc: { ar: 'بناء العادات والروتين اليومي المستدام.', en: 'Building sustainable habits and daily routines.', fr: 'Habitudes durables.' },
        isLocked: true,
        relatedArtId: 'art_13_heart'
    },
    {
        id: 'c11',
        number: '11',
        title: { ar: 'إدارة الأزمات', en: 'Crisis Management', fr: 'Gestion de Crise' },
        desc: { ar: 'كيف يصمد المبنى أمام الزلازل (الصدمات).', en: 'How the structure survives earthquakes (Trauma).', fr: 'Gestion des séismes.' },
        isLocked: true,
        relatedArtId: 'art_17_arch'
    },
    { 
        id: 'c12', 
        number: '12', 
        title: { ar: 'منهجية العمارة الإنسانية', en: 'The Human Architecture Method', fr: 'Méthode Architecture Humaine' }, 
        desc: { ar: 'خارطة الطريق الكاملة (The Masterplan).', en: 'The Complete Masterplan.', fr: 'Le plan directeur.' }, 
        isLocked: true,
        relatedArtId: 'art_7_blueprint',
        relatedBlogId: 'b2'
    },
    { 
        id: 'c13', 
        number: '13', 
        title: { ar: 'برنامج الـ ٣٠ يوماً', en: 'The 30-Day Program', fr: 'Le Programme de 30 Jours' }, 
        desc: { ar: 'الخطة التنفيذية اليومية (Blueprint).', en: 'The Daily Execution Blueprint.', fr: 'Le plan d\'exécution.' }, 
        isLocked: true,
        relatedBlogId: 'b_preview',
        relatedArtId: 'kit_cards_30'
    },
];

export const TOP_BUILDERS: GuildMember[] = [
    { id: 'm1', name: 'Arch. Abraham Meklad', avatarChar: 'A', rank: { ar: 'كبير البنائين', en: 'Master Builder', fr: 'Maître' }, projectsCompleted: 420, joinedDate: '2022' },
    { id: 'm2', name: 'Layla D.', avatarChar: 'L', rank: { ar: 'مهندس إنشائي', en: 'Structural Eng.', fr: 'Ingénieur' }, projectsCompleted: 85, joinedDate: '2023' },
    { id: 'm3', name: 'Sarah M.', avatarChar: 'S', rank: { ar: 'مراقب جودة', en: 'Site Inspector', fr: 'Inspecteur' }, projectsCompleted: 42, joinedDate: '2023' },
    { id: 'm4', name: 'Omar X.', avatarChar: 'O', rank: { ar: 'بناء متدرب', en: 'Apprentice', fr: 'Apprenti' }, projectsCompleted: 12, joinedDate: '2024' },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'cp1',
    author: 'Arch. Abraham Meklad',
    role: { ar: 'كبير البنائين', en: 'Master Builder', fr: 'Maître Bâtisseur' },
    rankLevel: 3,
    phase: 'Structure',
    title: { ar: 'سؤال بخصوص تسليح الإرادة', en: 'RFI: Reinforcing Willpower Columns', fr: 'Question sur le renforcement de la volonté' },
    content: { 
      ar: 'أواجه مشكلة في استدامة التحفيز (Live Loads). هل تقترحون استخدام دعامات خارجية (Routine) أم تقوية القلب الخرساني (Discipline)؟',
      en: 'I face issues with sustaining motivation (Live Loads). Do you suggest using external supports (Routine) or strengthening the concrete core (Discipline)?',
      fr: 'Je rencontre des problèmes pour maintenir la motivation.'
    },
    endorsements: 24,
    tags: ['Discipline', 'Routine', 'Structure'],
    reviews: [
        { id: 'r1', author: 'Sarah M.', role: { ar: 'مهندس', en: 'Architect', fr: 'Arch' }, content: { ar: 'الدعامات الخارجية جيدة في البداية (Scaffolding)، لكن لا بد من إزالتها لاحقاً.', en: 'External scaffolding is good for the start, but must be removed later.', fr: '' }, timestamp: '1h ago', isHelpful: 5 }
    ],
    timestamp: '2h ago'
  },
  {
    id: 'cp2',
    author: 'Layla D.',
    role: { ar: 'مهندس متدرب', en: 'Apprentice', fr: 'Apprenti' },
    rankLevel: 1,
    phase: 'Foundation',
    title: { ar: 'اكتشاف رطوبة في الأساسات', en: 'Site Report: Moisture in Foundations', fr: 'Humidité détectée dans les fondations' },
    content: {
      ar: 'بعد تطبيق مقياس الانهيار، اكتشفت أن عادات النوم السيئة تسبب تآكل في القواعد. بدأت اليوم خطة عزل مائي (No Screen Policy).',
      en: 'After applying the Collapse Scale, I discovered poor sleep habits are corroding the base. Started waterproofing plan (No Screen Policy) today.',
      fr: 'Après avoir appliqué l\'échelle d\'effondrement, j\'ai découvert...'
    },
    endorsements: 42,
    tags: ['Sleep', 'Foundation', 'Recovery'],
    reviews: [],
    timestamp: '5h ago'
  },
  {
    id: 'cp3',
    author: 'Karim A.',
    role: { ar: 'بناء', en: 'Builder', fr: 'Bâtisseur' },
    rankLevel: 2,
    phase: 'Interior',
    title: { ar: 'تحديث: تركيب نوافذ الامتنان', en: 'Update: Installing Gratitude Windows', fr: 'Mise à jour : Installation des fenêtres de gratitude' },
    content: {
      ar: 'كنت أعيش في غرفة مظلمة (السخط). بدأت بفتح نوافذ صغيرة للامتنان يومياً. الضوء الذي يدخل غيّر ملامح الغرفة بالكامل.',
      en: 'I was living in a dark room (Resentment). Started installing small gratitude windows daily. The light entering has completely changed the room interior.',
      fr: 'Je vivais dans une chambre noire.'
    },
    endorsements: 156,
    tags: ['Gratitude', 'Light', 'Spirit'],
    reviews: [
         { id: 'r2', author: 'Arch. Abraham Meklad', role: { ar: 'كبير البنائين', en: 'Master Builder', fr: 'Maître' }, content: { ar: 'عمل ممتاز. تأكد من تنظيف النوافذ يومياً.', en: 'Excellent work. Ensure daily cleaning.', fr: '' }, timestamp: '10m ago', isHelpful: 12 }
    ],
    timestamp: '1d ago'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    category: 'mind',
    title: { ar: 'تفكيك القلق: منظور معماري', en: 'Deconstructing Anxiety: An Architectural Perspective', fr: 'Déconstruire l\'Anxiété' },
    date: 'Oct 12, 2023',
    excerpt: { 
      ar: 'القلق ليس عدواً، بل هو جرس إنذار يشير إلى حمل زائد على عمود ضعيف.', 
      en: 'Anxiety is not an enemy, but an alarm bell signaling overload on a weak pillar.',
      fr: 'L\'anxiété n\'est pas un ennemi.'
    },
    content: {
      ar: '<p>حين يبدأ السقف بالتشقق، نحن لا نلوم السقف، بل نفحص الأساسات...</p>',
      en: '<p>When the roof starts cracking, we do not blame the roof, we inspect the foundations...</p>',
      fr: '<p>Quand le toit commence à se fissurer...</p>'
    },
    image: 'https://picsum.photos/seed/blog1/800/600?grayscale'
  },
  {
    id: 'b2',
    category: 'spirit',
    title: { ar: 'الفراغ المقدس', en: 'The Sacred Void', fr: 'Le Vide Sacré' },
    date: 'Nov 05, 2023',
    excerpt: { 
      ar: 'لماذا نحتاج إلى مساحات فارغة في جداولنا كما نحتاجها في منازلنا؟', 
      en: 'Why we need empty spaces in our schedules just as we need them in our homes.',
      fr: 'Pourquoi nous avons besoin d\'espaces vides.'
    },
    content: {
        ar: '<p>الفراغ ليس عدماً، بل هو المساحة التي تسمح للحركة بالحدوث...</p>',
        en: '<p>Void is not nothingness, it is the space that allows movement to happen...</p>',
        fr: '<p>Le vide n\'est pas le néant...</p>'
    },
    image: 'https://picsum.photos/seed/blog2/800/600?grayscale'
  },
  {
    id: 'b_preview',
    category: 'body',
    title: { ar: 'صيانة الهيكل المادي', en: 'Maintenance of the Physical Structure', fr: 'Maintenance de la Structure Physique' },
    date: 'Dec 01, 2023',
    excerpt: { 
      ar: 'أهمية النوم والتغذية كخرسانة مسلحة للجسد.', 
      en: 'The importance of sleep and nutrition as reinforced concrete for the body.',
      fr: 'L\'importance du sommeil et de la nutrition.'
    },
    content: {
        ar: '<p>الجسد هو الوعاء الذي يحوي الروح...</p>',
        en: '<p>The body is the vessel that contains the soul...</p>',
        fr: '<p>Le corps est le vaisseau...</p>'
    },
    image: 'https://picsum.photos/seed/blog3/800/600?grayscale'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'book_1',
    category: 'book',
    name: { ar: 'كتاب: عمارة الإنسان', en: 'Book: Human Architecture', fr: 'Livre: Architecture Humaine' },
    description: { 
      ar: 'المنهجية الكاملة لإعادة هندسة الذات. 340 صفحة من المخططات والنظريات.', 
      en: 'The complete methodology for self-reengineering. 340 pages of blueprints and theories.',
      fr: 'La méthodologie complète.' 
    },
    price: 45,
    type: 'physical',
    image: 'https://picsum.photos/seed/bookcover/600/800?grayscale',
    status: 'available'
  },
  {
    id: 'art_crumbling',
    category: 'art',
    name: { ar: 'انهيار الجميل', en: 'Beautiful Collapse', fr: 'Bel Effondrement' },
    description: { ar: 'تمثيل فني للحظة الانهيار كبداية للبناء.', en: 'Artistic representation of collapse as a start for construction.', fr: 'Représentation artistique.' },
    price: 120,
    type: 'physical',
    image: 'https://picsum.photos/seed/art1/600/800?grayscale',
    panels: 1,
    aiPrompt: 'Surreal architectural photography, a classic greek column crumbling into gold dust, black background, dramatic lighting.'
  },
  {
    id: 'art_complete_arch',
    category: 'art',
    name: { ar: 'الهيكل المكتمل', en: 'The Completed Structure', fr: 'La Structure Complète' },
    description: { ar: 'المسقط الأفقي للنفس البشرية المتزنة.', en: 'Floor plan of the balanced human soul.', fr: 'Plan de l\'âme.' },
    price: 250,
    type: 'physical',
    image: 'https://picsum.photos/seed/art2/800/400?grayscale',
    panels: 3,
    aiPrompt: 'Architectural floor plan glowing in gold on black paper, intricate details of a temple layout, triptych split.'
  },
    {
    id: 'art_1_foundation',
    category: 'art',
    name: { ar: 'الأساسات', en: 'Foundations', fr: 'Fondations' },
    description: { ar: 'تمثيل بصري لأساسات الجسد القوية.', en: 'Visual representation of strong body foundations.', fr: 'Représentation visuelle.' },
    price: 150,
    type: 'physical',
    image: 'https://picsum.photos/seed/art_found/600/800?grayscale',
    panels: 1,
    aiPrompt: 'Minimalist concrete foundation blocks with gold veins, strong shadows, architectural drawing style.'
  },
  {
    id: 'art_4_mind',
    category: 'art',
    name: { ar: 'هيكل العقل', en: 'Mind Structure', fr: 'Structure de l\'Esprit' },
    description: { ar: 'الأعمدة التي تحمل سقف الإدراك.', en: 'The pillars holding the roof of perception.', fr: 'Les piliers.' },
    price: 150,
    type: 'physical',
    image: 'https://picsum.photos/seed/art_mind/600/800?grayscale',
    panels: 1
  },
  {
    id: 'art_5_emotional',
    category: 'art',
    name: { ar: 'أنظمة الشعور', en: 'Emotional Systems', fr: 'Systèmes Émotionnels' },
    description: { ar: 'تدفق المياه عبر القنوات.', en: 'Water flowing through channels.', fr: 'L\'eau coulant.' },
    price: 180,
    type: 'physical',
    image: 'https://picsum.photos/seed/art_emo/600/800?grayscale',
    panels: 1
  },
    {
    id: 'art_11_atrium',
    category: 'art',
    name: { ar: 'الأذين الروحي', en: 'Spiritual Atrium', fr: 'Atrium Spirituel' },
    description: { ar: 'النور يدخل من الأعلى.', en: 'Light entering from above.', fr: 'Lumière entrant.' },
    price: 200,
    type: 'physical',
    image: 'https://picsum.photos/seed/art_atrium/600/800?grayscale',
    panels: 1
  },
      {
    id: 'art_facade',
    category: 'art',
    name: { ar: 'الواجهة', en: 'The Facade', fr: 'La Façade' },
    description: { ar: 'الجدار الخارجي الصلب.', en: 'The solid outer wall.', fr: 'Le mur extérieur.' },
    price: 140,
    type: 'physical',
    image: 'https://picsum.photos/seed/art_facade/600/800?grayscale',
    panels: 1
  },
   {
    id: 'art_16_glass',
    category: 'art',
    name: { ar: 'الزجاج الداخلي', en: 'Interior Glass', fr: 'Verre Intérieur' },
    description: { ar: 'الشفافية والوضوح.', en: 'Transparency and clarity.', fr: 'Transparence.' },
    price: 160,
    type: 'physical',
    image: 'https://picsum.photos/seed/art_glass/600/800?grayscale',
    panels: 1
  },
    {
    id: 'art_13_heart',
    category: 'art',
    name: { ar: 'قلب المنزل', en: 'Heart of the Home', fr: 'Cœur de la Maison' },
    description: { ar: 'غرفة المعيشة.', en: 'Living room.', fr: 'Salon.' },
    price: 170,
    type: 'physical',
    image: 'https://picsum.photos/seed/art_heart/600/800?grayscale',
    panels: 1
  },
  {
    id: 'art_17_arch',
    category: 'art',
    name: { ar: 'القوس', en: 'The Arch', fr: 'L\'Arche' },
    description: { ar: 'القوة في الانحناء.', en: 'Strength in curvature.', fr: 'Force dans la courbure.' },
    price: 190,
    type: 'physical',
    image: 'https://picsum.photos/seed/art_arch/600/800?grayscale',
    panels: 1
  },
    {
    id: 'art_7_blueprint',
    category: 'art',
    name: { ar: 'المخطط الرئيسي', en: 'Master Blueprint', fr: 'Plan Directeur' },
    description: { ar: 'الخريطة الكاملة.', en: 'The complete map.', fr: 'La carte complète.' },
    price: 300,
    type: 'physical',
    image: 'https://picsum.photos/seed/art_blue/600/800?grayscale',
    panels: 4
  },
  {
      id: 'kit_cards_30',
      category: 'tool',
      name: { ar: 'بطاقات المهام (٣٠ يوماً)', en: '30-Day Task Deck', fr: 'Cartes de 30 Jours' },
      description: { ar: 'أدوات تنفيذية يومية لبناء العادات.', en: 'Daily execution tools for habit building.', fr: 'Outils d\'exécution.' },
      price: 29,
      type: 'physical',
      image: 'https://picsum.photos/seed/cards/600/400?grayscale'
  },
    {
      id: 'kit_cards_theory',
      category: 'tool',
      name: { ar: 'بطاقات الفلسفة', en: 'Philosophy Deck', fr: 'Cartes Philosophie' },
      description: { ar: 'مجموعة القواعد النظرية.', en: 'Theoretical rules set.', fr: 'Règles théoriques.' },
      price: 25,
      type: 'physical',
      image: 'https://picsum.photos/seed/cards2/600/400?grayscale'
  }
];

export const RESTORATION_LOGS = [
    {
        id: 'LOG-001',
        status: { ar: 'مكتمل', en: 'Restored', fr: 'Restauré' },
        role: { ar: 'مالك مشروع', en: 'Project Owner', fr: 'Propriétaire' },
        name: { ar: 'أحمد س.', en: 'Ahmed S.', fr: 'Ahmed S.' },
        report: {
            ar: 'كنت أعتقد أن مشكلتي هي "الكسل"، لكن المخطط كشف أن أساساتي (النوم) كانت متآكلة. بعد إصلاح الأساس، اختفى "الكسل" تلقائياً.',
            en: 'I thought my issue was "laziness", but the blueprint revealed my foundations (Sleep) were corroded. After fixing the base, the "laziness" vanished.',
            fr: 'Je pensais que mon problème était la paresse...'
        }
    },
    {
        id: 'LOG-089',
        status: { ar: 'قيد العمل', en: 'In Progress', fr: 'En Cours' },
        role: { ar: 'مهندس متدرب', en: 'Apprentice Arch.', fr: 'Apprenti' },
        name: { ar: 'سارة ج.', en: 'Sarah J.', fr: 'Sarah J.' },
        report: {
            ar: 'مرحلة التفكيك كانت مؤلمة. إزالة المعتقدات القديمة تشبه تكسير الجدران. لكن لأول مرة، أرى النور يدخل.',
            en: 'The Deconstruction phase was painful. Removing old beliefs feels like breaking walls. But for the first time, I see light entering.',
            fr: 'La phase de déconstruction était douloureuse.'
        }
    },
    {
        id: 'LOG-112',
        status: { ar: 'مكتمل', en: 'Restored', fr: 'Restauré' },
        role: { ar: 'مستثمر', en: 'Investor', fr: 'Investisseur' },
        name: { ar: 'مايكل ر.', en: 'Michael R.', fr: 'Michael R.' },
        report: {
            ar: 'الكتاب ليس للقراءة، بل للعمل. لقد أعدت تصميم روتيني اليومي بناءً على "معادلة التوازن". النتيجة: ثبات إنشائي هائل.',
            en: 'The book is not for reading, but for work. I redesigned my daily routine based on the "Balance Equation". Result: Massive structural stability.',
            fr: 'Le livre n\'est pas à lire, mais à travailler.'
        }
    }
];

export const THIRTY_DAY_PROGRAM: WeekPlan[] = [
    {
        id: 1,
        title: { ar: 'الأسبوع الأول: الأساسات', en: 'Week 01: Foundation', fr: 'Semaine 01' },
        focus: { ar: 'إعادة بناء الجسد (Body)', en: 'Body Restoration', fr: 'Restauration du Corps' },
        days: [
            { 
                day: 1, 
                title: { ar: 'ضبط الساعة البيولوجية', en: 'The Circadian Reset', fr: 'Réinitialisation du sommeil' }, 
                task: { ar: 'نوم 7-8 ساعات (إجباري)', en: 'Sleep 7-8 hours', fr: 'Dormir 7-8h' }, 
                visualConcept: { ar: 'ساعة رملية تتحول لعمود', en: 'Hourglass turning into a pillar', fr: 'Sablier devenant pilier' },
                aiPrompt: 'Minimalist line art, an hourglass transforming into a solid marble column, architectural sketch style, gold accents on white background, clean lines.',
                isLocked: false 
            },
            { 
                day: 2, 
                title: { ar: 'النظام الهيدروليكي', en: 'Hydraulic System', fr: 'Système Hydraulique' }, 
                task: { ar: 'ماء كامل قبل القهوة', en: 'Drink water before coffee', fr: 'Eau avant café' }, 
                visualConcept: { ar: 'مخطط أنابيب مياه', en: 'Blueprint of water piping', fr: 'Plan de tuyauterie' },
                aiPrompt: 'Architectural blueprint of water piping system, simple geometric lines, white lines on dark grey background, gold water drop accent.',
                isLocked: false 
            },
            { 
                day: 3, 
                title: { ar: 'الحركة الميكانيكية', en: 'Mechanical Movement', fr: 'Mouvement Mécanique' }, 
                task: { ar: '٢٠ دقيقة مشي (بلا هاتف)', en: '20 min Walk (No Phone)', fr: '20 min marche' }, 
                visualConcept: { ar: 'آثار أقدام في الإسمنت', en: 'Footprints in wet cement', fr: 'Empreintes dans le ciment' },
                aiPrompt: 'Top down view of footprints in wet concrete, realistic texture, minimalist composition, soft lighting, neutral beige and grey tones.',
                isLocked: false 
            },
            { 
                day: 4, 
                title: { ar: 'مدخلات الوقود', en: 'Fuel Intake', fr: 'Apport de Carburant' }, 
                task: { ar: 'الطبق الذهبي المتوازن', en: 'The Golden Plate', fr: 'L\'assiette dorée' }, 
                visualConcept: { ar: 'طبق هندسي مقسم', en: 'Geometric divided plate', fr: 'Assiette géométrique' },
                aiPrompt: 'Geometric circle divided into three sections, Mondrian style but using gold, grey, and black, minimalist food symbolism, vector art.',
                isLocked: false 
            },
            { 
                day: 5, 
                title: { ar: 'الطاقة الشمسية', en: 'Solar Energy', fr: 'Énergie Solaire' }, 
                task: { ar: '١٠ دقائق شمس مباشر', en: '10 min direct sunlight', fr: '10 min soleil' }, 
                visualConcept: { ar: 'مزولة شمسية بظل حاد', en: 'Sun dial with sharp shadow', fr: 'Cadran solaire' },
                aiPrompt: 'Minimalist sun dial, stark shadow casting on stone surface, golden hour lighting, high contrast, architectural photography style.',
                isLocked: false 
            },
            { 
                day: 6, 
                title: { ar: 'الصدمة الباردة', en: 'Cold Shock', fr: 'Choc Froid' }, 
                task: { ar: 'دش بارد 30 ثانية', en: '30 sec cold shower', fr: '30 sec douche froide' }, 
                visualConcept: { ar: 'مكعب ثلج بداخله شعلة', en: 'Ice cube with flame inside', fr: 'Glaçon avec flamme' },
                aiPrompt: 'Macro photography of an ice cube, golden flame trapped inside, dark background, cinematic lighting, conceptual art.',
                isLocked: false 
            },
            { 
                day: 7, 
                title: { ar: 'يوم الصيانة', en: 'Maintenance Day', fr: 'Jour de Maintenance' }, 
                task: { ar: 'راحة ومراجعة', en: 'Rest and review', fr: 'Repos et revue' }, 
                visualConcept: { ar: 'لافتة "تحت الصيانة"', en: 'Under Construction sign', fr: 'En construction' },
                aiPrompt: 'Elegant "Closed for Maintenance" sign hanging on a heavy wooden door, brass details, soft shadows, photorealistic.',
                isLocked: false 
            },
        ]
    },
    {
        id: 2,
        title: { ar: 'الأسبوع الثاني: الهيكل', en: 'Week 02: Structure', fr: 'Semaine 02' },
        focus: { ar: 'تدعيم العقل (Mind)', en: 'Mind Reinforcement', fr: 'Renforcement de l\'Esprit' },
        days: [
            { 
                day: 8, 
                title: { ar: 'تفريغ الحمولة', en: 'Brain Dump', fr: 'Vidage de Cerveau' }, 
                task: { ar: 'كتابة كل الأفكار 5 دقائق', en: 'Write everything down (5 min)', fr: 'Tout écrire (5 min)' }, 
                visualConcept: { ar: 'سلة مهملات تتحول لملفات', en: 'Trash bin turning into stacks', fr: 'Poubelle devenant piles' },
                aiPrompt: 'Abstract representation of chaos turning into order, scattered papers flying into a neat stack, black and white line art, gold clips.',
                isLocked: false 
            },
            { 
                day: 9, 
                title: { ar: 'قاعدة الثلاثة', en: 'The Rule of 3', fr: 'La Règle de 3' }, 
                task: { ar: '3 أولويات فقط', en: 'Identify only 3 priorities', fr: '3 priorités' }, 
                visualConcept: { ar: 'هرم من الأعلى', en: 'Pyramid from above', fr: 'Pyramide vue de haut' },
                aiPrompt: 'Golden pyramid viewed from directly above, black background, geometric minimalism, glowing edges.',
                isLocked: false 
            },
            { 
                day: 10, 
                title: { ar: 'العزل الصوتي', en: 'Insulation', fr: 'Isolation' }, 
                task: { ar: 'ساعة بلا هاتف', en: '1 Hour No-Phone', fr: '1h sans téléphone' }, 
                visualConcept: { ar: 'هاتف مغلف بالفوم', en: 'Phone in acoustic foam', fr: 'Téléphone dans la mousse' },
                aiPrompt: 'Smartphone encased in grey acoustic foam, studio lighting, soft textures, silence concept, minimalist object photography.',
                isLocked: false 
            },
            { 
                day: 11, 
                title: { ar: 'إزالة الأحمال الميتة', en: 'Dead Load Removal', fr: 'Retrait Charges Mortes' }, 
                task: { ar: 'إلغاء متابعة 5 مصادر سلبية', en: 'Unfollow 5 negative sources', fr: 'Se désabonner de 5 sources' }, 
                visualConcept: { ar: 'إزميل ينحت صخراً', en: 'Chisel chipping stone', fr: 'Ciseau taillant la pierre' },
                aiPrompt: 'Close up of a chisel chipping away excess stone, marble texture, dust particles floating in light, gold chisel tip.',
                isLocked: false 
            },
            { 
                day: 12, 
                title: { ar: 'دعامة القراءة', en: 'The Reading Beam', fr: 'Poutre de Lecture' }, 
                task: { ar: 'قراءة 10 صفحات ورقية', en: 'Read 10 physical pages', fr: 'Lire 10 pages' }, 
                visualConcept: { ar: 'كتاب مفتوح كسقف', en: 'Open book as roof', fr: 'Livre ouvert comme toit' },
                aiPrompt: 'Open book forming a tent or roof structure, protecting a small flame underneath, surreal minimalist art, warm lighting.',
                isLocked: false 
            },
            { 
                day: 13, 
                title: { ar: 'القرار المؤجل', en: 'Delayed Decision', fr: 'Décision Retardée' }, 
                task: { ar: 'لا تقل نعم فوراً', en: 'Don\'t say Yes immediately', fr: 'Ne dites pas oui tout de suite' }, 
                visualConcept: { ar: 'رمز توقف حجري', en: 'Stone pause symbol', fr: 'Symbole pause en pierre' },
                aiPrompt: 'Pause symbol carved into grey stone, ancient relic style, moss or gold filling the carving, textured.',
                isLocked: false 
            },
            { 
                day: 14, 
                title: { ar: 'صيانة الهيكل', en: 'Structural Maintenance', fr: 'Maintenance Structurelle' }, 
                task: { ar: 'مراجعة الوضوح الذهني', en: 'Review mental clarity', fr: 'Revue clarté mentale' }, 
                visualConcept: { ar: 'مسح زجاج مغبر', en: 'Cleaning dusty window', fr: 'Nettoyage vitre poussiéreuse' },
                aiPrompt: 'Hand wiping a dirty glass window, revealing a clear blue sky and golden sun, first person perspective, realistic.',
                isLocked: false 
            },
        ]
    },
    {
        id: 3,
        title: { ar: 'الأسبوع الثالث: الأنظمة', en: 'Week 03: Systems', fr: 'Semaine 03' },
        focus: { ar: 'التوازن النفسي (Emotional)', en: 'Emotional Balance', fr: 'Équilibre Émotionnel' },
        days: [
            { 
                day: 15, 
                title: { ar: 'التهوية', en: 'Ventilation', fr: 'Ventilation' }, 
                task: { ar: 'تنفس الصندوق 5 دقائق', en: '5 min box breathing', fr: '5 min respiration carrée' }, 
                visualConcept: { ar: 'نافذة مفتوحة وستائر', en: 'Open window with curtains', fr: 'Fenêtre ouverte' },
                aiPrompt: 'Minimalist open window, white sheer curtains blowing in wind, soft sunlight entering a dark room, peaceful atmosphere.',
                isLocked: false 
            },
            { 
                day: 16, 
                title: { ar: 'الترقيم', en: 'Labeling', fr: 'Étiquetage' }, 
                task: { ar: 'سمّ شعورك', en: 'Name your emotion', fr: 'Nommez votre émotion' }, 
                visualConcept: { ar: 'بطاقة متحف تحت لوحة', en: 'Museum tag on abstract art', fr: 'Étiquette de musée' },
                aiPrompt: 'Abstract swirl of grey smoke, a small gold museum label underneath reading "ANXIETY", gallery lighting, high contrast.',
                isLocked: false 
            },
            { 
                day: 17, 
                title: { ar: 'قوة الرفض', en: 'The Power of No', fr: 'Le Pouvoir du Non' }, 
                task: { ar: 'ارفض طلباً واحداً', en: 'Decline one request', fr: 'Refuser une demande' }, 
                visualConcept: { ar: 'جدار حصن وبوابة', en: 'Fortress wall with gate', fr: 'Mur de forteresse' },
                aiPrompt: 'Minimalist high stone wall, closed iron gate, impenetrable, birds eye view, architectural rendering style.',
                isLocked: false 
            },
            { 
                day: 18, 
                title: { ar: 'توصيل الأسلاك', en: 'Connection Wiring', fr: 'Câblage de Connexion' }, 
                task: { ar: 'اتصال صوتي بصديق', en: 'Voice call a friend', fr: 'Appel vocal ami' }, 
                visualConcept: { ar: 'هاتف علب صفيح', en: 'Tin can phone', fr: 'Téléphone boîte de conserve' },
                aiPrompt: 'Vintage tin can phone, string made of glowing gold fiber, black background, connection concept, studio shot.',
                isLocked: false 
            },
            { 
                day: 19, 
                title: { ar: 'تقليل الاحتكاك', en: 'Friction Reduction', fr: 'Réduction de Friction' }, 
                task: { ar: 'جهز للغد الليلة', en: 'Prep tomorrow tonight', fr: 'Préparer demain ce soir' }, 
                visualConcept: { ar: 'قطعة دومينو جاهزة', en: 'Domino piece ready to fall', fr: 'Domino prêt à tomber' },
                aiPrompt: 'Single black domino piece standing perfectly still, gold dots, reflection on glass surface, anticipation concept.',
                isLocked: false 
            },
            { 
                day: 20, 
                title: { ar: 'تصريف النظام', en: 'System Flush', fr: 'Vidange Système' }, 
                task: { ar: 'اكتب عن ضغينة واتركها', en: 'Journal resentment & let go', fr: 'Journal rancune' }, 
                visualConcept: { ar: 'أنبوب تصريف يتحول لماء صافي', en: 'Pipe clearing water', fr: 'Tuyau eau claire' },
                aiPrompt: 'Water flowing, transitioning from murky grey to crystal clear, sparkles of gold in the clear water, dynamic liquid simulation.',
                isLocked: false 
            },
            { 
                day: 21, 
                title: { ar: 'فحص الضغط', en: 'Pressure Check', fr: 'Contrôle Pression' }, 
                task: { ar: 'فحص المشاعر', en: 'Emotional check-in', fr: 'Bilan émotionnel' }, 
                visualConcept: { ar: 'عداد ضغط نحاسي', en: 'Vintage pressure gauge', fr: 'Manomètre vintage' },
                aiPrompt: 'Vintage brass pressure gauge, needle pointing to the center, steam punk aesthetic, macro photography.',
                isLocked: false 
            },
        ]
    },
    {
        id: 4,
        title: { ar: 'الأسبوع الرابع: التصميم الداخلي', en: 'Week 04: Design', fr: 'Semaine 04' },
        focus: { ar: 'التأسيس الروحي (Spirit)', en: 'Spiritual Interior', fr: 'Intérieur Spirituel' },
        days: [
            { 
                day: 22, 
                title: { ar: 'شعاع الامتنان', en: 'Gratitude Beam', fr: 'Faisceau de Gratitude' }, 
                task: { ar: '3 أشياء ممتن لها', en: '3 Gratitude items', fr: '3 Gratitudes' }, 
                visualConcept: { ar: '3 أعمدة نور', en: '3 pillars of light', fr: '3 piliers de lumière' },
                aiPrompt: 'Three distinct vertical beams of light piercing through fog, night scene, sci-fi minimalist architecture, ethereal.',
                isLocked: false 
            },
            { 
                day: 23, 
                title: { ar: 'الفراغ', en: 'The Void', fr: 'Le Vide' }, 
                task: { ar: '10 دقائق صمت', en: '10 min silence', fr: '10 min silence' }, 
                visualConcept: { ar: 'غرفة بيضاء فارغة', en: 'Empty white room', fr: 'Chambre blanche vide' },
                aiPrompt: 'Vast empty white room, concrete floor, single wooden chair in center, soft diffuse lighting, minimalism, zen.',
                isLocked: false 
            },
            { 
                day: 24, 
                title: { ar: 'الخدمة', en: 'Acts of Service', fr: 'Actes de Service' }, 
                task: { ar: 'خدمة مجهولة', en: 'Anonymous kindness', fr: 'Bonté anonyme' }, 
                visualConcept: { ar: 'يد تعطي عملة ذهبية', en: 'Hand passing gold coin', fr: 'Main donnant pièce or' },
                aiPrompt: 'Hand holding a glowing gold coin, fading into shadow, mystery, giving concept, chiaroscuro lighting.',
                isLocked: false 
            },
            { 
                day: 25, 
                title: { ar: 'التأريض', en: 'Nature Grounding', fr: 'Ancrage Nature' }, 
                task: { ar: 'لمس عنصر طبيعي', en: 'Touch natural element', fr: 'Toucher élément naturel' }, 
                visualConcept: { ar: 'يد تلمس شجرة', en: 'Hand touching bark', fr: 'Main touchant écorce' },
                aiPrompt: 'Close up of human hand touching detailed tree bark, contrast between smooth skin and rough texture, natural lighting.',
                isLocked: false 
            },
            { 
                day: 26, 
                title: { ar: 'المرآة', en: 'The Mirror', fr: 'Le Miroir' }, 
                task: { ar: 'أنا قيد الإنشاء', en: 'Say: I am under construction', fr: 'Dire: Je suis en construction' }, 
                visualConcept: { ar: 'مرآة تعكس مخططاً', en: 'Mirror reflecting blueprint', fr: 'Miroir reflétant plan' },
                aiPrompt: 'Ornate mirror frame, reflection shows an architectural blueprint of a human head, surreal art, magical realism.',
                isLocked: false 
            },
            { 
                day: 27, 
                title: { ar: 'السؤال الوجودي', en: 'Existential Question', fr: 'Question Existentielle' }, 
                task: { ar: 'ما المهم حقاً؟', en: 'What truly matters?', fr: 'Qu\'est-ce qui compte ?' }, 
                visualConcept: { ar: 'بوصلة للشمال', en: 'Compass pointing North', fr: 'Boussole pointant Nord' },
                aiPrompt: 'Antique gold compass on a black map, needle pointing straight up, sharp focus, exploration theme.',
                isLocked: false 
            },
            { 
                day: 28, 
                title: { ar: 'الأثر', en: 'The Legacy', fr: 'L\'Héritage' }, 
                task: { ar: 'ازرع بذرة', en: 'Plant a seed', fr: 'Planter une graine' }, 
                visualConcept: { ar: 'نبتة تخرج من خرسانة', en: 'Sprout from concrete', fr: 'Pousse dans le béton' },
                aiPrompt: 'Green sprout growing out of a crack in grey concrete, gold light hitting the leaves, resilience concept, macro.',
                isLocked: false 
            },
            { 
                day: 29, 
                title: { ar: 'الفحص النهائي', en: 'Final Inspection', fr: 'Inspection Finale' }, 
                task: { ar: 'مراجعة الـ 30 يوماً', en: 'Review 30 days', fr: 'Revue 30 jours' }, 
                visualConcept: { ar: 'قائمة فحص مختومة', en: 'Stamped checklist', fr: 'Liste de contrôle tamponnée' },
                aiPrompt: 'Clipboard with checklist, wax seal stamp in gold at the bottom, desk surface, professional atmosphere.',
                isLocked: false 
            },
            { 
                day: 30, 
                title: { ar: 'الافتتاح الكبير', en: 'The Grand Opening', fr: 'La Grande Ouverture' }, 
                task: { ar: 'احتفل بالهيكل الجديد', en: 'Celebrate new structure', fr: 'Célébrer nouvelle structure' }, 
                visualConcept: { ar: 'قص شريط ومقص ذهبي', en: 'Ribbon cutting ceremony', fr: 'Cérémonie ruban' },
                aiPrompt: 'Scissors cutting a gold ribbon, silhouette of a strong human figure in background, confetti made of geometric shapes, celebration.',
                isLocked: false 
            },
        ]
    }
];

export const THEORY_CARDS: DayPlan[] = [
    {
        day: 1,
        title: { ar: 'قانون العمارة العصبية', en: 'Neuroarchitecture Rule', fr: 'Règle de Neuroarchitecture' },
        task: { ar: 'الإنسان يصمم مبناه... لكن المبنى يعيد تشكيل الإنسان.', en: 'We shape our buildings; thereafter they shape us.', fr: 'Nous façonnons nos bâtiments; ensuite ils nous façonnent.' },
        visualConcept: { ar: 'شخص يرسم مخططاً، والمخطط يرسمه', en: 'Person drawing blueprint, blueprint drawing person', fr: 'Personne dessinant un plan' },
        aiPrompt: 'Surreal conceptual art, a human hand drawing an architectural blueprint, while the blueprint lines rise up to form the human hand, cyclic creation, minimal aesthetic, 8K.',
        isLocked: false
    },
    {
        day: 2,
        title: { ar: 'الهندسة الداخلية', en: 'Internal Engineering', fr: 'Ingénierie Interne' },
        task: { ar: 'الخلل ليس فيك... الخلل في هندستك الداخلية.', en: 'The flaw is not in you... it is in your internal engineering.', fr: 'Le défaut n\'est pas en vous...' },
        visualConcept: { ar: 'مخطط داخلي معقد', en: 'Complex internal blueprint', fr: 'Plan interne complexe' },
        aiPrompt: 'X-ray view of human chest revealing complex gold mechanical gears and architectural trusses instead of organs, symbolic engineering, dark background, cinematic.',
        isLocked: false
    },
    {
        day: 3,
        title: { ar: 'معادلة التوازن', en: 'Balance Equation', fr: 'Équation d\'Équilibre' },
        task: { ar: 'جسد قوي + عقل ضعيف = انهيار نفسي.', en: 'Strong Body + Weak Mind = Psychological Collapse.', fr: 'Corps fort + Esprit faible = Effondrement.' },
        visualConcept: { ar: 'ميزان معماري', en: 'Architectural scale', fr: 'Échelle architecturale' },
        aiPrompt: 'Minimalist architectural scale unbalanced, one side holding a stone (body) the other a feather (mind), causing a structural crack in the base, high contrast.',
        isLocked: false
    },
    {
        day: 4,
        title: { ar: 'الصيانة', en: 'Maintenance', fr: 'Maintenance' },
        task: { ar: 'الهيكل يحتاج إلى صيانة، لا إلى لوم.', en: 'The structure needs maintenance, not blame.', fr: 'La structure a besoin de maintenance.' },
        visualConcept: { ar: 'يد تصلح شرخاً', en: 'Hand repairing crack', fr: 'Main réparant fissure' },
        aiPrompt: 'Close up of a hand filling a gold crack in white marble (Kintsugi style), symbolizing compassionate maintenance, macro photography, 8K.',
        isLocked: false
    },
    {
        day: 5,
        title: { ar: 'اللغة البصرية', en: 'Visual Language', fr: 'Langage Visuel' },
        task: { ar: 'العقل يفهم الهندسة قبل أن يفهم اللغة.', en: 'The mind understands geometry before it understands language.', fr: 'L\'esprit comprend la géométrie.' },
        visualConcept: { ar: 'أشكال هندسية تخاطب العقل', en: 'Geometric shapes speaking to mind', fr: 'Formes géométriques' },
        aiPrompt: 'Glowing geometric shapes (circle, square, triangle) floating towards a human brain, neural pathways lighting up in recognition, sci-fi educational style.',
        isLocked: false
    },
    {
        day: 6,
        title: { ar: 'الهيكل غير المكتمل', en: 'Incomplete Structure', fr: 'Structure Incomplète' },
        task: { ar: 'سعادة الإنسان غير المتكامل مؤقتة... تتبخر مع أول صدمة.', en: 'Happiness of the incomplete human is temporary... evaporating with the first shock.', fr: 'Bonheur temporaire.' },
        visualConcept: { ar: 'مبنى جميل بلا سقف', en: 'Beautiful building, no roof', fr: 'Beau bâtiment sans toit' },
        aiPrompt: 'A stunning marble facade of a building standing alone in a desert, but behind it is empty scaffolding, fragile and hollow, dramatic lighting, 8K.',
        isLocked: false
    },
    {
        day: 7,
        title: { ar: 'المخطط', en: 'The Plan', fr: 'Le Plan' },
        task: { ar: 'أنت لست كتلة عشوائية... أنت مخطط هندسي ينتظر التنفيذ.', en: 'You are not random mass... you are a blueprint waiting to be executed.', fr: 'Vous êtes un plan.' },
        visualConcept: { ar: 'مخطط ملفوف بانتظار الفتح', en: 'Rolled blueprint waiting', fr: 'Plan roulé' },
        aiPrompt: 'A pristine rolled architectural blueprint with a golden seal, resting on a rough wooden table, shaft of light hitting it, anticipation, dust motes.',
        isLocked: false
    }
];
