<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p.center Email Address
      .col-sm-6
        tk-input-type-text(v-model="email", @input="change").last
        // span Address saved
</template>

<script>
  export default {
    props: ['model'],
    data () {
      return {
        email: []
      }
    },
    methods: {
      change () {
        this.$emit('input', {
          configuration: {
            newsletter_address: this.email
          }
        })
      },
      load (model) {
        if (model && model.configuration) {
          this.email = model.configuration.newsletter_address
        }
      }
    },
    mounted () { this.load(this.model, this.model) },
    watch: {
      model (model) { this.load(model) }
    }
  }
</script>

<style lang="less" scoped></style>
