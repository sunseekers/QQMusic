//只保留最基础的数据，可以通过基础数据计算而来就不放在里面了，放到getters里面
import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,//语义化
  currentIndex: -1,//当前播放的歌曲，为了后面的前进后退
  disc: {},
  topList: {},
  searchHistory: loadSearch(),//不仅在搜索列表有历史记录，还在添加歌曲里面有，所以我们要保存到全局
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
/**给vuex定义数据的时候首先要想到我们需要什么数据，相关最底层数据=>state
 * getter数据的映射，通常是一个函数，类似计算属性，可以根据state计算出一些属性，也可以是一些复杂的判断逻辑
 * mutation，定义我们修改数据的逻辑，mutation-types定义我们mutation 需要哪些动作即函数名
 */