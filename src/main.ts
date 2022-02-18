import { createApp } from "vue";
import { registerProperties } from "./utils/formatTime";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import _ from "lodash";
import * as Icons from "@element-plus/icons-vue";
import "element-plus/dist/index.css"; //服务类组件css样式
import "@/assets/css/animate.css"; //animate css样式
import '@/assets/css/tailwind.css' //安装并使用tailwind.css
const app = createApp(App);
/* 注册全部icon */
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
/* 数字过万过滤器 */
app.directive("thousand", {
  mounted(el) {
    if (el.textContent < 10000) return el.textContent;
    el.textContent = Math.trunc(+el.textContent / 10000) + "万";
  },
});
/* 索引小10多加0过滤器 */
app.directive("minTenIndex", {
  mounted(el) {
    if (+el.textContent < 10) {
      el.textContent = "0" + el.textContent;
    }
  },
});
app.use(store).use(router).use(_).use(registerProperties).mount("#app");
