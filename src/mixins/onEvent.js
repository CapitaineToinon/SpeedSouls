import { onUnmounted } from '@vue/composition-api';

export default function onEvent(event, cb) {
  window.addEventListener(event, cb, false);
  onUnmounted(() => window.removeEventListener(event, cb, false));
}
