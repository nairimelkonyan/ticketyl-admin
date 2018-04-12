<template lang="pug">
  #errorcheck
    .container
      .row
        .col-sm-6
          .error-wrapper
            .error-body
              h4 Checkbox not checked
              p Please indicate that you have read and agree to the terms presented in the Terms and Conditions agreement
        .col-sm-6
          .error-wrapper
            .error-body
              button(v-on:click="close()") {{ translations.checkout_input_warning_close[defaultLang] | translate }} &#10005;
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: [
      'translations'
    ],
    methods: {
      close () {
        var e = document.getElementById('errorcheck')
        e.style.display = 'none'
      }
    },
    computed: {
      ...mapGetters({
        defaultLang: 'defaultLanguage'
      })
    }
  }
</script>

<style lang="less" scoped>
#errorcheck{
  z-index: 1;
  position: sticky;
  color: #fff;
  z-index: 9999;
  top: 0;
  width: 100%;
  background-color: #9a9a9a;
  button{
    border: none;
    background-color: transparent;
    text-transform: uppercase;
    float: right;
    outline: none !important;
  }
  .error-wrapper{
    display: table;
    height: 100px;
    width: 100%;
    .error-body{
      display: table-cell;
      vertical-align: middle;
    }
  }
}
</style>
