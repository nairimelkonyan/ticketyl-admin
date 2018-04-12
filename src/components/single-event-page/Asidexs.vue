<template lang="pug">
  aside
    .aside-wrapper
      .ticket-price-wrapper
        p {{ translations.aside_tickets_range | tktranslate(lang) }}
        .row
          .col-xs-12
            .prices-wrapper
              .prices-body
                span.price-from {{ prices.min | tkprice }}
                span.euro-from-to {{ prices.min.currency.translations.symbol | tktranslate(lang) }}
                span.minus
                  i.material-icons remove 
                span.price-to {{ prices.max | tkprice }}
                span.euro-from-to {{ prices.min.currency.translations.symbol | tktranslate(lang) }}
      .payment-method-wrapper(v-if="shop")
        .gateways(v-for='e in shop.allowed_gateways')
          img(:src="'/static/' + e.translations.logo.en")
      .evening-session  
        tk-custom-select(:options='packages', @input='setPackage($event)')
      .tickets
        tk-Modal(:translations='translations')
      //.ticket-count
        p 14 tickets bought today
</template>

<script>
  import * as types from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    props: [ 'translations', 'prices' ],
    computed: {
      ...mapGetters({
        packages: 'packages',
        lang: 'selectedLanguage',
        shop: 'shop'
      })
    },
    methods: {
      setPackage (packageId) {
        for (var i in this.packages) {
          if (this.packages[i].id === packageId) {
            this.$store.commit(types.SET_PACKAGE, this.packages[i])
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.gateways{
  display: inline-block;
}
.minus{
  padding: 0 8px;
  .material-icons{
    font-size: 18px;
  }
}
aside .aside-wrapper .ticket-price-wrapper p{
  margin: 0;
}
.prices-wrapper{
  display: table;
  height: 56px;
  width: 100%;
  .prices-body{
    display: table-cell;
    vertical-align: middle;
  }
}           
aside{
  display: none;
  .aside-wrapper{
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    margin-bottom: 24px;
    .ticket-count{
      text-transform: uppercase;
      font-weight: bold;
      padding: 20px;
      text-align: center;
      p{
        margin: 0;
      }
    }
    .tickets{
      button{
        width: 100%;
      }
    }
    .evening-session{
      padding: 20px;
    }
    .payment-method-wrapper{
      text-align: center;
      padding: 10px 20px;
      border-bottom: 1px solid #979797;
      img{
        height: 32px;
        width: auto;
        margin-right: 10px;
      }
    }
    .ticket-price-wrapper{
      position: relative;
      text-align: center;
      border-bottom: 1px solid #979797;
      padding: 20px;
      p{
        text-transform: uppercase;
        color: #9a9a9a;
      }
      .price-from-to{
        text-align: center;
      }
      .price-from{
        font-size: 48px;
        line-height: 56px;
        font-weight: bold;
      }
      .price-to{
        font-size: 36px;
        line-height: 40px;
        font-weight: bold;
      }
      .euro-from-to{
        font-size: 24px;
        line-height: 32px;
        vertical-align: top;
        font-weight: bold;
      }
    }
  }
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  .tickets{
    position: fixed;
    z-index: 9999;
    bottom: 0;
    width: 100%;
    margin-left: -16px;
    padding: 8px 16px;
    background-color: #fff;
    margin-bottom: 0;
  }
  aside{
    display: block;
  }
  aside .aside-wrapper .ticket-price-wrapper {
    padding: 8px 8px 0 8px;
  }
  aside .aside-wrapper .ticket-price-wrapper .price-from {
    font-size: 32px;
  }
  aside .aside-wrapper .ticket-price-wrapper .euro-from-to {
    font-size: 20px;
  }
  aside .aside-wrapper .ticket-price-wrapper .price-to {
    font-size: 24px;
  }
  aside .aside-wrapper .ticket-price-wrapper .euro-from-to {
    font-size: 14px;
  }
  aside .aside-wrapper .payment-method-wrapper {
    padding: 8px;
  }
  aside .aside-wrapper .evening-session {
    padding: 24px 8px;
  }
  aside .aside-wrapper .ticket-count {
    padding: 24px 8px;
  }
}
</style>