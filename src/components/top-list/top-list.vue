<template>
  <transition>
    <music-list :title="title" :rank="rank" :bg-image='bgImage' :songs="songs"></music-list>
  </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {getMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'
export default {
  data(){
    return {
      songs:[],
      rank:true
    }
  },
  components:{
    MusicList,
  },
  computed:{
    ...mapGetters([
      'topList'
    ]),
    title(){
      return this.topList.topTitle
    },
    bgImage() {
      // if (this.songs.length) {
      //   return this.songs[0].image
      // }
      return this.topList.picUrl
    },
  },
  created(){
    this._getMusicList()
  },
  methods:{
    _getMusicList(){
      getMusicList(this.topList.id).then(res=>{
        if (res.code === ERR_OK){
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs(list){
      let ret = []
      list.forEach(musicDate=>{
        if (musicDate.songid && musicDate.albumid){
          ret.push(createSong(musicDate))
        } 
      })
      return ret
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
