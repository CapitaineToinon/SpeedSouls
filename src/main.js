import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueRx from "vue-rx";
import VTooltip from "v-tooltip";
import "./directives/clickOutside";
import "./filters/relativeDate";
import "./filters/date";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faDiscord,
  faPatreon,
  faTwitter,
  faTwitch,
  faGithub,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import {
  faList,
  faAngleDoubleRight,
  faVideo,
  faVideoSlash,
  faTimes,
  faExternalLinkAlt,
  faChevronRight,
  faLink
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faDiscord,
  faPatreon,
  faTwitter,
  faTwitch,
  faGithub,
  faYoutube,
  faList,
  faAngleDoubleRight,
  faVideo,
  faVideoSlash,
  faTimes,
  faExternalLinkAlt,
  faChevronRight,
  faLink
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueRx);
Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
