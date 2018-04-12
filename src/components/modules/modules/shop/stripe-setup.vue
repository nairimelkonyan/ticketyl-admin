<template lang="pug">
  .step-ticketyl
    button.action(@click='goBack')
      i.material-icons arrow_back
    .image
    .body
      h2 Ticketyl Payment
      p Please provide the following information about your business to proceed
      p In order to use Stripe, please insert your email address. You can use this e-mail address to log in into the Stripe merchant dashboard
      .row
        .col-sm-7
          tk-input-type-text(placeholder="A valid e-mail address", v-model="email")
        .col-sm-5
          tk-primary-button(name="Enable Stripe", @click="enable_stripe")
      .alert.danger(v-if="error") {{ error.translations.message | tktranslate('en', 'en') }}
</template>

<script>
  import * as types from '@/store/mutation-types'
  import api from '@/services/TicketylOS/TicketylOS'
  import { mapGetters } from 'vuex'
  export default {
    data () { return { error: null, email: null } },
    methods: {
      enable_stripe () {
        this.error = null
        api
          .admin().merchant().stripe({ email: this.email })
          .then(response => {
            this.$store.commit(types.MECHANT_INIT, response)
            this.$emit('stepTwo')
          }).catch(error => { this.error = error })
      },
      goBack () { this.$emit('stepInitial') }
    },
    mounted () {
      if (this.merchant) {
        this.email = this.merchant.configuration.email
      }
    },
    computed: {
      ...mapGetters({
        merchant: 'merchant'
      })
    }
  }
</script>

<style lang="less" scoped>
.step-ticketyl{
  .body{
    padding: 24px 32px 40px 32px;
  }
  h2{
    margin-top: 0;
    +p{
      font-size: 14px;
      font-weight: bold;
      border-bottom: 1px solid #9a9a9a;
      margin-bottom: 24px;
      padding-bottom: 24px;
    }
  }
  p{
    font-size: 18px;
    margin-bottom: 32px;
  }
  .image{
    height: 224px;
    background-image: url('/static/event_publish_bg@2x.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  a{
    display: inline-block;
    height: 33px;
    width: 190px;
    background-image: url('/static/blue-on-light@3x.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
</style>