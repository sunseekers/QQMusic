// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import 'babel-polyfill' 没有安装成功等会看
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
//import fastclick from 'fastclick'//解决移动端300毫秒的延迟
//fastclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
