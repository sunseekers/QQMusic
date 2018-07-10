<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门歌曲</h1>
          <ul>
            <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query" @listScroll="blurInput" @select="saveSearch"></suggest>
    </div> 
    <router-view></router-view>
  </div>
</template>
<script type='text/ecmascript-6'>
import SearchBox from 'base/search-box/search-box'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import Suggest from 'components/suggest/suggest'
import { mapActions } from 'vuex'
export default {
  components:{
    SearchBox,
    Suggest
  },
  created(){
    this._getHotKey()
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
    ...mapActions ([
      'saveSearchHistory'
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