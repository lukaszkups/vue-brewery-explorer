<template>
  <div class='result-list'>
    <ul
      v-if='filteredResults && filteredResults.length'
      class='result-list__list main-container'
    >
      <result-list-entry
        v-for='entry in filteredResults'
        :key='entry.id'
        :entry='entry'
      ></result-list-entry>
    </ul>
    <div v-else-if='!firstSearchRun' class='result-list__no-results'>No results</div>
  </div>
</template>

<script>
import ResultListEntry from '@/components/ResultList/ResultListEntry'

export default {
  name: 'ResultList',
  components: {
    ResultListEntry
  },
  computed: {
    filteredResults () {
      return this.$store.getters['searchResults/getFilteredResults']
    },
    firstSearchRun () {
      return this.$store.state.searchResults.firstSearchRun
    }
  }
}
</script>

<style lang='sass'>
.result-list
  display: block
  width: 100%
  box-sizing: border-box
  margin-top: $headerHeight
  padding: 20px 15px
  // interpolate with #{}
  min-height: calc(100vh - #{$headerHeight} - #{$footerHeight})

  &__list
    padding: 0
    margin: 0
    list-style-type: none
    display: block

  &__no-results
    font-family: $roboto
    text-align: center
    font-size: $fontSize
</style>
