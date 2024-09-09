export interface Site {
  title: string
  img_url?: string
  description?: string
  url: SiteURL
}

export interface SiteURL {
  // 简短，人类已读
  human?: string
  // 校内
  campus: string
  // 校外WebVPN
  external: string
}

export enum URL_Type {
  // 校内
  campus,
  // 校外WebVPN
  external,
  // 图书馆VPN
  library,
}

export function humanize_url(url: SiteURL): string {
  return (
    url.human ||
    new URL(url.campus).host
      .replace(/\.(bit\.edu\.cn|net|com|cn|com\.cn|org)$/, '')
      .replace(/^www\./, '')
  )
}

export function as_href(url: SiteURL, url_type: URL_Type): string {
  switch (url_type) {
    case URL_Type.campus:
      return url.campus
    case URL_Type.external:
      return url.external
    case URL_Type.library:
      return url.external.replace(
        new RegExp('^' + 'https://webvpn.bit.edu.cn'),
        'https://nlibvpn.bit.edu.cn',
      )
  }
}
