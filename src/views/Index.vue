<template>
  <div id="app">
    <div class="logo">
      <img src="../assets/img/logo.png" width="251" height="89">
    </div>
    <div id="nav">
      <router-link tag="div" to="/" class="left-nav">首页</router-link>
      <!-- <router-link tag="div" to="/target" class="left-nav">经营指标</router-link>
      <router-link tag="div" to="/ele-scale" class="left-nav">电网规模</router-link>
      <router-link tag="div" to="/elec-purchase" class="left-nav">电力购销</router-link>
      <router-link tag="div" to="/advise" class="left-nav">投资建议</router-link>
      <router-link tag="div" to="/safe-produce" class="left-nav">安全生产</router-link> -->
      <router-link tag="div" to="/serves" class="left-nav">综合计划</router-link>
      <router-link tag="div" to="/manage/index" class="left-nav">经营指标</router-link>
      <router-link tag="div" to="/human-resource" class="left-nav">人力资源</router-link>
      <router-link tag="div" to="/running" class="left-nav">优质服务</router-link>
      <!-- <router-link tag="div" to="/machine" class="left-nav">装机规模</router-link> -->
    </div>
    <router-view name="homeView"/>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/base';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100vh;
  background-image: url(../assets/img/human_resource.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #192031;
  display: flex;
}
.logo {
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 50px;
  margin-left: 70px;
}
#nav {
  display: flex;
  flex-direction: column;
  width: 595px;
  min-height: 100vh;
  box-sizing: content-box;
  border-right: 3px solid #a1b6d5;
  .left-nav {
    width: 526px;
    height: 112px;
    font-size: 46px;
    font-weight: bold;
    color: #77bde1;
    margin-top: 12px;
    margin-left: 52px;
    line-height: 112px;
    position: relative;
    background-image: url(../assets/img/route_btn.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &:first-child {
      margin-top: 227px;
    }
    &.router-link-exact-active {
      color: #efea3d;
    }
   }
}
</style>
