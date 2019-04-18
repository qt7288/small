// 发表
// 2019-4-15 09:14:23
<template>
    <div id="Tofriend">
            <mt-header fixed title="">
             <router-link to="Friends" slot="left">
            <span class="mui-icon mui-icon-arrowleft"></span>
            </router-link>
            </mt-header>
        <div id="sayTo">
            <div class="sayToheader">
                <textarea type="text" placeholder="这一刻的想法……" v-model="sayTothing" maxlength="200"></textarea>
                <!-- <input type="file" :value=image @click="btnFile"> -->
                <!-- <div id="image-f">
                    <img :src=imagef alt="">
                </div> -->
                <input type="button" @click="btnSayto" :value=btnValue>
            </div>

        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            btnValue:"biu~",
            sayTothing:"",
            image:"",
            imagef:"http://127.0.0.1:3000/02.jpg"
        }
    },methods:{
        Toast(msg){
              Toast({
                message:msg,
                position:"bottom",
                duration:1000
            })
        },
        btnSayto(){
            var id=this.$store.state.uid;
            var uname=this.$store.state.uname;
            var sayto=""+this.sayTothing;
            if(sayto==""){
                
            }else{
                console.log(sayto);
            var postData=this.qs.stringify({uname,id,sayto});
            var url="http://127.0.0.1:3000/sayThings";
            this.axios.post(url,postData).then(result=>{
            if(result.data.code==1){
                console.log(result);
                this.Toast(uname+"发送成功"); 
                this.sayTothing="";
                return;  
                }
            })
        }
        },
    }
}
</script>
<style scoped>
#image-f{
    height:100px;
    border:1px solid white;
    overflow: hidden;
}
.sayToheader textarea::placeholder{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.411);
}

.sayToheader textarea{
    font-size: 14px;
    min-height: 200px;
    width: 96%;
    border-radius: 10px;
    display: block;
    margin: 0 auto 10px;
}

.sayToheader input{
    width:95%;
    margin: 0 auto;
    display: block;
    line-height:30px;
    border:0;
    color: #fff;
    outline: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.377);
    box-shadow: 0 0 5px rgb(255, 255, 255) inset;
}

.mint-header{
    background:transparent;
}

</style>
