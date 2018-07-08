import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'
const SingerDetail = (resolve) => {
  import('components/singerDetail/singerDetail').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children:[
        {
          path:'id',
          component:Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children:[{
        path:':id',
        component:TopList
      }]
    },
    {
      path: '/search',
      component: Search
    },
  ]
})
