<template lang="pug">
  section
    .row
      .col-sm-4.col-sm-offset-2
        p.center Shop Domain
      .col-sm-6
        tk-input-type-text(v-model='subdomain', @input="change").margin-bottom
    .row
      .col-sm-4.col-sm-offset-2
        p.center Shop Default Language
      .col-sm-6
        
        //- tk-custom-select-string(:options='languages', v-model='default_language', @input="change").margin-bottom
        span.selected_item {{ default_language }}
        tk-modal-shop-languages(:allowed_languages="available_languages", @input="languages_changed", :model="model").margin-bottom
    .row
      .col-sm-4.col-sm-offset-2
        p.center Shop Default Currency
      .col-sm-6
        //- tk-custom-select-string(:options='currencies', v-model='default_currency', @input="change").margin-bottom
        span.selected_item {{ default_currency }}
        tk-modal-shop-currencies(:allowed_currencies="available_currencies", @input="currencies_changed", :model="model").last
</template>

<script>
  export default {
    props: ['model', 'available_currencies', 'available_languages'],
    data () {
      return {
        subdomain: null,
        domain: 'ticketyl.com',
        default_language: null,
        default_currency: null,
        allowed_languages: [],
        allowed_currencies: [],
        currencies: [],
        languages: []
      }
    },
    methods: {
      languages_changed (data) {
        this.allowed_languages = this.objects_to_codes(data.allowed_languages)
        this.default_language = data.default_language.code
        this.$emit('input', {
          configuration: { default_language: this.default_language },
          allowed_languages: this.allowed_languages
        })
      },
      currencies_changed (data) {
        this.allowed_currencies = this.objects_to_codes(data.allowed_currencies)
        this.default_currency = data.default_currency.code
        this.$emit('input', {
          configuration: { default_currency: this.default_currency },
          allowed_currencies: this.allowed_currencies
        })
      },
      objects_to_codes (objects) {
        var codes = []
        for (var i in objects) { codes.push(objects[i].code) }
        return codes
      },
      change () {
        this.$emit('input', {
          configuration: {
            subdomain: this.subdomain,
            domain: 'ticketyl.com',
            default_language: this.default_language,
            default_currency: this.default_currency
          },
          allowed_languages: this.allowed_languages,
          allowed_currencies: this.allowed_currencies
        })
      },
      load (model) {
        if (model && model.configuration) {
          this.subdomain = model.configuration.subdomain
          this.domain = model.configuration.domain
          this.default_language = model.configuration.default_language
          this.default_currency = model.configuration.default_currency
          this.allowed_languages = model.allowed_languages
          this.allowed_currencies = model.allowed_currencies
        }
      }
    },
    mounted () { this.load(this.model, this.model) },
    watch: {
      model (model) { this.load(model) }
    }
  }
</script>

<style lang="less" scoped>
  .selected_item {
    font-weight: bolder;
    display: inline-block;
    text-transform: uppercase;
    margin-right: 15px;
    border: 1px solid #ccc;
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
