import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import VueScrollTo from "vue-scrollto";

// Global components
import Footer from "@/components/Footer.vue";
Vue.component("ss-footer", Footer);

Vue.use(VueScrollTo);
Vue.use(Buefy, {
  defaultIconPack: "fa"
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
