<script lang="ts">
  import { onMount } from "svelte";

  export let locale: "id" | "en" = "id";

  let showScrollTop = false;
  let showTooltip = true;

  onMount(() => {
    const handleScroll = () => {
      showScrollTop = window.scrollY > 350;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function dismissTooltip() {
    showTooltip = false;
  }
</script>

<div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
  <!-- WhatsApp Notification Popover -->
  {#if showTooltip}
    <div
      class="bg-white/95 backdrop-blur-md text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2 animate-bounce-subtle max-w-[220px]"
    >
      <span class="text-base">👋</span>
      <span class="leading-tight">
        {locale === 'en' ? 'Need a quick consultation? Chat with us!' : 'Ada proyek digital? Konsultasi gratis di sini!'}
      </span>
      <button
        type="button"
        on:click={dismissTooltip}
        class="text-slate-400 hover:text-slate-600 text-xs ml-1 font-bold"
        aria-label="Dismiss message"
      >
        ✕
      </button>
    </div>
  {/if}

  <div class="flex items-center gap-2.5">
    <!-- Scroll to Top Button -->
    {#if showScrollTop}
      <button
        type="button"
        on:click={scrollToTop}
        class="w-11 h-11 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
        aria-label="Scroll to top"
      >
        <span class="text-lg font-bold">↑</span>
      </button>
    {/if}

    <!-- WhatsApp Floating Action Button -->
    <a
      href="https://api.whatsapp.com/send/?phone=6285156353319&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <!-- Pulse ring -->
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30"></span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-7 h-7 fill-current relative z-10"
        viewBox="0 0 24 24"
      >
        <path
          d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
        />
      </svg>
    </a>
  </div>
</div>
