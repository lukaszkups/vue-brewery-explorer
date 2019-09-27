<template>
  <div class='result-list'>
    <loader v-if='isLoading'></loader>
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
import Loader from '@/components/Generic/Loader'
import ResultListEntry from '@/components/ResultList/ResultListEntry'

export default {
  name: 'ResultList',
  components: {
    Loader,
    ResultListEntry
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.searchResults.isLoading,
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
  margin-top: $headerHeight + 20
  padding: 0 15px

  &__list
    padding: 0
    margin: 0
    list-style-type: none
    display: block
</style>
