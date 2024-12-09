<script lang="ts" context="module">
  export interface Blog {
    id: number;
    attributes: {
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      slug: string;
      locale: string;
      keywords: string;
      visited_counter: number;
      cover: Image;
      author: {
        data: {
          id: number;
          attributes: {
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            createdAt: string;
            updatedAt: string;
            name: string;
            avatar: Image;
            headline: string;
            socials: {
              [key: string]: string;
            };
          };
        };
      };
      blog_categories: {
        data: {
          id: number;
          attributes: {
            name: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            locale: string;
          };
        }[];
      };
      localizations: any[];
    };
  }

  interface Image {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText: string;
        caption: any;
        width: number;
        height: number;
        formats: {
          thumbnail: ImageFormat;
          large: ImageFormat;
          small: ImageFormat;
          medium: ImageFormat;
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: any;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
      };
    };
  }

  interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: any;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
  }
</script>

<script lang="ts">
  import { toJsLocale } from "@utils/astroToJsLocale";

  import { useTranslations } from "astro-nanointl";

  const BASE_API_URL = import.meta.env.PUBLIC_API_URL;
  export let blog: Blog | null = null;
  export let pageLocale: "id" | "en" = "id";

  let blogUrl =
    pageLocale === "id"
      ? `/blog/${blog?.attributes.slug}`
      : `/${pageLocale}/blog/${blog?.attributes.slug}`;

  let t = useTranslations(
    {
      readMore: "Baca Selengkapnya",
      by: "Oleh",
    },
    {
      data: {},
      locale: pageLocale,
    },
  );

  import(`../locales/${pageLocale}/components/BlogCard.ts`).then(
    ({ translations }) => {
      t = useTranslations(
        {
          readMore: "Baca Selengkapnya",
          by: "Oleh",
        },
        {
          data: translations,
          locale: pageLocale,
        },
      );
    },
  );
</script>

{#if blog}
  <div class="flex flex-col p-4 shadow-md rounded-lg gap-3">
    <div>
      <a href={blogUrl}>
        <img
          class="skeleton rounded-lg object-cover aspect-video"
          src={BASE_API_URL + blog.attributes.cover.data.attributes.url}
          alt={blog.attributes.cover.data.attributes.alternativeText ||
            blog.attributes.title}
        />
      </a>
    </div>
    <div class="flex flex-row justify-between text-sm mt-2 flex-wrap">
      <div class="text-[#999999]">
        {t.by}
        {blog.attributes.author.data.attributes.name}
      </div>
      <div class="text-[#999999]">
        {new Date(blog.attributes.publishedAt).toLocaleDateString(
          toJsLocale(pageLocale),
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        )}
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <a href="/blog/{blog.attributes.slug}">
        <h3
          class="text-primary font-semibold text-lg line-clamp-2"
          title={blog.attributes.title}
        >
          {blog.attributes.title}
        </h3>
        <div class="min-h-[72px] mt-2">
          <p class="text-[#999999] text-ellipsis line-clamp-3">
            {blog.attributes.content.split("#")[0]}
          </p>
        </div>
      </a>
      <div class="flex flex-row gap-1 flex-wrap">
        {#each blog.attributes.blog_categories.data as category}
          <span class="text-white bg-slate-500 text-xs px-2 py-1 rounded-full"
            >{category.attributes.name}</span
          >
        {/each}
      </div>
      <a
        href={blogUrl}
        class="flex flex-row justify-between text-primary font-semibold text-sm mt-2"
        >{t.readMore}
        <span
          ><svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.20876 11.2088L16.3788 11.2088L11.4988 6.32877C11.1088 5.93877 11.1088 5.29877 11.4988 4.90877C11.8888 4.51877 12.5188 4.51877 12.9088 4.90877L19.4988 11.4988C19.8888 11.8888 19.8888 12.5188 19.4988 12.9088L12.9188 19.5088C12.5288 19.8988 11.8988 19.8988 11.5088 19.5088C11.1188 19.1188 11.1188 18.4888 11.5088 18.0988L16.3788 13.2088L5.20876 13.2088C4.65876 13.2088 4.20876 12.7588 4.20876 12.2088C4.20876 11.6588 4.65876 11.2088 5.20876 11.2088Z"
              fill="url(#paint0_linear_768_775)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_768_775"
                x1="22.0667"
                y1="18.5626"
                x2="2.18532"
                y2="5.02029"
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
        </span></a
      >
    </div>
  </div>
{:else}
  <div class="flex flex-col p-4 shadow-md rounded-lg gap-3">
    <div class="skeleton rounded-lg aspect-video"></div>
    <div class="flex flex-row justify-between text-sm mt-2 flex-wrap">
      <div class="skeleton w-20 h-4 rounded"></div>
      <div class="skeleton w-20 h-4 rounded"></div>
    </div>
    <div class="flex flex-col gap-3 mt-2">
      <div>
        <div class="skeleton w-full h-6 mb-1 rounded-lg"></div>
        <div class="skeleton w-full h-6 rounded-lg"></div>
      </div>
      <div>
        <div class="skeleton w-full h-5 mb-1 rounded-md"></div>
        <div class="skeleton w-full h-5 mb-1 rounded-md"></div>
        <div class="skeleton w-full h-5 rounded-md"></div>
      </div>
      <div class="flex flex-row gap-1 flex-wrap">
        <div class="skeleton w-20 h-6 rounded-full"></div>
        <div class="skeleton w-20 h-6 rounded-full"></div>
        <div class="skeleton w-20 h-6 rounded-full"></div>
      </div>
      <div class="flex flex-row justify-between font-semibold text-sm mt-2">
        <div class="skeleton w-20 h-4 rounded-md"></div>
        <div class="skeleton w-8 h-4 rounded-md"></div>
      </div>
    </div>
  </div>
{/if}
