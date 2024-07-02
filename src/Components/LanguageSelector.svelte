<script lang="ts">
  import { onMount } from "svelte";

  let currentLang = "id";
  let isOpen = false;
  onMount(() => {
    const lang = localStorage.getItem("lang");

    if (lang == null) {
      localStorage.setItem("lang", "id");
    } else if (lang == "id") {
      currentLang = "id";
    } else if (lang == "en") {
      currentLang = "en";
    }
  });

  function toggleLanguageSelectorPopUp() {
    isOpen = !isOpen;
  }

  function closeLanguageSelector() {
    isOpen = false;
  }

  function changeLanguage(lang: string) {
    if (lang == "id") {
      currentLang = "id";
      localStorage.setItem("lang", "id");
      closeLanguageSelector();
    } else if (lang == "en") {
      currentLang = "en";
      localStorage.setItem("lang", "en");
      closeLanguageSelector();
    }
  }
</script>

<div class="relative z-10 w-32 font-bold">
  <button
    on:click={toggleLanguageSelectorPopUp}
    class="flex flex-row gap-3 p-4 justify-between items-center w-full"
  >
    {#if currentLang == "id"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 64 64"
        ><path
          fill="#f9f9f9"
          d="M31.8 62c16.6 0 30-13.4 30-30h-60c0 16.6 13.4 30 30 30"
        /><path
          fill="#ed4c5c"
          d="M31.8 2c-16.6 0-30 13.4-30 30h60c0-16.6-13.4-30-30-30"
        /></svg
      >
      ID
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 256 256"
        ><path
          fill="currentColor"
          d="m213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32"
        /></svg
      >
    {:else if currentLang == "en"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 512 512"
        ><mask id="circleFlagsUk0"
          ><circle cx="256" cy="256" r="256" fill="#fff" /></mask
        ><g mask="url(#circleFlagsUk0)"
          ><path
            fill="#eee"
            d="m0 0l8 22l-8 23v23l32 54l-32 54v32l32 48l-32 48v32l32 54l-32 54v68l22-8l23 8h23l54-32l54 32h32l48-32l48 32h32l54-32l54 32h68l-8-22l8-23v-23l-32-54l32-54v-32l-32-48l32-48v-32l-32-54l32-54V0l-22 8l-23-8h-23l-54 32l-54-32h-32l-48 32l-48-32h-32l-54 32L68 0z"
          /><path
            fill="#0052b4"
            d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z"
          /><path
            fill="#d80027"
            d="M0 0v45l131 131h45zm208 0v208H0v96h208v208h96V304h208v-96H304V0zm259 0L336 131v45L512 0zM176 336L0 512h45l131-131zm160 0l176 176v-45L381 336z"
          /></g
        ></svg
      >
      EN
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 256 256"
        ><path
          fill="currentColor"
          d="m213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32"
        /></svg
      >
    {/if}
  </button>

  {#if isOpen}
    <div
      class="absolute top-0 flex w-full bg-white shadow-lg rounded-xl overflow-visible {currentLang ==
      'id'
        ? 'flex-col'
        : 'flex-col-reverse'}"
    >
      <button
        class="p-4 flex flex-row gap-3 justify-between items-center w-full"
        on:click={() => changeLanguage("id")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 64 64"
          ><path
            fill="#f9f9f9"
            d="M31.8 62c16.6 0 30-13.4 30-30h-60c0 16.6 13.4 30 30 30"
          /><path
            fill="#ed4c5c"
            d="M31.8 2c-16.6 0-30 13.4-30 30h60c0-16.6-13.4-30-30-30"
          /></svg
        >
        ID
        {#if currentLang == "id"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 256 256"
            ><path
              fill="currentColor"
              d="M213.66 165.66a8 8 0 0 1-11.32 0L128 91.31l-74.34 74.35a8 8 0 0 1-11.32-11.32l80-80a8 8 0 0 1 11.32 0l80 80a8 8 0 0 1 0 11.32"
            /></svg
          >
        {/if}
      </button>
      <div class="border-b border-black border-opacity-50 w-3/4 mx-auto"></div>
      <button
        class="p-4 flex flex-row gap-3 justify-between items-center w-full"
        on:click={() => changeLanguage("en")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 512 512"
          ><mask id="circleFlagsUk0"
            ><circle cx="256" cy="256" r="256" fill="#fff" /></mask
          ><g mask="url(#circleFlagsUk0)"
            ><path
              fill="#eee"
              d="m0 0l8 22l-8 23v23l32 54l-32 54v32l32 48l-32 48v32l32 54l-32 54v68l22-8l23 8h23l54-32l54 32h32l48-32l48 32h32l54-32l54 32h68l-8-22l8-23v-23l-32-54l32-54v-32l-32-48l32-48v-32l-32-54l32-54V0l-22 8l-23-8h-23l-54 32l-54-32h-32l-48 32l-48-32h-32l-54 32L68 0z"
            /><path
              fill="#0052b4"
              d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z"
            /><path
              fill="#d80027"
              d="M0 0v45l131 131h45zm208 0v208H0v96h208v208h96V304h208v-96H304V0zm259 0L336 131v45L512 0zM176 336L0 512h45l131-131zm160 0l176 176v-45L381 336z"
            /></g
          ></svg
        >
        EN
        {#if currentLang == "en"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 256 256"
            ><path
              fill="currentColor"
              d="M213.66 165.66a8 8 0 0 1-11.32 0L128 91.31l-74.34 74.35a8 8 0 0 1-11.32-11.32l80-80a8 8 0 0 1 11.32 0l80 80a8 8 0 0 1 0 11.32"
            /></svg
          >
        {/if}
      </button>
    </div>
  {/if}
</div>
