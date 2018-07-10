<template>
<!-- 每输入一个字符，就发送了一次请求，浪费流量，我们可以通过节流来控制请求的次数，减少接口的请求 -->
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" :placeholder="placeholder" v-model="query" ref="query"/>
    <i v-show="query" @click="clear" class="icon-dismiss"></i>
  </div>
</template>
<script>
import { debounce } from 'common/js/util'
export default {
  props:{
    placeholder: {
      type:String,
      default:"搜索歌曲,歌手"
    }
  },
  data(){
    return {
      query:"",//v-model 实现的双向绑定
    }
  },
  created(){
    //当query发生改变的时候，会派发一个事件，告诉外部组件我发生变化了，使用节流函数，减少请求次数
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 2000))
  },
  methods:{
    clear(){
      this.query = ''
    },
    setQuery(query){//相当于一个接口，在他的父组件中调用
      this.query = query
    },
    blur(){//一个方法供外面使用，相当于一个接口
      this.$refs.query.blur()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
