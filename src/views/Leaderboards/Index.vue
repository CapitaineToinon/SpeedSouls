<template>
  <div id="leaderboards" :style="style">
    <navbar class="is-dark" />
    <keep-alive include="games">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  data() {
    return {
      assets: [
        "bloodborne.png",
        "darksouls3.jpg",
        "darksouls.png",
        "darksouls2.png",
        "darksouls2sotfs.png",
        "darksouls3ext.png",
        "darksoulsremastered.png",
        "demonssouls.png"
      ]
    };
  },
  computed: {
    style() {
      //
      const image =
        this.assets.filter(asset =>
          asset.includes(this.$route.params.abbreviation + ".")
        )[0] || this.assets[0];
      const url = require(`@/assets/backgrounds/${image}`);
      return {
        "background-image": `url(${url})`
      };
    }
  },
  components: {
    Navbar
  }
};
</script>

<style scoped lang="scss">
#leaderboards {
  display: inherit;
  flex-direction: inherit;
  flex-grow: 1;
  overflow: hidden;
  // background: url(https://www.speedrun.com/themes/bloodborne/background.png?version=);
  background-attachment: fixed;
  background-position: center;
  background-size: auto;
  background-repeat: repeat;
}
</style>
