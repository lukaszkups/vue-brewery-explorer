<template>
  <li class='result-list__entry'>
    <div class='row'>
      <div class='col'>
        <h3 class='result-list__entry-name'>{{ entry.name }}</h3>
        <p class='result-list__entry-address'>{{ address }}</p>
      </div>
      <div class='col'>
        <a
          v-if='entry.website_url'
          :href='entry.website_url'
          target='_blank'
          class='result-list__entry-link'
        >
          <i class='fas fa-globe-americas'></i>
          <span>{{ entry.website_url }}</span>
        </a>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ResultListEntry',
  props: {
    entry: {
      type: Object
    }
  },
  computed: {
    address () {
      if (this.entry.city && this.entry.state) {
        return `${this.entry.city}, ${this.entry.state}`
      } else {
        return this.entry.city || this.entry.state
      }
    }
  }
}
</script>

<style lang='sass'>
.result-list__entry
  background: $yellow--bright
  display: flex
  clear: both
  margin: 10px 0
  padding: 25px 20px
  border-radius: 2px
  font-family: $roboto
  box-shadow: $boxShadow
  transition: box-shadow 0.5s

  &:hover
    box-shadow: 0 0 0 rgba($black, 0)
    transition: box-shadow 0.5s

  &-name
    font-size: $fontSize + 5
    margin: 0
    padding: 0 0 10px 0

  &-address
    font-size: $fontSize

  &-link
    display: inline-block
    color: $yellow--darker
    text-decoration: none
    float: right
    transition: color 0.3s

    &:hover
      color: $black
      transition: color 0.3s

      span
        text-decoration: underline

    i, span
      display: inline-block

    i
      margin-right: 10px
</style>
