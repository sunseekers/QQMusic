<template>
  <transition name="slide">
   <div class="bc">hahh</div>
  </transition>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
    .bc{ background:red;}
</style>