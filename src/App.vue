<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="less">
@import "assets/css/base.css";
#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "\5fae\8f6f\96c5\9ed1", Arial, sans-serif;
}
</style>
