<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { URL_Type, as_href, humanize_url } from '$lib/site'
  import type { Site } from '$lib/site'

  export let site: Site
  export let url_type: URL_Type

  const dispatch = createEventDispatcher<{ redirect: { campus_url: string } }>()
</script>

<li class="group relative">
  <div
    class="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40"
  >
    {#if site.img_url}
      <img
        src={site.img_url}
        alt=""
        class="h-full w-full object-cover object-top lg:h-full lg:w-full"
      />
    {/if}
  </div>
  <div class="mt-4">
    <div class="flex flex-wrap justify-between gap-x-2">
      <h3 class="text-sm font-bold text-gray-700 group-hover:text-bit-light-green">
        <a
          href={as_href(site.url, url_type)}
          target="_blank"
          on:click={() => dispatch('redirect', { campus_url: site.url.campus })}
        >
          <span aria-hidden="true" class="absolute inset-0"></span>
          {site.title}
        </a>
      </h3>
      <p class="text-sm font-medium text-gray-700 group-hover:text-bit-light-green">
        {humanize_url(site.url)}
      </p>
    </div>
    {#if site.description}
      <p class="mt-1 text-sm text-gray-500">{site.description}</p>
    {/if}
  </div>
</li>
