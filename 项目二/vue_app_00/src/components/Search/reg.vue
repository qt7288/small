<template>
<div>
		<div id="cc">
             <mt-header fixed class="a" title="">
                <router-link to="login" slot="left">
                    <span class="mui-icon mui-icon-arrowleft"></span>
                </router-link>
                </mt-header>
				<h2 class="text-dark"></h2>
				<form method="post" action="/long_user/register">
					<input type="text" id="d1" name="uname" v-model="uname" class="form-control" placeholder="输入账号..." @blur="selu">
				
					<input type="password" id="d2" class="form-control" name="upwd" v-model="upwd" @blur="selp" placeholder="输入密码..." />
					
					<input type="text" id="d3" name="email" v-model="email" class="form-control" placeholder="输入邮箱..." @blur="uemail"/>
					
					<input type="text" id="d5" name="avatar" v-model="avatar" class="form-control" placeholder="签名..." />
					
					<div class="form-inline sex">
						<input type="radio" id="man" name="gender" v-model="gender" checked="checked" value="1"><label for="man"><span class="proment">男</span></label>
						<input type="radio" id="woman" name="gender" v-model="gender" value="0"><label for="woman"><span class="proment s">女</span></label>
					</div>
					<div class="col-12">
						<input type="button" class="btn btn-lg form-control bg-dark text-light reg" @click="btnReg" value="注册">
					</div>
				</form>
		</div>     
</div>
</template>
<script>
// 局部使用
import {Toast} from "mint-ui"
export default {
    data(){
        return{
                uname:"",
                upwd:"",
                email:"",
                ctime:"",
                gender:"",
                avatar:"",
        }
    },
    methods:{
        Toast(msg){
              Toast({
                message:msg,
                position:"bottom",
                duration:1000
            })
        },
        selu(){
             var u=this.uname;
            // 注释：测试代码a
                 var reg=/^[a-z0-9]{3,8}$/i;
                if(!reg.test(u)){
                        //提示信息  Toast("消息提示")
                    this.Toast("格式错误");
                    return;
                }
            // a
            var url="http://127.0.0.1:3000/regU?uname="+u;
               this.axios.get(url).then(result=>{
            if(result.data.code==401){
                // console.log(result.data.code);
                 this.Toast("已被注册");
                 this.uname="";
                 return;  
           }else{
                this.Toast("可以注册");
                return;
           }
        })
        },uemail(){
            var email=this.email;
            // 注释：测试代码b
            var ereg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;		
                    if(email==""){this.Toast("邮箱为空!");return;}
                    else if(!ereg.test(email)){
                        this.Toast("邮箱格式错误，请检查");
                        return;
                    }
            // b
            var url="http://127.0.0.1:3000/regE?email="+email;
               this.axios.get(url).then(result=>{
            if(result.data.code==16){
                // console.log(result.data.code);
                 this.Toast("已被注册");
                 this.email="";
                 return;  
           }
        })
        },
        btnReg(){
                var u=this.uname;
                var p=this.upwd;
                var email=this.email;
                var gender=this.gender;
                var ctime=this.ctime;
                var avatar=this.avatar;
               var reg=/^[a-z0-9]{3,8}$/i;
                if(!reg.test(u)){
                        //提示信息  Toast("消息提示")
                        this.Toast("用户名格式不正确，请检查");
                        return;
                }

                if(!reg.test(p)){
                         this.Toast("密码格式不正确，请检查");
                        return;
                }
                var ereg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;		
                    if(email==""){  
                        this.Toast("邮箱为空!");return;
                        }
                    else if(!ereg.test(email)){
                         this.Toast("邮箱格式错误，请检查");
                        return;
                    }
                    console.log(email);
                // 注册判断男女
                    if(man.checked){
                        gender="1";
                    }else{
                        gender="0";
                    }
                    var postData=this.qs.stringify({u,p,email,gender,avatar});
                     var url="http://127.0.0.1:3000/reg";
                        this.axios.post(url,postData).then(result=>{
                            // console.log(result);
                       if(result.data.code==200){
                            this.Toast(`注册成功.即将跳转登录界面`); 
                           setTimeout(function(){      

                                  window.location.href="http://127.0.0.1:8080/#/login";
                                    // this.$router.push("login")
                                   this.Toast("欢迎.登录界面");
                           },1000)
                           return;
                       }    
                    }); 

        },// 失去焦点判断是否填写---账号
        selp(){
            var p=this.upwd;
            if(p==""){
                 this.Toast("密码不能为空");
                return;
            }
        }
         // 失去焦点判断是否填写--密码
    }
}
</script>
<style scoped>
.mint-header{
    background: transparent;
}
*{
    margin: 0;padding: 0;
}
html{
    width:100%;
    height:100%;
}
input{
    border:0;
    color: #fff;
}
form{
    background: transparent;
}
div{
    width: 100%;
}
#man{
    position: relative;
    left: 4px;
}
.proment{
    color: rgba(255, 255, 255, 0.5);
    left:8px;
    position: relative;
}
.s{
    left: 44px;
}
#woman{
    position: relative;
    left: 40px;
}
#cc>h2{
    position: relative;
    margin-bottom: 5rem;
}
    #cc{
        width:100%;
        position: relative;
        margin: 0 auto;
    }
    /* 总体样式 */
    input.reg{
       width:90%;
       margin: 0 auto;
       display: block;
       background: rgba(255, 255, 255, 0.3);
       border-radius: 10px;
       color: white;
       font-weight: bold;
       height:30px;
       margin-top:10px;
    }
    form>input:first-child,form>input:nth-child(2),form>input:nth-child(3),form>input:nth-child(4){
        border:0;
        width: 98%;
        margin: 0 auto;
        display: block;
        background: transparent;
        box-shadow: 0 0 6px white inset;
        color:rgb(255, 255, 255);
        border-radius:10px;
        font-size:14px;
        margin-bottom:10px;
    }
/* sex */
    .sex{
        width: 100%;
        height: 2rem;
    }
    label{
        color: rgb(255, 255, 255);
        font-size: 14px;
    }
</style>
