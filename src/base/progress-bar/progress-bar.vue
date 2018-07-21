<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
      @touchstart.prevent="progressTouchStart" 
      @touchmove.prevent="progressTouchMove"
      @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'
  const progressWidth = 16  //小球的宽度
  const transform = prefixStyle('transform')

  export default {
    props:{
      percent:{//进度条
        type: Number,
        default: 0
      }
    },
    created(){
      this.touch = {}//维护数据，共享数据
    },
    methods:{
      progressTouchStart(e){
        console.log(e.touches)
        this.touch.initiated = true//初始化
        console.log(this.touch.initiated)
        this.touch.startX = e.touches[0].pageX//e.touches[0]第一个手指，pagex，第一个手指的位置
        this.touch.left = this.$refs.progress.clientWidth//进度条滚动的宽度
      },
      progressTouchMove(e){
        if (!this.touch.initiated) { //如果经过开始touchstart事件，而直接进入move是不行的，我们直接返回掉
          return 
        }
        const deltaX = e.touches[0].pageX - this.touch.startX //偏移量
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressWidth,Math.max(0,this.touch.left+deltaX))//Math.min 和Math.max 限制数值的取值范围
         this._offset(offsetWidth)
      },
      progressTouchEnd(){
        this.touch.initiated = false //回到到初始位置
        this._triggerOercent()//拖完以后需要告诉组件，把时间相对应的也调整，否者会回到开始的位置
      },
      _triggerOercent(){//基础组件，不进行任何逻辑处理，只是告诉外部，里面的数据变化
        const barWidth = this.$refs.progressBar.clientWidth - progressWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      _offset(offsetWidth){//多次调用，我们就封装起来，避免多次出现重复的代码
        this.$refs.progress.style.width = `${offsetWidth}`
          this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      },
      progressClick(e){
        const rect = this.$refs.progressBar.getBoundingClientRect
        const offsetWidth = e.pagec- rect.left
        this._offset(offsetWidth)//获取偏移量，并告诉外层，我发生了变化
        this._triggerPercent()
      },
    },
    watch:{
      percent(newPercent){//外面传进的，并且不断改变
        if(newPercent >= 0 && !this.touch.initiated){
          const barWidth = this.$refs.progressBar.clientWidth - progressWidth
          const offsetWidth = barWidth * newPercent//播放的进度条
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>