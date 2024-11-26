<script lang="ts">
  import BlogCard, { type Blog } from "../components/BlogCard.svelte";
  import FilterDropdown from "../components/FilterDropdown.svelte";
  import SearchBar from "../components/SearchBar.svelte";
  import { onDestroy, onMount } from "svelte";

  const BASE_API_URL = import.meta.env.PUBLIC_API_URL;

  let blogs: Blog[] = [];
  let isLoading = false;
  let initialLoad = true;
  let page = 1;
  let pageCount = 1;
  let searchQuery = "";
  let isSortDropdownOpen = false;
  let selectedSort = "publishedAt:desc";
  let sorts = [
    {
      name: "Terbaru",
      value: "publishedAt:desc",
    },
    {
      name: "Terlama",
      value: "publishedAt:asc",
    },
    {
      name: "A ke Z",
      value: "title:asc",
    },
    {
      name: "Z ke A",
      value: "title:desc",
    },
  ];
  let searchDebounce: number;

  const fetchBlogs = async (
    { page = 1, searchQuery = "", sort = "publishedAt:desc" } = {},
    isMore = false,
  ) => {
    if (isLoading) return;

    isLoading = true;

    if (!isMore) {
      blogs = [];
    }

    const response = await fetch(
      `${BASE_API_URL}/api/blogs?pagination[page]=${page}&pagination[pageSize]=6&sort=${sort}&filters[$or][0][title][$containsi]=${searchQuery}&filters[$or][1][keywords][$containsi]=${searchQuery}`,
    );
    const responseJson = await response.json();
    blogs = [...blogs, ...responseJson.data];
    pageCount = responseJson.meta.pagination.pageCount;

    isLoading = false;
  };

  const onLoadMore = () => {
    page += 1;
    fetchBlogs(
      {
        page,
        searchQuery,
        sort: selectedSort,
      },
      true,
    );
  };

  const onSortChange = (sort: string) => {
    selectedSort = sort;
    isSortDropdownOpen = false;
    fetchBlogs({
      page,
      searchQuery,
      sort,
    });
  };

  const onSearchChange = (query: string) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      fetchBlogs({
        page,
        searchQuery: query,
        sort: selectedSort,
      });
    }, 500);
  };

  onMount(() => {
    fetchBlogs();
    initialLoad = false;
  });

  onDestroy(() => {
    clearTimeout(searchDebounce);
  });

  $: onSearchChange(searchQuery);
</script>

<div class="flex flex-row justify-between items-end gap-5">
  <div class="w-full lg:w-1/2">
    <SearchBar bind:searchQuery />
  </div>
  <FilterDropdown
    filters={sorts}
    bind:isDropdownOpen={isSortDropdownOpen}
    onFilterChange={onSortChange}
    selectedFilter={selectedSort}
  />
</div>
<div class="mt-5 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
  {#if isLoading}
    {#each Array(6) as _}
      <BlogCard />
    {/each}
  {:else}
    {#each blogs as blog}
      <BlogCard {blog}></BlogCard>
    {/each}
  {/if}
</div>
{#if !initialLoad && blogs.length === 0}
  <div class="flex flex-col items-center justify-center mt-10">
    <img src="/images/no-data.jpg" alt="Data tidak ditemukan" class="md:w-80" />
    <a
      class="text-sm"
      href="https://www.freepik.com/free-vector/hand-drawn-no-data-concept_55024593.htm#fromView=search&page=1&position=2&uuid=76a23714-6c4b-48c9-b800-96795a5c5f6e"
      >Image by pikisuperstar on Freepik</a
    >
    <p class="text-center mt-5 text-[#999999] text-sm">Data tidak ditemukan</p>
  </div>
{/if}
{#if pageCount !== page}
  <button
    class="flex flex-col items-center font-semibold py-4 text-primary uppercase mt-10 gap-2 w-full text-sm"
    on:click={onLoadMore}
  >
    Muat Lebih Banyak
    <svg
      width="20"
      height="20"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.71204 7.27977L3.71193 7.27967L3.72037 7.27123L3.7269 7.26471C3.84783 7.13881 3.9928 7.03843 4.15325 6.96955C4.3159 6.89972 4.49106 6.86371 4.66807 6.86371C4.84508 6.86371 5.02023 6.89972 5.18288 6.96955L4.9869 7.42606L5.18288 6.96955C5.34541 7.03933 5.49206 7.14141 5.61392 7.26961C5.61401 7.26971 5.6141 7.2698 5.61419 7.2699L14.0016 16.0733L22.3857 7.2699C22.5076 7.14156 22.6544 7.03938 22.817 6.96955L23.0142 7.429L22.817 6.96955C22.9797 6.89972 23.1548 6.86371 23.3318 6.86371C23.5088 6.86371 23.684 6.89972 23.8466 6.96955C24.0071 7.03844 24.1521 7.13882 24.273 7.26473L24.2795 7.2712L24.2796 7.2711L24.2878 7.27977C24.5316 7.53549 24.6676 7.87522 24.6676 8.22852C24.6676 8.58177 24.5317 8.92147 24.2879 9.17718C24.2879 9.17721 24.2879 9.17724 24.2878 9.17727L14.9954 18.9299C14.867 19.0647 14.7126 19.172 14.5415 19.2453L14.3448 18.7864L14.5415 19.2453C14.3703 19.3186 14.1861 19.3564 13.9999 19.3564C13.8138 19.3564 13.6295 19.3186 13.4584 19.2453L13.6553 18.7857L13.4584 19.2453C13.2873 19.172 13.1329 19.0647 13.0044 18.9299L3.71204 9.17727C3.71201 9.17724 3.71198 9.17721 3.71195 9.17718C3.46823 8.92147 3.33228 8.58177 3.33228 8.22852C3.33228 7.87522 3.46827 7.53549 3.71204 7.27977Z"
        fill="url(#paint0_linear_614_4166)"
        stroke="url(#paint1_linear_614_4166)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_614_4166"
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
          id="paint1_linear_614_4166"
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
  </button>
{/if}
