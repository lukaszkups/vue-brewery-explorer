<template>
  <div class='footer'>
    <div class='row'>
      <div class='col'>
        <div
          v-if='totalResults && totalResults > 0'
          class='footer__total-counter'
        >
          Number of results: {{ totalResults }}
        </div>
      </div>
      <div class='col'>
        <div>Brewery explorer by <a href='https://lukaszkups.net' target='_blank'>@lukaszkups</a></div>
      </div>
      <div class='col'>
        <div
          v-if='visibleScrollbar'
          class='back-to-top-button'
          title='Back to top'
          @click='backToTop'
        >
          <i class='fas fa-arrow-up'></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiFooter',
  data () {
    return {
      visibleScrollbar: this.checkIfScrollbarVisible()
    }
  },
  computed: {
    totalResults () {
      return this.$store.getters['searchResults/getTotalResultsCount']
    }
  },
  methods: {
    checkIfScrollbarVisible () {
      return document.body.scrollHeight > window.innerHeight
    },
    backToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  watch: {
    totalResults () {
      this.visibleScrollbar = this.checkIfScrollbarVisible()
    }
  }
}
</script>

<style lang='sass'>
.footer
  background: $yellow
  box-shadow: $boxShadow--top
  font-family: $roboto
  font-size: $fontSize + 4
  margin: 0
  color: $yellow--darker
  padding: 0 0 0 15px
  line-height: $footerHeight
  max-height: $footerHeight

  a
    color: $white

  .back-to-top-button
    width: $footerHeight
    background: $yellow
    display: block
    text-align: center
    color: $white
    float: right

    &:hover
      cursor: pointer
      background: $yellow--darker
</style>
