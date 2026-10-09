<script lang="ts">
  export let locale: "id" | "en" = "id";

  interface FaqItem {
    id: number;
    category: "general" | "tech" | "vr" | "pricing";
    question: { id: string; en: string };
    answer: { id: string; en: string };
  }

  const faqs: FaqItem[] = [
    {
      id: 1,
      category: "general",
      question: {
        id: "Berapa lama rata-rata waktu pengerjaan sebuah website atau aplikasi?",
        en: "What is the typical timeframe to build a website or application?",
      },
      answer: {
        id: "Untuk Landing Page modern, rata-rata pengerjaan berkisar antara 7 hingga 14 hari kerja. Untuk Aplikasi Web atau Dashboard berskala menengah membutuhkan waktu 3 hingga 5 minggu, tergantung pada banyaknya fitur dan integrasi API yang dibutuhkan.",
        en: "Modern Landing Pages typically take 7 to 14 business days. Medium-scale Web Applications or Dashboards take 3 to 5 weeks, depending on the complexity of features and API integrations required.",
      },
    },
    {
      id: 2,
      category: "tech",
      question: {
        id: "Apakah website yang dibuat sudah responsif mobile dan ramah SEO?",
        en: "Will the website be mobile-responsive and SEO-friendly?",
      },
      answer: {
        id: "Pasti! Setiap produk digital yang kami rilis dijamin 100% responsif di smartphone, tablet, maupun monitor desktop. Kami juga menerapkan standar Core Web Vitals Google, optimasi kecepatan, meta tags SEO, dan struktur kode semantik.",
        en: "Absolutely! Every digital solution we build is 100% responsive across mobile phones, tablets, and desktop displays. We adhere strictly to Google Core Web Vitals, speed optimization, SEO meta tags, and semantic markup.",
      },
    },
    {
      id: 3,
      category: "general",
      question: {
        id: "Bagaimana jika bisnis kami belum memiliki materi desain atau konten teks?",
        en: "What if my business doesn't have design assets or copywriting yet?",
      },
      answer: {
        id: "Jangan khawatir! Tim kami siap mendampingi Anda dari nol. Kami menyediakan layanan pembuatan alur copywriting terstruktur, kurasi aset grafis, hingga perancangan prototipe interaktif di Figma sebelum proses koding dimulai.",
        en: "Don't worry! Our team guides you from ground zero. We provide structured copywriting guidance, visual asset curation, and interactive prototyping in Figma before any coding commences.",
      },
    },
    {
      id: 4,
      category: "vr",
      question: {
        id: "Apa itu teknologi VinteroVR 360° dan industri apa saja yang cocok?",
        en: "What is VinteroVR 360° technology and which industries benefit most?",
      },
      answer: {
        id: "VinteroVR adalah solusi tur virtual 360 derajat imersif yang memungkinkan pelanggan menjelajahi ruangan fisik Anda secara langsung dari browser atau perangkat VR. Sangat efektif untuk developer perumahan, hotel & resort, showroom, restoran, dan museum.",
        en: "VinteroVR is an immersive 360-degree virtual tour solution allowing customers to inspect physical premises right from their browser or VR device. It is especially impactful for real estate, hospitality, luxury showrooms, restaurants, and cultural tourism.",
      },
    },
    {
      id: 5,
      category: "pricing",
      question: {
        id: "Bagaimana alur pembayaran dan legalitas kontrak kerja sama?",
        en: "How does payment scheduling and contract agreement work?",
      },
      answer: {
        id: "Kami menerapkan skema bertahap transparan: Down Payment (DP) 50% saat kesepakatan, termin progres pengembangan, dan pelunasan saat uji coba selesai & siap rilis. Seluruh kerja sama disertai Surat Perjanjian Kerja (SPK) resmi dan invoice bisnis.",
        en: "We offer a transparent phased milestone structure: initial down payment at agreement, milestone review, and final settlement upon staging approval before production launch. Formal contracts and invoices are provided for all engagements.",
      },
    },
    {
      id: 6,
      category: "tech",
      question: {
        id: "Apakah ada garansi dan dukungan setelah website atau aplikasi selesai?",
        en: "Is there a warranty and maintenance support after project launch?",
      },
      answer: {
        id: "Tentu ada. Kami memberikan garansi bug-free dan asistensi teknis gratis selama 30 hingga 90 hari setelah peluncuran. Kami juga menyediakan paket pemeliharaan berkala (monitoring server, backup data, dan update sistem berkala).",
        en: "Yes! We provide a complimentary 30 to 90-day bug-free warranty and technical assistance following deployment. We also offer extended monthly maintenance plans for server monitoring, cloud backups, and ongoing security updates.",
      },
    },
  ];

  let openFaqId: number | null = 1;

  function toggleFaq(id: number) {
    openFaqId = openFaqId === id ? null : id;
  }
</script>

<div class="w-full max-w-4xl mx-auto flex flex-col gap-8">
  <div class="flex flex-col gap-4">
    {#each faqs as faq}
      {@const isOpen = openFaqId === faq.id}
      <div
        class="bg-white rounded-2xl border transition-all duration-200 overflow-hidden {isOpen
          ? 'border-primary shadow-card ring-1 ring-primary/20'
          : 'border-slate-200/80 shadow-sm hover:border-slate-300'}"
      >
        <button
          type="button"
          on:click={() => toggleFaq(faq.id)}
          class="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
          aria-expanded={isOpen}
        >
          <span class="font-bold text-base sm:text-lg text-slate-900 leading-snug">
            {faq.question[locale]}
          </span>
          <span
            class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-transform duration-200 {isOpen
              ? 'bg-primary text-white rotate-180'
              : 'bg-slate-100 text-slate-600'}"
          >
            {isOpen ? '−' : '+'}
          </span>
        </button>

        {#if isOpen}
          <div class="px-5 sm:px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4 animate-fade-in">
            {faq.answer[locale]}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Bottom consultation prompt -->
  <div class="bg-purple-50/70 border border-primary/20 rounded-2xl p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
    <div class="flex flex-col sm:text-left">
      <span class="font-bold text-slate-900 text-base">
        {locale === 'en' ? 'Still have unanswered questions?' : 'Punya pertanyaan khusus yang belum terjawab?'}
      </span>
      <span class="text-xs sm:text-sm text-slate-500">
        {locale === 'en' ? 'Our technical consultant is ready to help via direct chat.' : 'Konsultan teknis kami siap berdiskusi langsung melalui chat.'}
      </span>
    </div>

    <a
      href="https://api.whatsapp.com/send/?phone=6285156353319&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-secondary text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
    >
      <span>💬</span>
      <span>{locale === 'en' ? 'Ask on WhatsApp' : 'Tanyakan via WhatsApp'}</span>
    </a>
  </div>
</div>
