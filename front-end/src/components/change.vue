<template>
<div class="message">
    <span v-bind:class="classObject">{{ message }}</span>
</div>
</template>
<script>
export default {
  name: "change",
  props:['message'],
  data() {
    return {
      value1: ""
    };
  },
  computed:{
 classObject:function(){
    return {
      active: this.message>=0.00,
      redCol: this.message<0.00
    }
}
  }
};
</script>
<style >
.active{
    color: green;
}
.redCol{
    color: red;
}
.message{
display: inline-block;
}
</style>