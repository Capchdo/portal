import { browser } from '$app/environment'

export function parse_number(str: string | null): number | null {
  const n = Number(str)
  return isNaN(n) ? null : n
}

export function get_storage(key: string): string | null {
  return browser ? localStorage.getItem(key) : null
}
export function set_storage(key: string, value: string) {
  if (browser) {
    localStorage.setItem(key, value)
  }
}
