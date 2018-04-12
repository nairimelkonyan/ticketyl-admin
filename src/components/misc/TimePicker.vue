<template lang="pug">
  div
    flat-pickr(v-model="time", :config="config")
</template>

<script>
  import flatPickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'

  export default {
    data () {
      return {
        time: null,
        config: {
          altFormat: 'H:i',
          altInput: true,
          enableTime: true,
          noCalendar: true
        }
      }
    },
    watch: {
      time (newTime) {
        this.$emit('input', `${newTime}:00`)
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
