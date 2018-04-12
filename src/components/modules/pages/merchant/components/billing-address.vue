<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p.center Country
      .col-sm-6
        tk-custom-select-string(:options='countries ', style='margin-bottom: 24px;', v-model='country', @input="change")
      .col-sm-4.col-sm-offset-2
        p.center Street, Address, Number
      .col-sm-6
        tk-input-type-text(v-model='street', @input="change")
      .col-sm-4.col-sm-offset-2
        p.center City / Province
      .col-sm-6
         tk-input-type-text(v-model='city', @input="change")
      .col-sm-4.col-sm-offset-2
        p.center ZIP / Postal Code
      .col-sm-6
         tk-input-type-text(v-model='zip', @input="change").last
</template>

<script>
  export default {
    props: ['model'],
    data () {
      return {
        country: null,
        street: null,
        city: null,
        zip: null,
        countries: ['Austria', 'Latvia', 'Great Britain']
      }
    },
    methods: {
      change () {
        this.$emit('input', {
          configuration: {
            billing_country: this.country,
            billing_street: this.street,
            billing_city: this.city,
            billing_zip: this.zip
          }
        })
      }
    },
    mounted () {
      if (this.model && this.model.configuration) {
        this.country = this.model.configuration.billing_country
        this.street = this.model.configuration.billing_street
        this.city = this.model.configuration.billing_city
        this.zip = this.model.configuration.billing_zip
      }
    }
  }
</script>

<style lang="less" scoped></style>
