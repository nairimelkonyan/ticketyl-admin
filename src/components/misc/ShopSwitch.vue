<template lang="pug">
  .dropdown.account(v-if="merchant")
    button#dLabel(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
      span(v-if="shop") {{ shop.code }}
      span(v-if="!shop") ---
      i.material-icons keyboard_arrow_down
    ul.dropdown-menu(aria-labelledby='dLabel')
      li
        span(v-for='shop in merchant.shops', @click='selected(shop)') {{ shop.code }}
</template>

<script>
  import * as types from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        merchant: 'merchant',
        shop: 'shop'
      })
    },
    methods: {
      selected (shop) {
        this.$store.commit(types.SHOP_SELECT, shop)
      }
    }
  }
</script>

<style lang="less" scoped>
.dropdown-menu{
  visibility: hidden;
  display: inline-block;
  z-index: 2;
  padding: 10px 0;
  border-radius: 0;
  margin: 0;
  min-width: 152px;
  border: none;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  opacity: 0;
  top: 40px;
  left: 0;
  right: 0;
  margin-left: auto;
  li{
    span{
      letter-spacing: 0.5px;
      width: 100%;
      transition: 0.3s;
      display: block;
      text-align: right;
      padding: 10px;
      font-size: 14px;
      cursor: pointer;
      color: #292929;
      text-decoration: none;
        &:hover{
        background-color: #f7f7f7;
        text-decoration: none;
      }
    }
  }
  &:after{
    z-index: -1;
    position: absolute;
    right: 16px;
    top: -7px;
    width: 16px;
    height: 16px;
    content: '';
    background-color: #fff;
    transform: rotate(135deg);
    box-shadow: -1px 1px 1px -1px rgba(0, 0, 0, 0.2);
  }
}
.account {
  display: inline-block;
  color: black;
  button{
    position: relative;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 24px;
    margin-left: 4px;
    color: #fff;
    border: none;
    background-color: transparent;
    padding: 0;
    padding-left: 24px;
    margin-left: 24px;
    outline: none !important;
    &:after{
      position: absolute;
      left: 0;
      top: 8px;
      width: 2px;
      height: 18px;
      content: '';
      background-color: #9a9a9a;
    }
    .material-icons{
      vertical-align: middle;
      font-size: 18px;
      padding-left: 8px;
    }
  }
}
.open > .dropdown-menu {
  visibility: visible;
  display: block;
  opacity:1;
  top: 48px;
  transition: all 0.1s linear;
  -webkit-transition: all 0.1s linear;
}
</style>
