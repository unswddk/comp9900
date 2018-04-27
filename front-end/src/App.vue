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
   created() {
      try {
        document.body.removeChild(document.getElementById('appLoading'))
        setTimeout(function() {
          document.getElementById('app').style.display = 'block';
        }, 500)
      } catch (e) {

      }
    },
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
</style>
