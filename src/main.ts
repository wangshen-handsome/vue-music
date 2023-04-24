import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// import ElementPlus from "element-plus"; //引入element-plus库
// import VForm3 from "vform3-builds"; //引入VForm3库

import router from "./router"; // 引入路由

import { createPinia } from "pinia";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
// import "vform3-builds/dist/designer.style.css"; //引入VForm3样式

const app = createApp(App);
app.use(router).use(createPinia());
app.mount("#app");
