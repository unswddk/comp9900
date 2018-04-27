import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
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
  actions,
  modules:{
      loading
  }
})
// export default store;
