<template lang="pug">
  section
    component(:is='currentComponent', @stepInitial='stepInitial', @stepOne='stepOne', @stepTwo='stepTwo', @stepLast='stepLast', @stepTicketyl='stepTicketyl', @publish='publish')
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        currentComponent: 'tk-shop-gateway-choice'
      }
    },
    methods: {
      stepInitial () { this.currentComponent = 'tk-shop-gateway-choice' },
      stepOne () { this.currentComponent = 'tk-shop-facilitated-gateways' },
      stepTwo () { this.currentComponent = 'tk-shop-commission-choice' },
      stepTicketyl () { this.currentComponent = 'tk-shop-stripe-setup' },
      stepLast () { this.currentComponent = 'tk-event-details' },
      publish () {
        this.$emit('publish')
        window.jQuery('#event-publish.modal').modal('hide')
      }
    },
    mounted () {
      console.log('shop gateways', this.shop)
      if (this.shop) {
        if (this.shop.allowed_gateways.length > 0) {
          if (!this.shop.configuration.commission_choice) {
            this.currentComponent = 'tk-shop-commission-choice'
          } else {
            this.currentComponent = 'tk-event-details'
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        shop: 'shop'
      })
    }
  }
</script>

<style lang='less'>
  .modal-content-wrapper{
    padding: 0px !important;
  }
</style>
