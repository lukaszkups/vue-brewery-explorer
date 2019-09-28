<template>
  <div class='result-list'>
    <ul
      v-if='results && results.length'
      class='result-list__list'
    >
      <result-list-entry
        v-for='entry in results'
        :key='entry.id'
        :entry='entry'
      ></result-list-entry>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ResultListEntry from '@/components/ResultList/ResultListEntry'

export default {
  name: 'ResultList',
  components: {
    ResultListEntry
  },
  computed: {
    ...mapState({
      results: (state) => state.searchResults.results
    })
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
</style>
