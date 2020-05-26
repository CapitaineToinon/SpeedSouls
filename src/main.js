import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueRx from 'vue-rx';
import VueMeta from 'vue-meta';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faDiscord,
  faPatreon,
  faTwitter,
  faTwitch,
  faGithub,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
  faList,
  faAngleDoubleRight,
  faVideo,
  faVideoSlash,
  faTimes,
  faExternalLinkAlt,
  faChevronRight,
  faLink,
  faCog,
  faHourglassEnd
} from '@fortawesome/free-solid-svg-icons';

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
  faLink,
  faCog,
  faHourglassEnd
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueRx);
Vue.use(VueMeta);

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
