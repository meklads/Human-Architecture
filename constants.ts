
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
              why: { en: 'When a system is under stress, optimization makes collapse worse. Stability comes first.', ar: 'عندما يكون النظام تحت الضغط, التحسين يجعل الانهيار أسوأ. الاستقرار يأتي أولاً.' },
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
    image: 'https://images.unsplash.com/photo-1590004953392-5aba2e78b336?q=80&w=2070&auto=format&fit=crop',
    blueprintImage: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2070&auto=format&fit=crop'
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
        suffix: { ar: 'Ref: Specs-01', en: 'Ref: Specs-01' }
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

// --- MISSING EXPORTS ADDED BELOW ---

/**
 * Missing: BLOG_POSTS
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    category: 'mind',
    title: { ar: 'هندسة النوم', en: 'The Architecture of Sleep', fr: 'Architecture du Sommeil' },
    date: '2024-03-20',
    excerpt: { ar: 'كيف تصمم ليلة تعيد بناء خلاياك.', en: 'How to design a night that rebuilds your cells.', fr: 'Concevoir une nuit réparatrice.' },
    content: { 
        ar: '<p>النوم ليس مجرد راحة، بل هو عملية ترميم إنشائية مكثفة. في هذا المقال نناقش بروتوكولات تحسين جودة النوم للهيكل البشري.</p>', 
        en: '<p>Sleep is not merely rest; it is an intensive structural restoration process. In this article, we discuss protocols to optimize sleep quality for the human frame.</p>', 
        fr: '<p>Le sommeil est une restauration structurelle.</p>' 
    },
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2060&auto=format&fit=crop'
  },
  {
    id: 'post-2',
    category: 'body',
    title: { ar: 'صب الأساسات', en: 'Pouring the Foundations', fr: 'Coulage des bases' },
    date: '2024-03-15',
    excerpt: { ar: 'لماذا يفشل جسدك تحت الضغط؟', en: 'Why does your body fail under pressure?', fr: 'Pourquoi le corps échoue sous pression ?' },
    content: { 
        ar: '<p>كلما زاد الحمل، زادت الحاجة لأساس صلب. سنتناول كيفية تقوية القواعد الجسدية لتحمل ضغوط الحياة الحديثة.</p>', 
        en: '<p>As the load increases, the need for a solid base grows. We explore how to reinforce physical foundations to withstand modern life pressures.</p>', 
        fr: '<p>Renforcer les bases physiques.</p>' 
    },
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop'
  }
];

/**
 * Missing: PRODUCTS
 */
export const PRODUCTS: Product[] = [
  {
    id: 'book_digital',
    category: 'book',
    name: { ar: 'المخطط (نسخة رقمية)', en: 'The Blueprint (Digital)', fr: 'Le Plan (Digital)' },
    description: { ar: 'النسخة الرقمية الكاملة للمخطط لبدء التشخيص فوراً.', en: 'Full digital version of the blueprint to start diagnosis immediately.', fr: 'Version digitale complète.' },
    price: 29,
    type: 'digital',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'book_print',
    category: 'book',
    name: { ar: 'المخطط (نسخة مطبوعة)', en: 'The Blueprint (Hardcover)', fr: 'Le Plan (Livre)' },
    description: { ar: 'نسخة فاخرة مجلدة من المخطط للعمل العميق المستمر.', en: 'Premium hardcover edition of the blueprint for sustained deep work.', fr: 'Édition reliée premium.' },
    price: 49,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop'
  },
  {
      id: 'workbook_print',
      category: 'book',
      name: { ar: 'كراسة التأسيس 28 يوم', en: '28-Day Workbook', fr: 'Cahier de 28 jours' },
      description: { ar: 'تمارين عملية يومية لإعادة صب قواعد حياتك.', en: 'Daily practical drills to re-pour your life foundations.', fr: 'Exercices pratiques quotidiens.' },
      price: 27,
      type: 'physical',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop'
  },
  {
      id: 'system_hybrid',
      category: 'course',
      name: { ar: 'النظام الهجين المتكامل', en: 'Hybrid Integration System', fr: 'Système Hybride' },
      description: { ar: 'الوصول الكامل للنظام التفاعلي والكتب الرقمية والمطبوعة.', en: 'Full access to interactive system, digital and print books.', fr: 'Accès complet au système.' },
      price: 97,
      type: 'hybrid',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  {
    id: 'bundle_master',
    category: 'bundle',
    name: { ar: 'باقة المعماري الكاملة', en: 'Master Architect Bundle', fr: 'Pack Master' },
    description: { ar: 'كل شيء تحتاجه لإعادة بناء حياتك من الأساس.', en: 'Everything you need to rebuild your life from the foundation up.', fr: 'Tout pour reconstruire.' },
    price: 397,
    type: 'hybrid',
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2070&auto=format&fit=crop'
  }
];

/**
 * Missing: ART_PRODUCTS
 */
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

/**
 * Missing: THIRTY_DAY_PROGRAM
 */
export const THIRTY_DAY_PROGRAM: WeekPlan[] = [
  {
    id: 1,
    title: { ar: 'الأسبوع 1: فحص التربة', en: 'Week 1: Soil Survey', fr: 'Semaine 1: Enquête' },
    focus: { ar: 'تحديد التصدعات الأساسية', en: 'Identifying core fractures', fr: 'Identifier les fissures' },
    days: [
      { day: 1, title: { ar: 'بداية الهدم', en: 'Demolition Start', fr: 'Début démolition' }, task: { ar: 'حدد 3 عادات تعيق بناءك وهدمها فوراً.', en: 'Identify 3 habits hindering your structure and demolish them immediately.', fr: '3 habitudes à éliminer.' }, isLocked: false, bookPageRef: 12 },
      { day: 2, title: { ar: 'تحليل الأحمال', en: 'Load Analysis', fr: 'Analyse de charge' }, task: { ar: 'راقب مستويات التوتر اليومية وحدد مصدر الثقل.', en: 'Monitor daily stress levels and identify the source of load.', fr: 'Surveiller le stress.' }, isLocked: false, bookPageRef: 18 }
    ]
  },
  {
      id: 2,
      title: { ar: 'الأسبوع 2: صب القواعد', en: 'Week 2: Pouring Base', fr: 'Semaine 2: Coulage' },
      focus: { ar: 'تثبيت الأساس الجسدي', en: 'Stabilizing physical foundation', fr: 'Stabilisation physique' },
      days: [
          { day: 8, title: { ar: 'خرسانة النوم', en: 'Sleep Concrete', fr: 'Béton du sommeil' }, task: { ar: 'تطبيق بروتوكول 10-3-2-1 للنوم العميق.', en: 'Apply 10-3-2-1 protocol for deep sleep.', fr: 'Protocole 10-3-2-1.' }, isLocked: true, bookPageRef: 45 }
      ]
  }
];

/**
 * Missing: THEORY_CARDS
 */
export const THEORY_CARDS: DayPlan[] = [
  {
    day: 1,
    title: { ar: 'قانون الثبات', en: 'Law of Stability', fr: 'Loi de Stabilité' },
    task: { ar: 'لا يمكن البناء على أرض متحركة. ابدأ بتثبيت موقعك الروحي.', en: 'You cannot build on shifting ground. Start by stabilizing your spiritual site.', fr: 'Pas de construction sur sol mouvant.' },
    isLocked: false
  },
  {
    day: 2,
    title: { ar: 'قانون توزيع الأحمال', en: 'Law of Load Distribution', fr: 'Loi de Distribution' },
    task: { ar: 'الضغط غير الموزع يؤدي للانهيار. تعلم كيف تعزل المهام.', en: 'Undistributed pressure leads to collapse. Learn how to isolate tasks.', fr: 'Pression mal répartie = effondrement.' },
    isLocked: false
  }
];
