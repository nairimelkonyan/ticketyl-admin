<template lang="pug">
  .mobile-table
    .container(v-if="shop")
      .row.top(v-for="(ticket,index) in cart")
        .col-xs-6
          p {{ translations.checkout_table_1 | tktranslate(lang) }}
        .col-xs-6
          p {{ ticket.product.translations.name | tktranslate(lang) }}
        .col-xs-6
          p {{ translations.checkout_table_2 | tktranslate(lang) }}
        .col-xs-6
          p {{ ticket.count }}
        .col-xs-8
          p {{ translations.checkout_table_3 | tktranslate(lang) }}
        .col-xs-4
          p {{ ticket.product.price | tkprice }}
        .col-xs-6
          p {{ translations.checkout_table_4 | tktranslate(lang) }} 
        .col-xs-6
          p {{ (ticket.product.price.amount * ticket.count) / 100 | currency('') }} {{ ticket.product.price.currency.translations.symbol | tktranslate(lang) }}
        .col-xs-12
          button.delete(@click="removeItem(index)") {{ translations.checkout_table_8 | tktranslate(lang) }} 
      .row.total
        .col-xs-6(v-for="(charge,index) in basket.price.applied_charges" v-if="charge.applied.amount !== 0")
          p {{ charge.charge_group.translations.name | tktranslate(lang) }}
        .col-xs-6(v-for="(charge,index) in basket.price.applied_charges" v-if="charge.applied.amount !== 0")
          p {{ charge.applied | tkprice }}
        .col-xs-6
          p {{ translations.checkout_table_9 | tktranslate(lang) }}
        .col-xs-6
          p 
            strong {{ basket.total | tkprice }}
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  props: ['translations'],
  computed: {
    ...mapGetters({
      tickets: 'getTickets',
      totalPrice: 'getTotalPrice',
      discount: 'get_ticket_voucher_amount',
      totalTickets: 'getTicketsSelected',
      allSeats: 'getAllSeats',
      defaultLang: 'defaultLanguage',
      vouchers: 'get_ticket_voucher_amount',
      cart: 'get_cart',
      basket: 'get_basket',
      lang: 'selectedLanguage',
      shop: 'shop'
    })
  },
  methods: {
    total () {
      var price = 0
      var currency = {
        'code': 'eur',
        'translations': {
          'symbol': { en: '€' }
        }
      }
      for (var i in this.cart) { price += this.cart[i].count * this.cart[i].product.price.amount }
      for (i in this.shop.charges.must) { price += this.price_for_charge(this.shop.charges.must[i]).amount }
      return {
        amount: price,
        currency: currency
      }
    },
    price_for_charge (chargeGroup) {
      var price = 0
      var currency = {
        'code': 'eur',
        'translations': {
          'symbol': { en: '€' }
        }
      }
      var ticketCount = 0

      for (var p in this.cart) {
        var prod = this.cart[p].product
        if (prod.charges.deny.indexOf(chargeGroup.code) === -1) {
          ticketCount += this.cart[p].count
        }
      }
      if (chargeGroup.configuration.included === 'included') {
        return {
          amount: price,
          currency: currency
        }
      }
      for (var k in chargeGroup.charges) {
        var charge = chargeGroup.charges[k]
        var apply = true
        for (var r in charge.rules) {
          var rule = charge.rules[r]
          var a = null
          var b = parseInt(rule.value)

          if (rule.key === 'ticket_count') { a = ticketCount }
          if (rule.operator === '>' && a <= b) { apply = false }
          if (rule.operator === '<' && a >= b) { apply = false }
          if (rule.operator === '=' && a !== b) { apply = false }
        }
        if (apply) {
          if (charge.direction > 0) {
            price += charge.price.amount
          } else {
            price -= charge.price.amount
          }
        }
      }
      return {
        amount: price,
        currency: currency
      }
    },
    removeItem (index) {
      this.$store.commit(types.REMOVE_FROM_CART, index)
    },
    ticketsSelected () {
      return this.allSeats.map(ticketType => {
        var ts = this.tickets.filter(function (ticket) {
          return ticket.id === ticketType.id
        })

        return {
          seat: ticketType,
          count: ts.length
        }
      }).filter(type => {
        return type.count > 0
      })
    }
  }
}
</script>

<style lang="less" scoped>
button{
  font-weight: bold;
  outline: 0;
  border: none;
  padding: 0;
  text-decoration: underline;
  background-color: transparent;
}
.col-xs-12{
  padding-left: 8px;
}
.mobile-table{
  display: none;
  p{
    margin: 0;
    margin-bottom: 2px;
  }
  .container{
    margin-bottom: 24px;
  }
  .row{
    padding: 8px 0;
    .col-xs-8{
      text-align: left;
      font-weight: bold;
      margin-bottom: 16px;
      padding-left: 8px;
      padding-right: 0;
    }
    .col-xs-4{
      text-align: right;
      margin-bottom: 16px;
      padding-right: 8px;
      padding-left: 0;
    }
    .col-xs-6{
      margin-bottom: 16px;
      &:last-child{
        margin-bottom: 0;
      }
      &:nth-last-child(2){
        margin-bottom: 0;
      }
    }
    .col-xs-6:nth-child(odd){
      font-weight: bold;
      text-align: left;
      padding-left: 8px;
      padding-right: 0;
    }
    .col-xs-6:nth-child(even){
      text-align: right;
      padding-right: 8px;
      padding-left: 0;
    }
  }
}
.top{
  border-top: 1px solid #9a9a9a;
  border-left: 1px solid #9a9a9a;
  border-right: 1px solid #9a9a9a;
}
.total{
  border-top: 1px solid #9a9a9a;
  border-bottom: 1px solid #9a9a9a;
  border-left: 1px solid #9a9a9a;
  border-right: 1px solid #9a9a9a;
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
.row {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
}
.row > [class*='col-'] {
  display: flex;
  flex-direction: column;
}
  .mobile-table{
    display: block;
  }
  .mobile-table .container{
    margin-bottom: 16px;
  }
}
</style>