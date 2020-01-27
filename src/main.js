import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import VueScrollTo from "vue-scrollto";

// Global components
import Footer from "@/components/Footer.vue";
Vue.component("ss-footer", Footer);

Vue.use(VueScrollTo);
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
