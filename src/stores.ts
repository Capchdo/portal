import { browser } from '$app/environment'
import { writable } from 'svelte/store'
import { URL_Type } from '$lib/site'

function parse_number(str: string | null): number | null {
  const n = Number(str)
  return isNaN(n) ? null : n
}

const stored = browser ? localStorage.getItem('url-type') : null

export const url_type = writable<URL_Type>(parse_number(stored) ?? URL_Type.campus)

if (browser) {
  url_type.subscribe((value) => {
    localStorage.setItem('url-type', String(value))
  })
}
