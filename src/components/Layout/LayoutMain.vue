<template>
  <div clas='layout layout--main'>
    <ui-header></ui-header>
    <result-list></result-list>
    <ui-footer></ui-footer>
  </div>
</template>

<script>
import ResultList from '@/components/ResultList/ResultList'
import UiHeader from '@/components/Header/Header'
import UiFooter from '@/components/Footer/Footer'

export default {
  name: 'LayoutMain',
  components: {
    ResultList,
    UiHeader,
    UiFooter
  }
}
</script>

<style lang='sass'>

</style>
