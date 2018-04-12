<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p.center Create Shop
      .col-sm-6
        tk-send(v-model='name', @click="change").last
</template>

<script>
  export default {
    props: ['model'],
    data () {
      return {
        name: null
      }
    },
    methods: {
      change () {
        this.$emit('input', {
          translations: { name: { en: this.name } },
          configuration: {},
          allowed_gateways: [],
          allowed_currencies: [],
          allowed_languages: [],
          attributes: {}
        })
      }
    },
    mounted () {}
  }
</script>

<style lang="less" scoped></style>
