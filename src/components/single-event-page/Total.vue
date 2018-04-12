<template lang="pug">
  section
    .content
      .total
        span {{ translations.aside_total_price | tktranslate(lang) }}
        span {{ basket.total | tkprice }}
    .gateways-content(v-if="shop")
      .gateways(v-for='e in shop.allowed_gateways')
        img(:src="'/static/' + e.translations.logo.en")
    tk-payment-method.visible-xs(@click='validate', :name="translations.checkout_footer_tickets_button | tktranslate(lang)", :orderDetails='orderDetails', :translations='translations', :cssstyle='translations.checkout_payment_button_style | tktranslate(lang)', :order='order', :show='show', :business='business') 
</template>

<script>
import PaymentMethod from '@/components/modal/PaymentMethod'
import { mapGetters } from 'vuex'

export default {
  props: ['translations', 'orderDetails', 'order', 'show', 'business'],
  data () {
    return {
      mobile: false
    }
  },
  methods: {
    validate () {
      this.$emit('validate')
    }
  },
  mounted () {
    const mq = window.matchMedia('(max-width: 767px)')
    if (mq.matches) {
      this.mobile = true
    }
  },
  computed: {
    ...mapGetters({
      basket: 'get_basket',
      lang: 'selectedLanguage',
      shop: 'shop'
    })
  },
  components: {
    tkPaymentMethod: PaymentMethod
  }
}
</script>

<style lang="less" scoped>
.gateways-content{
  text-align: center;
  padding: 8px;
  border-top: 1px solid #979797;
}
.gateways{
  display: inline-block;
}
section{
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  margin-top: 0;
  z-index: 9999;
  button{
    width: 100%;
  }
  .content{
    text-align: center;
    padding: 16px;
  }
  img{
    height: 40px;
    width: auto;
    margin-right: 10px;
  }
  .total{
    position: relative;
    width: 100%;
    height: 60px;
    span:first-child{
      text-transform: uppercase;
      color: #9a9a9a;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    span:last-child{
      font-size: 48px;
      font-weight: bold;
      position: absolute;
      right: 0;
      bottom: -12px;
    }
  }
}
/* Media Queries */
@media(min-width:0px) and (max-width:767px){
  .gateways-content{
    padding: 16px 8px;
  }
  section{
    width: 100%;
    position: absolute;
    background-color: #fff;
    bottom: -260px;
    margin: 0;
    margin-left: -16px;
  }
  .total{
    span{
      &:last-child{
        font-size: 36px !important;
        right: 0;
      }
      &:first-child{
        bottom: 0;
      }
    }
  }
}
/* Extra Small */
@media(min-width:768px) and (max-width:991px){
  .total{
    span{
      &:last-child{
        font-size: 40px;
        left: 0;
      }
      &:first-child{
        top: 0;
      }
    }
  }
}
/* Medium */
@media(min-width:992px) and (max-width:1199px){
  .total{
    span{
      &:last-child{
        font-size: 40px;
      }
    }
  }
}
</style>