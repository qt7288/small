// 主页
// 2019-4-15 09:10:23
<template>
  <div class="app-home">
     <!-- <mt-header fixed class="a" title="search">
   <router-link to="" slot="left">
     <span class="mui-icon mui-icon-arrowleft"></span>
   </router-link> -->
 <!-- </mt-header> -->
    <!--顶部导航条 mint-ui-->
    <mt-header fixed class="a" title="">
      <router-link to="" slot="">
        <span class="mui-icon mui-icon-arrowleft"></span>
      </router-link>
    </mt-header>

    <mt-popup style="" v-model="isShows" position="" pop-transition="popup-fade" v-show="isShows">
      <span>{{timer}}</span><br>
      <hr>
      <span>任时间冉冉流逝……</span>
    </mt-popup>
      <mt-popup style="" v-model="isDay" position="" pop-transition="popup-fade" v-show="isDay">
      <span style="font-size:16px">登录日志</span><hr>
        <ul style="list-style:none" class="mint-ul">
        <li v-for="(timer,t) of myDays" :key="t">{{t}}**{{timer.user_loginTime}}</li>
      </ul>
      <hr>
    </mt-popup>
    <!--轮播图     mint-ui-->
    <mt-swipe  :auto="4000">
      <mt-swipe-item v-for="item of navlist" :key="item.id">
        <img :src="item.img_url" />
      </mt-swipe-item>
    </mt-swipe>
    <!--九宫格     mui-->
	  <ul class="mui-table-view mui-grid-view mui-grid-9">
		  <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3" v-for="(item,i) of gridlist" :key="i">
      <a href="javascript:;">
		   <img :src="item.img_url" @click="jump" :data-id="item.id" />
		   <div class="mui-media-body">{{item.title}}</div>
       </a>
       </li>
      </ul>
    <div class="myUname" style="color:white" :class="w==true?'sun':'night'"><span>welcome &nbsp;◮  &nbsp;{{this.$store.state.uname}}</span></div>
    <div id="photo">
        <div class="cardNav" @click="Photo(ist)">热点壁纸</div>
        <ul class="photoUl" style="" :class="isShow==false?'closeP':'openP'">
          <li v-for="(photo,p) of photo" :key="p">
            <div class="cardHeader">
              <img :src=photo.img alt="">
            </div>
            <div class="cardFoot">
              <p @click="btnbg(p,photo.img)">{{photo.title}}</p>
            </div>
          </li>
        </ul>
    </div>
    <div id="myHome" :class="showHome==true?'down':'up'">
      <mt-header fixed class="a" title="">
        <router-link to="" slot="right">
        <span class="mui-icon mui-icon-closeempty" @click="back"></span>
      </router-link>
    </mt-header>
      <div class="myHome_header">
        <p style="text-align:center;line-height:20px">我的空间</p>
      </div>
                <div class="cardAll" v-for="(item,index) of myList" :key="index">
                <div class="cardBody">
                        {{item.sayto}}
                </div>
                <div class="pinglun">
                <!-- <div class="cardHeader">
                    <span>发表者：{{item.uname}}</span>
                </div> -->
                <div class="time">
                    <span>{{item.saytoTime}}</span>
                    <span @click.stop="DelP(index,item.saytoTime,item.sayto)">删除</span>
                </div>
            </div>    
            <table></table>
            </div>
    </div>
  </div>

</template>
<script>
// const dataB = JSON.parse(session.getItem('www'))
import {Toast} from "mint-ui"
export default {
   data(){
     return {
       navlist:[], //轮播图列表
       gridlist:[],//保存九宫格数组
       a:"",
       photo:[
         {img:"http://127.0.0.1:3000/bg02.jpg",title:"枫叶"},
         {img:"http://127.0.0.1:3000/bg04.jpg",title:"墙壁"},
         {img:"http://127.0.0.1:3000/bg01.jpg",title:"雪地"},
         {img:"http://127.0.0.1:3000/bg03.jpg",title:"星空"}
       ],
       isShow:false,
       ist:1,
       timer:"",
       isShows:false,
       isDay:false,
       myDays:[],
       myList:[{sayto:"空荡荡",saytoTime:"2019-4-14 16:00:48"}],
       showHome:false,
       coun:1,
       a:1,
       w:this.$store.state.sun   
     }
   },
   created(){
     this.handleImage();
     this.handleGrid();
   },
   methods:{
     DelP(msg1,msg2,msg3){
        // 删除发表言论
        var uname=this.$store.state.uname;
        var saytoTime=msg2
        var sayto=msg3
        console.log(saytoTime,sayto,uname)
        var postData=this.qs.stringify({uname,saytoTime,sayto});
        var url = "http://127.0.0.1:3000/DelP";
        this.axios.post(url,postData).then(result=>{
            console.log(result.data.data);
            if(result.data.code==1){       
                // 如果删除成功、刷新页面
              this.qq();
              this.Toast("delete ok");
              if(result.data.data==0){
                this.myList=[{sayto:"空荡荡",saytoTime:""}];
              }
            }
        })
     },selectDays(){
            var url = "http://127.0.0.1:3000/selectDays?uname="+this.$store.state.uname;
        this.axios.get(url).then(result=>{
          console.log(result);
          if(result.data.code==200){
              console.log(result.data.data);
              this.myDays=result.data.data
          }    
        })
     },
     Toast(msg){
               Toast({message:msg,position:"bottom",duration:1000})
     },
     back(){
          this.showHome=false
          this.coun=1
     },
     time(){
        this.isShows=true
     },timers(){     
          setInterval(() => {
          var a=new Date().getFullYear(); 
          var b=new Date().getMonth()+1; 
          var c=new Date().getDate(); 
          var d=new Date().getHours(); 
          var e=new Date().getMinutes(); 
          var f=new Date().getSeconds();         
            this.timer=`${a}:${b}:${c}-${d}:${e}:${f}`;
          }, 1000);
     },Photo(ist){
       if(ist==1){
            var url="http://127.0.0.1:3000/getPhoto";
            this.axios.get(url).then(result=>{
            if(result.data.code==1){
              console.log(result)
              this.photo=result.data.data
            }}) 
         this.isShow=true;
         this.ist=0
       }else{
         this.isShow=false
         this.ist=1
       }
     },
     btnbg(aa,bb){
        console.log(aa);
        console.log(bb);
        this.Toast("更换"+this.photo[aa].title+"成功");
        var body=document.getElementsByTagName("body")[0];
        body.style.background=`url(${bb}) no-repeat fixed`;
        body.style.backgroundSize=100+"%";
        body.style.opacity=1;
     },
     qq(){
          var url="http://127.0.0.1:3000/selectMyhome?uid="+this.$store.state.uid;
          this.axios.get(url).then(result=>{
            console.log(result);
            if(result.data.code==1){
              this.myList=result.data.data
            }else if(result.data.code==-1){
              this.myList=[];
            }
          }
          ) 
     },
     jump(e){
       var id=e.target.dataset.id;
        var path="/";
        if(id==1){
          path="Tofriend"
        setTimeout(()=>{
        this.Toast("你的想法")
          if(this.a==1){
            this.$store.state.play=true;          
            this.a=-1;
          }else if(this.a==-1){
            this.$store.state.play=false;  
            this.a=1;
          }
         console.log(this.$store.state.play);
        },1000)  
        }else if(id==2){
          this.isShows=true;
          path=""
          this.timers();
        setTimeout(()=>{
        this.Toast("查询时间")
        },1000)  
        }else if(id==3){
          path="/Tabke";
        setTimeout(()=>{
        this.Toast("好友聊天")
        },1000)  
        }else if(id==4){
        path=""
        this.isDay=true;
        // 加入查询日志接口
        // get请求
        this.selectDays()
        setTimeout(()=>{
        this.Toast("日志")
        },1000)  
        }else if(id==5){
        path=""
        if(this.coun==1){
              this.qq();
          this.Toast("loading")
          setTimeout(() => {
           
              this.showHome=true
              this.coun=0            
          },1000);

        }else if(this.coun==0){
          this.showHome=false
          this.coun=1
        }
        
        // ******************************************
        setTimeout(()=>{
        this.Toast("我的空间");
        },1000)  
       }else if(id==6){
        console.log(id);
        path="/Search"
        this.Toast("loading")
        setTimeout(()=>{
        this.Toast("查询好友")
        },1000)  
        }
        this.$router.push(path);
     },
     handleGrid(){
      //1:发送ajax获取九宫格数据
      var url = "http://127.0.0.1:3000";
      url+="/grid";
      this.axios.get(url).then(result=>{
      //2:获取返回数据
      //console.log(result.data);
      //3:保存gridlist
      this.gridlist = result.data;
      });
     },
     //加载轮轮图数据
     handleImage(){
      //1:发送ajax获取轮播数据
      var url = "http://127.0.0.1:3000";
      url+="/imglist";
      this.axios.get(url).then(result=>{
        //2:获取返回结果
        //3:保存data属性中
        this.navlist = result.data.data;
      })
     }
   }
}
</script>
<style scoped>
  #myHome{
    background: rgba(200, 190, 190, 0.932);
    width:100%;
    position: fixed;
    top: 0;
    height:50%;
    overflow-y:auto; 
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    z-index: 200;
    box-shadow: 0 0 20px black;
  }
  /* 个人空间信息 */
  .myHome_header{
    background: rgba(0, 0, 0, 0.473);
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    height:40px;
    line-height: 40px;
    box-shadow: 0 0 10px rgb(245, 245, 245);
  }
  .myHome_header>p{
    color: #fff;
    line-height: 40px !important;
  }
  .app-home .mint-swipe{
    height:200px;
    margin: 0 auto;
    margin-bottom:6px;
    overflow: hidden;
    width:100%;
    border-radius: 6px;
  }
  .mint-swipe-items-wrap{
    border-radius: 10px;
  }
  .app-home .mint-swipe img{
    width:100%;
    overflow: hidden;
  }
  /*九宫格图片宽度 逻辑像素*/
  .app-home .mui-grid-9 img{
    width:30px;
    height:30px;
  }
  /*九宫格背景色 白色*/
  .app-home .mui-grid-view.mui-grid-9{
    /* background-color:rgb(255, 255, 255); */
    background:url("http://127.0.0.1:3000/bg01.jpg");
    width:96%;
    margin: 0 auto; 
  }
  /* 小功能字体样式 */
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size:14px;
  }
  .mui-grid-view{
      border-radius: 10px;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:1px solid transparent;
    border-radius:10px;
    box-shadow: 0 0 6px rgba(231, 223, 223, 0.918) inset;
  }
  .mui-grid-view.mui-grid-9{
    border-top:1px solid transparent;
    border-left:1px solid transparent;
  }
  .myUname{
    width:60%;
    color: #000;
    height:30px;
    position: fixed;
    top: 0;
    text-align: center;
    margin: 0 auto;
    left:20%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    animation:myuname 1s linear;
    box-shadow: 0 2px 2px black;
  }
  @keyframes myuname {
      from{transform: translateY(-40px)}
      to{transform: translateY(0px)}
  }
  .myUname>span{
    font-size: 14px;
  }
  .myUname.sun{
    background: #fff;
  }
  .myUname.sun>span{
    color: #000;
    text-shadow: 0 0 10px rgb(146, 158, 160);
  }
  .myUname.night{
    background: #000;
    text-shadow: 0 0 10px rgb(18, 185, 214);
  }
  .mint-header{
    background:transparent;
  }
  #photo{
    margin: 0;
    padding: 0;
    margin-top: 10px;
  }
  .photoUl,.photoUls{
    display: flex;
    list-style: none;
    flex-flow:wrap;
    overflow: hidden;
  }
  .photoUl li{
    width:50%;
    transition: 2s;
  }
  .photoUl li:nth-child(odd),.photoUl li:nth-child(even){
    border-right:1px solid transparent;
    border-left:1px solid transparent;
  }
  .cardHeader{
    width:100%;
    border-bottom: 1px solid transparent;
    padding: 10px;
    height: 340px;
    overflow: hidden;
  }
  .cardHeader>img{
    width: 100%;
    border-radius: 10px;
  }
  /* title */
  .cardFoot{
    text-align:center;
    background-color:rgba(255, 255, 255, 0.4);
    color: #fff;
    border-radius:4px;
  }
  .cardFoot p{
    color: #fff;
  }
  .cardNav{
    text-align:center;
    background:url("http://127.0.0.1:3000/bg01.jpg");
    height:30px;
    width:96%;
    margin: 0 auto;
    color: rgb(0, 0, 0);
    line-height:30px;
    font-size: 14px;
    border-radius: 10px;
    /* box-shadow: 0 0 2px black inset; */
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.26);
  }
      .closeP,.openP{
        transition:2s;
      }
      .closeP{
        height: 0;
      }
      .openP{
        border-radius: 10px;
        height:auto;
        background: rgba(0, 0, 0,0.7);
      }
      mt-popup{
        background:transparent;
      }
      .mint-popup{
        background:transparent;
        color: #fff;
        width:80%;
      }
  /* 文本卡片 */
      #myhome{
        box-shadow: 0 0 5px black inset;
      }
      #myHome .cardAll{
        width:90%;
        margin: 0 auto;
        margin-bottom: 10px;
        margin-top:20px;
        padding-left: 10px;
        padding-right: 10px;
        padding-left:4px;
        padding-right:4px;
        background: rgba(119, 119, 119, 0.8);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.322);
        border-radius: 10px;
        transition-delay: .5s;
    }
    #myHome .cardAll:active{
         background: rgba(255, 255, 255, 0.45);
    }
    /* 标题cardHeader */
    #myHome .cardHeader{
        text-align: center;
        height: 20px;
        font-size:10px;
        display: block;
        color: rgba(255, 255, 255, 0.4);
    }
    #myHome .cardHeader::after{
        content: "";
        display: block;
        top:0;
        left: 0;
        text-align: center;
        height:1px;
        border-radius: 1px;
        width:20%;
        position: relative;
        background: rgba(255, 255, 255, 0.3);
        margin: 0 auto; 
    }
    #myHome .time{
        font-size: 10px;
        position: relative;
        text-align: center;
        display: block;
        height:16px;
        line-height: 16px;
        background:rgba(95, 133, 143, 0.5);
        border-radius: 10px;
        width:50%;
        color: #fff;
        margin: 0 auto;
        box-shadow: 0 0px 4px rgb(247, 247, 247) inset;
    }
     #myHome .cardBody{
        text-shadow: 0px 0 2px #2979b5;
        margin-top: 10px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        min-height:80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding-top:12px;
        min-width: 82%;
    }
    .down{
      transform: translateY(0%);
      /* box-shadow: 0 2px 10px rgb(2, 2, 2); */
      transition:1s;
    }
    .up{
      transform: translateY(-100%);
      transition:1s;
    }
    mt-swipe-item>img{
      overflow: hidden;
    }
    mt-swipe{
      border-radius: 10px;
    }
  .mint-ul{
    overflow-y:auto;
    height:300px;
    font-size:16px;
    animation: open 1s linear;
  }
  @keyframes open {
      from{height: 0;}
      to{height:300px;}
  }
</style>
<style>
ul{
  margin: 0;
  padding: 0;
}
</style>
