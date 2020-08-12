<template>
<!-- TODO 为什么会出现两个id="app" -->
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "assets/styles/main";

html,body,#app,.app {
    height: 100%;
    margin: 0;
}
</style>
