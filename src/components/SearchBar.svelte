<script lang="ts">
  import { useTranslations } from "astro-nanointl";

  interface Props {
    searchQuery?: string;
    pageLocale?: "id" | "en";
  }

  let { searchQuery = $bindable(""), pageLocale = "id" }: Props = $props();

  let t = $state(
    useTranslations(
      {
        placeholder: "Masukkan kata kunci pencarian...",
      },
      {
        data: {},
        locale: pageLocale,
      }
    )
  );

  import(`../locales/${pageLocale}/components/SearchBar.ts`).then(
    ({ translations }) => {
      t = useTranslations(
        {
          placeholder: "Masukkan kata kunci pencarian...",
        },
        {
          data: translations,
          locale: pageLocale,
        }
      );
    }
  );

  let input = $state<HTMLInputElement>();
</script>

<div class="relative w-full">
  <div class="bg-gradient-to-r from-primary to-secondary rounded-full p-[2px]">
    <input
      class="py-3 px-5 pr-10 rounded-full w-full outline-none"
      type="search"
      placeholder={t.placeholder}
      bind:this={input}
      bind:value={searchQuery}
    />
  </div>
  <button
    type="button"
    class="absolute top-1/2 -translate-y-[50%] right-5 cursor-default"
    onclick={() => input?.focus()}
    aria-label="search"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.79372 5.7932C5.2365 6.35042 4.79448 7.01195 4.49292 7.74C4.19135 8.46805 4.03613 9.24836 4.03613 10.0364C4.03613 10.8244 4.19135 11.6048 4.49292 12.3328C4.79448 13.0609 5.2365 13.7224 5.79372 14.2796C6.35095 14.8368 7.01247 15.2788 7.74052 15.5804C8.46857 15.882 9.24889 16.0372 10.0369 16.0372C10.825 16.0372 11.6053 15.882 12.3333 15.5804C13.0614 15.2788 13.7229 14.8368 14.2801 14.2796C15.3731 13.148 15.9778 11.6324 15.9642 10.0592C15.9505 8.48601 15.3195 6.98114 14.207 5.86869C13.0946 4.75624 11.5897 4.12523 10.0165 4.11155C8.44335 4.09788 6.92774 4.70265 5.79612 5.7956M13.4329 13.4324C12.989 13.8863 12.4595 14.2476 11.875 14.4954C11.2905 14.7432 10.6626 14.8726 10.0278 14.8761C9.39292 14.8796 8.76367 14.7571 8.17648 14.5158C7.58928 14.2744 7.0558 13.9189 6.60693 13.47C6.15805 13.021 5.80269 12.4875 5.56143 11.9003C5.32017 11.313 5.19781 10.6838 5.20141 10.0489C5.20502 9.41404 5.33454 8.78621 5.58246 8.20175C5.83037 7.61729 6.19177 7.08782 6.64572 6.644C7.54934 5.76054 8.76491 5.26907 10.0286 5.27626C11.2923 5.28344 12.5022 5.78869 13.3958 6.68237C14.2893 7.57604 14.7943 8.78603 14.8013 10.0497C14.8082 11.3135 14.3165 12.5289 13.4329 13.4324Z"
        fill="url(#paint0_linear_651_2745)"
      ></path>
      <path
        d="M13.4308 15.1522C13.2058 14.927 13.0795 14.6217 13.0796 14.3033C13.0797 13.985 13.2063 13.6798 13.4314 13.4548C13.6566 13.2297 13.9619 13.1034 14.2803 13.1035C14.5986 13.1036 14.9038 13.2302 15.1288 13.4554L18.5224 16.8502C18.637 16.9609 18.7285 17.0933 18.7914 17.2397C18.8542 17.3861 18.8873 17.5435 18.8887 17.7029C18.8901 17.8622 18.8598 18.0202 18.7994 18.1677C18.7391 18.3152 18.65 18.4492 18.5373 18.5618C18.4246 18.6745 18.2907 18.7636 18.1432 18.8239C17.9957 18.8843 17.8377 18.9146 17.6784 18.9133C17.519 18.9119 17.3616 18.8788 17.2151 18.8159C17.0687 18.753 16.9363 18.6616 16.8256 18.547L13.4308 15.1522Z"
        fill="url(#paint1_linear_651_2745)"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_651_2745"
          x1="5.00917"
          y1="2.36985"
          x2="15.2722"
          y2="17.8345"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5D97E4"></stop>
          <stop offset="0.08" stop-color="#5D92E3"></stop>
          <stop offset="0.16" stop-color="#5D86E2"></stop>
          <stop offset="0.24" stop-color="#5D72E1"></stop>
          <stop offset="0.29" stop-color="#5D63E0"></stop>
          <stop offset="0.44" stop-color="#5C5CDC"></stop>
          <stop offset="0.65" stop-color="#5B49D2"></stop>
          <stop offset="0.9" stop-color="#5929C2"></stop>
          <stop offset="1" stop-color="#581BBB"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_651_2745"
          x1="13.5535"
          y1="12.2551"
          x2="18.5538"
          y2="19.7875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5D97E4"></stop>
          <stop offset="0.08" stop-color="#5D92E3"></stop>
          <stop offset="0.16" stop-color="#5D86E2"></stop>
          <stop offset="0.24" stop-color="#5D72E1"></stop>
          <stop offset="0.29" stop-color="#5D63E0"></stop>
          <stop offset="0.44" stop-color="#5C5CDC"></stop>
          <stop offset="0.65" stop-color="#5B49D2"></stop>
          <stop offset="0.9" stop-color="#5929C2"></stop>
          <stop offset="1" stop-color="#581BBB"></stop>
        </linearGradient>
      </defs>
    </svg>
  </button>
</div>
