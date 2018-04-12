<template lang="pug">
  .content
    .evening-session
      tk-custom-select(:options='packages', @input='setPackage($event)')
    .tickets
      // tk-mans-ticket-modal(:translations='translations')
      // tk-mans-calendar-modal(@seeTickets='showTickets', :translations='translations')
      tk-Modal(:translations='translations', style='margin-bottom: 16px;')
    //.ticket-count
      p 14 tickets bought today
    .ticket-price-wrapper
      p {{ translations.aside_tickets_range | tktranslate(lang) }}
      span.price-from {{ prices.min | tkprice }}
      //- span.euro-from-cur {{ prices.min.currency.translations.symbol | tktranslate(lang) }}
      span.price-to - {{ prices.max | tkprice }}
      //- span.euro-to-cur {{ prices.min.currency.translations.symbol | tktranslate(lang) }}
    .payment-method-wrapper(v-if="shop")
      .gateways(v-for='e in shop.allowed_gateways')
        img(:src="'/static/' + e.translations.logo.en")
</template>

<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  props: [ 'translations', 'prices' ],
  methods: {
    setPackage (packageId) {
      for (var i in this.packages) {
        if (this.packages[i].id === packageId) {
          this.$store.commit(types.SET_PACKAGE, this.packages[i])
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      shop: 'shop',
      packages: 'packages',
      lang: 'selectedLanguage'
    })
  }
}
</script>

<style lang="less" scoped>
.gateways{
  display: inline-block;
}
.content{
  margin-bottom: 24px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  .ticket-price-wrapper{
    text-align: center;
    border-bottom: 1px solid #979797;
    padding: 8px 15px;
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
    .euro-from-cur{
      font-size: 24px;
      line-height: 32px;
      vertical-align: top;
      font-weight: bold;
    }
     .euro-to-cur{
      font-size: 14px;
      line-height: 32px;
      vertical-align: top;
      font-weight: bold;
    }
  }
  .payment-method-wrapper{
    text-align: center;
    padding: 10px 15px;
    img{
      height: 32px;
      width: auto;
      margin-right: 10px;
    }
  }
  .evening-session{
    height: 88px;
    padding: 20px 15px;
  }
  .tickets{
    padding: 0 16px;
    button{
      width: 100%;
    }
  }
  .ticket-count{
    text-transform: uppercase;
    font-weight: bold;
    padding: 20px 15px;
    text-align: center;
    border-bottom: 1px solid #979797;
    p{
      margin: 0;
    }
  }
}
</style>