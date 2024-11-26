<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Blog } from "./BlogCard.svelte";

  let currentSlideIndex = 0;
  let blogs: Blog[] = [];
  let slideInterval: number;
  let isLoading = false;

  const BASE_API_URL = import.meta.env.PUBLIC_API_URL;

  const getBlogs = async () => {
    isLoading = true;
    const response = await fetch(
      `${BASE_API_URL}/api/blogs?pagination[pageSize]=3&sort[0]=publishedAt:desc&sort[1]=visited_counter:desc`,
    );
    const responseJson = await response.json();
    blogs = responseJson.data;
    isLoading = false;
  };

  function slideRight() {
    if (currentSlideIndex === blogs.length - 1) {
      return;
    }
    currentSlideIndex = currentSlideIndex + 1;
  }

  function startSlide() {
    slideInterval = setInterval(() => {
      if (currentSlideIndex === blogs.length - 1) {
        currentSlideIndex = 0;
      } else {
        slideRight();
      }
    }, 10000);
  }

  function changeSelectedItem(index: number) {
    currentSlideIndex = index;
    clearInterval(slideInterval);
    startSlide();
  }

  onMount(() => {
    getBlogs();
    startSlide();
  });

  onDestroy(() => {
    clearInterval(slideInterval);
  });
</script>

<div class="relative items-center flex flex-col lg:mt-20 lg:px-20">
  <div class="w-full overflow-hidden">
    <div
      class="flex flex-row gap-2 items-center h-[600px] lg:h-[400px] relative"
    >
      {#if isLoading}
        <div
          class="absolute w-full h-full transition-transform duration-500"
          style="transform: translateX(-{currentSlideIndex * 100}%); right: -0%"
        >
          <div
            class="lg:flex lg:flex-row lg:w-full h-full lg:gap-10 lg:items-center lg:justify-center"
          >
            <div
              class="relative lg:static lg:w-full h-full lg:items-center lg:justify-center lg:flex lg:flex-col"
            >
              <div
                class="skeleton w-full h-full lg:h-[350px] lg:rounded-2xl"
              ></div>
            </div>

            <div
              class="absolute lg:static bottom-[10%] px-5 z-30 w-full lg:rounded-2xl lg:w-full lg:h-[350px] lg:flex lg:flex-col lg:justify-between"
            >
              <div>
                <div class="skeleton w-full h-8 mb-5 rounded-lg"></div>
                <div class="skeleton w-full h-5 mb-1 rounded-md"></div>
                <div class="skeleton w-full h-5 mb-1 rounded-md"></div>
                <div class="skeleton w-1/3 h-5 rounded-md"></div>
              </div>
              <div class="hidden lg:block">
                <div class="skeleton w-1/3 h-4 rounded-md mb-1"></div>
                <div class="skeleton w-1/3 h-4 rounded-md"></div>
                <div class="flex flex-row gap-1 flex-wrap mt-2">
                  <div class="skeleton w-20 h-6 rounded-full"></div>
                  <div class="skeleton w-20 h-6 rounded-full"></div>
                  <div class="skeleton w-20 h-6 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {:else}
        {#each blogs as blog, index}
          <div
            class="absolute w-full h-full transition-transform duration-500"
            style="transform: translateX(-{currentSlideIndex *
              100}%); right: -{index * 100}%"
          >
            <div
              class="lg:flex lg:flex-row lg:w-full h-full lg:gap-10 lg:items-center lg:justify-center"
            >
              <div
                class="relative lg:static lg:w-full h-full lg:items-center lg:justify-center lg:flex lg:flex-col"
              >
                <a
                  class="inline-block w-full h-full lg:h-[350px]"
                  href="/blog/{blog.attributes.slug}"
                >
                  <img
                    class="skeleton object-cover w-full h-full lg:rounded-2xl"
                    src={BASE_API_URL +
                      blog.attributes.cover.data.attributes.url}
                    alt={blog.attributes.cover.data.attributes
                      .alternativeText || blog.attributes.title}
                  />
                </a>
                <div
                  class="bg-black absolute z-10 inset-0 opacity-70 lg:hidden"
                ></div>
              </div>

              <div
                class="absolute lg:static bottom-[10%] px-5 z-30 w-full lg:rounded-2xl lg:w-full lg:h-[350px] lg:flex lg:flex-col lg:justify-between"
              >
                <div>
                  <a href="/blog/{blog.attributes.slug}">
                    <h3
                      class="text-white font-semibold text-2xl mb-5 lg:text-[#1E1E1E]"
                      title={blog.attributes.title}
                    >
                      {blog.attributes.title}
                    </h3>
                    <p
                      class="hidden lg:block lg:!line-clamp-3 lg:text-justify lg:visible text-[#6D6D6D]"
                    >
                      {blog.attributes.content}
                    </p>
                  </a>
                  <a
                    href="/blog/{blog.attributes.slug}"
                    class="flex flex-row justify-between text-white lg:bg-gradient-to-br lg:from-primary lg:to-secondary lg:text-transparent lg:bg-clip-text font-medium w-full mt-1 text-sm"
                    >Baca Selengkapnya <span
                      ><svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.20876 11.2088L16.3788 11.2088L11.4988 6.32877C11.1088 5.93877 11.1088 5.29877 11.4988 4.90877C11.8888 4.51877 12.5188 4.51877 12.9088 4.90877L19.4988 11.4988C19.8888 11.8888 19.8888 12.5188 19.4988 12.9088L12.9188 19.5088C12.5288 19.8988 11.8988 19.8988 11.5088 19.5088C11.1188 19.1188 11.1188 18.4888 11.5088 18.0988L16.3788 13.2088L5.20876 13.2088C4.65876 13.2088 4.20876 12.7588 4.20876 12.2088C4.20876 11.6588 4.65876 11.2088 5.20876 11.2088Z"
                          fill="white"
                        />
                      </svg></span
                    >
                  </a>
                </div>
                <div class="hidden lg:block text-sm">
                  <p>
                    {new Date(blog.attributes.publishedAt).toLocaleDateString(
                      "in-ID",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </p>
                  <p>
                    Oleh: <span class="font-bold"
                      >{blog.attributes.author.data.attributes.name}</span
                    >
                  </p>
                  <div class="flex flex-row gap-1 flex-wrap mt-2">
                    {#each blog.attributes.blog_categories.data as category}
                      <span
                        class="text-white bg-slate-500 text-xs px-2 py-1 rounded-full"
                        >{category.attributes.name}</span
                      >
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
  {#if blogs.length > 1}
    <div class="absolute bottom-[5%] lg:-bottom-10 z-30 w-full lg:w-[30%]">
      <div class="flex flex-row justify-between px-5">
        {#each blogs as blog, index}
          <button
            type="button"
            on:click={() => changeSelectedItem(index)}
            class="p-1 rounded-full w-[30%] shadow-lg {currentSlideIndex ===
            index
              ? 'bg-gradient-to-br from-primary to-secondary'
              : 'bg-[#DFE9F9]'}"
          >
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
