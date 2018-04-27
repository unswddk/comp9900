<template>
  <div id="loadingToast" v-show="show" >
    <Spin ></Spin>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: ['show']
  }
</script>
<style>
 /* .demo-spin-container{
    	display: inline-block;
        width: 200px;
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    } */
</style>
