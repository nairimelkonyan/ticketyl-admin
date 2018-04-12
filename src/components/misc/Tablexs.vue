<template lang="pug">
  .mobile-table
    .container(v-if="order")
      .row.top(v-for='o in order.order_lines')
        .col-xs-6
          p {{ translations.checkout_table_1[defaultLang] | translate }}
        .col-xs-6
          p {{ o.product.translations.name[selectedLang] | translate }}
        .col-xs-6
          p {{ translations.checkout_table_2[defaultLang] | translate }}
        .col-xs-6
          p {{ o.amount }}
        .col-xs-8
          p {{ translations.checkout_table_3[defaultLang] | translate }}
        .col-xs-4
          p {{ o.product.price | tkprice }}
        .col-xs-6
          p {{ translations.checkout_table_4[defaultLang] | translate }} 
        .col-xs-6
          p {{ (o.product.price.amount * o.amount) / 100 | currency('') }} {{ o.product.price.currency.translations.symbol.en }}
      .row.total
        .col-xs-6
          p {{ translations.checkout_table_5[defaultLang] | translate }} 
        .col-xs-6
          p Vat
        .col-xs-6
          p {{ translations.checkout_table_7[defaultLang] | translate }}
        .col-xs-6
          p 
            strong {{ order.price | tkprice }}
</template>

<script>
import { mapGetters } from 'vuex'
import Api from '@/services/ApiService'
const api = new Api()

export default {
  props: ['translations'],
  data () {
    return {
      order: null
    }
  },
  created () {
    api.getOrderId(this.$route.params.id).then(response => {
      console.log('tablexs')
      console.log(response.data)
      console.log('id')
      console.log(this.$route.params.id)
      this.order = response.data
    })
  },
  computed: {
    ...mapGetters({
      tickets: 'getTickets',
      totalPrice: 'getTotalPrice',
      discount: 'get_ticket_voucher_amount',
      selectedLang: 'selectedLanguage',
      totalTickets: 'getTicketsSelected',
      allSeats: 'getAllSeats',
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

<style lang="less" scoped>
.top{
  border-top: 1px solid #9a9a9a;
  border-bottom: 1px solid #9a9a9a;
  border-left: 1px solid #9a9a9a;
  border-right: 1px solid #9a9a9a;
}
.total{
  border-bottom: 1px solid #9a9a9a;
  border-left: 1px solid #9a9a9a;
  border-right: 1px solid #9a9a9a;
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
    border: 1px solid #9a9a9a;
    border-bottom: none;
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
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  .mobile-table{
    display: block;
  }
  .mobile-table .container{
    margin-bottom: 16px;
  }
}
</style>