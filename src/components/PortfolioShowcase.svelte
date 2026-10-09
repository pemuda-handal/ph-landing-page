<script lang="ts">
  import type { ProjectItem } from "../types/portfolio";

  export let locale: "id" | "en" = "id";
  export let projects: ProjectItem[] = [];

  let selectedCategory: string = "all";
  let activeModalProject: ProjectItem | null = null;

  $: filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  function openModal(project: ProjectItem) {
    activeModalProject = project;
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    activeModalProject = null;
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && activeModalProject) {
      closeModal();
    }
  }

  function getWhatsAppUrl(project: ProjectItem) {
    const text =
      locale === "en"
        ? `Hello Pemuda Handal, I am interested in building a project similar to "${project.title.en}". Could we discuss this?`
        : `Halo Pemuda Handal, saya tertarik membuat proyek digital seperti "${project.title.id}". Boleh minta info konsultasi lebih lanjut?`;
    return `https://api.whatsapp.com/send/?phone=6285156353319&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex flex-col gap-10">
  <!-- Interactive Category Tabs -->
  <div class="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
    <button
      type="button"
      on:click={() => (selectedCategory = "all")}
      class="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 {selectedCategory ===
      'all'
        ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
        : 'bg-white text-slate-700 border border-slate-200 hover:border-primary/40 hover:text-primary'}"
    >
      {locale === "en" ? "All Projects" : "Semua Proyek"} ({projects.length})
    </button>

    <button
      type="button"
      on:click={() => (selectedCategory = "landing")}
      class="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 {selectedCategory ===
      'landing'
        ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
        : 'bg-white text-slate-700 border border-slate-200 hover:border-primary/40 hover:text-primary'}"
    >
      {locale === "en" ? "Landing Page" : "Landing Page"} (3)
    </button>

    <button
      type="button"
      on:click={() => (selectedCategory = "system")}
      class="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 {selectedCategory ===
      'system'
        ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
        : 'bg-white text-slate-700 border border-slate-200 hover:border-primary/40 hover:text-primary'}"
    >
      {locale === "en" ? "Web App & Dashboard" : "Web App & Dashboard"} (2)
    </button>
  </div>

  <!-- Projects Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each filteredProjects as project (project.id)}
      <div
        class="group bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
      >
        <!-- Project Image Container with hover zoom -->
        <div class="relative overflow-hidden aspect-video bg-slate-100 cursor-pointer" on:click={() => openModal(project)}>
          <img
            src={project.imageSrc}
            alt={project.title[locale]}
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
            <span class="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full">
              <span>🔍</span>
              <span>{locale === 'en' ? 'Click to View Details' : 'Klik untuk Detail'}</span>
            </span>
          </div>
          <!-- Category Chip -->
          <div class="absolute top-4 left-4">
            <span class="text-[11px] font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary border border-primary/20 shadow-sm">
              {project.categoryLabel[locale]}
            </span>
          </div>
        </div>

        <!-- Project Info -->
        <div class="p-6 flex flex-col justify-between flex-1 gap-5">
          <div class="flex flex-col gap-3">
            <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {project.client}
            </div>
            <h3 class="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {project.title[locale]}
            </h3>
            <p class="text-slate-600 text-sm line-clamp-3 leading-relaxed">
              {project.summary[locale]}
            </p>
          </div>

          <!-- Tech stack tags & Action -->
          <div class="flex flex-col gap-4 pt-3 border-t border-slate-100">
            <div class="flex flex-wrap gap-1.5">
              {#each project.techStack.slice(0, 3) as tech}
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {tech}
                </span>
              {/each}
              {#if project.techStack.length > 3}
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-400">
                  +{project.techStack.length - 3}
                </span>
              {/if}
            </div>

            <div class="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                on:click={() => openModal(project)}
                class="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-secondary transition-colors"
              >
                <span>{locale === 'en' ? 'Learn More' : 'Lihat Selengkapnya'}</span>
                <span class="text-lg">→</span>
              </button>

              {#if project.demoUrl && project.demoUrl !== '#'}
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1"
                >
                  <span>Demo</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- Interactive Lightbox Modal -->
{#if activeModalProject}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
    on:click|self={closeModal}
  >
    <div
      class="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col relative animate-scale-up"
    >
      <!-- Close button -->
      <button
        type="button"
        on:click={closeModal}
        class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md"
        aria-label="Close modal"
      >
        <span class="text-xl font-bold leading-none">✕</span>
      </button>

      <!-- Modal Image Cover -->
      <div class="relative aspect-video w-full bg-slate-900 shrink-0">
        <img
          src={activeModalProject.imageSrc}
          alt={activeModalProject.title[locale]}
          class="w-full h-full object-cover"
        />
        <div class="absolute bottom-4 left-4">
          <span class="text-xs font-bold px-3 py-1.5 rounded-full bg-primary text-white shadow-md">
            {activeModalProject.categoryLabel[locale]}
          </span>
        </div>
      </div>

      <!-- Modal Details -->
      <div class="p-6 sm:p-8 flex flex-col gap-6">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {activeModalProject.client}
          </span>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {activeModalProject.title[locale]}
          </h3>
        </div>

        <div class="flex flex-col gap-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          <div>
            <h4 class="font-bold text-slate-900 mb-1 text-sm uppercase tracking-wide">
              {locale === 'en' ? 'Challenge & Background' : 'Tantangan & Kebutuhan Klien'}
            </h4>
            <p>{activeModalProject.challenge[locale]}</p>
          </div>

          <div>
            <h4 class="font-bold text-slate-900 mb-1 text-sm uppercase tracking-wide">
              {locale === 'en' ? 'Our Digital Solution' : 'Solusi dari Pemuda Handal'}
            </h4>
            <p>{activeModalProject.solution[locale]}</p>
          </div>
        </div>

        <!-- Key Features Implemented -->
        <div class="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            {locale === 'en' ? 'Key Features Implemented' : 'Fitur Utama yang Dibangun'}
          </h4>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
            {#each activeModalProject.features[locale] as feature}
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>{feature}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Tech Stack -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Tech Stack
          </h4>
          <div class="flex flex-wrap gap-2">
            {#each activeModalProject.techStack as tech}
              <span class="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-primary border border-primary/20">
                {tech}
              </span>
            {/each}
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
          <a
            href={getWhatsAppUrl(activeModalProject)}
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-secondary text-white font-bold text-sm shadow-md transition-all duration-200"
          >
            <span>💬</span>
            <span>{locale === 'en' ? 'Discuss Similar Project on WhatsApp' : 'Konsultasikan Proyek Serupa via WhatsApp'}</span>
          </a>

          {#if activeModalProject.demoUrl && activeModalProject.demoUrl !== '#'}
            <a
              href={activeModalProject.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all duration-200"
            >
              <span>{locale === 'en' ? 'Visit Website' : 'Kunjungi Website'}</span>
              <span>↗</span>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
