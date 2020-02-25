<template>
  <div>
    {{ $route.params.game }}
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    console.log("created")
  },
  beforeCreate() {
    this.$router.push('/')
  }
}
</script>