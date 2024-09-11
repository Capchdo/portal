# BIT Portal

克隆并改进网瑞达 [WebVPN](https://webvpn.bit.edu.cn)。

[![check](https://github.com/Capchdo/portal/actions/workflows/check.yml/badge.svg)](https://github.com/Capchdo/portal/actions/workflows/check.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/96c00cb3-7036-44c3-aa15-f3b017079635/deploy-status)](https://app.netlify.com/sites/bit-portal/deploys)

## 开发

### 避免网站重复

用 [yq](https://mikefarah.gitbook.io/yq) 可列出重复的校内 URL：

```shell
yq '.[].[].url.campus' ./src/lib/sites.yaml | sort | uniq --all-repeated
```

用以下 [deno](https://deno.com/) 程序可检查重复的人类易读版 URL。

```typescript
import { parse } from 'jsr:@std/yaml'
import { humanize_url } from './src/lib/site.ts'

const yaml = await Deno.readTextFile('./src/lib/sites.yaml')
const sites = Object.entries(parse(yaml)).flatMap(([name, group]) => group)
const urls = sites.map((s) => humanize_url(s.url))
urls.filter((u, i) => i !== urls.indexOf(u))
```

### 网站图片

- 如果网站有众所周知的图标，采用图标；不然采用首页有特色部位的截图（例如带网站名称的醒目大图），但不能有实质性信息，例如随时会变的通知。

- 分辨率至少 600×400，让人能一眼辨别。

- 采用 WebP 格式，并尽可能降低分辨率，尽量减少性能负担。

  ```powershell
  Get-ChildItem *.* | % { magick $_.Name -resize 600x400^ "$($_.BaseName).webp" }
  ```

### 确保图片存在

用以下 deno 程序可列出缺失的图片文件。

```typescript
import { parse } from 'jsr:@std/yaml'
import { existsSync } from 'jsr:@std/fs'
import { assert } from 'jsr:@std/assert'

const yaml = await Deno.readTextFile('./src/lib/sites.yaml')
const sites = Object.entries(parse(yaml)).flatMap(([name, group]) => group)
const files = sites
  .map((s) => s.img_url)
  .filter((u) => u)
  .map((u) => {
    const base = 'https://img.haobit.eu.org/portal/'
    assert(u.startsWith(base), `Fail to recognize “${u}”`)
    return u.slice(base.length)
  })
files.filter((f) => !existsSync('./portal-img/' + f))
```
