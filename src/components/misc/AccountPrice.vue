<template lang="pug">
  .dropdown.accountPrice
    button#dLabel(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false') {{money}}
    ul.dropdown-menu(aria-labelledby='dLabel')
      li
        p This is the total money you have but we
          strong
            |  withold 25%
          |  of your income for events that are still to happen for safety reasons
</template>

<script>
export default {
  name: 'Price',
  data () {
    return {
      money: '6 193.00'
    }
  }
}
</script>

<style lang="less" scoped>
  .accountPrice:hover .dropdown-menu{
    visibility: visible;
    display: block;
    opacity:1;
    transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
    top: 170%;
  }
  .dropdown-menu{
    visibility: hidden;
    display: inline-block;
    opacity: 0;
    z-index: 2;
    background-color: #fff;
    padding: 15px;
    border-radius: 0;
    min-width: 250px;
    top: 125%;
    left: -80%;
  }
  p{
    font-size: 12px;
    margin: 0;
  }
  .dropdown-menu::after{
    z-index: -1;
    position: absolute;
    left: 42%;
    top: -10px;
    width: 0;
    height: 0;
    content: '';
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #fff;
  }
  .accountPrice {
    display: inline-block;
    color: black;
    button{
      outline: 0;
      font-weight: bold;
      font-size: 16px;
      padding-right: 32px;
      color: #fff;
      border: none;
      background-color: transparent;
    }
    button::after{
      content: "\f153";
      font: normal normal normal 14px/1 FontAwesome;
      font-size: 10px;
      position: absolute;
      top: 0;
      right: 20px;
    }
  }
</style>
