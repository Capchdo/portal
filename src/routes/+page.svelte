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
  import { onMount } from 'svelte'
  import { on_campus } from '@ydx/bit-on-campus'
  import { URL_Type } from '$lib/site'
  import sites from '$lib/sites.yaml'
  import { parse_number, set_storage } from '$lib/util'
  import Site from './site.svelte'

  // 初始URL类型有上次记录、现场检测两种确定方法，前者更快，后者更准
  // 因此先用前者，等后者确定后再用它覆盖
  let url_type = parse_number(get_storage('url-type')) ?? URL_Type.campus
  $: set_storage('url-type', String(url_type))
  // 不过library校内外都能用，现场检测不提供信息，故不再覆盖
  if (url_type !== URL_Type.library) {
    onMount(async () => {
      url_type = (await on_campus(1000)) ? URL_Type.campus : URL_Type.external
    })
  }

  const history = new Map<string, number>(stored_history)

  function update_history(event: CustomEvent<{ campus_url: string }>) {
    const { campus_url } = event.detail
    history.set(campus_url, (history.get(campus_url) ?? 0) + 1)
    set_storage('history', JSON.stringify(Array.from(history.entries())))
  }
</script>

<div class="mx-auto max-w-2xl px-4 pt-4 sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
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

<footer class="mt-8 bg-slate-100 py-4 text-center sm:py-8">
  <a class="text-gray-700" href="https://github.com/Capchdo/portal" target="_blank">
    <!-- https://simpleicons.org git -->
    <svg
      class="inline size-5 align-text-bottom text-bit-dark-green"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      ><path
        d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"
      /></svg
    >
    Capchdo/portal
  </a>
</footer>
