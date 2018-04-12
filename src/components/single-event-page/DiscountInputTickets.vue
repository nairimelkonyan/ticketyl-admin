<template lang="pug">
  .input-group
    input(type='text', :placeholder='placeholder', :value='inputValue', @input="$emit('input', $event.target.value)")
    span.input-group-btn
      button.btn.btn-secondary.input-black-button-arrow-right(type='button', @click="$emit('click')")
        i.material-icons arrow_forward
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: [
      'placeholder', 'translations'
    ],
    data () {
      return {
        inputValue: ''
      }
    },
    computed: {
      ...mapGetters({
        defaultLang: 'defaultLanguage',
        discountCode: 'get_voucher_code',
        giftCards: 'allSelectedgiftCards',
        getVoucherAmount: 'get_voucher_amount'
      })
    }
  }
</script>

<style lang="less" scoped>
.discount{
  position: relative;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  padding: 24px 16px;
  margin-bottom: 32px;
  h5{
    font-size: 14px;
    margin: 0;
    margin-bottom: 16px;
    text-transform: uppercase;
    color: #9a9a9a;
  }
  p{
    margin: 0;
  }
  .code{
    margin: 0 2px;
    color: #292929;
  }
  .amount{
    text-transform: uppercase;
    font-weight: bold;
  }
}
.valid{
  background-image: url('/static/ticket_texture.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.input-group{
  width: 100%;
  z-index: 1;
  input::placeholder {
    text-transform: uppercase;
  }
  input[type="text"]{
    width: 100%;
    padding: 10px 12px;
    min-height: 48px;
  }
  button{
    transition: 0.3s;
    background-color: #9a9a9a;
    border: none;
    border-radius: 0;
    padding: 11.5px 15px;
    height: 48px;
    &:hover{
      background-color: #a9a9a9;
    }
    .material-icons{
      color: #fff;
      font-size: 20px;
      vertical-align: middle
    }
  }
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  .redeem{
    margin-top: 24px;
    margin-left: -15px;
    margin-right: -15px;
  }
}
</style>
