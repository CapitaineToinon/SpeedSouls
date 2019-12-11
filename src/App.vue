<template>
  <keep-alive include="home">
    <router-view />
  </keep-alive>
</template>

<style lang="scss">
body {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}
</style>
