<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
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
        default: 4000
      }
    },
    data() {
      return {
        // dots: [],
        // currentPageIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
      }, 20)

    },
    methods: {
      _setSliderWidth() {
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
        if(this.loop){
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
      },
      _initDots() {

      },

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

