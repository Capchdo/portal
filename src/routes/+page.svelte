<script lang="ts">
  import sites from '$lib/sites.yaml';

  function humanize_url(url: string): string {
    return new URL(url).host.replace(/\.bit\.edu\.cn$/, '');
  }
</script>

<div class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
  <h2 class="text-2xl font-bold tracking-tight text-gray-900">Portal</h2>

  <!-- Modified from https://tailwindui.com/components/ecommerce/components/product-lists -->
  <ul class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
    {#each sites as { title, img_url, url, description }}
      <li class="group relative">
        <div
          class="aspect-w-3 aspect-h-2 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40"
        >
          {#if img_url}
            <img
              src={img_url}
              alt=""
              class="h-full w-full object-cover object-top lg:h-full lg:w-full"
            />
          {/if}
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700 font-bold group-hover:text-bit-light-green">
              <a href={url.campus} target="_blank">
                <span aria-hidden="true" class="absolute inset-0"></span>
                {title}
              </a>
            </h3>
            {#if description}
              <p class="mt-1 text-sm text-gray-500">{description}</p>
            {/if}
          </div>
          <p class="text-sm font-medium text-gray-700 group-hover:text-bit-light-green">
            {url.human || humanize_url(url.campus)}
          </p>
        </div>
      </li>
    {/each}
  </ul>
</div>
