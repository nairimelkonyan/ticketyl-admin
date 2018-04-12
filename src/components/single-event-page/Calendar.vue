<template lang="pug">
  div
    flat-pickr(v-model="date", :config="config")
</template>

<script>
  import flatPickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'
  import moment from 'moment'

  export default {
    data () {
      return {
        date: null,
        config: {
          altFormat: 'Y-m-d',
          altInput: true,
          enableTime: false,
          minDate: moment().format()
        }
      }
    },
    watch: {
      date (newDate) {
        this.$emit('input', `${newDate}`)
      }
    },
    components: {
      flatPickr
    }
  }
</script>

<style lang="less">
  .flatpickr-input {
    font-size: 18px;
    text-transform: uppercase;
    color: #9a9a9a;
    border-radius: 0;
    border: 1px solid #292929;
    width: auto;
    height: 48px;
    padding: 12px 16px;
    width: 100%;
    background-color: #fff !important;
    &.active {
      border-color: #292929;
      box-shadow: none;
    }
  }
</style>
