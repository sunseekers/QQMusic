<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper" ref="sliderWrapper" v-if="recommend.length">
        <slider>
          <div v-for="(item,index) in recommend" :key="index">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" class="needsclick"  @load="loadImage()">
            </a>
          </div>
        </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" :key="index" class="item" @click="selectItem(item)">
              <div class="icon">
                <img  v-lazy="item.imgurl" width="60" height="60"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
  import {playlistMixin} from 'common/js/mixin'//底部高度自适应，即歌单不被播放的隐藏
import Loading from 'base/loading/loading'
  export default {
    data(){
      return {
        recommend:[],
        discList:[]
      }
    },
    components:{
      Slider,
      Scroll,
      Loading
    },
    created(){
      this._getRecommend()
      this._getDiscList()
    },
    methods:{
        handlePlaylist(playlist) {//如果不实现会报错，在mixins里面定义了
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item){
        this.$router.push({
          path:'/recommend/${item.dissid}'
        })
      },
      _getRecommend(){
        getRecommend().then(res=>{
          if(res.code===ERR_OK){
            this.recommend = res.data.slider
          }
        })
      },
      _getDiscList(){
        console.log(getDiscList())
        getDiscList().then(res=>{
          if(res.code === ERR_OK){
            this.discList = res.data.list
            console.log(res.data.list)
          }
        })
      },
      loadImage(){
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>


