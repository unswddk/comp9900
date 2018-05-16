<template>
  <div class="polaroid">
<div class="img-container">
    <img src="../../static/image/4.png" alt="Norway" style="width:100%;height: auto">
</div>
    <div class="container">
    Metamask: {{ web3.isInjected }}      
       Network: {{ web3.networkId }}<br>
      Account: 
      {{ web3.coinbase }}<br>
      Balance {{web3.balance}}
    </div>
  </div>
</template>
<script>
export default {
 name: 'metamask',
 computed: {
   web3 () {
     return this.$store.state.web3
     }
   }
}
</script>
<style scoped>
.polaroid {
  width: 90%;
  height: 500px;
  background: #000;
  /* margin-right: 10px; */
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 25px;
}
.container {
  text-align: justify;
  padding: 10px 20px;
  overflow: hidden;
}
.img-container{
  width: 100%;
  height: 100px;
  overflow: hidden;
}
</style>
