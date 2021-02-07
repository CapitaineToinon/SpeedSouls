import Vue from 'vue';
import VueCompositionAPI, { onUnmounted } from '@vue/composition-api';
Vue.use(VueCompositionAPI);

export default function onEvent(event, cb) {
  window.addEventListener(event, cb, false);
  onUnmounted(() => window.removeEventListener(event, cb, false));
}
