<template>
 <div class="app-container">
 <!-- app.vue组件 -->
 <!-- 公共的导航条 -->
    <router-view></router-view>  
    <!-- 3.底部tabbar-->
    <nav class="mui-bar mui-bar-tab" v-show="$route.meta.ss" :class="this.$store.state.sun==true?'open':'close'">
		<router-link to="Friends" class="mui-tab-item">
    <span class="mui-icon mui-icon-pengyouquan"></span>
    </router-link>

    <router-link to="home" class="mui-tab-item">
  	<span class="mui-icon mui-icon-home"></span>
    </router-link>

		<router-link to="Tabke" class="mui-tab-item">
		<span class="mui-icon mui-icon-chatboxes mui-icon-extra-chatboxes"></span>
    </router-link>

    <router-link to="Myself" class="mui-tab-item">
    <span class="mui-icon mui-icon-person"></span>
    </router-link>
		</nav>
 </div>
</template>
<script>
export default {
      data(){
      return {       
      }
    },   
    methods:{     
    }
}
</script>

<style>
input::placeholder{
    color: #fff;
}
  body{
    background:url("http://127.0.0.1:3000/bg06.jpg") 50% 0% no-repeat fixed; 
    background-size:100% auto;
  }
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }
   .mint-header-title{
     background: rgba(255, 255, 255, 0.336);
     border-radius: 10px;
      color: #ffffffe7;
   }
    nav{
      display: flex;
      flex-flow: row nowrap;
    }
    nav.mui-bar{
      background:rgba(0, 0, 0, 0.932);
      box-shadow: 0 2px 10px white inset;
      border-top-left-radius: 5px;  
      border-top-right-radius: 5px;
      transition: 1s;  
    }
    .mui-bar-tab .mui-tab-item{
      color:#fcf6de;
    }
     nav.mui-bar.open{
      background: #fff;
      box-shadow: 0 2px 10px rgb(105, 98, 98) inset;
    }
    nav.mui-bar.close{
      background: #000;
    }
</style>

