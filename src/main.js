import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import VueScrollTo from "vue-scrollto";
import VueRx from "vue-rx";

Vue.use(VueRx);
Vue.use(VueScrollTo);
Vue.use(Buefy);

import ssLoading from "./components/ssLoading.vue";
Vue.component("ss-loading", ssLoading);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
