
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
        fr: 'Ce projet est un plan\'exécution pour la restructuration.'
    }
};

// --- UPDATED FUNNEL CONTENT TO MATCH BLUEPRINT ---
export const LANDING_CONTENT = {
  header: {
      left: { en: 'HUMAN ARCHITECTURE™', ar: 'عمارة الإنسان™' },
      right: { en: 'THE BLUEPRINT', ar: 'المخطط' },
      join: { en: 'JOIN', ar: 'انضمام' }
  },
  warning: {
      en: 'WARNING: This is not traditional self-help.',
      ar: 'تحذير: هذا ليس تطوير ذات تقليدي.'
  },
  hero: {
    headline: { en: 'Stop Fixing Cracks.\nRe-Pour the Foundation.', ar: 'توقف عن ترميم الشقوق.\nأعد صب الأساسات.' },
    subheadline: { 
        en: 'The only engineering-grade system designed to restructure your mind, body, and internal systems — without motivation, hacks, or self-help hype.', 
        ar: 'النظام الهندسي الوحيد المصمم لإعادة هيكلة عقلك، جسدك، وأنظمتك الداخلية — بدون حيل تحفيزية أو ضجيج تطوير الذات.' 
    },
    support: { en: 'Built on Human Architecture protocols, not inspirational psychology.', ar: 'مبني على بروتوكولات هندسة الإنسان، وليس علم النفس التحفيزي.' },
    videoLabel: { en: 'WATCH: How the Human Architecture System Works', ar: 'شاهد: كيف يعمل نظام عمارة الإنسان' },
    videoDuration: { en: 'Duration: 3:45', ar: 'المدة: 3:45' },
    cta: { en: 'YES — I Want to Rebuild My Internal Structure', ar: 'نعم — أريد إعادة بناء هيكلي الداخلي' },
    guarantee: { en: '30-Day Money-Back Guarantee', ar: 'ضمان استعادة الأموال لمدة 30 يوماً' }
  },
  problem: {
    headline: { en: 'You Are Not Broken.\nYou Are Carrying Load on a Failing Structure.', ar: 'أنت لست مكسوراً.\nأنت تحمل أحمالاً على هيكل متداعٍ.' },
    body: { 
        en: 'Most people try to fix their lives by adding more effort. More discipline. More routines. More optimization. But effort applied to a weak structure doesn’t fix anything. It accelerates collapse.',
        ar: 'معظم الناس يحاولون إصلاح حياتهم بزيادة الجهد. مزيد من الانضباط. مزيد من الروتين. لكن الجهد المبذول على هيكل ضعيف لا يصلح شيئاً. بل يسرع الانهيار.'
    },
    emphasis: { en: 'You don’t need another habit. You need structural correction.', ar: 'أنت لا تحتاج عادة جديدة. أنت تحتاج تصحيحاً إنشائياً.' }
  },
  failure: {
      headline: { en: 'Why Traditional Self-Help Keeps You Stuck', ar: 'لماذا يبقيك تطوير الذات التقليدي عالقاً' },
      bullets: [
          { en: 'It treats symptoms in isolation', ar: 'يعالج الأعراض بشكل منفصل' },
          { en: 'It ignores load distribution', ar: 'يتجاهل توزيع الأحمال' },
          { en: 'It relies on motivation', ar: 'يعتمد على التحفيز المؤقت' },
          { en: 'It collapses under pressure', ar: 'ينهار تحت الضغط' }
      ],
      closing: { en: 'Humans don’t fail randomly. They fail structurally.', ar: 'البشر لا يفشلون عشوائياً. هم يفشلون إنشائياً.' }
  },
  solution: {
      headline: { en: 'What If Your Life Worked Like a Building?', ar: 'ماذا لو كانت حياتك تعمل مثل المبنى؟' },
      body: { 
          en: 'Every high-performance structure is designed to carry load. So is the human system. When pressure increases, a structure must either: redistribute load, reinforce foundations, or collapse.',
          ar: 'كل مبنى عالي الأداء مصمم لحمل الأوزان. وكذلك النظام البشري. عندما يزداد الضغط، يجب على الهيكل إما: إعادة توزيع الحمل، تدعيم الأساسات، أو الانهيار.' 
      }
  },
  pillars: {
      title: { en: 'The Four Load-Bearing Pillars', ar: 'الأعمدة الأربعة الحاملة' },
      items: [
          { title: { en: 'Foundation', ar: 'الأساس' }, desc: { en: 'Body', ar: 'الجسد' } },
          { title: { en: 'Frame', ar: 'الإطار' }, desc: { en: 'Mind', ar: 'العقل' } },
          { title: { en: 'Systems', ar: 'الأنظمة' }, desc: { en: 'Emotional Regulation', ar: 'التنظيم العاطفي' } },
          { title: { en: 'Spire', ar: 'القمة' }, desc: { en: 'Direction & Meaning', ar: 'الاتجاه والمعنى' } }
      ],
      insight: { en: 'When one pillar weakens, stress transfers — silently — until failure appears.', ar: 'عندما يضعف عمود واحد، ينتقل الضغط — بصمت — حتى يظهر الفشل.' }
  },
  journey: {
      title: { en: 'Your Path Through the Human Architecture™ System', ar: 'مسارك عبر نظام عمارة الإنسان™' },
      intro: { en: 'This is not a collection of books. It is a progressive structural solution.', ar: 'هذه ليست مجموعة كتب. هذا حل إنشائي متدرج.' },
      steps: [
          { 
              step: '01', 
              name: { en: 'DIAGNOSE', ar: 'التشخيص' }, 
              product: { en: 'The Blueprint', ar: 'المخطط' },
              purpose: { en: 'Structural Awareness', ar: 'الوعي الهيكلي' },
              why: { en: 'Before fixing anything, you must understand where your structure is failing and why.', ar: 'قبل إصلاح أي شيء، يجب أن تفهم أين يفشل هيكلك ولماذا.' },
              outcome: { en: 'Clarity before correction.', ar: 'الوضوح قبل التصحيح.' }
          },
          { 
              step: '02', 
              name: { en: 'STABILIZE', ar: 'التثبيت' }, 
              product: { en: '28-Day Foundation Program', ar: 'برنامج التأسيس 28 يوم' },
              purpose: { en: 'Stabilization', ar: 'الاستقرار' },
              why: { en: 'When a system is under stress, optimization makes collapse worse. Stability comes first.', ar: 'عندما يكون النظام تحت الضغط، التحسين يجعل الانهيار أسوأ. الاستقرار يأتي أولاً.' },
              outcome: { en: 'Stability fixes the present.', ar: 'الاستقرار يصلح الحاضر.' }
          },
          { 
              step: '03', 
              name: { en: 'PREVENT', ar: 'الوقاية' }, 
              product: { en: '30-Day Architectural Reset', ar: 'إعادة الضبط المعماري 30 يوم' },
              purpose: { en: 'Structural Prevention', ar: 'الوقاية الهيكلية' },
              why: { en: 'Stability alone does not prevent relapse. Design flaws must be corrected.', ar: 'الاستقرار وحده لا يمنع الانتكاس. يجب تصحيح عيوب التصميم.' },
              outcome: { en: 'Structure protects the future.', ar: 'الهيكل يحمي المستقبل.' }
          },
          { 
              step: '04', 
              name: { en: 'REDESIGN', ar: 'إعادة التصميم' }, 
              product: { en: '30-Day Accelerator', ar: 'المسرع 30 يوم' },
              purpose: { en: 'Structural Redesign', ar: 'إعادة التصميم الهيكلي' },
              why: { en: 'High performance requires a structure built for pressure — not comfort.', ar: 'الأداء العالي يتطلب هيكلاً مبنياً للضغط — ليس للراحة.' },
              outcome: { en: 'Design for load, not motivation.', ar: 'صمم للأحمال، ليس للتحفيز.' }
          }
      ]
  },
  testimonials: {
      headline: { en: 'Field Inspection Reports', ar: 'تقارير ما بعد الترميم' },
      list: [
          {
              id: 'rep-01',
              name: { en: 'Sarah K. - Senior Executive', ar: 'سارة ك. - مديرة تنفيذية' },
              before: { en: 'Structural Fatigue: Near Collapse.', ar: 'الحالة السابقة: إجهاد هيكلي وانهيار وشيك.' },
              after: { en: 'Reinforced foundation handled 2x workload this quarter.', ar: 'النتيجة: القواعد المدعمة تحملت ضعف العمل هذا الربع.' },
              status: { en: 'STABLE', ar: 'مستقر' }
          },
          {
              id: 'rep-02',
              name: { en: 'Ahmed M. - Entrepreneur', ar: 'أحمد م. - رائد أعمال' },
              before: { en: 'Foundation cracks due to chronic stress.', ar: 'الحالة السابقة: شروخ في الأساس بسبب الضغط المزمن.' },
              after: { en: 'Repoured foundation. Stress now converting to kinetic energy.', ar: 'النتيجة: تم إعادة الصب. الضغط يتحول الآن لطاقة حركية.' },
              status: { en: 'OPTIMIZED', ar: 'أداء عالي' }
          }
      ]
  },
  faq: {
      headline: { en: 'Technical Specifications (FAQ)', ar: 'المواصفات التقنية (أسئلة شائعة)' },
      items: [
          {
              q: { en: 'Is this suitable for beginners?', ar: 'هل هذا مناسب للمبتدئين؟' },
              a: { en: 'Yes. The Blueprint assumes no prior structural knowledge. It starts from ground zero.', ar: 'نعم. المخطط يفترض عدم وجود معرفة سابقة. نبدأ من نقطة الصفر (الحفر).' }
          },
          {
              q: { en: 'Digital vs Print: Which is better?', ar: 'أيهما أفضل: الديجيتال أم المطبوع؟' },
              a: { en: 'The printed book is designed as a physical artifact for deep work. Digital is for quick reference.', ar: 'الكتاب المطبوع مصمم كأداة مادية للعمل العميق. الديجيتال للمراجع السريعة.' }
          },
          {
              q: { en: 'How much time is required daily?', ar: 'كم من الوقت يتطلب يومياً؟' },
              a: { en: 'The Maintenance Protocol requires 15 minutes AM and 15 minutes PM.', ar: 'بروتوكول الصيانة يتطلب 15 دقيقة صباحاً و 15 دقيقة مساءً.' }
          }
      ]
  },
  stack: {
      headline: { en: 'What’s Included in the Complete System', ar: 'ماذا يتضمن النظام الكامل' },
      items: [
          { name: { en: 'The Blueprint (Book)', ar: 'كتاب المخطط' }, desc: { en: 'Understand the architecture of collapse before repair.', ar: 'افهم هندسة الانهيار قبل الإصلاح.' } },
          { name: { en: '28-Day Foundation Workbook', ar: 'كراسة التأسيس 28 يوم' }, desc: { en: 'Stabilize your system and stop internal overload.', ar: 'ثبت نظامك وأوقف الحمل الزائد الداخلي.' } },
          { name: { en: '30-Day Architectural Reset', ar: 'إعادة الضبط المعماري' }, desc: { en: 'Correct structural design errors and prevent relapse.', ar: 'صحح أخطاء التصميم وامنع الانتكاس.' } },
          { name: { en: '30-Day Accelerator (Advanced)', ar: 'المسرع المتقدم' }, desc: { en: 'Redesign your internal structure for performance under pressure.', ar: 'أعد تصميم هيكلك للأداء تحت الضغط.' } }
      ]
  },
  qualifiers: {
      forYou: {
          title: { en: 'This Is For You If:', ar: 'هذا لك إذا:' },
          items: [
              { en: 'You’re capable but exhausted', ar: 'أنت قادر لكنك منهك' },
              { en: 'You want systems, not motivation', ar: 'تريد أنظمة، لا تحفيز' },
              { en: 'You respect logic over hype', ar: 'تحترم المنطق أكثر من الضجيج' },
              { en: 'You’re ready for responsibility', ar: 'أنت مستعد للمسؤولية' }
          ]
      },
      notForYou: {
          title: { en: 'This Is NOT For You If:', ar: 'هذا ليس لك إذا:' },
          items: [
              { en: 'You want quick fixes', ar: 'تريد حلولاً سريعة' },
              { en: 'You avoid discomfort', ar: 'تتجنب عدم الراحة' },
              { en: 'You want inspiration without structure', ar: 'تريد إلهاماً بدون هيكل' }
          ]
      }
  },
  finalCta: {
      headline: { en: 'You Don’t Need to Change Your Life.\nYou Need a Structure That Can Hold It.', ar: 'لا تحتاج لتغيير حياتك.\nتحتاج لهيكل يمكنه حملها.' },
      button: { en: 'BEGIN THE REBUILD', ar: 'ابدأ إعادة البناء' },
      trust: { en: 'Secure Checkout • Instant Access • 30-Day Guarantee', ar: 'دفع آمن • وصول فوري • ضمان 30 يوم' }
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
    // Updated image to a reliable concrete structure
    image: 'https://images.unsplash.com/photo-1588557132645-ff567110cafd?q=80&w=2070&auto=format&fit=crop',
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
