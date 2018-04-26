// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store/store.js';
Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to,from,next) => {
  // 这里的meta就是我们刚刚在路由里面配置的meta
  if(to.meta.requireAuth){
      // 下面这个判断是自行实现到底是否有没有登录
      if (store.getters.isLogin){
      // 登录就继续
          next();
      }else {
      // 没有登录跳转到登录页面，登录成功之后再返回到之前请求的页面
          next({
              path : '/',
              query : {redirect : to.fullPath}
          })
      }
  }else {
  // 不需要登录的，可以继续访问
      next()
  }
});

// Vue.http.interceptors.push(function(request,next) {
//   console.log(this);
//   // request.method = 'POST';
//   let TOKEN=localStorage.getItem('token');
//   if (TOKEN) {
//     console.log(localStorage.token);
//     request.headers.set('TOKEN',TOKEN);
//   }
//   next((response) => {  
//     return response;  
//   });  
// }, function (err) {
//   console.log('===============');
//   console.log(err);
//   // return Promise.reject(err);
// });
