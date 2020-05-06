<template>
  <select
    class="block appearance-none h-10 w-full bg-nord6 dark:bg-nord2 border border-nord0 dark:border-nord6 py-2 px-4 rounded leading-tight"
    v-model="selected"
  >
    <option value="0">Relative</option>
    <option value="1">Absolute</option>
  </select>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    selected: 0
  }),
  computed: {
    ...mapState(["relativeTime"])
  },
  watch: {
    selected(val) {
      switch (val) {
        case "0":
          this.enableRelativeTime();
          break;
        case "1":
          this.disableRelativeTime();
          break;
      }
    }
  },
  methods: {
    ...mapActions(["enableRelativeTime", "disableRelativeTime"])
  },
  mounted() {
    this.selected = this.relativeTime ? "0" : "1";
  }
};
</script>
