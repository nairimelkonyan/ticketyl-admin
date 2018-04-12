<template lang="pug">
  div
    input(type='password', :placeholder='placeholder', v-model='text', :value='inputValue', @input="$emit('input', $event.target.value)", @keypress="$emit('keypress', $event)", v-bind:class="{ typing : (text != '')}")
    router-link(@click='close', :to="{'name': 'Forgot'}") Forgot?
</template>

<script>
  export default {
    props: [
      'placeholder'
    ],
    data () {
      return {
        inputValue: '',
        text: ''
      }
    },
    methods: {
      close () {
        window.jQuery('#LogIn').modal('hide')
      }
    }
  }
</script>

<style lang="less" scoped>
  div{
    position: relative;
    input[type="text"], input[type="password"]{
      text-transform: uppercase;
      color: #9a9a9a;
      font-size: 18px;
      border-radius: 0;
      border: 1px solid #292929;
      width: 100%;
      height: 48px;
      padding: 12px 16px;
      margin-bottom: 24px;
    }
    .typing{
      text-transform: none !important;
      color: #292929 !important;
    }
    a{
      font-size: 12px;
      text-transform: none;
      text-decoration: none;
      position: absolute;
      right: 16px;
      top: 16px;
      &:hover{
        color: #292929;
      }
    }
  }
</style>
