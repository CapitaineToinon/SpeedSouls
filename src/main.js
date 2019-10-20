import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";

import "@/api";

// Global components
import Footer from "@/components/Footer.vue";
Vue.component('ss-footer', Footer);

Vue.use(Buefy, {
  defaultIconPack: "fa"
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
