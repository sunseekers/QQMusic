//在一个动作中需要多次去修改一个动作，我们一般放在action里面
import * as types from "./mutation-types"
export const selectPaly = function ({commit,state},{list,index}) {
  commit(types.SET_SEQUENCE_LIST,list)
  commit(types.SET_PLAYLIST,list)
  commit(types.SET_CURRENT_INDEX,index)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}