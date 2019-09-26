import Vue from 'vue'
import Vuex from 'vuex'
import searchResults from '@/store/modules/searchResults'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    searchResults
  }
})
