import '@/scss/main.scss';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VueMeta from 'vue-meta';
import VueCompositionAPI from '@vue/composition-api';
import SiteNotice from '@/components/SiteNotice.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faDiscord,
  faPatreon,
  faTwitter,
  faTwitch,
  faGithub,
  faYoutube,
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
  faHourglassEnd,
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

Vue.use(VueMeta);
Vue.use(VueCompositionAPI);
Vue.component('SiteNotice', SiteNotice);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
