<template lang="pug">
  .currency
    input(:name='name' type='text', :placeholder='placeholder', v-model='text', maxlength='24', 
      :value='inputValue', @input="$emit('input', $event.target.value)", 
      @keypress="$emit('keypress', $event)", v-bind:class="{ typing : (text != ''), 'wrongInput': hasError }")
    span .ticketyl.com
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
        inputValue: '',
        text: ''
      }
    }
  }
</script>

<style lang="less" scoped>
.currency{
  position: relative;
   input[type="text"], input[type="password"]{
    font-size: 18px;
    text-transform: uppercase;
    color: #9a9a9a;
    border: 1px solid #292929;
    border-radius: 0;
    width: 100%;
    height: 48px;
    padding: 12px 16px;
  }
  .typing{
    text-transform: none !important;
    color: #292929 !important;
  }
  span{
    font-size: 12px;
    text-transform: lowercase;
    color: #292929;
    position: absolute;
    right: 12px;
    top: 18px;
  }
  .wrongInput{
    border: 3px solid #292929 !important;
  }
}
</style>
