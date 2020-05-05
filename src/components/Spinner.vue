<template>
  <div class="loader border-nord10"></div>
</template>

<style lang="scss" scoped>
.loader,
.loader:after {
  border-radius: 50%;
  @apply w-12;
  @apply h-12;
}
.loader {
  margin: 0 auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  @apply border-8;
  @apply border-l-8;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
}
@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
