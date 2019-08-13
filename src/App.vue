<template>
  <div id="app">
    <div class="top-nav"></div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
}
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  background: #172226;
  height: 57px;
  z-index: 9px;
  width: 2560px;
}
</style>

