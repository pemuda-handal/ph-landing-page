<script lang="ts">
  import { onMount } from "svelte";
  import { useTranslations } from "astro-nanointl";

  export let filters: { name: string; value: string }[] = [];
  export let selectedFilter: string = "";
  export let isDropdownOpen = false;
  export let onFilterChange: (value: string) => void;
  export let pageLocale: "id" | "en" = "id";

  let t = useTranslations(
    {
      sort: "Urutkan",
    },
    {
      data: {},
      locale: pageLocale,
    },
  );

  import(`../locales/${pageLocale}/components/FilterDropdown.ts`).then(
    ({ translations }) => {
      t = useTranslations(
        {
          sort: "Urutkan",
        },
        {
          data: translations,
          locale: pageLocale,
        },
      );
    },
  );

  function toggleFilter() {
    isDropdownOpen = !isDropdownOpen;
  }

  onMount(() => {
    window.addEventListener("click", (event) => {
      const element = event.target as HTMLElement;
      const isFilterDropdown =
        element.classList.contains("filter-dropdown") ||
        element.closest(".filter-dropdown");
      if (!isFilterDropdown) {
        isDropdownOpen = false;
      }
    });
  });
</script>

<div
  class="filter-dropdown relative bg-gradient-to-r from-primary to-secondary rounded-full p-[2px] z-20"
>
  <button
    class="bg-white md:py-3 md:px-5 w-[52px] h-[52px] md:w-auto md:h-auto rounded-full flex flex-row gap-20 justify-center md:justify-between items-center"
    on:click={() => {
      toggleFilter();
    }}
  >
    <span
      class="hidden md:inline bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-medium"
    >
      {filters.find((filter) => filter.value === selectedFilter)?.name}
    </span>
    <svg
      class="hidden md:block"
      width="16"
      height="16"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.71204 7.27977L3.71193 7.27967L3.72037 7.27123L3.7269 7.26471C3.84783 7.13881 3.9928 7.03843 4.15325 6.96955C4.3159 6.89972 4.49106 6.86371 4.66807 6.86371C4.84508 6.86371 5.02023 6.89972 5.18288 6.96955L4.9869 7.42606L5.18288 6.96955C5.34541 7.03933 5.49206 7.14141 5.61392 7.26961C5.61401 7.26971 5.6141 7.2698 5.61419 7.2699L14.0016 16.0733L22.3857 7.2699C22.5076 7.14156 22.6544 7.03938 22.817 6.96955L23.0142 7.429L22.817 6.96955C22.9797 6.89972 23.1548 6.86371 23.3318 6.86371C23.5088 6.86371 23.684 6.89972 23.8466 6.96955C24.0071 7.03844 24.1521 7.13882 24.273 7.26473L24.2795 7.2712L24.2796 7.2711L24.2878 7.27977C24.5316 7.53549 24.6676 7.87522 24.6676 8.22852C24.6676 8.58177 24.5317 8.92147 24.2879 9.17718C24.2879 9.17721 24.2879 9.17724 24.2878 9.17727L14.9954 18.9299C14.867 19.0647 14.7126 19.172 14.5415 19.2453L14.3448 18.7864L14.5415 19.2453C14.3703 19.3186 14.1861 19.3564 13.9999 19.3564C13.8138 19.3564 13.6295 19.3186 13.4584 19.2453L13.6553 18.7857L13.4584 19.2453C13.2873 19.172 13.1329 19.0647 13.0044 18.9299L3.71204 9.17727C3.71201 9.17724 3.71198 9.17721 3.71195 9.17718C3.46823 8.92147 3.33228 8.58177 3.33228 8.22852C3.33228 7.87522 3.46827 7.53549 3.71204 7.27977Z"
        fill="url(#paint0_linear_611_4137)"
        stroke="url(#paint1_linear_611_4137)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_611_4137"
          x1="5.49111"
          y1="20.5347"
          x2="12.5507"
          y2="1.71631"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5D97E4" />
          <stop offset="0.08" stop-color="#5D92E3" />
          <stop offset="0.16" stop-color="#5D86E2" />
          <stop offset="0.24" stop-color="#5D72E1" />
          <stop offset="0.29" stop-color="#5D63E0" />
          <stop offset="0.44" stop-color="#5C5CDC" />
          <stop offset="0.65" stop-color="#5B49D2" />
          <stop offset="0.9" stop-color="#5929C2" />
          <stop offset="1" stop-color="#581BBB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_611_4137"
          x1="5.49111"
          y1="20.5347"
          x2="12.5507"
          y2="1.71631"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5D97E4" />
          <stop offset="0.08" stop-color="#5D92E3" />
          <stop offset="0.16" stop-color="#5D86E2" />
          <stop offset="0.24" stop-color="#5D72E1" />
          <stop offset="0.29" stop-color="#5D63E0" />
          <stop offset="0.44" stop-color="#5C5CDC" />
          <stop offset="0.65" stop-color="#5B49D2" />
          <stop offset="0.9" stop-color="#5929C2" />
          <stop offset="1" stop-color="#581BBB" />
        </linearGradient>
      </defs>
    </svg>
    <svg
      class="md:hidden"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6H21H3ZM6 12H18H6ZM9 18H15H9Z"
        fill="url(#paint0_linear_651_2771)"
      />
      <path
        d="M3 6H21M6 12H18M9 18H15"
        stroke="url(#paint1_linear_651_2771)"
        stroke-width="2"
        stroke-linecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_651_2771"
          x1="4.46833"
          y1="4.2477"
          x2="12.7628"
          y2="22.9914"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5D97E4" />
          <stop offset="0.08" stop-color="#5D92E3" />
          <stop offset="0.16" stop-color="#5D86E2" />
          <stop offset="0.24" stop-color="#5D72E1" />
          <stop offset="0.29" stop-color="#5D63E0" />
          <stop offset="0.44" stop-color="#5C5CDC" />
          <stop offset="0.65" stop-color="#5B49D2" />
          <stop offset="0.9" stop-color="#5929C2" />
          <stop offset="1" stop-color="#581BBB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_651_2771"
          x1="4.46833"
          y1="4.2477"
          x2="12.7628"
          y2="22.9914"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5D97E4" />
          <stop offset="0.08" stop-color="#5D92E3" />
          <stop offset="0.16" stop-color="#5D86E2" />
          <stop offset="0.24" stop-color="#5D72E1" />
          <stop offset="0.29" stop-color="#5D63E0" />
          <stop offset="0.44" stop-color="#5C5CDC" />
          <stop offset="0.65" stop-color="#5B49D2" />
          <stop offset="0.9" stop-color="#5929C2" />
          <stop offset="1" stop-color="#581BBB" />
        </linearGradient>
      </defs>
    </svg>
  </button>
  <div
    class="bg-gradient-to-r from-primary to-secondary p-[2px] rounded-lg absolute w-72 right-0 top-16 {isDropdownOpen
      ? ''
      : 'hidden'}"
  >
    <div class="flex flex-col rounded-lg w-full bg-white">
      <div
        class="py-4 px-5 flex flex-row justify-between border-b-2 border-[#99999] font-medium bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
      >
        {t.sort}
        <button
          aria-label="sort"
          on:click={() => {
            isDropdownOpen = false;
          }}
          ><svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.3 5.71022C18.2075 5.61752 18.0976 5.54397 17.9766 5.49379C17.8556 5.44361 17.7259 5.41778 17.595 5.41778C17.464 5.41778 17.3343 5.44361 17.2134 5.49379C17.0924 5.54397 16.9825 5.61752 16.89 5.71022L12 10.5902L7.10998 5.70022C7.0174 5.60764 6.90749 5.5342 6.78652 5.4841C6.66556 5.43399 6.53591 5.4082 6.40498 5.4082C6.27405 5.4082 6.1444 5.43399 6.02344 5.4841C5.90247 5.5342 5.79256 5.60764 5.69998 5.70022C5.6074 5.79281 5.53396 5.90272 5.48385 6.02368C5.43375 6.14464 5.40796 6.27429 5.40796 6.40522C5.40796 6.53615 5.43375 6.6658 5.48385 6.78677C5.53396 6.90773 5.6074 7.01764 5.69998 7.11022L10.59 12.0002L5.69998 16.8902C5.6074 16.9828 5.53396 17.0927 5.48385 17.2137C5.43375 17.3346 5.40796 17.4643 5.40796 17.5952C5.40796 17.7262 5.43375 17.8558 5.48385 17.9768C5.53396 18.0977 5.6074 18.2076 5.69998 18.3002C5.79256 18.3928 5.90247 18.4662 6.02344 18.5163C6.1444 18.5665 6.27405 18.5922 6.40498 18.5922C6.53591 18.5922 6.66556 18.5665 6.78652 18.5163C6.90749 18.4662 7.0174 18.3928 7.10998 18.3002L12 13.4102L16.89 18.3002C16.9826 18.3928 17.0925 18.4662 17.2134 18.5163C17.3344 18.5665 17.464 18.5922 17.595 18.5922C17.7259 18.5922 17.8556 18.5665 17.9765 18.5163C18.0975 18.4662 18.2074 18.3928 18.3 18.3002C18.3926 18.2076 18.466 18.0977 18.5161 17.9768C18.5662 17.8558 18.592 17.7262 18.592 17.5952C18.592 17.4643 18.5662 17.3346 18.5161 17.2137C18.466 17.0927 18.3926 16.9828 18.3 16.8902L13.41 12.0002L18.3 7.11022C18.68 6.73022 18.68 6.09022 18.3 5.71022Z"
              fill="#6247D4"
            ></path>
          </svg>
        </button>
      </div>
      {#each filters as filter}
        <button
          class="flex-row flex justify-between w-full py-2 px-5 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text {filter.value ===
          selectedFilter
            ? 'font-medium text-secondary'
            : ''}"
          on:click={() => onFilterChange(filter.value)}
        >
          {filter.name}
          <span class={filter.value === selectedFilter ? "" : "hidden"}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.7959 7.54597L9.7959 19.546C9.69138 19.6509 9.56719 19.7341 9.43044 19.7909C9.2937 19.8476 9.14709 19.8769 8.99902 19.8769C8.85096 19.8769 8.70435 19.8476 8.5676 19.7909C8.43086 19.7341 8.30666 19.6509 8.20215 19.546L2.95215 14.296C2.8475 14.1913 2.76449 14.0671 2.70785 13.9304C2.65122 13.7936 2.62207 13.6471 2.62207 13.4991C2.62207 13.3511 2.65122 13.2046 2.70785 13.0678C2.76449 12.9311 2.8475 12.8069 2.95215 12.7022C3.05679 12.5976 3.18103 12.5146 3.31776 12.4579C3.45448 12.4013 3.60103 12.3721 3.74902 12.3721C3.89702 12.3721 4.04356 12.4013 4.18029 12.4579C4.31702 12.5146 4.44125 12.5976 4.5459 12.7022L8.99996 17.1563L20.204 5.9541C20.4154 5.74276 20.702 5.62402 21.0009 5.62402C21.2998 5.62402 21.5864 5.74276 21.7978 5.9541C22.0091 6.16544 22.1278 6.45209 22.1278 6.75098C22.1278 7.04986 22.0091 7.33651 21.7978 7.54785L21.7959 7.54597Z"
                fill="#6247D4"
              />
            </svg>
          </span>
        </button>
      {/each}
    </div>
  </div>
</div>
