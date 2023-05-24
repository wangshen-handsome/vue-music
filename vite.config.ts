import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    [
      "import",
      {
        libraryName: "@icon-park/vue",
        libraryDirectory: "es/icons",
        camel2DashComponentName: false, // default: true,
      },
    ],
  ],
  server: {
    port: 8080,
    host: "0.0.0.0",
    https: false,
    proxy: {
      "/api": {
        target: "https://api.trtst.com", //跨域地址
        // target: "http://localhost:3000", //跨域地址
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, ""), //重写路径,替换/api
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@apis": resolve(__dirname, "src/apis"),
      "@utils": resolve(__dirname, "src/utils"),
      "@plugins": resolve(__dirname, "src/plugins"),
      "@assets": resolve(__dirname, "src/assets"),
      "@views": resolve(__dirname, "src/views"),
    },
  },
});
