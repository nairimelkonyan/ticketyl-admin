<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p Payment Gateways
      .col-sm-6
        form(action='')
          div(v-for="(item, index) in gateways")
            input(type='checkbox', name='gateway', :id="item.code", :value='item.code', v-model='selected_gateways', @change="change")
            label(:for="item.code")
              img(:src='"static/" + item.code')
              | {{ item.code }}
</template>

<script>
  export default {
    props: ['model', 'gateways'],
    data () {
      return {
        selected_gateways: []
      }
    },
    methods: {
      change () {
        this.$emit('input', {
          allowed_gateways: this.selected_gateways
        })
      },
      load (model) {
        if (model && model.allowed_gateways) {
          this.selected_gateways = model.allowed_gateways
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
