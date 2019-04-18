<template>
    <div id="app">
            <mt-header fixed title="" style="font-size:10px">
                <router-link to="" slot="">
                    <span class="mui-icon mui-icon-bars"></span>
                </router-link>
                </mt-header>
        <!-- <p>这里是个人信息</p> -->
        <div class="uname">
            <div class="user_img">
                <!-- <img src="http://127.0.0.1:3000/02.jpg" alt="头像"> -->
            </div>
            <div class="user_name"  :class="sun==true?'night':'sun'">
                <span class="mui-icon mui-icon-plusempty"></span>
                <span>{{this.$store.state.uname}}</span>
            </div>
            
        </div>
        <div class="user_body" :class="sun==true?'sun':'night'">
        <p>您是第{{this.$store.state.uid}}位用户哟</p>
        <!-- <p>登录状态:{{this.$store.state.stateU == 1 ? true:false}}</p> -->
        <p>状态:{{this.$store.state.stateU == 1 ? "下线":"在线"}}</p>
        <p>签名: <input class="q" type="text" v-model="this.$store.state.avatar"></p>
        <!-- <p>被点赞:{{this.$store.state.count}}</p> -->
        <p>{{this.$store.state.ctime}}</p>
        <p @click.stop="btnSun(isT)">{{sun==true?'日间模式':'夜间模式'}}</p>
        </div>
        <div class="back" @click="btnBack" :class="sun==true?'night':'sun'">
            <p>注销</p>
        </div>
    </div>
</template>
<script>
// 引入Toast组件
import {Toast} from "mint-ui"
export default {
 data(){
     return {
            sun:this.$store.state.sun,
            isT:this.$store.state.sun
     }
 },
 methods:{
     Toast(msg){
        Toast({message:msg,
        position:"bottom",
        duration:1000 
        }); 
     },
    //  切换日间夜间模式
    // 2019-4-16 19:40:38
    btnSun(isT){
        if(this.isT){      
            this.$store.state.sun=false
            this.sun=this.$store.state.sun
            //夜间模式
            this.isT=false
        }else if(this.isT==false){
            //日间模式
            this.$store.state.sun=true
            this.sun=this.$store.state.sun
            this.isT=true
        }
    }

    // 用户下线客户端传值修改用户在线状态
    // 2019-4-16 19:40:24
    ,btnBack(){
            var uname=this.$store.state.uname;
            console.log(uname);
            var postData=this.qs.stringify({uname});
            var url = "http://127.0.0.1:3000/updateLeave";
            this.axios.post(url,postData).then(result=>{
            if(result.data.code==1){
                this.Toast("stateU change true"); 
                this.$router.push("/"); 
            }else  if(result.data.code==-1){
                if(this.$store.state.uname==""){
                    this.$router.push("/")
                }else{
                    this.Toast("用户已下线")
                }
            }
            })                  
    }

    // 获取用户在线状态，若服务器端返回数值不符合
    // 强制下线
    // 2019-4-16 19:43:26
    ,se(){
            var url = "http://127.0.0.1:3000/hyState?id="+this.$store.state.uid;
            this.axios.get(url).then(result=>{
                //11:41
                console.log(result.data.data[0].stateU)
                if(result.data.code==1){
                    var q=result.data.data[0].stateU;
                    if(q==1){

                    }else{
                        console.log("下线了")
                    }  
                }
            })     
        },
    },
    // 页面加载调用函数this.se();
    // 2019-4-16 19:44:37
    // 判断当前在线用户名是否存在,如果不存在，强制下线
    mounted(){
        this.se();
            if(this.$store.state.uname==""){
                this.$router.push("/login");
            }
        }
    }
</script>

<style scoped>
/* uname */
.uname{
    height:160px;
    font-weight: bold;
    color: #000;
    width: 96%;
    margin: 0 auto;
}
.user_name{
    margin-top: 10px;
    color: rgb(0, 0, 0);
    width: 100%;
    height: 50px;
    line-height:50px;
    background: #fff;
    text-align:center;
    border-radius: 10px;
    margin-bottom: 10px;
    transition: 1s;
}
.uname span:first-child{
    font-size:20px;
}
.user_body{
    transition:1s;
    width: 96%;
    border-radius: 10px;
    margin: 0 auto;
    padding-top: 10px;
}
/* 日间模式样式 */
.sun{
        background: rgba(121, 121, 121, 0.8);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.322);
}

.sun>p,.sun>span{
    color: #fff;
}
/* 夜间模式样式 */
.night{
    box-shadow: 0 0 6px black inset;
}
.night>p{
    color: rgba(255, 255, 255, 0.747);
}
.user_body.night{
    background: rgba(0, 0, 0, 0.3);
}
.user_body>p{
    border-bottom:1px solid rgba(253, 253, 253, 0.212);
    padding-left: 10px;
    border-radius: 0;
    height: 40px;
    font-size: 14px;
    line-height:40px;
}
.user_body>p:last-child{
    border-bottom:1px solid transparent;
}
.uname div:first-child{
    margin-top: 10px;
    height: 100px;
}
/* user_img */
.user_img{
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
    background:url("http://127.0.0.1:3000/bg12.jpg") center no-repeat;
    background-size:100%;
    width:98%;
    animation: user_img 50s linear infinite;
}
@keyframes user_img {
    0%{background-position: 50% 30%}
    25%{background-position: 50% 40%}
    50%{background-position: 50% 60%}
    75%{background-position: 50% 40%}
    100%{background-position: 50% 30%}
}
/* user_body */

    .back{
        height:30px;
        color: rgb(255, 255, 255);
        border:0;
        line-height: 30px;
        text-align: center; 
        box-shadow: 0 0 2px white inset;
        width: 95%;
        margin:0 auto;
        border-radius: 10px;
        position: relative;
        transition: 1s;
    }
    .back p{
        color: #fff;  
    }
    .mint-header{
    background: transparent;
    }
    .q{
        width:90%;
        height:40px;
        background:transparent;
        border:0;
        outline: 0;
        color: #fff;
        font-size: 14px;
    }
    
</style>
