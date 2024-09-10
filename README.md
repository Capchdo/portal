# BIT Portal

克隆并改进网瑞达 [WebVPN](https://webvpn.bit.edu.cn)。

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
const urls = Object.entries(parse(yaml))
  .map(([name, group]) => group.map((s) => humanize_url(s.url)))
  .flat()
urls.filter((u, i) => i !== urls.indexOf(u))
```

### 网站图片

- 如果网站有众所周知的图标，采用图标；不然采用首页有特色部位的截图（例如带网站名称的醒目大图），但不能有实质性信息，例如随时会变的通知。

- 分辨率至少 600×400，让人能一眼辨别。

- 采用 WebP 格式，并尽可能降低分辨率，尽量减少性能负担。

  ```shell
  magick {}.png -resize 600x400^ {}.webp
  ```
