<template>
  <div>
    <mt-header title="学子商城"></mt-header>
    <h1>用户列表组件</h1>
    <mt-button>操作按钮</mt-button>
    <!-- 循环数组将数组中内容显示-->
    <!-- v-for="item in list"-->
    <ul>
      <li v-for="item of list">
         {{item.id}}:{{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        list:[
          {id:1,name:"tom"},
          {id:2,name:"jerry"},
          {id:3,name:"james"}]
      }
    }    
  }//11:17
</script>
<style>
</style>