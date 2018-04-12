<template lang="pug">
  div
    input(:id="'password' + _uid", type='password', name='password' :placeholder='placeholder', v-model='text', :value='inputValue', @input="$emit('input', $event.target.value)", @keypress="$emit('keypress', $event)", v-bind:class="{ typing : (text != '')}")
    button(@click='show')
      // i.material-icons remove_red_eye
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
      show () {
        if (window.jQuery('#password' + this._uid).is('[type=password]')) {
          window.jQuery('#password' + this._uid).attr('type', 'text')
        } else {
          window.jQuery('#password' + this._uid).attr('type', 'password')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  div{
    position: relative;
    margin-bottom: 24px;
    input[type="text"], input[type="password"]{
      text-transform: uppercase;
      color: #9a9a9a;
      font-size: 18px;
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
    button{
      outline: none;
      border: none;
      padding: 0;
      border-radius: 0;
      background-color: transparent;
      position: absolute;
      right: 16px;
      top: 16px;
      .material-icons{
        color: #292929;
        font-size: 18px;
      }
    }
  }
</style>
