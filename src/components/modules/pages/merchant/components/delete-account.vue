<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
      .col-sm-6
        tk-secondary-button.last(name='delete my account', @click="close_account")
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      close_account () {
        this.emit('input', true)
      }
    },
    mounted () {}
  }
</script>

<style lang="less" scoped></style>
