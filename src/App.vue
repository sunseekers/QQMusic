<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- <keep-alive>轮播图切换回来不会自己轮播 -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components:{
    MHeader,
    Tab
  }
}
</script>

