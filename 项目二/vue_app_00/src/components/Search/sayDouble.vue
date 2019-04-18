<template>
    <div id="sayDouble">
        <mt-header fixed :title="sayTitle" style="font-size:14px">
            <router-link to="Tabke" slot="left">
                <span class="mui-icon mui-icon-arrowleft"></span>
            </router-link>
            <router-link to="Your" slot="right">
                <span class="mui-icon mui-icon-person"></span>
            </router-link>
        </mt-header>
<!-- loadmore -->   
 <mt-loadmore :top-method="loadTop" style="color:white;font-size:10px;" topPullText="loading" topLoadingText="" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> 
<div class="top" @click="top" :class="isF==false ? 'closes':'shows'">
        <span class="header">Historical news</span>
</div>  
  </mt-loadmore>
                <div id="speakAll">       
                    <div class="speakSmall" v-for="(item,i) of myList" :key="i" :class="id == item.id?'my':'your'">
                    <div class="sayTime"><span>{{item.sayTime | datetimeFilter}}</span></div>
                        <span>{{item.say}}</span>         
                        </div>
                </div>
        <div class="btnSpeakBoth">
            <input type="text" v-model="say" class="speakBoth" autofocus @focus="isFocus" placeholder="say…">
            <input type="button" value="say" class="btnSpearBoth" @click="btn">    
        </div> 
             <div class="container">
                <div class="fw" v-for="(aa,w) of myToa" :key="w" :class="aa.stateU == 1 ? 'blue':'red'" @click="like(aa.stateU)">
                    <span></span><span>{{aa.stateU==1?"☺":"☹"}}</span>      
                </div>                
            </div>
    </div>  
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            sayTitle:this.$route.query.uname,
            sayId:this.$route.query.friendid,
            say:"",
            id:this.$store.state.uid,
            myList:[],//设一手空数组保存数据库获取的数值
            arr:["wocao","卧槽","我靠","wokao","wc","ri","日","我操","我草","woc","wcao","wca","日","尼玛","你妈"],
            pageSize:5,  
            allLoaded:false,
            isF:true,
            myToa:[]     
        }
    },mounted(){
            this.showHeader();
            Toast({
                message:"Render completed",
                 position:'bottom',
                 duration: 800
            });
            this.isF=false;
            this.hyState();
    },methods:{
//底部******************************************************************************
            Toast(msg){
                  Toast({
                        message:msg,
                        position:"bottom",
                        duration:800
                    })                
            },
        loadTop() {
            this.Toast("Start loading");
            setTimeout(()=>{
                this.allLoaded = true;// 若数据已全部获取完毕
                this.pageSize+=5;
                this.show()
                this.Toast("Load complete");
                this.$refs.loadmore.onTopLoaded()                
            },1000)
            },
            loadBottom: function () {
                setTimeout(() => {
                    this.Toast("Pleasantly surprised");
            }, 1000);
        },
        top(){
                Toast({
                    message:"loadmore",
                    position:"bottom",
                    duration:800
                }) 
               
                setTimeout(() => {
                        this.pageSize+=5;
                        this.show();
                    },1500);
        },
        isFocus(){
            // 焦点刷新
            // //console.log("▼刷新成功")     
            this.showHeader()
        },
        isBlur(){
           // 失去焦点刷新
            setInterval(()=>{
                this.showHeader()
            },1000);        
        },
        hyState(){
            // //console.log("渲染好友状态成功");
                var url = "http://127.0.0.1:3000/hyState?&id="+this.sayId;
             
            this.axios.get(url).then(result=>{
            //  //console.log(result);
            if(result.data.code==1){
                this.myToa=result.data.data
            }else{

            }
            })
        },
        like(msg){
            if(msg==1){
                this.Toast(this.sayTitle+"在线");
            }else{
                this.Toast(this.sayTitle+"未登录")
            }
            
        },
        // 点击发送
        btn(){
            var id=this.$store.state.uid;
            var uname=this.$store.state.uname;
            var friendid=this.$route.query.friendid;
            var say=this.say;
            var frienduname=this.sayTitle;
            var sayTime=new Date();
            // //console.log(sayTime);  
            if(this.say==""){
                this.ss=true;
                // $('.btnSpearBoth').css("background","red");
                return;      
            }
            // 获取发消息的信息
            // //console.log(this.say)
            this.arr.forEach(element => {
                this.say1=new RegExp(element,"gm");
                this.say=this.say.replace(this.say1,"**");
            });
            //  //console.log(this.pageSize)
            // //console.log(this.$route.query.friendid)
            // 获取发消息人的id
            // //console.log(this.$store.state.uid)
            // 获取发消息人的数据
            // //console.log(this.$store.state.uname)
            // 获取发消息人的uname
            // //console.log(this.sayTitle)
                 var duixiang={
                     friendid,id,say,sayTime
                 }
                 this.myList.push(duixiang);
                var url = "http://127.0.0.1:3000/speakBoth?id="+this.$store.state.uid+"&uname="+this.$store.state.uname+"&frienduname="+this.sayTitle+"&friendid="+this.$route.query.friendid+"&say="+this.say;
            this.axios.get(url).then(result=>{
                // //console.log(result.data.code);
                if(result.data.code==1){
                    setTimeout(() => {
                        this.say=""
                        // this.myList=result.data.data

                        this.showHeader()
                        // this.show()
                        this.pageSize=5;
                    }, 1000);
                }else if(result.data.code==-1){
                      Toast(result.data.data.msg);
                      return;
                }             
            })
        },show(){
            // //console.log("刷新渲染页面");
            // //console.log(this.pageSize);
              var url = "http://127.0.0.1:3000/speakShow?id="+this.$store.state.uid+"&uname="+this.$store.state.uname+"&frienduname="+this.sayTitle+"&pageSize="+this.pageSize;
            this.axios.get(url).then(result=>{
                //console.log(result.data.data);
                if(result.data.code==1){
                        this.myList=result.data.data.reverse();
                }else if(result.data.code==-1){
                        Toast("is null");
                }
            })      
        },showHeader(){
            // //console.log("刷新渲染页面");
            // //console.log(this.pageSize);
              var url = "http://127.0.0.1:3000/speakShow?id="+this.$store.state.uid+"&uname="+this.$store.state.uname+"&frienduname="+this.sayTitle+"&pageSize="+5;
            this.axios.get(url).then(result=>{
                // //console.log(result.data.data.id);
                if(result.data.code==1){
                        this.myList=result.data.data.reverse();
                }else if(result.data.code==-1){
                        Toast("is null");
                }
            })     

        }
    }
 
}
</script>

<style scoped>
/* speakAll */
#speakAll{
    width: 100%;
    padding:10px 20px;
    position: relative;
}
#speakAll::after{
    content: "";
    display: block;
    user-select: none;
    top: 0;
    left: 0;
    z-index: 0;
}
.speakSmall{
    z-index: 10;
    padding:0 10px;
     border-radius: 10px;
    background: transparent;
    margin-top: 10px;
    position: relative;
    display: block;  
    float: left;
    margin:3px auto;
    clear: both;
    min-width: 32px;
    min-height: 32px;
}
.speakSmall::after{
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    top: 8px;
    display: block;
}
/* .speakSmall span:last-child{
    position:absolute;
    bottom: 0;
    margin-bottom: 10px;
} */
.speakSmall span{
    display: inline-block;
    line-height:20px;
    font-size: 14px;
}
.speakSmall span:first-child{
    text-align: left;
    
}
.speakSmall span:nth-child(2){
    text-align: right;
}
/* btnSpeakBoth */
    .btnSpeakBoth{
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 11;
    }
    .speakBoth{
        width:80%;
        font-size: 14px;
        padding:10px;
        height: 40px;
        margin-bottom: 0;
        color: rgb(95, 29, 29);
        box-sizing: border-box;
        background:rgb(255, 255, 255);
        box-shadow: 0 0 6px black inset;
    }
    .speakBoth,.btnSpeakBoth{
        border:0;
        border-radius: 0;
        outline: none;
    }
    .btnSpearBoth{
        height:40px; 
        width: 20%;
        box-sizing: border-box;
        background: #000;
        color: #fff;
        border:1px solid black;
    }
    .btnSpeakBoth:active{
        background: #fff;
    }
    .mint-header.is-fixed{
        z-index: 100;
    }
    .my{
        background: rgb(255, 255, 255,0.9);
        float: right;
        box-shadow: -1px 2px 5px rgba(0, 0, 0, 0.432);
        color: rgb(156, 156, 156);
        animation: sayLater 1s ease;
        border-radius: 5px;
    }
    .my::after{
    border-left:10px solid rgb(255, 255, 255);
    right:-10px;
}
    .your{
        background: rgb(156, 156, 156,0.9); 
        color: #fff;
         box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.164);
        animation: sayLaterL 1s ease;
         
        /* border-image: url("http://127.0.0.1:3000/7.png") 25 25 round; */
    }
    .your::after{
    border-right:10px solid rgb(156, 156, 156);
    left: -10px;
}

/* @keyframes sayLater {
    from{transform: translate(110%)}
    to{transform: translate(0%)}
} */
/* 延迟动画 */
/* @keyframes sayLaterL {
    from{transform: translate(-110%)}
    to{transform: translate(0%)}
} */
/* sayTime */

/* loadmore */
.top{
    width: 100%;
    height:30px;
    background-color:rgba(0, 0, 0, 0.171);
    border-radius: 6px;
    /* border-top-left-radius:0; 
    border-top-right-radius:0;  */
    z-index: 100;
    line-height: 30px;
    text-align: center;
    transform: translateY(-30px);
    box-shadow:0 -1px 4px white inset;
}
.header{
    font-size: 10px;
    color: #fff;
    text-align: center;
    display: inline-block;
}
.shows,.closes{
    transition:1s;
}
.shows{
    transform: translateY(-30px);
}
.closes{
    transform: translateY(0px);
}
.blue,.red{
    border:0;
    border-radius: 10px;
}
    .blue{
        background:rgb(47, 207, 47);
        box-shadow: 0 0 6px rgb(255, 255, 255) inset;
        font-size:34px;
        text-align: center;
    }
    .red{
        background: red;
        box-shadow: 0 0 6px rgb(66, 52, 52);
    }
    .fw{
        width:30px; 
        color: #000;
        line-height: 30px;
        text-align: center;
        position: relative;
    }
    .fw>span{
        display: block;
    }
    .container{
        position:fixed;
        right:5px;
        top:5px;
        z-index: 110;
    }
.mint-header{
    background:transparent;
}
</style>
