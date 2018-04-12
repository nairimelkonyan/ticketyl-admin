<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
      .col-sm-6
        form(action='')
          input#big(type='radio', name='tiles', value='big', v-model='layout', @change="change")
          label(for="big") Big, full width tiles
          input#small(type='radio', name='tiles', value='small', v-model='layout', @change="change")
          label(for="small") Small tiles arranged in 3 columns
</template>

<script>
  export default {
    props: ['model'],
    data () {
      return {
        layout: 'big'
      }
    },
    methods: {
      change () {
        this.$emit('input', {
          configuration: {
            layout: this.layout
          }
        })
      },
      load (model) {
        if (model && model.configuration) {
          this.layout = model.configuration.layout
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
