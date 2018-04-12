<template lang="pug">
  .dropdown.tools
    button(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
      img(src="static/icn_more.svg")
    ul.dropdown-menu(aria-labelledby='dLabel')
      li
        span(@click='duplicateEvent') Duplicate
        span(@click='deleteEvent') Delete
</template>

<script>
  export default {
    methods: {
      duplicateEvent () {
        this.$emit('duplicateEvent')
      },
      deleteEvent () {
        this.$emit('deleteEvent')
      }
    }
  }
</script>

<style lang="less" scoped>
.dropdown-menu{
  visibility: hidden;
  display: inline-block;
  opacity: 0;
  z-index: 2;
  padding: 10px 0;
  border-radius: 0;
  margin: 0;
  border: none;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  min-width: 165px;
  top: 40px;
  left: -71.5px;
  right: 0;
  margin: auto;
    li{
      span{
        letter-spacing: 0.5px;
        width: 100%;
        transition: 0.3s;
        font-weight: normal;
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
    right: 0;
    left: 0;
    margin: auto;
    top: -7px;
    width: 16px;
    height: 16px;
    content: '';
    background-color: #fff;
    transform: rotate(135deg);
    box-shadow: -1px 1px 1px -1px rgba(0, 0, 0, 0.2);
  }
}
.tools {
  display: inline-block;
  color: black;
  button{
    vertical-align: middle;
    text-transform: uppercase;
    font-size: 14px;
    color: #292929;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: none !important;
  }
}
.open > .dropdown-menu {
  visibility: visible;
  display: block;
  opacity:1;
  transition: all 0.1s linear;
  -webkit-transition: all 0.1s linear;
  top: 48px;
}
</style>