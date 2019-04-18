<template>
    <div id="Aboutme">
        <mt-header fixed title="">
          <router-link to="login" slot="left">
              <span class="mui-icon mui-icon-arrowleft"></span>
          </router-link>
          </mt-header>
            <div class="abooutMe" v-for="(item,i) of myList" :key="i">
                <div class="header"><p>{{item.header}}</p></div>
                <div class="body"><p>{{item.body}}</p></div>
                <div class="foot" @click="btnFoot(item.foot)"><p>{{item.foot}}</p></div>
            </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            myList:[{header:"关于",body:"",foot:""}]
        }
    },methods:{
        show(){
            var url="http://127.0.0.1:3000/selectAbout"
            this.axios.get(url).then(result=>{
                if(result.data.code==1){
                    this.myList=result.data.data
                }
            })
        },btnFoot(ss){
            Toast({
                message:ss,
                position:"center",
                duration:1000
            })
        }
    
    },created(){
        this.show()
    }
}
</script>
<style scoped>
    p,span{
        color: #fff;
    }
    .header,.body,.foot{
        text-align: center;
    }
    .header{
        height:100px;
    }
    .body{
        height:300px;
    }
    .foot{
        position: fixed;
        bottom:10%;
        width: 100%;
    }
    .foot::after{
        content: "";
        display: block;
        height: 1px;
        width: 20%;
        background: rgb(255, 255, 255);
        position: relative;
        margin: 0 auto;
    }
    .mint-header{
        background:transparent;
    }
    .abooutMe{
        height: 100%;
    }
</style>
