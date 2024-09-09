import typography from '@tailwindcss/typography'
import aspect_ratio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // 北京理工大学视觉形象识别系统 - A4 学校标准色（其中“北理绿”的 RGB 误写成了 RBG）
        // https://www.bit.edu.cn/gbxxgk/dqgz_sjb/vixx/xxbzs/index.htm
        // 学校辅助色“北理绿”
        'bit-light-green': '#0a8f30',
        // 学校辅助色“褐”
        'bit-brown': '#a13e0b',
        // 学校辅助色“墨绿”
        'bit-dark-green': '#005b30',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [typography, aspect_ratio],
}
