<script lang="ts" context="module">
  import { get_storage } from '$lib/util'

  // 加载最近访问情况
  // Map<campus_url, count>
  const stored_history: [string, number][] = JSON.parse(get_storage('history') ?? '[]')
  // Sort by count in descending order
  stored_history.sort((a, b) => b[1] - a[1])

  // 10 most visited sites
  const recent_sites = stored_history
    .map(([campus_url, _count]) =>
      Object.entries(sites)
        .map(([_name, group]) => group)
        .flat()
        .find((s) => s.url.campus == campus_url),
    )
    .filter((s) => s !== undefined)
    .slice(0, 10)
</script>

<script lang="ts">
  import { URL_Type } from '$lib/site'
  import sites from '$lib/sites.yaml'
  import { parse_number, set_storage } from '$lib/util'
  import Site from './site.svelte'

  let url_type = parse_number(get_storage('url-type')) ?? URL_Type.campus
  $: set_storage('url-type', String(url_type))

  const history = new Map<string, number>(stored_history)

  function update_history(event: CustomEvent<{ campus_url: string }>) {
    const { campus_url } = event.detail
    history.set(campus_url, (history.get(campus_url) ?? 0) + 1)
    set_storage('history', JSON.stringify(Array.from(history.entries())))
  }
</script>

<div class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
  <div class="flex">
    <h1 class="flex-1 text-2xl font-bold tracking-tight text-gray-900">Portal</h1>
    <a class="text-gray-900" href="https://webvpn.swo.moe" target="_blank"
      >链接转换器
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

  {#if recent_sites.length > 0}
    <h2 class="mt-4 text-2xl font-bold text-gray-900">最近访问</h2>
    <ul
      class="mt-6 grid grid-cols-[repeat(auto-fill,minmax(8em,1fr))] gap-x-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(12em,1fr))]"
    >
      {#each recent_sites as site}
        <Site {url_type} {site} on:redirect={update_history} />
      {/each}
    </ul>
  {/if}

  {#each Object.entries(sites) as [name, group]}
    <h2 class="mt-4 text-2xl font-bold text-gray-900">{name}</h2>
    <!-- Modified from https://tailwindui.com/components/ecommerce/components/product-lists -->
    <ul
      class="mt-6 grid grid-cols-[repeat(auto-fill,minmax(8em,1fr))] gap-x-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(12em,1fr))]"
    >
      {#each group as site (site.url.campus)}
        <Site {url_type} {site} on:redirect={update_history} />
      {/each}
    </ul>
  {/each}
</div>
