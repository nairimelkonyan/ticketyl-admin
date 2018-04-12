<template lang='pug'>
  .ticket-category
    table(v-if="order")
      tr.gray
        td
          p {{ translations.checkout_table_1[defaultLang] | translate }}
        td
          p {{ translations.checkout_table_2[defaultLang] | translate }}
        td
          p {{ translations.checkout_table_3[defaultLang] | translate }}
        td
          p {{ translations.checkout_table_4[defaultLang] | translate }}
      tr(v-for='o in order.order_lines')
        td.text-left
          p {{ o.product.translations.name[selectedLang] | translate }}
        td
          p {{ o.amount }}
        td
          p {{ o.product.price | tkprice }}
        td.text-right
          p {{ (o.product.price.amount * o.amount) / 100 | currency('') }} {{ o.product.price.currency.translations.symbol.en }}
      tr
        td(colspan='2')
          p(v-for='o in order.charges') {{ o.charge_group.translations.name[selectedLang] | translate }}
          p {{ translations.checkout_table_7[defaultLang] | translate }}
        td.text-right(colspan='2')
          p(v-for='o in order.charges') {{ o.price_applied | tkprice }}
          p {{ order.price | tkprice }}
</template>

<script>
import { mapGetters } from 'vuex'
import Api from '@/services/ApiService'
const api = new Api()

export default {
  data () {
    return {
      order: null
    }
  },
  props: ['translations'],
  created () {
    api.getOrderId(this.$route.params.id).then(response => {
      this.order = response.data
    })
  },
  computed: {
    ...mapGetters({
      tickets: 'getTickets',
      totalPrice: 'getTotalPrice',
      discount: 'get_ticket_voucher_amount',
      totalTickets: 'getTicketsSelected',
      allSeats: 'getAllSeats',
      selectedLang: 'selectedLanguage',
      defaultLang: 'defaultLanguage',
      vouchers: 'get_ticket_voucher_amount'
    }),
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
  /*
  methods: {
    ticketsSelected (id) {
      var selectedTickets = []
      for (var i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].id === id) {
          selectedTickets.push(this.tickets[i].id)
        }
      }
      return selectedTickets.length
    }
  },
  */
}
</script>

<style lang='less' scoped>
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
    margin: 16px 0 13px 0;
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
