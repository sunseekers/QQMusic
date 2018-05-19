<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" :to="item.path" v-for="(item,index) in item" :key="index">
      <span class="tab-link">{{item.name}}</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        item:[{
          path:"/recommend",
          name:"推荐"
        },{
          path:"/singer",
          name:"歌手"
        },{
          path:"/rank",
          name:"推荐"
        },{
          path:"/search",
          name:"搜索"
        }
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>