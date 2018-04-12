<template lang="pug">
  .search
    .input-group#searchField
      input#searchBox(type='text', :placeholder='placeholder', v-model='searchinput')
      span.input-group-btn
        button.btn.btn-secondary.input-black-button-arrow-right(type='button')
          i.material-icons.md-24#searchIcon search
</template>

<script>
  export default {
    data () {
      return {
        searchinput: ''
      }
    },
    props: [
      'placeholder'
    ]
  }
</script>

<style lang="less" scoped>
.search{
  display: inline-table;
  width: 100%;
}
.input-group-btn{
  .material-icons{
    color: #fff;
    vertical-align: middle;
    font-size: 18px;
  }
}
input[type='text']{
  font-size: 18px;
  border: 1px solid #292929;
}
button{
  border: none;
  background-color: #292929;
  padding: 0;
  position: relative;
  outline: none !important;
}
.fade-enter-active{
  transition: all .3s
}
.fade-enter{
  opacity: 0
}
.fade-leave-to, .fade-leave-active{
  transition: opacity 0s
}
.input-group{
  z-index: 1;
  input::placeholder {
    text-transform: uppercase;
  }
  input[type="text"]{
    width: 100%;
    min-height: 48px;
    padding: 10px;
    border-radius: 0;
  }
  button{
    transition: 0.3s;
    background-color: #292929;
    border: none;
    border-radius: 0;
    min-height: 48px;
    padding: 12px 14px;
  }
}
</style>
