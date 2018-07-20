// import {getLyric} from 'api/song'
// import {ERR_OK} from 'api/config'
// import {Base64} from 'js-base64'

// export default class Song {
//   constructor({id, mid, singer, name, album, duration, image, url}) {
//     this.id = id
//     this.mid = mid
//     this.singer = singer
//     this.name = name
//     this.album = album
//     this.duration = duration
//     this.image = image
//     this.url = url
//   }

//   getLyric() {
//     if (this.lyric) {
//       return Promise.resolve(this.lyric)
//     }

//     return new Promise((resolve, reject) => {
//       getLyric(this.mid).then((res) => {
//         if (res.retcode === ERR_OK) {
//           this.lyric = Base64.decode(res.lyric)
//           resolve(this.lyric)
//         } else {
//           reject('no lyric')
//         }
//       })
//     })
//   }
// }

// export function createSong(musicData) {
//   return new Song({
//     id: musicData.songid,
//     mid: musicData.songmid,
//     singer: filterSinger(musicData.singer),
//     name: musicData.songname,
//     album: musicData.albumname,
//     duration: musicData.interval,
//     image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
//     url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
//   })
// }

// function filterSinger(singer) {
//   let ret = []
//   if (!singer) {
//     return ''
//   }
//   singer.forEach((s) => {
//     ret.push(s.name)
//   })
//   return ret.join('/')
// }

import {getLyric} from 'api/song'
export default class Song {
  //设计类，代码集中一个地方类便于维护，不用去写大量的代码，类的扩展性强面向对象
  constructor({id,mid,singer,name,album,duration,image,url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album 
    this.duration = duration 
    this.image = image
    this.url = url
  }
  getLyric() {//需要返回一个 Promise，这个函数就是去或者歌词然后返回出去
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}
//这是一个工厂方法，不直接调用new，他提供提供一个方法去返回实力
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46` 
  })  
}
export function filterSinger (singer){
  let ret = []
  if (!singer) {
    return ""
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}