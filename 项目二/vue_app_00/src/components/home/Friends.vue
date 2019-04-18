// 社交圈
// 2019-4-15 09:10:02
<template>
    <div id="Friends">
<mt-header fixed :title=friendTitle>
<router-link to="Tofriend" slot="right">
<span style="font-size:14px" class="mui-icon mui-icon-plusempty">发送</span>
</router-link>
</mt-header>

<div id="zans" @click="zans" :class="isLeft == true ? 'open':'close'">
<!-- <p>{{this.$store.state.count}}</p> -->
<div class="neir"><p>{{this.$store.state.uname}}</p></div>
</div>

<mt-loadmore style="color:white;font-size:10px" topPullText="loading" topLoadingText="" :top-method="loadTop" :top-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> 
    <div class="friendHeader">
        <div class="friendImg">
            <!-- <img src="http://127.0.0.1:3000/timg.jpg" alt="">photo -->
        </div>
        <div class="uname">
            <div class="userImg">
                <!-- <img src="http://127.0.0.1:3000/02.jpg" alt=""> -->
            </div>
            <div class="userUname">
                <!-- <span>{{this.$store.state.uname}}</span> -->
            </div>
        </div>
    </div>
</mt-loadmore>

        <div class="cardAll" v-for="(item,index) of myList" :key="index">
                <div class="cardBody"  :class="item.uname==ww?'blue':'red'">
                        {{item.sayto}}
                </div>
                <div class="pinglun" :class="isShowP==true ? 'xianshi':'yincang'">
                <div class="cardHeader">
                    <span style="color:#fff">发表者:{{item.uname}}</span>
                </div>
                <div class="time">
                    <span>发表时间:{{item.saytoTime}}</span>
                </div>
            </div>    
            <table></table>
            </div>
        <div class="btnZ">
    <mt-palette-button content="+" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
      direction="rt" class="pb" :radius="50" ref="target_1" mainButtonStyle="color:rgba(97, 180, 206, 0.8);text-shadow:0 0 2px blue;"
      style="left:auto;right:-10px;width:30px;height:30px;font-size:14px;line-height:30px;">
      <!-- <div class="my-icon-button indexicon icon-popup">
          <span class="mui-icon-extra mui-icon-extra-heart" @click="zan" :class="showColor==true ? 'whiteU':'blackU'"></span>
      </div> -->
      <div class="my-icon-button indexicon icon-popup">
           <span class="mui-icon mui-icon-chatbubble" @click="talk"></span>
      </div>
      <div class="my-icon-button indexicon icon-popup">
           <span class="mui-icon mui-icon-close" @click="close"></span>
      </div>
    </mt-palette-button>
        </div>
        <div class="friendFoot" @click="loadmorefoot">
            <div class="friendFoot-body"><span style="color:white">{{pageSize}}</span></div>
        </div>

    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            allLoaded:false,
            myList:[],
            friendTitle:"",
            pageSize:5,
            isShowP:false,
            isa:0,
            showColor:true,
            isLeft:true,
            ww:this.$store.state.uname
        }
    },
    mounted(){
        Indicator.open({
            text: '',
            spinnerType: 'triple-bounce'
            });
        setTimeout(()=>{
            this.loadmorefoot() 
            Indicator.close();
        },1000)   
    },
    methods:{
        zans(){
                 this.isLeft=true;
        },
        zan(){         
            this.isLeft=true;
                this.isa+=1
                if(this.isa>=2){
                    this.Toast("重复点赞");
                    this.showColor=false
                    return;
                }else{
                        var countU = this.$store.state.count+=1;
                        var id=this.$store.state.uid
                        //console.log(countU);
                            var postData=this.qs.stringify({id,countU});
                        var url="http://127.0.0.1:3000/inserToqzuall"
                            this.axios.post(url,postData).then(result=>{
                            if(result.data.code==1){
                                this.Toast("谢谢点赞"); 
                                return;  
                            }
                    })                     
                }
                // ajax向数据库添加点赞信息
            },
        talk(){   
                this.Toast("open")
                this.isShowP=true;         
        },
        close(){
                this.Toast("close")
                this.isShowP=false; 
        },
         main_log(val) {
            },
            sub_log(val) {
                this.$refs.target_1.collapse();
            },
            Toast(msg){
              Toast({
                message:msg,
                position:"bottom",
                duration:1000
            })
            },
            loadTop() {
                setTimeout(()=>{
                    Indicator.close();
                     this.$router.push(`/Tofriend`);
                    
                },1000)
                this.Toast("Start loading")
            setTimeout(()=>{
                this.allLoaded = true;// 若数据已全部获取完
                this.Toast("Load complete")
            },1000)      
        },loadmorefoot(){
            var url="http://127.0.0.1:3000/selectThingss?pageSize="+this.pageSize;
                    this.axios.get(url).then(result=>{
                    if(result.data.code==1){
                        //console.log(result);
                        this.myList=result.data.data
                        this.pageSize="查询成功"+result.data.length+"条友圈信息";
                        return;  
                }else if(result.data.code==20){
                        // this.Toast("myle");
                        this.myList=result.data.data
                        this.pageSize=result.data.length;
                        return;
                }
            }) 
        }
    }
}
</script>
<style>
    .mint-palette-button .my-icon-button{
        background-color:rgba(117, 101, 101, 0.9);
        border-radius: 50%;
        color: rgb(255, 255, 255);
        top:0;
        width: 100%;
        height:100%;
        left: 0;
        outline: none;
        box-shadow:0 2px 4px rgb(160, 152, 152) inset;
    }
    .mint-main-button{
        border:0;
        background-color: #726565d8 !important;
        box-shadow: 0 0 2px rgb(2, 0, 0) inset;
    }
</style>
<style scoped> 
.mint-header{
    background: transparent;
}
/* friendHeader */
.friendHeader{
    height:200px;
}
/* friendImg */
.friendImg{
    height:200px;
    overflow: hidden;
    width:98%;
    border:2px solid rgba(255, 255, 255, 0.26);
    margin: 0 auto;
    border-radius: 10px;
    padding:6px;
    background: url("http://127.0.0.1:3000/bg13.jpg") center no-repeat;
    background-size: 100%;
}
.friendImg img{
    width: 100%;
    border-radius: 10px;
}
/* uname */
.uname{
    height: 100px;
    /* position: absolute; */
    top: 100px;
}
/* userImg */
.userImg{
    top:100px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    position: absolute;
    right:10px;
    border-radius:20px;
    display: none;
}
.userImg img{
    padding: 10px;
    height:100px;
    width: 100px;
    border-radius:20px;
    overflow: hidden;
}
.userUname{
    position:absolute; 
    top:160px;
    right:10px;
    margin: 10px;
    color: #fff;
    font-size:20px;
}
    /*  */
    /* cardAll */
    .cardAll{
        width:90%;
        margin: 0 auto;
        margin-bottom: 10px;
        margin-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        padding-left:4px;
        padding-right:4px;
        padding-top: 0;
        background: rgba(119, 119, 119, 0.8);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.322);
        border-radius: 10px;
        transition-delay: .5s;
    }
    .cardAll:active{
         background: rgba(255, 255, 255, 0.45);
    }
    /* 标题cardHeader */
    .cardHeader{
        text-align: center;
        height: 20px;
        font-size: 10px;
        display: block;
        color: rgba(255, 255, 255, 0.4);
    }
    .cardHeader::after{
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
    /* 内容cardBody */
    .cardBody{
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
    /* .cardBody>span{
        width:100px;
    } */
    #Friends{
        
    }
    .btnZ{
        background-color:transparent;
        bottom:13%;
        position: fixed;
        left:2%;
    }
    .friendFoot{
        width: 100%;
        text-align: center;
        height: 40px;
        bottom: 50px;
        position: fixed;
        line-height:50px;
        background:rgba(0, 0, 0, 0.5);
        font-size: 14px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        animation:foot 4s linear 1s;
        transform:translateY(50px)
    }
    @keyframes foot {
        0%{transform: translateY(50px)}
        20%{transform: translateY(50px)}
        40%{transform: translateY(0px)}
        80%{transform: translateY(0px)}
        90%{transform: translateY(50px)}
        100%{transform: translateY(50px)}
    }
    .time{
        font-size: 10px;
        position: relative;
        text-align: center;
        bottom: -6px;
        display: block;
        height:16px;
        line-height: 16px;
        background:rgba(95, 133, 143, 0.5);
        border-radius: 10px;
        width:90%;
        color: #fff;
        margin: 0 auto;
        box-shadow: 0 0px 4px rgb(247, 247, 247) inset;
    }
    .pinglun{
        width: 70%;
        margin: 0 auto;
        border-radius: 10px;
        position: relative;
        margin-top:16px;
        transition: .5s;
        overflow: hidden;
    }
    .xianshi{
        height:50px;
    }
    .yincang{
        height: 0;
    }
    .whiteU{
        color: #fff;
    }
    .blackU{
        color: #000;
    }
    #zans{
        /* 修改样式2019-4-16 20:14:49 */
        display: none;
       position: fixed;
       min-width:20%;
       height:30px;
       background: rgba(0, 0, 0, 0.315);
       top:150px;
       right:5%;
       z-index: 100;
       border-radius: 10px;       
       text-align: center;
       box-shadow: 0 0 5px black;
       overflow: hidden;
       transition:1s;
       animation:nav 1s linear;
    }   
    @keyframes nav {
        from{transform: translate(100%);}
        to{transform: translate(10%);}
    }
    #zans p{
        color: rgb(255, 255, 255);
    }
    .open{
        transition: .5s;
        transform: translate(10%);
        /* width: 100%; */
    }.close{
        transition: .5s;
        /* width: 100%; */
        transform: translate(-100%);
    }
    .neir{
        width: 100%;
        height:100%;
        position:absolute;
        bottom: 0;
        background: rgba(255, 255, 255, 0.541);
        border-radius: 10px;
        
    }
    .blue,.red{
        border-radius: 10px;
    }
    .red{
        background: rgb(153, 155, 155);
        box-shadow: 0 0 4px white;
    }
    .blue{
        background: #fff;
        background:url("http://127.0.0.1:3000/bg17.jpg");
        box-shadow: 0 0 2px rgba(125, 126, 126, 0.534);
    }
</style>
