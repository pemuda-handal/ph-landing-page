<script lang="ts">
  export let locale: "id" | "en" = "id";

  interface Testimonial {
    id: number;
    author: string;
    role: { id: string; en: string };
    company: string;
    avatarInitials: string;
    avatarBg: string;
    stars: number;
    title: { id: string; en: string };
    quote: { id: string; en: string };
    tag: { id: string; en: string };
  }

  const testimonials: Testimonial[] = [
    {
      id: 1,
      author: "Raditya Prasetya",
      role: { id: "Founder & CEO", en: "Founder & CEO" },
      company: "Five Project Indonesia",
      avatarInitials: "RP",
      avatarBg: "bg-purple-600",
      stars: 5,
      title: {
        id: "Landing page gaming server paling rapi & cepat!",
        en: "Fastest and sleekest gaming server landing page!",
      },
      quote: {
        id: "Tim Pemuda Handal sangat paham apa yang komunitas gaming inginkan. Desainnya futuristik, loading di bawah 1 detik, dan integrasi whitelist Discord berjalan mulus tanpa kendala.",
        en: "The Pemuda Handal team understood our gaming community requirements immediately. The aesthetic is futuristic, loads under 1 second, and Discord whitelist integration works flawlessly.",
      },
      tag: { id: "Landing Page Community", en: "Community Landing Page" },
    },
    {
      id: 2,
      author: "Annisa Laksmi",
      role: { id: "Marketing Director", en: "Marketing Director" },
      company: "Sigmund Creatus Agency",
      avatarInitials: "AL",
      avatarBg: "bg-indigo-600",
      stars: 5,
      title: {
        id: "Kualitas desain setara agensi internasional",
        en: "World-class design & execution quality",
      },
      quote: {
        id: "Sebagai creative agency, standar estetika kami sangat tinggi. Pemuda Handal mampu mengeksekusi visi desain kami ke dalam kode dengan presisi pixel yang luar biasa.",
        en: "As a creative branding agency, our design standards are sky high. Pemuda Handal executed our Figma vision with pixel-perfect precision and fluid responsive behavior.",
      },
      tag: { id: "Creative Web Design", en: "Creative Web Design" },
    },
    {
      id: 3,
      author: "Hendri Kusuma",
      role: { id: "Operational Manager", en: "Operations Manager" },
      company: "PouchPack Garment",
      avatarInitials: "HK",
      avatarBg: "bg-emerald-600",
      stars: 5,
      title: {
        id: "Konversi penjualan naik drastis lewat WhatsApp",
        en: "Significant leap in WhatsApp sales conversion",
      },
      quote: {
        id: "Fitur kalkulator dan generator WhatsApp yang dibuatkan tim PH membuat calon pelanggan langsung mengirimkan spesifikasi pouch dengan rapi. Tim sales kami jadi jauh lebih hemat waktu!",
        en: "The material spec simulator and WhatsApp order pre-filler engineered by PH helped leads send precise pouch specs instantly, massively speeding up our sales cycle.",
      },
      tag: { id: "B2B E-Commerce & Leadgen", en: "B2B E-Commerce & Leadgen" },
    },
    {
      id: 4,
      author: "Dimas Suryo",
      role: { id: "Property Head", en: "Head of Property Sales" },
      company: "Mahabharata Residence",
      avatarInitials: "DS",
      avatarBg: "bg-amber-600",
      stars: 5,
      title: {
        id: "VinteroVR 360° membuat penjualan unit jauh lebih mudah",
        en: "VinteroVR 360° transformed our property walkthroughs",
      },
      quote: {
        id: "Calon pembeli dari luar kota sekarang bisa melihat detail show unit rumah lewat tur 360° interaktif. Sangat membantu closing penjualan bahkan sebelum mereka datang survei fisik.",
        en: "Out-of-town buyers can now examine every corner of our show unit through 360° virtual tours. It enabled remote deals before physical inspections were even scheduled.",
      },
      tag: { id: "VinteroVR 360° Tour", en: "VinteroVR 360° Tour" },
    },
  ];

  let currentIndex = 0;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  }

  function goToSlide(idx: number) {
    currentIndex = idx;
  }
</script>

<div class="flex flex-col gap-8 max-w-4xl mx-auto">
  <!-- Testimonial Card Display -->
  <div class="relative bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-card min-h-[320px] flex flex-col justify-between overflow-hidden">
    <!-- Big Quote Mark Background -->
    <div class="pointer-events-none absolute top-4 right-8 text-8xl text-purple-100 font-serif font-black select-none opacity-60">
      “
    </div>

    <!-- Active Testimonial Content -->
    <div class="flex flex-col gap-5 relative z-10">
      <!-- Stars & Tag -->
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex text-amber-400 text-lg">
          {#each Array(testimonials[currentIndex].stars) as _}
            <span>★</span>
          {/each}
        </div>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
          {testimonials[currentIndex].tag[locale]}
        </span>
      </div>

      <!-- Heading & Quote -->
      <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
        "{testimonials[currentIndex].title[locale]}"
      </h3>

      <p class="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed italic">
        "{testimonials[currentIndex].quote[locale]}"
      </p>
    </div>

    <!-- Author & Navigation Controls -->
    <div class="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 relative z-10">
      <!-- Author info -->
      <div class="flex items-center gap-3.5">
        <div
          class="w-12 h-12 rounded-full {testimonials[currentIndex].avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md"
        >
          {testimonials[currentIndex].avatarInitials}
        </div>
        <div class="flex flex-col">
          <span class="text-sm sm:text-base font-bold text-slate-900">
            {testimonials[currentIndex].author}
          </span>
          <span class="text-xs text-slate-500">
            {testimonials[currentIndex].role[locale]} • <strong class="text-primary font-semibold">{testimonials[currentIndex].company}</strong>
          </span>
        </div>
      </div>

      <!-- Slider Arrows -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          on:click={prevSlide}
          class="w-10 h-10 rounded-full border border-slate-200 hover:border-primary/50 hover:bg-primary/5 text-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <button
          type="button"
          on:click={nextSlide}
          class="w-10 h-10 rounded-full bg-primary hover:bg-secondary text-white flex items-center justify-center transition-all shadow-md active:scale-95"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </div>
  </div>

  <!-- Pagination Dot Indicators -->
  <div class="flex items-center justify-center gap-2">
    {#each testimonials as _, idx}
      <button
        type="button"
        on:click={() => goToSlide(idx)}
        class="h-2.5 rounded-full transition-all duration-300 {currentIndex === idx
          ? 'w-8 bg-primary'
          : 'w-2.5 bg-slate-300 hover:bg-slate-400'}"
        aria-label={`Go to slide ${idx + 1}`}
      ></button>
    {/each}
  </div>
</div>
