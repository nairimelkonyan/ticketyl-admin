<template lang="pug">
  input(
    :name='name'
    type='text'
    ref='input'
    :placeholder='placeholder'
    @focus="$emit('focus')"
    @input="$emit('input', $event.target.value)"
    @keypress="$emit('keypress', $event)"
    :class="{ typing : (text != ''), 'wrongInput': hasError }"
    :value='value')
</template>

<script>
  export default {
    props: [
      'placeholder',
      'value',
      'hasError',
      'name'
    ],
    data () {
      return {
        text: '',
        touched: false
      }
    },
    methods: {
      focus () {
        this.$refs.input.focus()
      }
    },
    watch: {
      value (newVal) {
        this.text = newVal
      }
    }
  }
</script>

<style lang="less" scoped>
  input[type="text"], input[type="password"]{
    font-size: 18px;
    text-transform: uppercase;
    color: #9a9a9a;
    border-radius: 0;
    border: 1px solid #292929;
    width: 100%;
    height: 48px;
    padding: 12px 16px;
  }
  .typing{
    text-transform: none !important;
    color: #292929 !important;
  }
  .wrongInput{
  border: 3px solid #292929 !important;
  }
</style>
