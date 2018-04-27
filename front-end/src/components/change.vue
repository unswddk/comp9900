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
      active: !this.message.includes("-"),
      redCol: this.message.includes("-")
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
.active::before{
  content: "\f0d8";
  display: inline-block;
  font-family: FontAwesome;
}
.redCol::before{
  content: "\f0d7";
  display: inline-block;
  font-family: FontAwesome;
  /* position: absolute; */
  /* left: 2.9em; */
  }
.message{
display: inline-block;
}
</style>