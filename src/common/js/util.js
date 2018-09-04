function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {//洗牌函数，即打乱函数
  let _arr = arr.slice()//避免直接修改原来的数组
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// export function debounce(func, delay) {
//   let timer

//   return function (...args) {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }
//函数节流,当一个函数反复被调用的时候，他只会执行一次，减少流量的浪费，带宽。性能优化
export function debounce(func,delay){
  let timer
  //调用一个函数，返回另一个函数叫做柯里化
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
    
  }
}
//在用户体验角度开发，我们开发过程中除了完成PM给我们提的需要，还应该在用户的角度去思考事情