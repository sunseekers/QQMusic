//在一个动作中需要多次去修改一个动作，我们一般放在action里面
import * as types from "./mutation-types"
import {saveSearch} from 'common/js/cache'
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
//commit 方法，state属性
export const selectPaly = function ({commit,state},{list,index}) {
  commit(types.SET_SEQUENCE_LIST,list)
  commit(types.SET_PLAYLIST,list)
  commit(types.SET_CURRENT_INDEX,index)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}
// 从搜索页面进去播放的一首歌，如果原来的列表中有该歌
// ，就删除原来列表的数据，如果没有就添加到现在列表中
export const insertSong = function ({commit,state},song){//没有修改成功，到时候看原因
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()//引用类型不能直接修改
  let currentIndex = state.currentIndex//值类型没有影响
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)
    // 因为是插入歌曲，所以索引+1
    currentIndex++
    // 插入这首歌到当前索引位置
    playlist.splice(currentIndex, 0, song)
    // 如果已经包含了这首歌
    if (fpIndex > -1) {
      // 如果当前插入的序号大于列表中的序号
      if (currentIndex > fpIndex) {
        playlist.splice(fpIndex, 1)//在store里面修改值应该在mutations里面进行，不能splice改变原来的数字，我们可以用slice()操作副本
        currentIndex--
      } else {
        playlist.splice(fpIndex + 1, 1)
      }
    }
  
  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playlist)//把发生改变的数据提交
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
export const saveSearchHistory = function ({commit},query){
commit(types.SET_SEARCH_HISTORY,saveSearch(query))//获取到的列表保存到了mutation里面
}