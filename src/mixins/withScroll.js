import Vue from 'vue';
import onEvent from './onEvent';
import VueCompositionAPI, { reactive, toRefs } from '@vue/composition-api';
Vue.use(VueCompositionAPI);

function getScrollOffsets() {
  let doc = document,
    w = window;
  let x, y, docEl;

  if (typeof w.pageYOffset === 'number') {
    x = w.pageXOffset;
    y = w.pageYOffset;
  } else {
    docEl =
      doc.compatMode && doc.compatMode === 'CSS1Compat'
        ? doc.documentElement
        : doc.body;
    x = docEl.scrollLeft;
    y = docEl.scrollTop;
  }

  return { x, y };
}

export default function useWithScroll() {
  const state = reactive({
    x: 0,
    y: 0
  });

  function update() {
    const { x, y } = getScrollOffsets();
    state.x = x;
    state.y = y;
  }

  onEvent('scroll', update);

  return toRefs(state);
}
