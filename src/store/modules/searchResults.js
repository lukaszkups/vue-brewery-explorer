import axios from 'axios'

const state = {
  results: [],
  nameFilter: '',
  stateFilter: '',
  isLoading: false,
  stateList: []
}

const actions = {
  // payload: []
  updateResults ({ commit }, payload) {
    commit('updateResults', payload)
  },
  // payload: {filter: 'name/state', value: ''}
  updateFilter ({ commit }, payload) {
    commit('updateFilter', payload)
  },
  // payload: ''
  queryBreweryApi (context, payload) {
    let url = 'https://api.openbrewerydb.org/breweries?sort=name&per_page=50'
    if (payload) {
      url += `&by_name=${payload}`
      return axios.get(url).then(resp => Promise.resolve(resp)).catch(err => Promise.reject(new Error(err)))
    } else {
      return Promise.resolve({ data: [] })
    }
  },
  // payload: true/false
  updateLoading ({ commit }, payload) {
    commit('updateLoading', payload)
  },
  // payload: []
  updateStateList ({ commit }, payload) {
    let stateList = []
    if (payload && Array.isArray(payload)) {
      payload.map(item => {
        if (item.state && !stateList.find(obj => obj.value === item.state)) {
          stateList.push({
            label: item.state,
            value: item.state
          })
        }
      })
    }
    commit('updateStateList', stateList)
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
  },
  updateLoading (state, payload) {
    state.isLoading = payload
  },
  updateStateList (state, payload) {
    state.stateList = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
