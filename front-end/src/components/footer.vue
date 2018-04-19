<template>
<div class="footer" >      <p style="float:right"> © 2018 Copyright 
            <a class="grey-text text-lighten-4 right" href="#!">COMP9900--four little monsters</a></p>
</div>
</template>
<script>
// import "vue-awesome/icons";
export default {
  name: "Myfooter",
  data() {
    return {
      massage: "FLmansters",
      value1: ""
    };
  }
};
</script>

<style >
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color:  #fafafa;
  color: silver;
  text-align: start;
}

</style>