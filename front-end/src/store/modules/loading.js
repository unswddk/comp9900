const state = {
    loadingList: []
  }
  
  const mutations = {
    PUSH_LOADING (state, playload) {
      state.loadingList.push({text: playload || 'Loading...'})
    },
    SHIFT_LOADING (state) {
      state.loadingList.shift()
    }
  }
  const getters = {
    isLoading (state) {
      return state.loadingList.length > 0
    },
    loadingText (state) {
      return state.loadingList.length > 0 ? state.loadingList[0].text : null
    }
  }
  const actions = {
    openLoading (contaxt, playload) {
      contaxt.commit('PUSH_LOADING', playload)
    },
    closeLoading (contaxt) {
      contaxt.commit('SHIFT_LOADING')
    }
  }
  module.exports = {
    state,
    mutations,
    getters,
    actions
  }
