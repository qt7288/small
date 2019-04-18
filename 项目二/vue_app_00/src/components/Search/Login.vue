<template>
   <div class="app-login">
      <form>
       
  <input type="text" name="uname" v-model="uname" placeholder="name" autofocus />
      <br />
      
  <input type="password" name="upwd" v-model="upwd" placeholder="……" />
      <br />

  <input type="button" value='登录' @click="btnLogin" id="btnLogin" />
      </form>
      <div class="regLogin">
        <router-link class="myReg" to="reg"><span>新用户注册</span></router-link>
        <router-link class="myPass" to="back"><span>忘记密码？</span></router-link>
      </div>
      <div id="foot">
        <p class="btnAbout" @click="btnAbout()">关于我们</p>  
      </div>   
   </div>
</template>
<script>
  //1:引入mint-ui Toast 局部使用
  
  import {Toast} from "mint-ui"
  export default {
    data(){
      return {
        uname:"",
        upwd:"",
   
      }
    },
    methods:{
      btnLogin(){
        ////console.log(123);
        //1:获取用户输入用户名和密码
        if(this.uname=="" && this.upwd==""){
          return;
        }
        var u = this.uname;
        var p = this.upwd;
        ////console.log(u+":"+p);
        //2:创建正则表达式验证用户名和密码格式是//否正确
        var reg = /^[a-z0-9_]{3,8}$/i;
        if(u==""){
          
        }
        if(!reg.test(u)){
          //提示信息不是
          Toast({message:"user err",
                position:"bottom",
                duration:1000
          });
          return;
        }
        if(p==""){

        }
        if(!reg.test(p)){
          Toast({message:"password err",
                position:"bottom",
                duration:1000
          });
          return;
        }
        //3:发送ajax
        ////console.log(3);
        // selectXt
        var url="http://127.0.0.1:3000/selectXt?uname="+this.uname;
        this.axios.get(url).then(result=>{
          if(result.data.code==199){
          Toast({message:"用户在线,是否修改密码",
                position:"bottom",
                duration:1000
          });
          }else if(result.data.code==110){

          var postData=this.qs.stringify({u,p});
        var url = "http://127.0.0.1:3000/login";
        this.axios.post(url,postData).then(result=>{
             //11:41
             if(result.data.code==1){
                this.$store.commit('uid',result.data.data[0].id)
                this.$store.commit('uname',result.data.data[0].uname)
                this.$store.commit('stateU',result.data.data[0].stateU)
                this.$store.commit('avatar',result.data.data[0].avatar)                
                this.$store.commit('count',result.data.data[0].count) 
                this.$store.commit('ctime',result.data.data[0].ctime)

              //  成功调用个人信息页面
                Toast({message:"验证成功……",
                    position:"bottom",
                    duration:1000
                });
                // 日志
                  var postData=this.qs.stringify({u});
                  var url = "http://127.0.0.1:3000/insertDay";
                  this.axios.post(url,postData).then(result=>{
             //11:41
                      if(result.data.code==1){
                          Toast({message:"登录成功",
                          position:"bottom",
                          duration:1000
                      });
                      }
                  })

              setTimeout(() => {
                this.$router.push(`/home`);
                // ?uname=${u}&uid=${result.data.data}
                // uid登录序号                          
                  //  修改数据库存储的用户是否在线
                  var uu=this.uname;
                  var postData=this.qs.stringify({uu});
                  console.log(uu);
                    var url = "http://127.0.0.1:3000/update";
                  this.axios.post(url,postData).then(result=>{
                    if(result.data.code==1){
                        Toast({message:"stateU change true",
                        position:"bottom",
                        duration:1000
                      });
                    }
              })
          }, 1000);   
             }else{
              Toast({message:"password err",
                    position:"bottom",
                    duration:1000
              });
               this.upwd=""
             }
        });        


          }
        })
  
        //4:获取服务器返回结果
        //5:提示用户 36  
      },btnAbout(){
          this.$router.push("/About")
      }
    }
  }
</script>
<style scoped>

/* 主 */
  /* .app-login{} */
  form{
    padding-top: 100px;
  }
  #btnLogin{
    height:30px;
  }
  form input{
    outline: none;
    width: 95%;
    display: block;
    margin: 0 auto;
    background: transparent;
    border:0;
    box-sizing: border-box;
    border-radius: 0;
    color: #fff;
    text-align: left;
    box-shadow: 0 0px 6px white inset;
    border-radius:10px;

  }
form input:active{
    box-shadow: 0 0px 10px white inset;
}
  input[type="button"]{
    width: 90%;
    margin: 0 auto;
    position: relative;
    display: block;
    background:#ffffff6c;
    font-weight: bold;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    border:0;
    margin-top: 10px;   
  }
  .regLogin{  
    position: relative;
    height:2rem;
    color: rgb(255, 255, 255);
    line-height: 2rem;
    border-radius: 2px;
    margin-top: 10px;
  }
  .myReg,.myPass{
    width: 50%;
    display: inline-block;
  }
  .myReg{
     text-align: left;
     padding-left: 10px;
  }
  .myPass{
    text-align: right;
    padding-right:5px;
  }
  input{
      font-size: 14px;
    }
  .regLogin a{
    color: rgba(255, 255, 255, 0.4);
    font-size: 14px;
  }
  #foot{
    position: fixed;
    bottom:6%;
    width: 100%;
    text-align: center !important;
  }
  #foot p{
    color: rgb(255, 255, 255);
    font-size: 10px;
  }
  #foot p::after{
    content: "";
    display: block;
    top: 0;
    left: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.466);
    width:20%;
    margin: 0 auto;
  }
</style>