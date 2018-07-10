<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
      <!-- 数据是异步获取的,解决方法searchHistory或者 hotKey有一个发生改变的时候，滚动重新开始计算-->
      <scroll class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory" @select="addQuery"
            @delete="deleteSearchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest ref="suggest" :query="query" @listScroll="blurInput" @select="saveSearch"></suggest>
    </div>
    <confirm ref="confirm" text="是否清楚所有历史记录" confirmBtnText="清空" @confirm="clearSearchHistory" ></confirm> 
    <router-view></router-view>
  </div>
</template>
<script type='text/ecmascript-6'>
import SearchBox from 'base/search-box/search-box'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import { mapActions,mapGetters } from 'vuex'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'//通过外层来控制是否显示和隐藏
 import {playlistMixin} from 'common/js/mixin'
export default {
  mixins:[playlistMixin],
  components:{
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  },
  created(){
    this._getHotKey()
  },
  computed:{
    ...mapGetters([
      'searchHistory'//这个数据一直没有获取到记得找原因
    ]),
    shortcut(){
      return this.hotKey.concat(this.searchHistory)
    }
  },
  watch:{
    query(newQuery){//当输入框的数据发生改变的时候我们手动刷新scroll组件
      if(!newQuery){
        setTimeout(()=>{
          this.$refs.shortcut.refresh()
        },200)
      }
    }
  },
  data(){
    return {
      hotKey:[],
      query:''
    }
  },
  methods:{
    _getHotKey(){
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0,10)
        }
      })
    },
    addQuery(query){
      this.$refs.searchBox.setQuery(query)//点击的时候把参数传到子组件，并且在子组件中调用这个方法，相当于接口
      console.log(this.$refs.searchBox)//this.$refs.searchBox 能找到子组件所有的属性和方法
    },
    onQueryChange(query){//当搜索的歌曲发生改变的时候
      this.query = query
    },
    blurInput(){//父组件可以访问到子组件的方法什么的,失去焦点，移动端失去焦点，键盘收起来
    //在我平时的项目开始中，除了要解决PM提出的需求，我们还应该在用户的角度思考，添加一些额外的需求，保证用户体验度
      this.$refs.searchBox.blur()
    },
    saveSearch(){//将搜索的历史数据保存起来，希望是永久缓存的，我们下一次进来的时候记录依旧在
      this.saveSearchHistory(this.query)
    },
    // deleteOne(item){
    //   this.deleteSearchHistory(item)
    // },
    deleteAll(){
      this.clearSearchHistory()//可以直接在组件元素上面地调用这个方法，比如上一个
    },
    showConfirm(){
      this.$refs.confirm.show()
      this.clearSearchHistory()
    },
    handlePlaylist(playlist) {//如果不实现会报错，在mixins里面定义了
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.suggest.refresh()//searchResult 是子组件里面的scroll，我们需要一层代理
    },
    ...mapActions ([
      'saveSearchHistory',
      "deleteSearchHistory",
      "clearSearchHistory"
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>