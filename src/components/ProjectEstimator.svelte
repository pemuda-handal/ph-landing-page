<script lang="ts">
  export let locale: "id" | "en" = "id";

  interface ServiceOption {
    id: string;
    icon: string;
    name: { id: string; en: string };
    desc: { id: string; en: string };
    baseDays: number;
    basePriceId: number;
    basePriceEn: number;
  }

  interface FeatureOption {
    id: string;
    icon: string;
    name: { id: string; en: string };
    addDays: number;
    addPriceId: number;
    addPriceEn: number;
  }

  interface TimelineOption {
    id: string;
    label: { id: string; en: string };
    multiplier: number;
    timeDesc: { id: string; en: string };
  }

  const services: ServiceOption[] = [
    {
      id: "landing",
      icon: "⚡",
      name: { id: "Landing Page Modern", en: "Modern Landing Page" },
      desc: {
        id: "1 Halaman fokus konversi & promosi produk",
        en: "1-Page high-conversion sales & marketing",
      },
      baseDays: 7,
      basePriceId: 2500000,
      basePriceEn: 200,
    },
    {
      id: "webapp",
      icon: "💻",
      name: { id: "Aplikasi Web & Dashboard", en: "Web App & Dashboard" },
      desc: {
        id: "Sistem cloud, database & admin dashboard",
        en: "Cloud system, database & admin dashboard",
      },
      baseDays: 21,
      basePriceId: 7500000,
      basePriceEn: 600,
    },
    {
      id: "mobileapp",
      icon: "📱",
      name: { id: "Aplikasi Mobile (Android/iOS)", en: "Mobile App (Android/iOS)" },
      desc: {
        id: "Aplikasi smartphone cross-platform",
        en: "Cross-platform smartphone application",
      },
      baseDays: 30,
      basePriceId: 12000000,
      basePriceEn: 950,
    },
    {
      id: "vintero",
      icon: "🌐",
      name: { id: "VinteroVR 360° Virtual Tour", en: "VinteroVR 360° Tour" },
      desc: {
        id: "Pengalaman virtual interaktif 360°",
        en: "Interactive 360° immersive walkthrough",
      },
      baseDays: 10,
      basePriceId: 3500000,
      basePriceEn: 280,
    },
    {
      id: "uiux",
      icon: "🎨",
      name: { id: "UI/UX Design & Prototyping", en: "UI/UX Design & Prototype" },
      desc: {
        id: "Riset, Wireframe & Desain Figma interaktif",
        en: "Research, Wireframes & Figma prototype",
      },
      baseDays: 14,
      basePriceId: 4000000,
      basePriceEn: 320,
    },
  ];

  const features: FeatureOption[] = [
    {
      id: "cms",
      icon: "📝",
      name: { id: "CMS / Admin Pengelola Konten", en: "Content Management CMS" },
      addDays: 5,
      addPriceId: 1500000,
      addPriceEn: 120,
    },
    {
      id: "multilang",
      icon: "🌍",
      name: { id: "Dukungan Multi-Bahasa (ID & EN)", en: "Multi-Language (ID & EN)" },
      addDays: 3,
      addPriceId: 1000000,
      addPriceEn: 80,
    },
    {
      id: "payment",
      icon: "💳",
      name: { id: "Payment Gateway Resmi (Midtrans/Xendit)", en: "Online Payment Gateway" },
      addDays: 5,
      addPriceId: 2000000,
      addPriceEn: 160,
    },
    {
      id: "seo",
      icon: "📈",
      name: { id: "Optimasi SEO & Analitik Meta/Google", en: "Advanced SEO & Analytics" },
      addDays: 2,
      addPriceId: 800000,
      addPriceEn: 65,
    },
    {
      id: "auth",
      icon: "🔒",
      name: { id: "Sistem Akun & Autentikasi Pengguna", en: "User Accounts & Authentication" },
      addDays: 6,
      addPriceId: 2500000,
      addPriceEn: 200,
    },
    {
      id: "whatsapp",
      icon: "💬",
      name: { id: "Generator Chat WhatsApp Otomatis", en: "Automated WhatsApp Lead Flow" },
      addDays: 1,
      addPriceId: 500000,
      addPriceEn: 40,
    },
  ];

  const timelines: TimelineOption[] = [
    {
      id: "express",
      label: { id: "⚡ Kilat (Prioritas)", en: "⚡ Express (Priority)" },
      multiplier: 1.25,
      timeDesc: { id: "1 - 2 Minggu", en: "1 - 2 Weeks" },
    },
    {
      id: "standard",
      label: { id: "⏱️ Standar (Rekomendasi)", en: "⏱️ Standard (Recommended)" },
      multiplier: 1.0,
      timeDesc: { id: "3 - 4 Minggu", en: "3 - 4 Weeks" },
    },
    {
      id: "flexible",
      label: { id: "🌱 Fleksibel / Bertahap", en: "🌱 Flexible / Phased" },
      multiplier: 0.95,
      timeDesc: { id: "> 1 Bulan", en: "> 1 Month" },
    },
  ];

  let selectedServiceId = "landing";
  let selectedFeatureIds: string[] = ["seo", "whatsapp"];
  let selectedTimelineId = "standard";

  function toggleFeature(id: string) {
    if (selectedFeatureIds.includes(id)) {
      selectedFeatureIds = selectedFeatureIds.filter((f) => f !== id);
    } else {
      selectedFeatureIds = [...selectedFeatureIds, id];
    }
  }

  $: currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  $: currentTimeline = timelines.find((t) => t.id === selectedTimelineId) || timelines[1];
  $: selectedFeatures = features.filter((f) => selectedFeatureIds.includes(f.id));

  $: calculatedPriceId = Math.round(
    (currentService.basePriceId +
      selectedFeatures.reduce((acc, f) => acc + f.addPriceId, 0)) *
      currentTimeline.multiplier
  );

  $: calculatedPriceEn = Math.round(
    (currentService.basePriceEn +
      selectedFeatures.reduce((acc, f) => acc + f.addPriceEn, 0)) *
      currentTimeline.multiplier
  );

  $: totalDays = Math.max(
    5,
    Math.round(
      (currentService.baseDays +
        selectedFeatures.reduce((acc, f) => acc + f.addDays, 0)) *
        (selectedTimelineId === "express" ? 0.7 : selectedTimelineId === "flexible" ? 1.3 : 1.0)
    )
  );

  function formatIDR(num: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  }

  function formatUSD(num: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  }

  $: displayPrice =
    locale === "en" ? formatUSD(calculatedPriceEn) : formatIDR(calculatedPriceId);

  $: whatsappUrl = (() => {
    const serviceName = currentService.name[locale];
    const featureNames =
      selectedFeatures.length > 0
        ? selectedFeatures.map((f) => f.name[locale]).join(", ")
        : locale === "en"
          ? "Standard core features"
          : "Fitur standar bawaan";
    const timelineName = currentTimeline.label[locale];

    const message =
      locale === "en"
        ? `Hello Pemuda Handal Team! I calculated an estimate on your website:\n\n` +
          `• Project Type: ${serviceName}\n` +
          `• Features Selected: ${featureNames}\n` +
          `• Timeline Priority: ${timelineName}\n` +
          `• Estimated Investment: ~${displayPrice}\n\n` +
          `I would like to discuss and get a formal quotation. Thank you!`
        : `Halo Tim Pemuda Handal! Saya telah melakukan simulasi estimasi di website:\n\n` +
          `• Jenis Proyek: ${serviceName}\n` +
          `• Fitur Pilihan: ${featureNames}\n` +
          `• Prioritas Waktu: ${timelineName}\n` +
          `• Estimasi Biaya: ~${displayPrice}\n\n` +
          `Saya ingin konsultasi lebih lanjut dan mendapatkan penawaran resmi. Terima kasih!`;

    return `https://api.whatsapp.com/send/?phone=6285156353319&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
  })();
</script>

<div class="w-full bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/40 rounded-3xl border border-slate-200/80 p-6 sm:p-8 lg:p-12 shadow-card" id="estimator">
  <!-- Section Title -->
  <div class="flex flex-col items-center text-center gap-3 mb-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
      <span>🧮</span>
      <span>{locale === 'en' ? 'Interactive Project Calculator' : 'Kalkulator Estimasi Proyek'}</span>
    </div>
    <h3 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
      {locale === 'en' ? 'Simulate Your Scope & Budget' : 'Hitung Estimasi Kebutuhan & Biaya Proyek Anda'}
    </h3>
    <p class="text-slate-600 text-sm sm:text-base">
      {locale === 'en'
        ? 'Select your project type, key features, and timeline to receive an instant transparent estimate and direct WhatsApp briefing.'
        : 'Pilih jenis proyek, fitur yang dibutuhkan, dan target waktu untuk mendapatkan perkiraan transparan seketika.'}
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
    <!-- Options Column (Left) -->
    <div class="lg:col-span-7 flex flex-col gap-8">
      
      <!-- Step 1: Service Selection -->
      <div class="flex flex-col gap-3">
        <label class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-black">1</span>
          <span>{locale === 'en' ? 'Select Project Type' : 'Pilih Jenis Proyek'}</span>
        </label>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {#each services as service}
            <button
              type="button"
              on:click={() => (selectedServiceId = service.id)}
              class="flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 {selectedServiceId ===
              service.id
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300'}"
            >
              <span class="text-2xl shrink-0 mt-0.5">{service.icon}</span>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-900 leading-snug">
                  {service.name[locale]}
                </span>
                <span class="text-[11px] text-slate-500 leading-tight mt-0.5">
                  {service.desc[locale]}
                </span>
              </div>
            </button>
          {/each}
        </div>
      </div>

      <!-- Step 2: Feature Selection -->
      <div class="flex flex-col gap-3">
        <label class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-black">2</span>
          <span>{locale === 'en' ? 'Select Additional Features' : 'Pilih Fitur Tambahan yang Diinginkan'}</span>
        </label>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {#each features as feature}
            {@const isChecked = selectedFeatureIds.includes(feature.id)}
            <button
              type="button"
              on:click={() => toggleFeature(feature.id)}
              class="flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-200 {isChecked
                ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                : 'border-slate-200 bg-white hover:border-slate-300'}"
            >
              <div class="flex items-center gap-2.5">
                <span class="text-lg">{feature.icon}</span>
                <span class="text-xs sm:text-sm font-semibold text-slate-800">
                  {feature.name[locale]}
                </span>
              </div>
              <div
                class="w-5 h-5 rounded-lg border flex items-center justify-center text-xs font-bold transition-all shrink-0 ml-2 {isChecked
                  ? 'bg-primary border-primary text-white'
                  : 'border-slate-300 bg-slate-50'}"
              >
                {isChecked ? '✓' : ''}
              </div>
            </button>
          {/each}
        </div>
      </div>

      <!-- Step 3: Timeline Selection -->
      <div class="flex flex-col gap-3">
        <label class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-black">3</span>
          <span>{locale === 'en' ? 'Target Timeline & Urgency' : 'Target Waktu & Prioritas'}</span>
        </label>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {#each timelines as timeline}
            <button
              type="button"
              on:click={() => (selectedTimelineId = timeline.id)}
              class="flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 {selectedTimelineId ===
              timeline.id
                ? 'border-primary bg-primary/10 ring-2 ring-primary/20 text-primary font-bold'
                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'}"
            >
              <span class="text-xs font-bold">{timeline.label[locale]}</span>
              <span class="text-[11px] text-slate-500 mt-0.5">{timeline.timeDesc[locale]}</span>
            </button>
          {/each}
        </div>
      </div>

    </div>

    <!-- Live Result & CTA Column (Right Sticky) -->
    <div class="lg:col-span-5 sticky top-28">
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col gap-6 relative overflow-hidden">
        <!-- Accent top border -->
        <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>

        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400">
            {locale === 'en' ? 'Estimated Investment' : 'Estimasi Biaya Mulai Dari'}
          </span>
          <span class="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            {locale === 'en' ? 'Transparent' : 'Transparan'}
          </span>
        </div>

        <!-- Big Price Display -->
        <div class="flex flex-col">
          <div class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ~{displayPrice}
          </div>
          <span class="text-xs text-slate-500 mt-1">
            {locale === 'en'
              ? '*Reference price range based on selected parameters'
              : '*Perkiraan dasar sesuai cakupan dan fitur yang dipilih'}
          </span>
        </div>

        <!-- Metric Badges -->
        <div class="grid grid-cols-2 gap-3 py-4 border-y border-slate-100">
          <div class="flex flex-col bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span class="text-[11px] text-slate-500">{locale === 'en' ? 'Est. Timeline' : 'Estimasi Waktu'}</span>
            <span class="text-base font-bold text-slate-800">± {totalDays} {locale === 'en' ? 'Days' : 'Hari Kerja'}</span>
          </div>
          <div class="flex flex-col bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span class="text-[11px] text-slate-500">{locale === 'en' ? 'Support Included' : 'Garansi Bug'}</span>
            <span class="text-base font-bold text-slate-800">{locale === 'en' ? '30 Days SLA' : '30 Hari Penuh'}</span>
          </div>
        </div>

        <!-- Selected Features Summary Checklist -->
        <div class="flex flex-col gap-2">
          <span class="text-xs font-bold text-slate-700">
            {locale === 'en' ? 'Summary of Selected Scope:' : 'Ringkasan Kebutuhan Terpilih:'}
          </span>
          <div class="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
            <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {currentService.name[locale]}
            </span>
            {#each selectedFeatures as f}
              <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                + {f.name[locale]}
              </span>
            {/each}
          </div>
        </div>

        <!-- One-Click WhatsApp CTA -->
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-primary hover:bg-secondary text-white font-bold text-sm sm:text-base shadow-lg shadow-primary/25 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <span class="text-lg">💬</span>
          <span>{locale === 'en' ? 'Send Scope to WhatsApp' : 'Kirim Estimasi ke WhatsApp'}</span>
        </a>

        <p class="text-[11px] text-slate-400 text-center leading-normal">
          {locale === 'en'
            ? 'Free consultation • No obligation • Direct technical response'
            : 'Konsultasi 100% gratis • Tanpa komitmen wajib • Respon langsung oleh tim'}
        </p>
      </div>
    </div>
  </div>
</div>
