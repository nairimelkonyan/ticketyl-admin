<template lang="pug">
  input(type='text', :placeholder='placeholder', v-model='text', :value='inputValue', @input="$emit('input', $event.target.value)", @keypress="$emit('keypress', $event)", v-bind:class="{ typing : (text != '')}")
</template>

<script>
  export default {
    props: [
      'placeholder',
      'value'
    ],
    data () {
      return {
        inputValue: '',
        text: ''
      }
    }
  }
</script>

<style lang="less" scoped>
input[type="text"]{
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
</style>
