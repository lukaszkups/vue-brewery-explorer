<template>
  <div class='header__search main-container'>
    <div class='row'>
      <div class='col'>
        <input
          type='text'
          class='input'
          placeholder='Filter by name'
          name='byNameFilter'
          v-model='byNameFilter'
          @keypress='valdidateNameFilter'
        >
      </div>
      <div class='col'>
        <ui-select
          v-model='byStateFilter'
          :options='stateFilterList'
          placeholder='Filter by state'
          name='byStateFilter'
          valueType='string'
          :emptyPossible='true'
          :disabled='stateFilterList.length === 0'
        ></ui-select>
      </div>
      <div class='col'>
        <div class='row'>
          <div class='col'>
            <button
              class='button button--search'
              @click='searchAndFilter'
              :disabled='!byNameFilter || !byNameFilter.length'
            >Search</button>
          </div>
          <div class='col'>
            <button
              v-if='!firstSearchRun'
              class='button button--reset'
              @click='resetSearch'
            >Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UiSelect from '@/components/Generic/Select'

export default {
  name: 'HeaderSearch',
  components: {
    UiSelect
  },
  computed: {
    byNameFilter: {
      get () {
        return this.$store.state.searchResults.nameFilter
      },
      set (newVal) {
        this.$store.dispatch('searchResults/updateFilter', { filter: 'name', value: newVal })
      }
    },
    byStateFilter: {
      get () {
        return this.$store.state.searchResults.stateFilter
      },
      set (newVal) {
        this.$store.dispatch('searchResults/updateFilter', { filter: 'state', value: newVal })
      }
    },
    isLoading: {
      get () {
        return this.$store.state.searchResults.isLoading
      },
      set (newVal) {
        this.$store.dispatch('searchResults/updateLoading', newVal)
      }
    },
    searchResults: {
      get () {
        return this.$store.state.searchResults.results
      },
      set (newVal) {
        this.$store.dispatch('searchResults/updateResults', newVal)
      }
    },
    firstSearchRun: {
      get () {
        return this.$store.state.searchResults.firstSearchRun
      },
      set (newVal) {
        this.$store.dispatch('searchResults/updateProp', { propName: 'firstSearchRun', newVal: newVal })
      }
    },
    stateFilterList: {
      get () {
        return this.$store.state.searchResults.stateList
      },
      set (newVal) {
        this.$store.dispatch('searchResults/updateStateList', newVal)
      }
    }
  },
  methods: {
    searchAndFilter () {
      this.isLoading = true
      this.firstSearchRun = false
      this.$store.dispatch('searchResults/queryBreweryApi', { name: this.byNameFilter }).then((resp) => {
        // wrapped in setTimeout just to simulate server lag
        // setTimeout(() => {
        //   this.searchResults = resp.data
        //   this.$store.dispatch('searchResults/updateStateList', resp.data)
        //   this.isLoading = false
        // }, 2000)
        this.searchResults = resp.data
        this.$store.dispatch('searchResults/updateStateList', resp.data)
        this.isLoading = false
      }).catch((err) => {
        this.isLoading = false
        throw new Error(err)
      })
    },
    valdidateNameFilter (e) {
      const value = String.fromCharCode(e.which)
      const pattern = new RegExp(/[a-zÀÁÂÃÄÅĄÆÇĆÈĘÉÊËÌÍÎÏŁŃÓŚŻŹàąáâãäåæçćęèéêëìíîïłńóśżźÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ ]/i)
      if (!pattern.test(value)) {
        e.preventDefault()
      }
    },
    resetSearch () {
      this.firstSearchRun = true
      this.searchResults = []
      this.stateFilterList = []
      this.byNameFilter = null
      this.byStateFilter = null
    }
  }
}
</script>

<style lang='sass'>
.header__search
  box-sizing: border-box
  padding: 15px 0

  .input
    border: none
    background: $yellow--bright
    color: $black
    padding: 5px 10px
    box-sizing: border-box
    border-radius: 5px

  .button.button--search
    background: $green
    color: $white

    &:hover
      background: $green--darker !important
</style>
