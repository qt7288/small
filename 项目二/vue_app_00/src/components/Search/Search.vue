// 搜索好友
// 2019-4-15 09:16:02
<template>
   <div class="Search">
    <mt-header fixed title="搜一搜">
    <router-link to="Tabke" slot="left">
        <span class="mui-icon mui-icon-arrowleft"></span>
    </router-link>
    </mt-header>
       <div class="inputSearch">
           <input type="text" placeholder="search……" v-model="a" @focus="isFocus" autofocus="autofocus">
            <input type="button" class="ist" @click="btnReset()" v-show="isShow" value="×"> 
       </div>
       <div class="btnSearch">
           <input type="button" @click="btn()" value="I D 查 询" class="btnSearch-1"> 
       </div>
       <div id="SearchCard" v-show="isT">
           <div class="SearchCards">
               <div class="SearchCards-header">
                   <p style="color:#fff">friends:{{uname}}</p>
                   
                   <span id="insert" v-show="istt" @click="btnInsert" class="mui-icon mui-icon-plusempty"></span>
               </div>               
           </div>
       </div>
   </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
            a:"",
            uname:"",
            isShow:false,
            isT:false,
            istt:false
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
        isBlur(){
              var url = "http://127.0.0.1:3000/selectUid?&id="+this.$store.state.uid+"&friendid="+this.a+"&uname="+this.a;
            this.axios.get(url).then(result=>{
                console.log(result);
                if(this.a==this.$store.state.uid){
                    this.Toast("自己");
                       this.a="";
                       this.isT=false;
                       this.istt=false;
                       return;
                }else 
                if(result.data.code==2){
                    this.Toast("重复添加");
                    this.isT=true;
                    this.a=""
                    // this.uname=result.data.data[0].uname;
                    this.istt=true;
                    return;
                }else
                if(result.data.code==1){
                    this.Toast("成功查询")
                    this.uname=result.data.data[0].uname;
                    this.isT=true;
                    this.istt=true;
                    return;
                }else if(result.data.code==-1){
                       this.Toast("搜索id有误")
                       return;
                }    
            })    
        },
        btnReset(){
            this.a="",
            this.isShow=false
        },btn(){
            this.isBlur();
        
        },btnInsert(){
            var url = "http://127.0.0.1:3000/insertUname?uname="+this.$store.state.uname+"&id="+this.$store.state.uid+"&friendid="+this.a+"&frienduname="+this.uname;
            this.axios.get(url).then(result=>{
                console.log(result);
                Toast("添加成功");
            })
        },isFocus(){
            console.log(0);
            this.isShow=true;          
        }
    }
}
</script>
<style scoped>

    .Search{
        width: 100%;
        
    }
    .btnSearch-1{
        width:100%;
        display: block;
    }
    #SearchCard{
        width: 100%;
        position: relative;
        top:30px;
    }
    .SearchCards{
        margin-top:2px;
        position: relative;
        display: inline-block;
        width:100%;
        height: 100%;
        border-radius:4px;
    }
    .SearchCards-header{
        height: 2rem;
        text-align:center;
        padding-left: 10px;
        color: rgb(255, 255, 255);
        line-height:2rem;
        font-size: 10px;
        border-bottom: 1px solid black;
    }
    /* */
    .ist{
        width: 100%;
        text-align: right;
        font-weight: bold;
        height: 2rem;
    }
    /* btnSearch-1 */
    .btnSearch-1{
        text-align: center;
    }
    .inputSearch input{
        background:transparent;
        border:0;
        color: #fff;
        font-size: 10px;
        text-align: center;
        border-bottom: 1px solid rgb(150, 150, 150);
        border-radius: 0;
        outline: none;
    }
    .inputSearch input:nth-child(2){
        text-align: right;
    }
    .btnSearch input{
        background: rgba(255, 255, 255, 0.267);
        height:30px;
        border:0;
        width: 90%;
        top: 20px;
        box-shadow: 0 0 5px white inset;
        margin: 0 auto;
        color: #fff;
        border-radius:10px;
        
    }
    /* insert */
    #insert{
        position:relative;
        text-align: right;
        right: 0;
        background: transparent;
        color: rgb(255, 255, 255);
        display:block;
    }
    .mint-header{
        background:transparent;
    }
</style>
