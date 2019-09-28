<template>
  <div class='layout layout--main'>
    <loader v-if='isLoading'></loader>
    <ui-header></ui-header>
    <result-list></result-list>
    <ui-footer></ui-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Generic/Loader'
import ResultList from '@/components/ResultList/ResultList'
import UiHeader from '@/components/Header/Header'
import UiFooter from '@/components/Footer/Footer'

export default {
  name: 'LayoutMain',
  components: {
    Loader,
    ResultList,
    UiHeader,
    UiFooter
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.searchResults.isLoading
    })
  }
}
</script>

<style lang='sass'>

</style>
