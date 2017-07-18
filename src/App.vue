<template>
  <div id="app">
    <!-- 登录入口++主页面带顶部导航 -->
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  height: 100%;
}
</style>
