import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'

Vue.config.productionTip = false

// Cypress automatically sets window.Cypress by default, expose vuex store to Cypress
if (window.Cypress) {
  window.__store__ = store
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
