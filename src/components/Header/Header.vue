<template>
  <div clas='header'>
    <div class='header__logo-wrapper'>
      <i class='fas fa-beer header__logo'></i>
      <span>Brewery Explorer</span>
    </div>
    <header-search></header-search>
  </div>
</template>

<script>
import HeaderSearch from './HeaderSearch.vue'

export default {
  name: 'UiHeader',
  components: {
    HeaderSearch
  }
}
</script>

<style lang='sass'>

</style>
