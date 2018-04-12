<template lang="pug">
  modal-content(footer)
    h3(slot='header') {{ translations.event_page_calendar | tktranslate(lang) }}
    div
      .row
        .col-xs-12
          .event-date-nav
            button(@click="switchModal") {{ translations.choose_event_tab | tktranslate(lang) }}
            button.active-nav {{ translations.shopping_cart_tab | tktranslate(lang) }}
            span.ticket-count(v-if='cart.length') {{ cart.length }}
      p.paragraph(v-if='cart.length > 0') Once you have the choices you wish in your basket, you are ready to continue to the checkout
      tk-table-basket.hidden-xs(v-if='cart.length > 0' :translations='translations')
      tk-table-basket-xs.hidden-sm.hidden-md.hidden-lg(v-if='cart.length > 0' :translations='translations')
      .empty(v-else)
        img(src='/static/cart_emptystate.svg')
        p.infoparagraph Select tickets an they will appear here
        // tk-primary-button(@click="switchModal", name='tickets')
    .row(slot='footer')
      .col-xs-12
        .footer-wrapper
            tk-primary-button(v-if='this.$route.name === "Checkout"' name='continue shopping' data-dismiss="modal")
            tk-primary-button(:name="translations.event_page_ticket_list_button | tktranslate(lang)", @click='toCheckout', v-if='cart.length && this.$route.name !== "Checkout"')
            tk-disabled-button(:name="translations.event_page_ticket_list_button | tktranslate(lang)", v-if='!cart.length && this.$route.name !== "Checkout"')
</template>

<script>
// import * as types from '@/store/mutation-types'
import moment from 'moment'
// import Api from '@/services/ApiService'
import ModalContent from '@/components/modal/ModalContentEvents'
import { mapGetters } from 'vuex'

export default {
  props: ['event', 'translations'],
  data () {
    return { seatingPlan: 'null' }
  },
  computed: {
    ...mapGetters({
      lang: 'selectedLanguage',
      cart: 'get_cart',
      shop: 'shop'
    }),
    date () {
      return moment(this.event.datetime.date).format('ddd, DD MMM (hh:mm)')
    }
  },
  components: {
    'modal-content': ModalContent
  },
  methods: {
    translate (translate) {
      return this.$options.filters.translate(translate)
    },
    differentDateClicked () {
      this.$emit('differentDate')
    },
    switchModal () {
      this.$emit('differentDate')
    },
    toCheckout () {
      this.$emit('toCheckout')
    }
  }
}
</script>

<style lang="less" scoped>
.infoparagraph{
  padding-bottom: 16px;
  text-transform: none;
}
.paragraph{
  text-align: left;
  padding-bottom: 16px;
}
.empty{
  text-align: center;
  margin-bottom: 56px;
  img{
    height: 120px;
    margin-bottom: 16px;
  }
}
.ticket-count{
  font-size: 12px;
  text-align: center;
  vertical-align: super;
  background-color: #292929;
  color: #fff;
  margin-left: 8px;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
  .event-date-nav{
    margin-bottom: 40px;
    text-align: center;
    button{
      font-size: 18px;
      padding: 0;
      outline: 0;
      background-color: transparent;
      border: none;
      &:first-child{
        margin-right: 32px;
      }
      &:nth-child(2){
        margin-left: 32px;
      }
    }
    .active-nav{
      position: relative;
      -webkit-text-stroke: 1px #292929;
      &:after{
        content: '';
        position: absolute;
        width: 8px;
        height: 1px;
        background-color: #292929;
        left: 0;
        right: 0;
        margin: auto;
        top: 32px;
      }
    }
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
  button{
    outline: 0;
  }
  .error{
    p{
      font-size: 14px !important;
      color: #f71e1e;
      margin: 0;
    }
  }
  .valid{
    p{
      font-size: 14px !important;
      color: #292929;
      margin: 0;
    }
  }
   .footer-wrapper{
     display: table;
     height: 46px;
     width: 100%;
     .footer-body{
       display: table-cell;
       vertical-align: middle;
       p{
         text-transform: uppercase;
         margin: 0;
         text-align: left;
       }
       strong{
         margin-left: 8px;
       }
     }
   }
  .modal-header{
    text-align: center;
    h3{
      margin: 0;
    }
  }
  .info{
    text-align: center;
    padding: 16px;
    text-transform: uppercase;
    .date{
      text-transform: capitalize;
    }
    button{
      border: none;
      padding: 0;
      background-color: transparent;
      text-transform: uppercase;
      text-decoration: underline;
    }
    strong{
      margin-right: 8px;
    }
    .col-sm-4:first-child{
      text-align: left;
    }
    .col-sm-4:last-child{
      text-align: right;
    }
  }
  .soldOut{
    color: #9a9a9a;
  }
  .tickets{
    background-color: #fff;
    padding: 16px;
    margin-bottom: 16px;
    .col-sm-6:last-child{
      text-align: right;
    }
    .selected{
      margin-top: 16px;
      padding: 10px 0;
      border-top: 1px solid #979797;
      p{
        margin: 0;
      }
      .selected-wrapper{
        display: table;
        height: 60px;
        width: 100%;
        .selected-body{
          display: table-cell;
          vertical-align: middle;
        }
      }
    }
    .col-sm-6:last-child{
      text-align: right;
    }
    .content-wrapper{
      display: table;
      width: 100%;
      height: 90px;
      .content-body{
        display: table-cell;
        vertical-align: middle;
        .sold{
          border: 1px solid #292929;
          text-transform: uppercase;
          font-weight: bold;
          padding: 5px;
        }
        h3{
          margin: 0 0 8px 0;
        }
        h3 + p{
          margin-bottom: 0;
        }
      }
    }                
  }
  .div{
    display: inline-block;
    margin-left: 20px;
  }
  .modal-dialog{
    max-width: 770px;
  }
  .modal-body{
    text-align: left;
    .create{
      text-transform: uppercase;
      border: none;
      text-decoration: underline;
      background-color: transparent;
      padding: 0;
    }
    padding: 16px;
    p:first-child{
      font-weight: bold;
      margin: 0;
    }
    a{
      display: block;
      font-size: 14px;
      text-transform: none;
      text-decoration: none;
      margin-bottom: 10px;
    }
    .signIn{
      display: block;
      width: 100%;
      margin-bottom: 25px;
      transition: 0.3s;
      background-color: #292929;
      text-transform: uppercase;
      font-size: 18px;
      color: #fff;
      padding: 10px 18px;
      border: none;
      &:hover{
        background-color: #424242;
      }
    }
  }
  .modal-content-wrapper{
    padding: 0 !important;
  }
    .modal-close{
      padding: 10px 0;
      text-align: right;
      button{
        padding: 0;
        font-size: 14px;
        text-transform: uppercase;
        color: #fff;
        border: none;
        background-color: transparent;
      }
    }
    .footer-col-wrapper{
      display: table;
      height: 50px;
      width: 100%;
      .footer-col{
        display: table-cell;
        vertical-align: middle;
      }
    }
    .modal-footer{
      background-color: #fff;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
      .col-sm-6:first-child{
        text-align: left;
        button{
          text-transform: uppercase;
          text-decoration: underline;
          color: #292929;
          background-color: transparent;
        }
      }
    }
    .modal-content{
      background-color: #f7f7f7;
      border-radius: 0;
      textarea{
        color: #9a9a9a;
        font-size: 18px;
        padding: 10px;
        text-transform: uppercase;
        width: 100%;
      }
    }
    .nav{
      padding: 0;
      margin-bottom: 32px;
      .active{
        position: relative;
        font-weight: bold;
        &:after{
          transition: 0.3s;
          position: absolute;
          content: '';
          width: 16px;
          height: 1px;
          background-color: #292929;
          bottom: -16px;
          margin-left: auto;
          margin-right: auto;
          left: 0;
          right: 0;
        }
      }
      a{
        font-size: 18px;
        display: inline-block;
        margin: 0;
        &:hover{
          color: #292929;
        }
      }
    .col-xs-6:first-child{
      text-align: right;
    }
     .col-sm-6:last-child{
      text-align: left;
    }
  }
  .discount{
    padding: 16px 0;
    p{
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 0;
      text-transform: capitalize;
      margin-top: 12px;
    }
  }
  .fade-enter-active{
    transition: all .5s
  }
  .fade-enter /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  .fade-leave-to, .fade-leave-active{
    transition: opacity 0s
  }
  .spinner{
    text-align: right;
  }
  @media(min-width:0px) and (max-width:767px){
    .event-date-nav{
      text-align: left;
      button{
        &:first-child{
          margin-right: 0;
          margin-bottom: 16px;
          display: block;
        }
        &:nth-child(2){
          margin-left: 0;
          display: inline-block;
        }
      }
    }
    .spinner{
      text-align: left;
    }
    .modal-footer{
      padding: 8px 18px 18px 18px;
      .col-xs-6:first-child p{
        text-align: left;
      }
      .total-footer{
        text-align: right !important;
      }
      button{
        width: 100%;
      }
    }
    .tickets{
      .content-wrapper{
        height: 64px;
      }
      .col-sm-6:last-child{
        text-align: left;
      }
    }
    .nav{
      margin-bottom: 24px;
      .row{
        .col-xs-6:first-child{
          text-align: right;
        }
      }
    }
    .info{
      padding: 16px 0;
      .row{
        .col-xs-12{
          text-align: center;
          margin-bottom: 24px;
        }
        .col-xs-6{
          text-align: left;
        }
        .col-xs-6:last-child{
          text-align: right;
        }
        .date{
          margin: 0;
        }
      }
    }
    .footer-body{
      p {
        text-align: left;
      }
      button{
        width: 100%;
      }
    }
  }
</style>
