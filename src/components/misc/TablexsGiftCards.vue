<template lang="pug">
  .mobile-table
    .container
      .row(v-if='customGift')
        .col-xs-6
          p {{ translations.checkout_table_1[defaultLang] | translate }}
        .col-xs-6
          p {{ customGift.name }}
        .col-xs-6
          p {{ translations.checkout_table_2[defaultLang] | translate }}
        .col-xs-6
          p {{ customGift.amount }}
        .col-xs-6
          p {{ translations.checkout_table_3[defaultLang] | translate }}
        .col-xs-6
          p {{ customGift.price | currency('') }}
        .col-xs-6
          p {{ translations.checkout_table_4[defaultLang] | translate }}
        .col-xs-6
          p {{ customGift.price | currency('') }}
      .row(v-for="(g ,index) in giftCards", v-bind:class="{'table-border-none': index === giftCards.length -1}")
        .col-xs-6
          p {{ translations.checkout_table_1[defaultLang] | translate }}
        .col-xs-6
          p {{ g.translations.name.en }}
        .col-xs-6
          p {{ translations.checkout_table_2[defaultLang] | translate }}
        .col-xs-6
          p {{ g.giftCount }}
        .col-xs-6
          p {{ translations.checkout_table_3[defaultLang] | translate }}
        .col-xs-6
          p {{ g.price.amount / 100 | currency('') }} {{ g.price.currency.code }}
        .col-xs-6
          p {{ translations.checkout_table_4[defaultLang] | translate }}
        .col-xs-6
          p {{ (g.giftCount * g.price.amount) / 100 | currency('') }} {{ g.price.currency.code }}
      .row(style='border-bottom: 1px solid #9a9a9a;')
        .col-xs-6(v-if='getVoucherAmount')
          p {{ translations.checkout_table_6[defaultLang] | translate }}
        .col-xs-6(v-if='getVoucherAmount')
          p {{ getVoucherAmount / 100 | currency('') }}
        .col-xs-6
          p {{ translations.checkout_table_5[defaultLang] | translate }} (20%) 
        .col-xs-6
          p {{ ((totalGiftCardPrice) - (totalGiftCardPrice / 1.20)) / 100 | currency('') }}
        .col-xs-6
          p {{ translations.checkout_table_7[defaultLang] | translate }} 
        .col-xs-6
          p 
            strong {{ totalGiftCardPrice / 100 | currency('') }}
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
.mobile-table{
  p{
    margin: 0;
    margin-bottom: 2px;
  }
  .container{
    margin-bottom: 24px;
  }
  .row{
    padding: 15px 8px;
    border: 1px solid #9a9a9a;
    border-bottom: none;
    .col-xs-6{
      margin-bottom: 8px;
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
    }
    .col-xs-6:nth-child(even){
      text-align: right;
    }
  }
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  .mobile-table .container{
    margin-bottom: 16px;
  }
  .col-xs-6{
    padding: 0 4px;
  }
}
</style>