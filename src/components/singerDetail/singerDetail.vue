<template>
  <transition name="slide">
   <div class="bc">hahh</div>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import { getSingerDetail} from "api/singer"
import {ERR_OK} from "api/config"
import { createSong} from "common/js/song"
export default {
  data(){
    song:[]
  },
  computed:{
    ...mapGetters([
      'singer'
      ])
  },
  created(){
    //console.log(this.singer)
    this._getDetail(this.singer)
  },
  methods:{
    _getDetail(){
      if (!this.singer.id){
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res=>{
        if (res.code ===ERR_OK){
          this.songs = this._normalizeSongs(res.data.list)
          console.log(12)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list){
      let ret = []
      list.forEach(item => {
        let { musiData} = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
    .bc{ background:red;}
</style>