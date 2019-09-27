<template>
  <div :class='["ui-select", customClass]'>
    <label v-if='label'>{{ label }}</label>
    <select
      :placeholder='placeholder'
      v-model='localValue'
      @input='updateSelectValue'
      class='ui-select__input'
    >
      <option
        class='ui-select__option'
        v-for='(option, index) in localOptions'
        :key='`option-${option}-${index}`'
        :value='option.value'
      >{{ option.label }}</option>
    </select>
    <div class='ui-select-arrow'></div>
    <div
      v-if='localValue && emptyPossible === true'
      class='ui-select-clear'
      @click='clearInputValue'
    ></div>
  </div>
</template>
<script>
export default {
  name: 'UiSelect',
  props: {
    customClass: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      required: true,
      type: [Array, Function],
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number]
    },
    valueType: {
      type: String,
      default: 'number'
    },
    emptyPossible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localValue: null,
      localOptions: []
    }
  },
  created () {
    this.localValue = this.value
    this.localOptions = [...this.options]
  },
  methods: {
    updateSelectValue (option) {
      let newValue = option.target.value
      if (this.valueType === 'number') {
        newValue = Number(newValue)
      } else if (this.valueType === 'string') {
        newValue = String(newValue)
      }
      this.$emit('input', newValue)
    },
    clearInputValue () {
      this.$emit('input', undefined)
    }
  },
  watch: {
    options (newVal) {
      this.localOptions = [...newVal]
      if (!this.localOptions.find(obj => obj.value === this.localValue)) {
        this.localValue = null
      }
    }
  }
}
</script>
<style lang="sass">
.ui-select
  align-items: center
  display: flex
  margin: 0
  overflow-x: hidden
  padding: 0
  position: relative
  width: 100%

  label
    flex: 1
    padding-right: 10px

  select
    appearance: none
    -moz-appearance: none
    -webkit-appearance: none
    border: none
    background: $yellow--bright
    color: $black
    border-radius: 5px
    display: block
    flex: 3
    padding: 5px

  .ui-select-arrow
    display: inline-block
    width: 0
    height: 0
    border-style: solid
    border-width: 5px 5px 0 5px
    border-color: $black transparent transparent transparent
    position: absolute
    right: 10px

  .ui-select-clear
    display: none

  &:hover .ui-select-clear
    background: $yellow--bright
    border-radius: 8px
    cursor: pointer
    display: inline-block
    width: 16px
    height: 16px
    overflow: hidden
    position: absolute
    right: 10px

    &:before
      color: $black
      content: '\00d7'
      display: block
      font-size: 16px
      line-height: 17px
      width: 16px
      text-align: center

    &:hover,
    &:focus
      background: $yellow--bright

  option
    cursor: pointer
</style>
