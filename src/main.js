import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import VueScrollTo from "vue-scrollto";

Vue.use(VueScrollTo);
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
