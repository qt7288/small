import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
//1:引入Test组件
import Test from "./components/Test.vue"
import List from "./components/List.vue"
import Login from "./components/Search/Login.vue"
import Home from "./components/tabbar/Home.vue"
import Exam01 from "./components/test/Exam01.vue"
import Exam02 from "./components/test/Exam02.vue"
import Friends from "./components/home/Friends.vue"
import Tofriend from "./components/home/Tofriend.vue"
import Myself from "./components/Myself/Myself.vue"
import About from "./components/Myself/About.vue"
import Mine from "./components/Myself/Mine.vue"
import Search from "./components/Search/Search.vue"
import reg from "./components/Search/reg.vue"
import back from "./components/Search/back.vue"
import Tabke from "./components/Search/Tabke.vue"
import sayDouble from "./components/Search/sayDouble.vue"
import Your from "./components/Search/Your.vue"
// import top from "./components/Search/top.vue"
Vue.use(Router)
//2:为Test组件配置访问路径
export default new Router({
  routes: [
    {path:"/reg",component:reg,meta:{ss:false}},
    // {path:"/top",component:top,meta:{ss:false}},
    {path:"/Friends",component:Friends,meta:{ss:true}},
    {path:"/Mine",component:Mine,meta:{ss:false}},
    {path:"/Tofriend",component:Tofriend,meta:{ss:false}},
    {path:"/Your",component:Your,meta:{ss:false}},
    {path:"/About",component:About,meta:{ss:false}},
    {path:"/sayDouble",component:sayDouble,meta:{ss:false}},
    {path:"/Tabke",component:Tabke,meta:{ss:true}},
    {path:"/back",component:back,meta:{ss:false}},
    {path:"/Search",component:Search,meta:{ss:false}},
    {path:'/Myself',component:Myself,meta:{ss:true}},
    {path:'/Exam01',component:Exam01,meta:{ss:true}},
    {path:'/Exam02',component:Exam02,meta:{ss:true}},
    {path:"/",redirect:"/login",meta:{ss:false}},
    {path:'/Home',component:Home,meta:{ss:true}},
    {path:'/Login',component:Login,meta:{ss:false}},
    {path:'/',component:HelloContainer,meta:{ss:true}},
    {path:'/Test',component:Test,meta:{ss:true}},
    {path:'/List',component:List,meta:{ss:true}},
  ]
})