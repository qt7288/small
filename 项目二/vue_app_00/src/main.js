import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// 引入vuex组件
import Vuex from "vuex"
// 注册vuex组件
Vue.use(Vuex)
// // 创建store对象
var store = new Vuex.Store({
    state:{
        ctime:"",
        uname:"",
        uid:"",
        stateU:"",
        avatar:"",
        count:"",
        sun:true,
        play:false,
    },//容器
    mutations:{
        uname(state,data){
            state.uname=data
        },
        uid(state,data){
            state.uid=data
        },
        stateU(state,data){
            state.stateU=data
        },
        avatar(state,data){
            state.avatar=data
        },count(state,data){
            state.count=data
        },
        ctime(state,data){
            state.ctime=data
        },
        sun(state,data){
            state.sun=data
        },
        play(state,data){
            state.play=data
        }
    },//操作共享数据的方法
    getters:{

    },//获取共享数据方法
  router,
})
// 将store对象绑定vue实例

import'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

// import $ from 'jquery'
//1:引入Header组件


import {Popup,Header,Button,Swipe,SwipeItem,Loadmore,PaletteButton} from "mint-ui"

Vue.component(PaletteButton.name, PaletteButton);
//2:组件Header组件
Vue.component(Loadmore.name, Loadmore);
Vue.component(Popup.name, Popup);
Vue.component(Header.name,Header);
Vue.component(Button.name,Button);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
//3:引入axios库
import axios from "axios"
//4:配置跨域访问选项
axios.defaults.withCredentials=true
//5:将axios配置Vue实例属性
Vue.prototype.axios = axios

const baseURL = 'http:'//XXX

// 全局的 axios 默认值
axios.defaults.baseURL = baseURL

// 登录请求
const loginCheck = params => {
    return axios.post('/login', params).then(res => {
        return res.data
    })
}
export { loginCheck }

//6:创建日期格式过滤器 main.js
//val 原始日期格式
Vue.filter("datetimeFilter",function(val){
   //6.1:依据原始日期格式创建日期对象
   var now = new Date(val);
   //6.2:获取日期对象 年 月 日
   var y = now.getFullYear();
   var m = now.getMonth()+1;
   var d = now.getDate(); 
   //6.3:获取日期对象 时 分 秒
   var h = now.getHours();
   var mi = now.getMinutes();
   var s = now.getSeconds();
   //6.4:月份与日期 如果当前月分小于10前拼接0
   m<10&&(m="0"+m);
   d<10&&(d="0"+d);
   //6.5:拼接字符串返回
   return `${y}-${m}-${d} ${h}:${mi}:${s}`;
});
//7:main.js 引入第三方库 qs
//解决axios post请求问题 
import qs from "qs";
Vue.prototype.qs = qs;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
