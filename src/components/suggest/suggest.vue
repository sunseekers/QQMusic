
<template>
   <!-- 业务相关的组件放在这里 ,-->
   <div class="suggest">
       <scroll ref="suggest"
          class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
  >
      <ul class="suggest-list">
        <li class="suggest-item" v-for="(item,index) in result" :key="index" @click="selectItem(item)" >
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <p class="text" v-html="getDisplayName(item)">qwqw</p>
          </div>
        </li>
        <loading v-show="hasMore" title=""></loading>
      </ul>
      <div class="no-result-wrapper" v-show="!hasMore && !result.length">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
     </scroll> 
   </div>
</template>
<script>
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import { mapMutations,mapActions } from "vuex"
import NoResult from 'base/no-result/no-result'
const TYPE_SINGER = 'singer'
const perpage = 20 //为了以后的扩展性
export default {
  props:{//这个组件依赖我们的检索词-
    query:{
      type:String,
      default:''
    },
    //决定组件的行为要不要检索歌手
    showSinger:{
      type:Boolean,
      default: true
    },

  },
  components:{
    Scroll,
    Loading,
    NoResult
  },
  data(){
    return {
      page:1,
      result:[],
      pullup:true,
      hasMore:true,//标志物，表示歌曲是否全部加载完了
      beforeScroll:true,//解决移动端键盘弹起事件

    }
  },
  methods:{
    _search(){
      this.hasMore = true
      this.page = 1 //当搜索歌曲改变的时候要从第一条开始算
      this.$refs.suggest.scrollTo(0,0)//
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._getResult(res.data)
            this._checkMore(res.data)
          }
        })
    },
    _checkMore(data) {//查看我们搜索了多少数据
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    _getResult(data){
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida,...{type:TYPE_SINGER}})//{...obj,...obj1,...obj2}...扩展符，将多个对象合并成一个对象
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    getIconCls(item){//区分样式
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      }else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {//如果是歌手就只显示歌手，如果是歌曲就显示歌曲和歌手
      console.log(item.type === TYPE_SINGER)
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    searchMore(){//搜索更多，重新请求接口，修改请求接口的参数
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data))//数组的拼接，当前的加上新加的
          this._checkMore(res.data)
        }
      })
    },
    selectItem(item) {//不做业务处理，只派发事件
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select', item)
    },
    listScroll(){//不做业务处理，只派发事件
      this.$emit('listScroll')
    },
    refresh(){
      this.$refs.suggest.refresh()
    },
    ...mapMutations({
      setSinger:"SET_SINGER"//映射 setSinger 是一个方法名，SET_SINGER 是mutations-types 里面的数据
    }),
  ...mapActions([
      'insertSong'
  ])
  },
  watch:{//输入框不断发生变化的时候，我们就需要去调用接口。实时监控输入框的值
    query(newQuery){
      this._search(newQuery)//请求服务端,获取数据
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

