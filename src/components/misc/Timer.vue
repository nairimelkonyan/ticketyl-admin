<template lang="pug">
  .reservation
    h4 {{ translations.checkout_timer_title[defaultLang] | translate }}
    .row
      .col-sm-8
        .timer-wrapper
          .timer-body
            p(v-if='!cancel') {{ translations.checkout_timer_paragraph[defaultLang] | translate }}
            p(v-if='cancel') {{ translations.checkout_timer_paragraph_finish_released[defaultLang] | translate }}
      .col-sm-4
        .timer-wrapper
          .timer-body
            CountDown(v-if='!cancel', ref="countdown", :time="480", @onProgress="countDownProgress", @onFinish="countDownFinished") 
              h2 {{ minutes }}:{{ seconds }}    
            h2(v-if='cancel') 00:00
</template>

<script>
import CountDown from 'vuejs-count-down'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      countDownSeconds: null,
      cancel: false
    }
  },
  props: [ 'translations' ],
  computed: {
    ...mapGetters({
      defaultLang: 'defaultLanguage'
    }),
    minutes () {
      return Math.floor(this.countDownSeconds / 60)
    },
    seconds () {
      if ((this.countDownSeconds % 60) < 10) {
        return ('0' + this.countDownSeconds % 60).slice(-2)
      }
      return this.countDownSeconds % 60
    }
  },
  methods: {
    countDownProgress (time) {
      this.countDownSeconds = time
    },
    countDownFinished () {
      this.$emit('finished')
      this.cancel = true
    },
    translate (translate) {
      return this.$options.filters.translate(translate)
    }
  },
  components: {
    CountDown
  }
}
</script>

<style lang="less" scoped>
  .reservation{
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    margin-bottom: 24px;
    margin-top: 0;
    z-index: 9999;
    background-color: #f7f7f7;
    padding: 24px 16px;
    h4{
      font-size: 14px;
      font-weight: normal;
      margin: 0;
      margin-bottom: 16px;
      color: #979797;
      text-transform: uppercase;
    }
    .timer-wrapper{
      display: table;
      height: 40px;
      width: 100%;
      .timer-body{
        display: table-cell;
        vertical-align: middle;
        h2{
          margin: 0;
        }
      }
    }
  }
  @media(min-width:0px) and (max-width:767px){
    .reservation{
      margin-left: -16px;
      margin-right: -16px;
    }
  }
</style>
