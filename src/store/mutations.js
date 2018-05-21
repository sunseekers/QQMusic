import * as types from './mutations-types'
const mutation = {
  [types.SET_SINGER](state,singer){
    state.singer = singer
  }
}