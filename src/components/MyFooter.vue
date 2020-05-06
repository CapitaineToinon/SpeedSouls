<template>
  <footer class="font-sans shadow-md bg-nord6 dark:bg-nord1 py-5 px-6">
    <div class="container">
      <div
        class="socials text-nord0 dark:text-nord6 py-12 grid grid-cols-4 gap-4 text-center"
      >
        <div class="discord">
          <font-awesome-icon :icon="['fab', 'discord']" size="3x" />
          <p>Join our discord server</p>
        </div>
        <div class="twitter">
          <font-awesome-icon :icon="['fab', 'twitter']" size="3x" />
          <p>Follow us on Twitter</p>
        </div>
        <div class="patreon">
          <font-awesome-icon :icon="['fab', 'patreon']" size="3x" />
          <p>Help us financially on Patreon</p>
        </div>
        <div class="github">
          <font-awesome-icon :icon="['fab', 'github']" size="3x" />
          <p>Join our discord server</p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-evenly pb-4">
        <ButtonGroup
          :options="themes"
          @change="onChange"
          :active="themes.findIndex(t => t.id === theme)"
        />
      </div>
      <div
        class="pt-4 mt-4 text-nord0 dark:text-nord6 text-xs border-t border-nord5 dark:border-nord3 text-center"
      >
        ©2019 Hyperyolo. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
import ButtonGroup from "@/components/ButtonGroup";
import { mapState, mapActions } from "vuex";

export default {
  components: { ButtonGroup },
  data: () => ({
    themes: [
      { id: "DARK", label: "Dark" },
      { id: "LIGHT", label: "Light" },
      { id: "AUTO", label: "Auto" }
    ]
  }),
  methods: {
    ...mapActions(["enableDark", "enableLight", "enableAuto"]),
    onChange(index) {
      this.enable(this.themes[index].id);
    },
    enable(theme) {
      switch (theme) {
        case "DARK":
          this.enableDark();
          break;
        case "LIGHT":
          this.enableLight();
          break;
        case "AUTO":
          this.enableAuto();
          break;
      }
    }
  },
  computed: {
    ...mapState(["theme"])
  }
};
</script>

<style lang="scss" scoped>
.btn-group {
  @apply border;
  @apply rounded;
  @apply flex;
  @apply flex-row;
  @apply justify-center;
  @apply items-stretch;

  .btn.theme {
    @apply flex-1;
    @apply font-semibold;
    @apply py-2;
    @apply px-4;
  }
}
</style>
