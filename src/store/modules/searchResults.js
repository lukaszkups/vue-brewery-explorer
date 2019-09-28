import axios from 'axios'

const state = {
  results: [],
  nameFilter: '',
  stateFilter: '',
  isLoading: false,
  stateList: [],
  firstSearchRun: true
}

const actions = {
  // payload: {propName: '', newVal: ''}
  updateProp ({ commit }, payload) {
    commit('updateProp', payload)
  },
  // payload: []
  updateResults ({ commit }, payload) {
    commit('updateResults', payload)
  },
  // payload: {filter: 'name/state', value: ''}
  updateFilter ({ commit }, payload) {
    commit('updateFilter', payload)
  },
  // payload: {name: '', state: ''}
  queryBreweryApi (context, payload) {
    let url = 'https://api.openbrewerydb.org/breweries?sort=name&per_page=50'
    if (payload && (payload.name || payload.state)) {
      if (payload.name) {
        url += `&by_name=${payload.name}`
      }
      if (payload.state) {
        url += `&by_state=${payload.state}`
      }
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
  updateProp (state, payload) {
    state[payload.propName] = payload.newVal
  },
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

const getters = {
  getTotalResultsCount (state) {
    return state.results && Array.isArray(state.results) ? state.results.length : 0
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
