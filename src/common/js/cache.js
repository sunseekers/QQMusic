//存取功能，保存搜索结果
import storage from 'good-storage'

// const SEARCH_KEY = '__search__'
// const SEARCH_MAX_LEN = 15

// const PLAY_KEY = '__play__'
// const PLAY_MAX_LEN = 200

// const FAVORITE_KEY = '__favorite__'
// const FAVORITE_MAX_LEN = 200

// function insertArray(arr, val, compare, maxLen) {
//   const index = arr.findIndex(compare)
//   if (index === 0) {
//     return
//   }
//   if (index > 0) {
//     arr.splice(index, 1)
//   }
//   arr.unshift(val)
//   if (maxLen && arr.length > maxLen) {
//     arr.pop()
//   }
// }

// function deleteFromArray(arr, compare) {
//   const index = arr.findIndex(compare)
//   if (index > -1) {
//     arr.splice(index, 1)
//   }
// }

// export function saveSearch(query) {
//   let searches = storage.get(SEARCH_KEY, [])
//   insertArray(searches, query, (item) => {
//     return item === query
//   }, SEARCH_MAX_LEN)
//   storage.set(SEARCH_KEY, searches)
//   return searches
// }

// export function deleteSearch(query) {
//   let searches = storage.get(SEARCH_KEY, [])
//   deleteFromArray(searches, (item) => {
//     return item === query
//   })
//   storage.set(SEARCH_KEY, searches)
//   return searches
// }

// export function clearSearch() {
//   storage.remove(SEARCH_KEY)
//   return []
// }

// export function loadSearch() {
//   return storage.get(SEARCH_KEY, [])
// }

// export function savePlay(song) {
//   let songs = storage.get(PLAY_KEY, [])
//   insertArray(songs, song, (item) => {
//     return song.id === item.id
//   }, PLAY_MAX_LEN)
//   storage.set(PLAY_KEY, songs)
//   return songs
// }

// export function loadPlay() {
//   return storage.get(PLAY_KEY, [])
// }

// export function saveFavorite(song) {
//   let songs = storage.get(FAVORITE_KEY, [])
//   insertArray(songs, song, (item) => {
//     return song.id === item.id
//   }, FAVORITE_MAX_LEN)
//   storage.set(FAVORITE_KEY, songs)
//   return songs
// }

// export function deleteFavorite(song) {
//   let songs = storage.get(FAVORITE_KEY, [])
//   deleteFromArray(songs, (item) => {
//     return item.id === song.id
//   })
//   storage.set(FAVORITE_KEY, songs)
//   return songs
// }

// export function loadFavorite() {
//   return storage.get(FAVORITE_KEY, [])
// }

//存取功能，保存搜索结果,为了未来缓存的时候方便
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15//最多存储15条数据，超过的用新的数据替换

function insertArray(arr,val,compare,maxLen){//给插入数组封装成一个方法
  const index = arr.findIndex(compare)
  if (index === 0){
    return 
  }
  if(index >0){//有的话，删除在插入，没有的话直接插入
    arr.splice(index,1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen){
    arr.pop()
  }
}
export function saveSearch(query){
  let searchs = storage.get(SEARCH_KEY,[])//获取本地已经缓存的，没有缓存就是空数组
  insertArray(searchs,query,(item)=>{
    return item === query
  },SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY,searchs)
  return searchs
}