
<template>
  <transition>
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
// 这里是一个二级路由
import MusicList from 'components/music-list/music-list.vue'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
export default {
  components:{
    MusicList
  },
  data(){
    return {
      songs:[]
    }
  },
  created(){
    this._getSongList()
  },
  computed:{
    title(){
      return this.disc.dissname
    },
    bgImage(){
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  methods:{
    _getSongList(){
      //避免出错
      if (!this.dis.dissid){
        return this.$route.push('/recommed')
      }
      getSongList(this.disc.dissid).then(res=>{
        if (res.code === ERR_OK) {
          this.song=this._normalizeSongs(res.cdlist[0].songlist)
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
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
