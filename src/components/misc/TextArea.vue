<template lang='pug'>
  textarea(
    rows='3'
    cols='50'
    type='text'
    v-model='value'
    :placeholder='placeholder'
    @input="$emit('input', $event.target.value)"
    @keypress="$emit('keypress', $event)"
    v-bind:class="{ typing : (text != '')}")
</template>

<script>
  export default {
    props: [
      'placeholder', 'value'
    ],
    data () {
      return {
        text: ''
      }
    }
  }
</script>

<style lang='less' scoped>
  textarea{
    font-size: 18px;
    width: 100%;
    margin-bottom: 24px;
    box-sizing: border-box;
    text-transform: uppercase;
    padding: 10px;
    border-radius: 0;
    border: 1px solid #292929;
    outline: none;
  }
  .typing{
    text-transform: none !important;
    color: #292929 !important;
  }
</style>
