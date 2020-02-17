<template>
  <div class="section is-relative">
    <b-loading
      :is-full-page="false"
      :active="true"
      animation="none"
      :class="{ 'is-hidden': !active }"
      class="ss-loading"
    ></b-loading>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: () => true
    }
  }
};
</script>

<style lang="scss">
.ss-loading {
  /*CSS transitions*/
  -o-transition-property: none !important;
  -moz-transition-property: none !important;
  -ms-transition-property: none !important;
  -webkit-transition-property: none !important;
  transition-property: none !important;
  /*CSS transforms*/
  -o-transform: none !important;
  -moz-transform: none !important;
  -ms-transform: none !important;
  -webkit-transform: none !important;
  transform: none !important;
  /*CSS animations*/
  -webkit-animation: none !important;
  -moz-animation: none !important;
  -o-animation: none !important;
  -ms-animation: none !important;
  animation: none !important;
}
</style>
