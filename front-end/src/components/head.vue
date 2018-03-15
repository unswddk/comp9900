<template>
<div class="header-container">
  <span class="logo">
{{ massage }}
  </span>
      <input class="search-bar" placeholder="Search"/>
<icon class="icon-login"  name="user-plus"></icon>
</div>
</template>
<script>
import 'vue-awesome/icons'
export default {
  name: 'Myheader',
  data () {
    return {
      massage: 'FLmansters'
    }
  }
}
</script>

<style>
.header-container{
    margin: -8px;
    background: rgb(231, 230, 228);
    height: 45px;
}
.logo{
    float: left;
    width: 80px;
    margin-left: 40px;
    height: 45px;
    font-size: 30px;
    font-family: cursive;
    color: rgb(145, 11, 138);
}
.icon-login{
    float: right;
    height: 45px;
    width: 24px;
    margin-right: 40px;
    color: rgb(145, 11, 138);
}
.search-bar{
    /* border-color: rgb(145, 11, 138); */
    border: solid 1px  rgb(145, 11, 138);
    border-radius: 20px;
    background: rgb(231, 230, 228);
    margin-top:13px;
    height: 20px;
    width: 160px;
    margin-left:9%;
    padding-left: 10px;
}
</style>
