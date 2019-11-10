<template>
  <div id="app">
    <main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>

<style lang="scss">
body,
#app {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

body {
  &::-webkit-scrollbar {
    display: none;
  }
}

main {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
}
</style>
