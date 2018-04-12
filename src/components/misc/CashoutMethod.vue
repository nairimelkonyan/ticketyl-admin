<template lang="pug">
  .dropdown.account
    button#dLabel(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false') {{ selected_currency }}
      i.material-icons keyboard_arrow_down
    ul.dropdown-menu(aria-labelledby='dLabel')
      li
        span(v-for='c in currency', @click='selected(c)') {{ c }}
</template>

<script>
  export default {
    data () {
      return {
        selected_currency: this.currency[0]
      }
    },
    props: [
      'currency'
    ],
    methods: {
      selected (c) {
        this.selected_currency = c
        this.$emit('input', this.selected_currency)
      }
    }
  }
</script>

<style lang="less" scoped>
.dropdown.account{
  margin-bottom: 8px;
}
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
  top: 32px;
  left: 0;
  right: 0;
  margin-left: auto;
  li{
    span{
      width: 100%;
      transition: 0.3s;
      display: block;
      text-align: right;
      padding: 4px 8px;
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
    text-transform: uppercase;
    text-decoration: underline;
    font-size: 14px;
    color: #292929;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: none !important;
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
  top: 40px;
  transition: all 0.1s linear;
  -webkit-transition: all 0.1s linear;
}
@media(min-width:0px) and (max-width:767px){
  .dropdown-menu{
    min-width: 120px !important;
    margin-left: 0;
    &:after{
      left: 16px;
    }
    li{
      span{
        text-align: left;
      }
    }
  }
}
</style>
