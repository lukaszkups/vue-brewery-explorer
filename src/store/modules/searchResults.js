const state = {
  results: [],
  nameFilter: '',
  stateFilter: ''
}

const actions = {
  updateResults ({ commit }, payload) {
    commit('updateResults', payload)
  },
  updateFilter ({ commit }, payload) {
    commit('updateFilter', payload)
  }
}

const mutations = {
  updateResults (state, payload) {
    state.results = payload
  },
  updateFilter (state, payload) {
    const filter = `${payload.filter}Filter`
    if (state.hasOwnProperty(filter)) {
      state[filter] = payload.value
    } else {
      throw new Error(`There is no such filter as ${filter}`)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
