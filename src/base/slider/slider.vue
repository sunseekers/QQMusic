<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot,index) in dots" :key="index" :class="{active:currentPageIndex==index}"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 400
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if(this.autoPlay){
          this._play()
        }
      }, 20)
      window.addEventListener("resize",()=>{
        if(!this.slider) return 
        //如果视窗改变就进行重新计算
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    deactivated() {//清楚计时器有利于内存的释放
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        //console.log(this.children)
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for(let i=0;i<this.children.length;i++){
          let child = this.children[i]
          //建议比较或者公用的抽象的方法都可以抽象出来，比如判断有没有指定classname
          addClass(child,'slider-item')
          child.style.width = sliderWidth + "px"
          width+=sliderWidth
        }
        if(this.loop && !isResize){
          width +=2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + "px" 
      },
      _initSlider() {
        this.slider =new BScroll(this.$refs.slider,{
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: this.interval
          }
        })
        //小圆点跟着滚动事件
        this.slider.on('scrollEnd', () => {
          console.log(this.slider.getCurrentPage())//这里有问题导致不能自动轮播图片,当前页应该是1，却显示2
          let pageIndex = this.slider.getCurrentPage().pageX//获取当前页面的信息
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          
          if (this.autoPlay) {
            this._play()
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play(){
        let pageIndex = this.currentPageIndex + 1
        
        if(this.loop){
          pageIndex +=1
        }
        //当我们做 slide 组件的时候，slide 通常会分成多个页面。调用此方法可以滚动到指定的页面。
        this.timer = setTimeout(() => {//只执行了一次，循环模拟循环播放
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>

