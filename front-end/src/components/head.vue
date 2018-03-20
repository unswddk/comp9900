<template>
<div class="header-container">
  <span class="logo"><b><strong>
{{ massage }}</strong></b>
  </span>
<icon class="icon-login"  name="user-plus"></icon>
</div>
</template>
<script>
import "vue-awesome/icons";
export default {
  name: "Myheader",
  data() {
    return {
      massage: "FLmansters",
      value1:''
    };
  }
};
</script>

<style>
.header-container {
  background: #fafafa;
  height: 105px;
  /* border-bottom:  1px rgb(231, 230, 228); */
}
.logo {
  float: left;
  width: 80px;
  margin-top: 10px;
  margin-left: 40px;
  height: 45px;
  font-size: 30px;
  font-family: cursive;
  color: rgb(145, 11, 138);
}
.icon-login {
  margin-top: 10px;
  float: right;
  height: 45px;
  width: 24px;
  margin-right: 40px;
  color: rgb(145, 11, 138);
}
</style>
