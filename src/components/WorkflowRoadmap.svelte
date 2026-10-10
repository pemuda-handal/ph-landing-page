<script lang="ts">
  interface Props {
    locale?: "id" | "en";
  }

  let { locale = "id" }: Props = $props();

  interface Step {
    id: number;
    title: { id: string; en: string };
    shortDesc: { id: string; en: string };
    badge: { id: string; en: string };
    deliverables: { id: string[]; en: string[] };
    icon: string;
    details: { id: string; en: string };
  }

  const steps: Step[] = [
    {
      id: 1,
      icon: "💡",
      badge: { id: "Fase 1: Discovery", en: "Phase 1: Discovery" },
      title: {
        id: "Konsultasi & Blueprint Kebutuhan",
        en: "Consultation & Scope Blueprint",
      },
      shortDesc: {
        id: "Memahami model bisnis, target pengguna, dan menentukan spesifikasi teknis terbaik.",
        en: "Understanding business model, target users, and determining optimal tech specifications.",
      },
      deliverables: {
        id: [
          "Briefing & diskusi tujuan bisnis",
          "Analisis fitur & rekomendasi teknologi",
          "Estimasi waktu & timeline transparan",
        ],
        en: [
          "Business goal briefing & discussion",
          "Feature breakdown & tech recommendations",
          "Transparent timeline & cost estimation",
        ],
      },
      details: {
        id: "Kami menggali kebutuhan unik bisnis Anda untuk merancang solusi tepat sasaran tanpa pemborosan waktu dan biaya.",
        en: "We dive deep into your business requirements to design a focused solution without wasting time or resources.",
      },
    },
    {
      id: 2,
      icon: "🎨",
      badge: { id: "Fase 2: UI/UX", en: "Phase 2: UI/UX Design" },
      title: {
        id: "Desain UI/UX & Prototipe Interaktif",
        en: "UI/UX Design & Interactive Prototype",
      },
      shortDesc: {
        id: "Merancang antarmuka pengguna yang estetik, modern, responsif, dan mudah digunakan.",
        en: "Crafting modern, aesthetic, responsive, and intuitive user interfaces.",
      },
      deliverables: {
        id: [
          "Wireframe & alur navigasi (User Journey)",
          "Desain High-Fidelity di Figma",
          "Prototipe interaktif untuk uji coba awal",
        ],
        en: [
          "Wireframing & user flow journey",
          "High-fidelity design system in Figma",
          "Interactive prototype for early validation",
        ],
      },
      details: {
        id: "Klien dapat melihat dan mencoba simulasi tampilan aplikasi sebelum tahap coding dimulai, menjamin kesesuaian ekspektasi.",
        en: "Clients can explore and click through the design before coding begins, ensuring 100% alignment with expectations.",
      },
    },
    {
      id: 3,
      icon: "💻",
      badge: { id: "Fase 3: Engineering", en: "Phase 3: Development" },
      title: {
        id: "Pengembangan & Integrasi Sistem",
        en: "Agile Development & System Integration",
      },
      shortDesc: {
        id: "Koding dengan standar arsitektur modern, performa tinggi, dan keamanan terjamin.",
        en: "Clean code with modern architecture, high performance, and robust security standards.",
      },
      deliverables: {
        id: [
          "Pengembangan Frontend responsif & animasi halus",
          "Integrasi Backend, Database, dan API",
          "Optimasi kecepatan loading & SEO struktural",
        ],
        en: [
          "Responsive frontend with smooth interactions",
          "Backend, database, and API integrations",
          "Speed optimization & core SEO setup",
        ],
      },
      details: {
        id: "Proses coding agile dengan laporan kemajuan berkala, memungkinkan Anda memantau perkembangan proyek secara nyata.",
        en: "Agile sprints with regular progress demonstrations, keeping you informed at every milestone.",
      },
    },
    {
      id: 4,
      icon: "🚀",
      badge: { id: "Fase 4: Launch", en: "Phase 4: Launch & Growth" },
      title: {
        id: "Pengujian, Peluncuran & Maintenance",
        en: "Testing, Deployment & Maintenance",
      },
      shortDesc: {
        id: "Quality assurance menyeluruh sebelum go-live, diikuti garansi dan dukungan berkelanjutan.",
        en: "Rigorous quality assurance before go-live, backed by warranty and continuous support.",
      },
      deliverables: {
        id: [
          "Testing lintas perangkat (Mobile, Tablet, Desktop)",
          "Deployment ke server production & domain",
          "Garansi bug-free & pemeliharaan teknis",
        ],
        en: [
          "Cross-device QA (Mobile, Tablet, Desktop)",
          "Production deployment & domain setup",
          "Bug-free guarantee & ongoing maintenance",
        ],
      },
      details: {
        id: "Kami tidak meninggalkan Anda setelah rilis. Pemuda Handal memberikan garansi dan panduan penggunaan sistem secara lengkap.",
        en: "We don't leave you after release. Pemuda Handal provides technical warranty and complete operational handoff.",
      },
    },
  ];

  let activeStepId = $state(1);

  function setStep(id: number) {
    activeStepId = id;
  }

  let activeStep = $derived(steps.find((s) => s.id === activeStepId) || steps[0]);
</script>

<div class="w-full mt-12 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-card">
  <div class="flex flex-col gap-2 mb-8 text-center sm:text-left">
    <div class="inline-flex items-center gap-2 self-center sm:self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
      <span>⚙️</span>
      <span>{locale === 'en' ? 'Our Workflow' : 'Alur Kerja Kami'}</span>
    </div>
    <h3 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">
      {locale === 'en' ? 'How We Bring Your Ideas to Reality' : 'Bagaimana Kami Mewujudkan Ide Anda'}
    </h3>
    <p class="text-slate-500 text-sm sm:text-base">
      {locale === 'en'
        ? 'Click each step to explore our transparent and proven project stages.'
        : 'Klik setiap tahapan di bawah untuk melihat transparansi proses kerja kami.'}
    </p>
  </div>

  <!-- Steps Selector (Interactive Navigation) -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
    {#each steps as step}
      <button
        type="button"
        onclick={() => setStep(step.id)}
        class="flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group {activeStepId ===
        step.id
          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-[1.02]'
          : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'}"
      >
        <div class="flex items-center justify-between w-full mb-2">
          <span class="text-2xl">{step.icon}</span>
          <span
            class="text-xs font-black px-2 py-0.5 rounded-full {activeStepId ===
            step.id
              ? 'bg-white/20 text-white'
              : 'bg-slate-200/80 text-slate-600'}"
          >
            0{step.id}
          </span>
        </div>
        <p
          class="font-bold text-sm sm:text-base leading-snug line-clamp-2 {activeStepId ===
          step.id
            ? 'text-white'
            : 'text-slate-800 group-hover:text-primary transition-colors'}"
        >
          {step.title[locale]}
        </p>
      </button>
    {/each}
  </div>

  <!-- Active Step Detail Content Card -->
  <div
    class="bg-gradient-to-br from-slate-50 to-primary/5 rounded-2xl p-6 sm:p-8 border border-slate-200/70 transition-all duration-300"
  >
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start justify-between">
      <div class="flex-1 flex flex-col gap-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primary/20 text-primary text-xs font-bold w-fit shadow-sm">
          <span>{activeStep.icon}</span>
          <span>{activeStep.badge[locale]}</span>
        </div>
        <h4 class="text-xl sm:text-2xl font-bold text-slate-900">
          {activeStep.title[locale]}
        </h4>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          {activeStep.details[locale]}
        </p>
      </div>

      <!-- Deliverables List -->
      <div class="w-full lg:w-1/2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col gap-3">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
          {locale === 'en' ? 'Key Deliverables' : 'Hasil yang Diterima'}
        </p>
        <ul class="flex flex-col gap-2.5">
          {#each activeStep.deliverables[locale] as item}
            <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <span class="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
