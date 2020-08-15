<template>
  <ButtonGroup :options="themes" @change="onChange" :active="active" />
</template>

<script>
import ButtonGroup from '@/components/ButtonGroup';
import { reactive, toRefs, computed } from '@vue/composition-api';

export default {
  components: { ButtonGroup },
  setup(props, { root }) {
    const state = reactive({
      themes: [
        { id: 'DARK', label: 'Dark' },
        { id: 'LIGHT', label: 'Light' },
        { id: 'AUTO', label: 'Auto' }
      ]
    });

    const active = computed(() =>
      state.themes.findIndex(t => t.id === root.$store.getters.theme)
    );

    function onChange(index) {
      enable(state.themes[index].id);
    }

    function enable(theme) {
      switch (theme) {
        case 'DARK':
          root.$store.dispatch('enableDark');
          break;
        case 'LIGHT':
          root.$store.dispatch('enableLight');
          break;
        case 'AUTO':
          root.$store.dispatch('enableAuto');
          break;
      }
    }

    return {
      ...toRefs(state),
      active,
      onChange
    };
  }
};
</script>
