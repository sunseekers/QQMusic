<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"/>
              <!-- stroke-dashoffset 描边的偏移，stroke-dasharray 描边，两个变化，就可以显示歌曲的进度 -->
    </svg>
    <!-- 还可以包裹其他元素 -->
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      radius:{//外部传入，可扩展性强
        type: Number,
        default: 100
      },
      percent: {//当前的进度
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        dashArray : Math.PI * 100
      }
    },
    computed: {
      dashOffset() {
        return (1-this.percent) * this.dashArray
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>