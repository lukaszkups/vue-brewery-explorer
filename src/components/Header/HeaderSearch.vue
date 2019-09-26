<template>
  <div class='header__search'>
    <div class='row'>
      <div class='col'>
        <input
          type='text'
          class='input'
          placeholder='Filter by name'
          v-model='byNameFilter'
          @keypress='valdidateNameFilter'
        >
      </div>
      <div class='col'>
        <!-- <input type='text' class='input' placeholder='Filter by state' v-model='byStateFilter'> -->
        <select v-model='byStateFilter'>
          <option
            v-for='(state, index) in stateFilterList'
            :key='index'
            :value='state.value'
          >{{ state.label }}</option>
        </select>
      </div>
      <div class='col'>
        <div class='row'>
          <div class='col'>
            <button class='button' @click='searchAndFilter'>Search</button>
          </div>
          <div class='col'>
            <button class='button'>Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderSearch',
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
        return this.$store.state.isLoading
      },
      set (newVal) {
        this.$store.dispatch('searchResults/updateLoading', newVal)
      }
    },
    searchResults: {
      get () {
        return this.$store.state.results
      },
      set (newVal) {
        this.$store.dispatch('searchResults/updateResults', newVal)
      }
    },
    stateFilterList () {
      return this.$store.state.searchResults.stateList
    }
  },
  methods: {
    searchAndFilter () {
      this.isLoading = true
      this.$store.dispatch('searchResults/queryBreweryApi', this.byNameFilter).then((resp) => {
        console.log(resp.data)
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
    }
  }
}
</script>

<style lang='sass'>
.header__search
  box-sizing: border-box
  padding: 15px

  .input
    border: none
    background: $yellow--bright
    color: $black
    padding: 5px 10px
    box-sizing: border-box
    border-radius: 5px
</style>
