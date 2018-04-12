<template lang="pug">
  .currency
    input(type='text', :placeholder='placeholder', :value='value', @input="$emit('input', $event.target.value)", @keypress="$emit('keypress', $event)", v-bind:class="{ typing : (text != '')}")
    span &euro;
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: [
      'placeholder',
      'value'
    ],
    computed: {
      ...mapGetters({
        giftCards: 'allCards'
      })
    },
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
     text-align: right;
    font-size: 18px;
    text-transform: uppercase;
    color: #9a9a9a;
    border: 1px solid #292929;
    border-radius: 0;
    width: 100%;
    height: 48px;
    padding: 12px 16px 12px 24px;
  }
  .typing{
    text-transform: none !important;
    color: #292929 !important;
  }
  span{
    font-size: 16px;
    text-transform: uppercase;
    color: #292929;
    position: absolute;
    left: 12px;
    top: 13px;
  }
}
</style>
