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
          <!--这个接口可以使用 https://u.y.qq.com/cgi-bin/musicu.fcg?callback=recom16445734115017419&g_tk=5381&jsonpCallback=recom16445734115017419&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22category%22%3A%7B%22method%22%3A%22get_hot_category%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22music.web_category_svr%22%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A0%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22music.web_album_library%22%2C%22method%22%3A%22get_album_by_tags%22%2C%22param%22%3A%7B%22area%22%3A1%2C%22company%22%3A-1%2C%22genre%22%3A-1%2C%22type%22%3A-1%2C%22year%22%3A-1%2C%22sort%22%3A2%2C%22get_tags%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A40%2C%22click_albumid%22%3A0%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22music.web_toplist_svr%22%2C%22method%22%3A%22get_toplist_index%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D -->
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
import {mapMutations} from 'vuex'
  export default {
    mixins:[playlistMixin],
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
          path:`/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      _getRecommend(){
        getRecommend().then(res=>{
          if(res.code===ERR_OK){
            this.recommend = res.data.slider
            //异步获取的，可能DOM已经开始渲染的，mounted()已经执行，但是数据还没有获取到，导致后面组件出现问题
          }
        })
      },
      _getDiscList(){
        getDiscList().then(res=>{
          if(res.code === ERR_OK){
           // console.log( res.data.list)
            this.discList = res.data.list
          }
        })
      },
      loadImage(){//一旦有一张图片加载了，就可以高度了，就不会出现向上滚动缺乏一个高度
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()//只有有数据更新就重新渲染
          this.checkLoaded = true
        }
      },
      ...mapMutations({
        setDisc:'SET_DISC'
      })
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


