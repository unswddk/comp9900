/*通常设计store对象都包含4个属性：state,getters,actions,mutations。
如何理解这4个属性呢，从自己的话来理解：

state (类似存储全局变量的数据)
getters (提供用来获取state数据的方法)
actions (提供跟后台接口打交道的方法，并调用mutations提供的方法)
mutations (提供存储设置state数据的方法)*/


//1. 组件Vue Component通过dispatch来调用actions提供的方法
// 2.而actions除了可以和api打交道外，还可以通过commit来调mutations提供的方法
//3. 最后mutaions将数据保存到state中
//4. 当然，Vue Components还以通过getters提供的方法获取state中的数据
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
checked:false,
  user: {}
}
const mutations = {
  isLogin(state, user) {
    state.checked=true;
    state.user = user
  },
  isLogout(state) {
    state.user = null
  },
}
const actions = {
  clearUser: ({
    commit
  }) => {
    commit('isLogout')
  },
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
// export default store;
