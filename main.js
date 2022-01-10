import Vue from 'vue'
import App from './App'
import API from '@/mock/api.js'

Vue.config.productionTip = false


import uView from 'uview-ui';
Vue.use(uView);

//设置文件访问的基础地址前缀
Vue.prototype.BaseFileURL = 'http://47.115.83.135/api/v2/files/'

Vue.prototype.$api = API
//引入公用navBar组件
import uniNavBar from '@/components/uni-nav-bar.vue'
Vue.component('uni-nav-bar',uniNavBar)

//引入公用login组件
import login from '@/components/login/login.vue'
Vue.component('login',login)

//引入公用share组件
import gotoShare from '@/components/gotoShare/gotoShare.vue'
Vue.component('goto-share',gotoShare)
//引入store
import store from '@/store/index.js'

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})


// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)
app.$mount()
