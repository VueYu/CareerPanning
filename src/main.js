import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


//引入路由
import router from './router/index.js'

//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true; //保持持续通话

//引入公共数据
import common from '../public/publicData.js'
Vue.prototype.COMMON = common;

Vue.config.productionTip = false


import './assets/icon/iconfont.css'

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
