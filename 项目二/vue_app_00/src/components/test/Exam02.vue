<template>
  <div>
    <h1>Exam02</h1>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    created() {
      console.log(this.$route.query.nid);
    },
  }
</script>
<style>
</style>