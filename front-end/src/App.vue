<template>
  <div id="app">
    <Myhead/><hr>
    <router-view/>
    <Myfooter />
  </div>
</template>

<script>
import 'vue-awesome/icons'
import VueResource from 'vue-resource';
import Vue from "vue";
import Myhead from './components/head'
import stockcard from './components/stockcard'
import Myfooter from './components/footer'
Vue.use(VueResource);
export default {
  name: 'App',
  components: {
    Myhead,
    stockcard,
    Myfooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* margin-top: 10px; */
}
</style>
