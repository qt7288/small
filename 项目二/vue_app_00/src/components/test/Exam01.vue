<template>
  <div>
    <h1>Exam01</h1>
    <h3>使用标签方式跳转Exam02组件</h3>
    <router-link to="/Exam02">方式一标签</router-link>
    <h3>使用编程方式跳转Exam02组件</h3>
    <img src="http://127.0.0.1:3000/img/1.png" 
    @click="jump"/>
    <!-- 14:38-->
    <h3>使用编程方式1跳转Home组件</h3>
    <router-link to="/Home">.....</router-link>
    <h3>使用编程方式2跳转NewsList组件</h3>
    <img src="http://127.0.0.1:3000/img/1.png" 
    @click="jumpNewsList"/>
    <!--发送数据Exam01-->
    <h1>发送数据Exam01</h1>
    <router-link to="/Exam02?nid=9">发送数据一</router-link>
    <img src="http://127.0.0.1:3000/img/1.png" 
    @click="jumpData"/>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },   
    methods:{
      jumpData(){
        this.$router.push("/Exam02?nid=10");
      },
      jumpNewsList(){
        this.$router.push("/NewsList");
      },
      jump(){
        this.$router.push("/Exam02");
      }
    }
  }
</script>
<style>
</style>