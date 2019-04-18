// 找回
// 2019-4-15 09:13:54
<template>
<div id="back">
<mt-header fixed title="">
<router-link to="login" slot="left">
    <span class="mui-icon mui-icon-arrowleft"></span>
</router-link>
</mt-header>
     <!-- <p>这里是修改密码界面</p> -->
    <form method="post" action="/long_user/register">
    <input type="text" id="unameBack" name="uname" v-model="uname" class="" placeholder="用户昵称" @blur="selu">
    <input type="text" id="emailBack" class="" v-model="email"  name="email" placeholder="原始邮箱" />
    <input type="password" id="upwdBack" class="" v-model="upwd"  name="upwd" placeholder="新的密码" />
     <input type="reset" value="×" class="reset" @click="rushBack()">
    <div class="btnBack">
        <input type="button" class="" @click="btnBack()"  value="找回">
    </div>
</form>
</div> 
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            uname:"",
            email:"",
            upwd:""
        }
    },methods:{
        // 封装一个Toast显示操作
            Toast(msg){
              Toast({
                message:msg,
                position:"bottom",
                duration:1000
            })
            },
            selu(){
            if(this.uname!=""){
              var url = "http://127.0.0.1:3000/pDuan?uname="+this.uname;
                this.axios.get(url).then(result=>{
                    if(result.data.code==3){
                        this.Toast("没这人");
                        this.uname="";
                        return
                    }
                });
            }else{
                this.Toast("请输入需要找回的用户名");
            }
        },
        btnBack(){

            var uname=this.uname;
            var email=this.email;
            var upwd=this.upwd;
            if(uname=="" || email=="" || upwd==""){
                this.Toast("请输入需要找回的用户名");
                return;
            }
            console.log(uname,email,upwd);
                //3:发送ajax
                var postData=this.qs.stringify({uname,email,upwd});
                var url = "http://127.0.0.1:3000/back";
                this.axios.post(url,postData).then(result=>{
                    //11:41
                    console.log(result);
                    if(result.data.code==3){
                        this.Toast(result.data.msg);
                        return;
                    }else if(result.data.code==-1){
                    this.Toast("失败");
                    return;
                    }else{
                    this.Toast("修改成功");
                    return;
                    }
                });
        },
        rushBack(){
            this.uname="";
            this.email="";
            this.upwd="";
        }
    }
}
</script>
<style scoped>
/* reset */
.reset{
    width: 95%;
    text-align: right;
    border:0;
    color:rgb(255, 255, 255);
    font-weight: bold;
    margin-bottom: 10px;
    box-shadow: 0 0 0 transparent;
}
input[type='reset']:enabled:active{
    background-color:transparent;
}
/* back */
#back{
    margin-top: 100px;
}
.mint-header{
    background: transparent;
}
/* 头栏黑色 */
    form input{
        border:0;
        outline: none;
        border-radius: 0;
        background:transparent;
        box-sizing: border-box;
        border-radius: 10px;
        color: #fff;
        width: 95%;
        margin:0 auto;
        display: block;
        margin-top:10px; 
        font-size: 10px;
        box-shadow: 0 0 2px white;
    }
    .btnBack input{
        width: 95%;
        display: block;
        margin: 0 auto;
        background: rgba(255, 254, 254, 0.13);
        color: #fff;
        border-radius: 10px;
        height: 30px;
    }
</style>
