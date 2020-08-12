import Vue from 'vue';
import VueCompositionAPI, {
  ref,
  watch,
  onUnmounted,
  computed
} from '@vue/composition-api';
Vue.use(VueCompositionAPI);

const CLASS = 'overflow-hidden';
const _count = ref(0);
const count = computed({
  get: () => _count.value,
  set: value => {
    _count.value = value > 0 ? value : 0;
  }
});

watch(
  count,
  value => {
    if (value <= 0) document.body.classList.remove(CLASS);
    else document.body.classList.add(CLASS);
  },
  { immediate: true }
);

export default function useBodyLocker() {
  const locked = ref(false);

  function lock() {
    locked.value = true;
  }

  function unlock() {
    locked.value = false;
  }

  function subscribe() {
    count.value++;
  }

  function unsubscribe() {
    count.value--;
  }

  watch(locked, (value, old) => {
    if (value === old) return;
    value ? subscribe() : unsubscribe();
  });

  onUnmounted(() => {
    if (locked.value) unsubscribe();
  });

  return [lock, unlock];
}
