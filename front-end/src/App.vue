<template>
  <div id="app">
    <Myhead/>
    <router-view/>
  </div>
</template>

<script>
import 'vue-awesome/icons'
import Myhead from './components/head'
import stockcard from './components/stockcard'
export default {
  name: 'App',
  components: {
    Myhead,
    stockcard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* margin-top: 10px; */
}
</style>
