<template>
  <ButtonGroup
    :options="themes"
    @change="onChange"
    :active="themes.findIndex(t => t.id === theme)"
  />
</template>

<script>
import ButtonGroup from '@/components/ButtonGroup';
import { mapState, mapActions } from 'vuex';

export default {
  components: { ButtonGroup },
  data: () => ({
    themes: [
      { id: 'DARK', label: 'Dark' },
      { id: 'LIGHT', label: 'Light' },
      { id: 'AUTO', label: 'Auto' }
    ]
  }),
  methods: {
    ...mapActions(['enableDark', 'enableLight', 'enableAuto']),
    onChange(index) {
      this.enable(this.themes[index].id);
    },
    enable(theme) {
      switch (theme) {
        case 'DARK':
          this.enableDark();
          break;
        case 'LIGHT':
          this.enableLight();
          break;
        case 'AUTO':
          this.enableAuto();
          break;
      }
    }
  },
  computed: {
    ...mapState(['theme'])
  }
};
</script>
