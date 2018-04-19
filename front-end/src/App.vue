<template>
  <div id="app">
    <Myhead/>
    <router-view/>
    <Myfooter />
  </div>
</template>

<script>

import VueResource from 'vue-resource';
import Vuex from 'vuex'
import Vue from "vue";
import Myhead from './components/head'
import stockcard from './components/stockcard'
import Myfooter from './components/footer'
// import stockInProf from './components/stockInProf'
Vue.use(Vuex)
Vue.use(VueResource);
export default {
  name: 'App',
  components: {
    Myhead,
    stockcard,
    Myfooter,
    // stockInProf
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* margin-top: 10px; */
}
</style>
