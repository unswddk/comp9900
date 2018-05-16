<template>
  <div class="polaroid">
        <div class="title-container">{{ message.headline }}</div>
  <img src="../../static/image/2.png" alt="oo" style="width:100%">
        <div class="body-container">  
          <a :href="message.url" target="_blank">{{message.summary}}</a>
          </div>
        <!-- <label style="float:right">{{ message.datetime }}</label> -->
  </div>
</template>
<script>
    export default {
        name: "newsCard",
        props:["message"]
    }
</script>
<style scoped>
.polaroid {
  
  width: 300px;
  background: #000;
  display: inline-block;
  margin-right: 60px;
  /* margin-right: 10px; */
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 25px;
}
.title-container{
  text-align:justify;
  padding: 10px 20px;
  height: 80px;
}
.body-container {
  text-align: center;
  padding: 10px 20px;
  height: 150px;
}


</style>
