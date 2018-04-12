<template lang="pug">
  .step-3
    .image
    .body
      h2 Commissions
      p It is up to you if you want to take on the commissions yourself or add them to the price of the ticket
      input#ticketyl(type='radio', name='ticket', value='absorb', v-model='commissions')
      label(for="ticketyl") Take on Commissions
        p.paragraph Pay the commissions so that the buyer do not have to
      input#faciliatied(type='radio', name='ticket', value='faciliatied', v-model='commissions')
      label(for="faciliatied") Pass on Commissions to Buyer
        p.paragraph This means that commissions will be included in the ticket price
    footer
      .row
        .col-sm-6.text-left
          .footer-content
            .footer-body
              p Step 3 of 3
        .col-sm-6.text-right
          .footer-content
            .footer-body
              tk-primary-button(name='Next', @click='goNext')
</template>

<script>
  export default {
    data () {
      return {
        commissions: 'ticketyl'
      }
    },
    methods: {
      goNext () {
        /* api.admin().merchant().update({ merchant: { shops: this.shops } })
          .then(response => {
            this.$store.commit(types.MECHANT_INIT, response)
            this.$emit('stepLast')
          }) */
      }
    }
  }
</script>

<style lang="less" scoped>
.step-3{
  .body{
    padding: 24px 32px 40px 32px;
  }
  h2{
    margin-top: 0;
    +p{
      font-weight: bold;
      border-bottom: 1px solid #9a9a9a;
      margin-bottom: 24px;
      padding-bottom: 24px;
    }
  }
  .image{
    height: 224px;
    background-image: url('/static/event_publish_bg@2x.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  label{
    font-size: 18px;
  }
  .value{
    font-size: 14px;
    color: #9a9a9a;
  }
  .paragraph{
    margin-top: 8px;
    font-size: 14px;
  }
  footer{
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    padding: 0 32px;
    .footer-content{
      display: table;
      height: 80px;
      width: 100%;
      .footer-body{
        display: table-cell;
        vertical-align: middle;
        p{
          color: #9a9a9a;
          font-weight: bold;
          margin: 0;
        }
      }
    }
  }
}
</style>