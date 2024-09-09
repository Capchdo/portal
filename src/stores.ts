import { browser } from '$app/environment'
import { writable } from 'svelte/store'
import { URL_Type } from '$lib/site'

const stored = Number(browser ? (localStorage.getItem('url-type') ?? 'null') : 'null')

export const url_type = writable<URL_Type>(stored ?? URL_Type.campus)

if (browser) {
  url_type.subscribe((value) => {
    localStorage.setItem('url-type', String(value))
  })
}
