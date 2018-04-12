<template lang="pug">
  .ticket-category
    table
      tr.gray(v-if="translations")
        td.text-left
          p {{ translations.checkout_table_1 | tktranslate(lang) }}
        td
          p &nbsp;
        td
          p {{ translations.checkout_table_2 | tktranslate(lang) }}
        td
          p {{ translations.checkout_table_3 | tktranslate(lang) }}
        td
          p {{ translations.checkout_table_4 | tktranslate(lang) }}
      tr(v-for="(ticket,index) in cart")
        td.text-left(style='max-width: 256px;')
          p {{ ticket.product.translations.name[lang] | translate }}
        td.text-left
          button.delete(@click="removeItem(index)") {{ translations.checkout_table_8 | tktranslate(lang) }} 
        td
          p {{ ticket.count }}
        td
          p {{ ticket.product.price | tkprice }}
        td.text-right
          p {{ (ticket.product.price.amount * ticket.count) / 100 | currency('') }} {{ ticket.product.price.currency.translations.symbol.en }}
      tr.table-border-none
        td(colspan='3').text-left
          p(v-for="(charge,index) in basket.price.applied_charges" v-if="charge.applied.amount !== 0") {{ charge.charge_group.translations.name | tktranslate(lang) }}
          p {{ translations.checkout_table_9 | tktranslate(lang)  }}
        td(colspan='2').text-right
          p(v-for="(charge,index) in basket.price.applied_charges" v-if="charge.applied.amount !== 0") {{ charge.applied | tkprice }}
          p {{ basket.total | tkprice }}
  //-
    .ticket-category
      table
        tr.gray
          td
            p Ticket category
          td
            p &nbsp;
          td
            p Amount
          td
            p Item Price *
          td
            p Price
        tr
          td
            p Back seats
          td
            button.delete Delete
          td
            p 1
          td
            p 20.00 $
          td.text-right
            p 20.00 $
        tr
          td
            p Back seats
          td
            button.delete Delete
          td
            p 1
          td
            p 20.00 $
          td.text-right
            p 20.00 $
        tr.pay
          td.text-left
            p Order total
          td
          td
          td
          td.text-right
            p 160.00 $
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
      lang: 'selectedLanguage',
      defaultLang: 'defaultLanguage',
      vouchers: 'get_ticket_voucher_amount',
      cart: 'get_cart',
      shop: 'shop',
      basket: 'get_basket'
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
      this.$store.commit(types.ADD_CART_TOTAL_PRICE, price)
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
.delete{
  outline: 0;
  padding: 0;
  background-color: transparent;
  text-decoration: underline;
  border: none;
}
.ticket-category{
  display: block;
  table{
    margin: 0;
    margin-bottom: 24px;
    width: 100%;
    border-collapse: collapse;
    tr {
      border-bottom: 0.5px solid #979797;
      td {
        padding: 15px 12px;
        &::nth-child(2){
          text-align: right;
        }
        &::nth-child(3){
          text-align: right;
        }
      }
    }
    tr > td:last-of-type{
      text-align: right;
    }
    .table-border-none{
      border-bottom: none;
    }
    .pay {
      border: 0.5px solid #979797;
    }
    .gray {
      font-weight: bold;
      background-color: gray;
    }
    p{
      margin: 0;
      font-size: 14px;
      line-height: 1.71;
      letter-spacing: 0.5px;
    }
    tr:last-child{
      border: 0.5px solid #979797;
    }
    tr:first-child {
     background: #979797;
   }
   tr:first-child p{
    color: #fff;
    font-weight: bold;
    }
    tr:last-child td p:last-child{
      font-weight: bold;
    }
  }
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  .ticket-category{
    display: none;
  }
}
</style>
