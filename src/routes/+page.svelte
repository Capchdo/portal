<script lang="ts">
  import { URL_Type, as_href, humanize_url } from '$lib/site'
  import sites from '$lib/sites.yaml'

  let url_type = URL_Type.campus
</script>

<div class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
  <div class="flex">
    <h2 class="flex-1 text-2xl font-bold tracking-tight text-gray-900">Portal</h2>
    <a class="text-gray-900" href="https://webvpn.swo.moe" target="_blank"
      >转换器
      <!-- https://heroicons.com arrow-top-right-on-square -->
      <svg
        class="inline size-6 align-text-bottom"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
    </a>
  </div>

  <fieldset>
    <legend class="font-bold">URL 类型</legend>
    <div class="grid grid-cols-3 gap-1 rounded-2xl bg-gray-100">
      {#each [[URL_Type.campus, '🏫校内'], [URL_Type.external, '👽WebVPN'], [URL_Type.library, '📚图书馆']] as [k, v]}
        <label class="rounded-2xl py-1 text-center hover:bg-gray-400 has-[:checked]:bg-gray-300">
          <input type="radio" bind:group={url_type} value={k} class="w-0 appearance-none" />
          {v}
        </label>
      {/each}
    </div>
  </fieldset>

  <!-- Modified from https://tailwindui.com/components/ecommerce/components/product-lists -->
  <ul class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
    {#each sites as { title, img_url, url, description }}
      <li class="group relative">
        <div
          class="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40"
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
            <h3 class="text-sm font-bold text-gray-700 group-hover:text-bit-light-green">
              <a href={as_href(url, url_type)} target="_blank">
                <span aria-hidden="true" class="absolute inset-0"></span>
                {title}
              </a>
            </h3>
            {#if description}
              <p class="mt-1 text-sm text-gray-500">{description}</p>
            {/if}
          </div>
          <p class="text-sm font-medium text-gray-700 group-hover:text-bit-light-green">
            {humanize_url(url)}
          </p>
        </div>
      </li>
    {/each}
  </ul>
</div>
