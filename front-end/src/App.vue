<template>
  <div id="app">
    <Myhead />
    <router-view/>
    <Myfooter />
  </div>
</template>
<script>
import VueResource from 'vue-resource';
import Vuex from 'vuex'
import { mapGetters } from 'vuex'
import Vue from "vue";
import Myhead from './components/head'
import stockcard from './components/stockcard'
import VCharts from "v-charts";
import Myfooter from './components/footer'
import web3 from 'web3';
import LazyRender from 'vue-lazy-render'
import Trend from "vuetrend";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
Vue.use(LazyRender)
Vue.use(web3)
Vue.use(Trend);
Vue.use(VCharts);
// import stockInProf from './components/stockInProf'
Vue.use(Vuex)
Vue.use(VueResource);
export default {
  name: 'App',
  components: {
    Myhead,
    stockcard,
    Myfooter,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

@import "@material/button/mdc-button";
</style>
