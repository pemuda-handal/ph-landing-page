<script lang="ts">
  interface Industry {
    id: string;
    name: { id: string; en: string };
    icon: string;
    recommendation: { id: string; en: string };
    highlightServiceId: string;
  }

  interface Service {
    id: string;
    title: { id: string; en: string };
    badge?: { id: string; en: string };
    detail: { id: string; en: string };
    imageSrc: string;
    features: { id: string[]; en: string[] };
    externalUrl?: string;
  }

  interface Props {
    locale?: "id" | "en";
    services?: Service[];
  }

  let { locale = "id", services = [] }: Props = $props();

  const industries: Industry[] = [
    {
      id: "all",
      name: { id: "Semua Industri", en: "All Industries" },
      icon: "🏢",
      recommendation: {
        id: "Solusi digital komprehensif kami dapat disesuaikan untuk skala UKM hingga korporasi besar.",
        en: "Our comprehensive digital solutions adapt seamlessly for SMEs to large enterprises.",
      },
      highlightServiceId: "",
    },
    {
      id: "property",
      name: { id: "Perumahan & Properti", en: "Real Estate & Property" },
      icon: "🏡",
      recommendation: {
        id: "Kombinasi VinteroVR 360° + Landing Page terbukti menaikkan booking show unit properti hingga 3x lipat.",
        en: "VinteroVR 360° + high-converting Landing Page triples real estate showroom bookings.",
      },
      highlightServiceId: "vintero",
    },
    {
      id: "hospitality",
      name: { id: "Hotel & Resort", en: "Hotels & Resorts" },
      icon: "🏨",
      recommendation: {
        id: "Tampilkan kamar premium & fasilitas resort secara imersif dengan Virtual Tour 360° dan sistem direct booking.",
        en: "Showcase premium rooms & resort amenities with 360° Tours and direct booking system.",
      },
      highlightServiceId: "vintero",
    },
    {
      id: "culinary",
      name: { id: "Restoran & Kafe", en: "Restaurants & Cafes" },
      icon: "🍽️",
      recommendation: {
        id: "Tingkatkan reservasi dengan website interaktif, menu digital, dan tur suasana ruang dining.",
        en: "Boost dining reservations with interactive website, digital menu, and dining ambiance tour.",
      },
      highlightServiceId: "landing",
    },
    {
      id: "tourism",
      name: { id: "Museum & Destinasi", en: "Museums & Tourism" },
      icon: "🏛️",
      recommendation: {
        id: "Edukasi pengunjung melalui virtual museum 360° yang dapat diakses dari seluruh dunia.",
        en: "Educate visitors through a global 360° virtual museum accessible anywhere in the world.",
      },
      highlightServiceId: "vintero",
    },
    {
      id: "startup",
      name: { id: "Startup & Korporat", en: "Startup & Enterprise" },
      icon: "🚀",
      recommendation: {
        id: "Bangun produk digital scalable: Web App, Mobile App, dan sistem backend dengan arsitektur modern.",
        en: "Engineer scalable digital products: Web App, Mobile App, and modern cloud backend.",
      },
      highlightServiceId: "webapp",
    },
  ];

  let selectedIndustryId = $state("all");
  let expandedServiceId = $state<string | null>(null);

  let activeIndustry = $derived(
    industries.find((i) => i.id === selectedIndustryId) || industries[0]
  );

  function toggleExpand(id: string) {
    expandedServiceId = expandedServiceId === id ? null : id;
  }

  function getWhatsAppUrl(service: Service) {
    const text =
      locale === "en"
        ? `Hello Pemuda Handal, I would like to consult about the "${service.title.en}" service for my business.`
        : `Halo Pemuda Handal, saya ingin berkonsultasi mengenai layanan "${service.title.id}" untuk bisnis saya.`;
    return `https://api.whatsapp.com/send/?phone=6285156353319&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
  }
</script>

<div class="flex flex-col gap-10">
  <!-- Interactive Industry Filter Chips -->
  <div class="flex flex-col items-center gap-4">
    <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
      {locale === "en" ? "Filter by Your Industry" : "Pilih Kategori Industri Anda"}
    </p>

    <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {#each industries as industry}
        <button
          type="button"
          onclick={() => (selectedIndustryId = industry.id)}
          class="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 {selectedIndustryId ===
          industry.id
            ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
            : 'bg-white text-slate-700 border border-slate-200 hover:border-primary/40 hover:text-primary'}"
        >
          <span>{industry.icon}</span>
          <span>{industry.name[locale]}</span>
        </button>
      {/each}
    </div>

    <!-- Active Industry Recommendation Pill -->
    {#if selectedIndustryId !== 'all'}
      <div
        class="bg-purple-50 border border-primary/20 rounded-2xl px-5 py-3 max-w-2xl text-center text-xs sm:text-sm text-slate-700 shadow-sm flex items-center gap-3 animate-fade-in"
      >
        <span class="text-xl">💡</span>
        <span>{activeIndustry.recommendation[locale]}</span>
      </div>
    {/if}
  </div>

  <!-- Services Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each services as service (service.id)}
      {@const isHighlighted = activeIndustry.highlightServiceId === service.id}
      <div
        class="group bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative {isHighlighted
          ? 'border-primary ring-2 ring-primary/20 shadow-glow'
          : 'border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1.5'}"
      >
        <!-- Highlight ribbon if matched with industry -->
        {#if isHighlighted}
          <div class="bg-primary text-white text-[11px] font-bold py-1 px-4 text-center tracking-wide uppercase">
            ⭐ {locale === 'en' ? 'Top Recommendation for You' : 'Rekomendasi Utama Industri Anda'}
          </div>
        {/if}

        <!-- Service Image & Badge -->
        <div class="relative aspect-video bg-slate-100 overflow-hidden">
          <img
            src={service.imageSrc}
            alt={service.title[locale]}
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {#if service.badge}
            <div class="absolute top-3 left-3">
              <span class="text-[11px] font-extrabold px-3 py-1 rounded-full bg-primary text-white shadow-md">
                {service.badge[locale]}
              </span>
            </div>
          {/if}
        </div>

        <!-- Service Info -->
        <div class="p-6 flex flex-col flex-1 justify-between gap-5">
          <div class="flex flex-col gap-3">
            <h3 class="font-bold text-xl text-slate-900 group-hover:text-primary transition-colors">
              {service.title[locale]}
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              {service.detail[locale]}
            </p>

            <!-- Expandable Feature Checklist -->
            <button
              type="button"
              onclick={() => toggleExpand(service.id)}
              class="self-start text-xs font-bold text-primary hover:text-secondary flex items-center gap-1 mt-1 transition-colors"
            >
              <span>{expandedServiceId === service.id ? (locale === 'en' ? 'Hide Features' : 'Sembunyikan Fitur') : (locale === 'en' ? 'View Included Features' : 'Lihat Fitur Termasuk')}</span>
              <span class="text-sm font-extrabold">{expandedServiceId === service.id ? '▴' : '▾'}</span>
            </button>

            {#if expandedServiceId === service.id}
              <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 animate-fade-in mt-2">
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {locale === 'en' ? 'Standard Deliverables:' : 'Cakupan Layanan:'}
                </p>
                <ul class="flex flex-col gap-2">
                  {#each service.features[locale] as feature}
                    <li class="flex items-start gap-2 text-xs text-slate-700">
                      <span class="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>

          <!-- Action buttons -->
          <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
            <a
              href={getWhatsAppUrl(service)}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary hover:bg-secondary text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
            >
              <span>💬</span>
              <span>{locale === 'en' ? 'Consult This Service' : 'Konsultasi Layanan Ini'}</span>
            </a>

            {#if service.externalUrl}
              <a
                href={service.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="px-3.5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1"
                title={locale === 'en' ? 'Visit product site' : 'Kunjungi situs'}
              >
                <span>↗</span>
              </a>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
