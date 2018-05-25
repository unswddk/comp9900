// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import Loading from './components/loading.vue'
import 'iview/dist/styles/iview.css'
import VueMaterial from 'vue-material'
import store from './store/store.js';
import '../styles/my-styles.scss';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.use(iView);
Vue.component('Loading', Loading)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth){
      if (store.getters.isLogin){
          next();
      }else {
          next({
              path : '/',
              query : {redirect : to.fullPath}
          })
      }
  }else {
      next()
  }
});
