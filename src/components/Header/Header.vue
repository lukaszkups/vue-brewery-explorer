<template>
  <div class='header'>
    <div class='header__logo-wrapper'>
      <i class='fas fa-beer header__logo'></i>
      <strong class='roboto uppercase'>Brewery Explorer</strong>
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
.header
  display: block
  padding: 15px
  position: fixed
  height: $headerHeight
  top: 0
  left: 0
  right: 0
  background: $yellow
  box-sizing: border-box
  z-index: 3
  box-shadow: $boxShadow

  &__logo
    margin-right: 10px

    &-wrapper
      color: $black
      font-size: $fontSize + 8
</style>
