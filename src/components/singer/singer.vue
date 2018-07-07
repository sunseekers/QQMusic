<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from "base/listview/listview"
import { mapMutations } from "vuex"
import {playlistMixin} from 'common/js/mixin'
//mapMutations  是对mutations 做一层封装，在methods，用扩展运算符，就可以做一个对象的映射，映射一个方法名
const HOT_NAME = "热门"
const HOT_SINGER_LEN = 10
export default {
  mixins: [playlistMixin],
  data(){
    return {
      singers:[]
    }
  },
  components:{
    ListView,
  },
  created(){
    this._getSingerList()
  },
  methods:{
    handlePlaylist(playlist) {//如果不实现会报错，在mixins里面定义了
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    ...mapMutations({
      setSinger:"SET_SINGER"//映射 setSinger 是一个方法名，SET_SINGER 是mutations-types 里面的数据
    }),
    selectSinger(singer){
      this.$router.push({
        path:`/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList(){
      getSingerList().then(res=>{
        if(res.code === ERR_OK){
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list){
      let map = {
        hot:{
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item,index)=>{
        if (index < HOT_SINGER_LEN){
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
          }))
        }
        const key = item.Findex
        if(!map[key]){
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      //为了得到有序列表，我们需要处理map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          //console.log(val)
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
