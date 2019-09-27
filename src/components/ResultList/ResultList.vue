<template>
  <div class='result-list'>
    <loader v-if='isLoading'></loader>
  </div>
</template>

<script>
import Loader from '@/components/Generic/Loader'

export default {
  name: 'ResultList',
  components: {
    Loader
  },
  computed: {
    isLoading () {
      return this.$store.state.searchResults.isLoading
    }
  }
}
</script>

<style lang='sass'>

</style>
