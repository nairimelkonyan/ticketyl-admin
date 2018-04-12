<template lang="pug">
  .ticket-category
    table
      tr.gray
        td
          p {{ translations.checkout_table_1[defaultLang] | translate }}
        td
          p {{ translations.checkout_table_2[defaultLang] | translate }}
        td
          p {{ translations.checkout_table_3[defaultLang] | translate }}
        td
          p {{ translations.checkout_table_4[defaultLang] | translate }}
      tr(v-if='customGift')
        td
          p {{ customGift.name }}
        td
          p {{ customGift.amount }}
        td
          p {{ customGift.price | currency('') }}
        td
          p {{ customGift.price | currency('') }}
      tr(v-for="(g ,index) in giftCards", v-bind:class="{'table-border-none': index === giftCards.length -1}")
        td
          p {{ g.translations.name.en }} 
        td
          p {{ g.giftCount }}
        td
          p {{ g.price.amount / 100 | currency('') }} {{ g.price.currency.code }}
        td
          p {{ (g.giftCount * g.price.amount) / 100 | currency('') }} {{ g.price.currency.code }}
      tr.pay
        td
          p(v-if='getVoucherAmount') {{ translations.checkout_table_6[defaultLang] | translate }} 
          br(v-if='getVoucherAmount')
          p {{ translations.checkout_table_5[defaultLang] | translate }} (20%) 
          br
          p {{ translations.checkout_table_7[defaultLang] | translate }}
        td
        td
        td
          p(v-if='getVoucherAmount') {{ getVoucherAmount / 100 | currency('') }} 
          br(v-if='getVoucherAmount')
          p {{ ((totalGiftCardPrice) - (totalGiftCardPrice / 1.20)) / 100 | currency('') }}
          br
          p {{ totalGiftCardPrice / 100 | currency('') }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['translations'],
  computed: {
    ...mapGetters({
      defaultLang: 'defaultLanguage',
      giftCards: 'allSelectedgiftCards',
      customGift: 'customGift',
      totalGiftCardPrice: 'totalGiftCardPrice',
      getVoucherAmount: 'get_voucher_amount'
    })
  }
}
</script>

<style lang="less" scoped>
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
