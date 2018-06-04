// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css';//elementui2.4.0 改下路径
import { getAjax } from '@/assets/js/cmn/util' 

//全局引入静态资源
import '@/assets/less/base/common.less'
//字体图标
import '@/assets/plugins/iconfont/iconfont.css'
import '@/assets/plugins/iconfont/iconfont.js'

Vue.prototype.getAjax = getAjax;
Vue.prototype.HOST = process.env.NODE_ENV === 'development' ? '/api' : ''
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
