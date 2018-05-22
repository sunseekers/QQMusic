<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger" ></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from "base/listview/listview"
const HOT_NAME = "热门"
const HOT_SINGER_LEN = 10
export default {
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
    selectSinger(singer){
      this.$router.push({
        path:`/singer/${singer.id}`
      })
    },
    _getSingerList(){
      getSingerList().then(res=>{
        if(res.code === ERR_OK){
          this.singers = this._normalizeSinger(res.data.list)
          console.log(this._normalizeSinger(this.singers))
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
