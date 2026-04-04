import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import importToCDN,{autoComplete} from 'vite-plugin-cdn-import'
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [BootstrapVueNextResolver(),],
      dts: true,
    }),
    visualizer({
      open: true,        // 打包完成后，自动在浏览器中打开报告
      filename: "dist/stats.html", // 报告文件名，默认生成在根目录
      gzipSize: true,    // 统计 Gzip 压缩后的大小
      brotliSize: true,  // 统计 Brotli 压缩后的大小
    }),
    // importToCDN({
    //   // 指定你的 CDN 供应商，这里以 unpkg 为例，它会自动使用 fastly 网络
    //   prodUrl: 'https://unpkg.com/{name}@{version}/{path}',
    //   modules: [
    //     // 使用 autoComplete 功能，自动补全配置
    //     autoComplete("vue"),
    //   ]
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next/resolvers'


