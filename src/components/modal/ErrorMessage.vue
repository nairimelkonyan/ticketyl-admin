<template lang="pug">
  .div
    #error_modal.modal.fade(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            h2 Error
              i.material-icons error_outline
            
          .modal-body
            p#code
            p#message An error occured
</template>

<script>
  export default {
    data () {
      return { }
    }
  }
</script>

<style lang="less" scoped>         
button{
  outline: 0;
}
.modal-dialog{
  width: 402px;
}
.modal-close{
  padding: 10px 0;
  text-align: right;
  button {
    padding: 0;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    width: auto;
    border: none;
    background-color: transparent;
    outline: none !important;
  }
  .material-icons{
    font-size: 18px;
    vertical-align: text-bottom;
    padding-left: 4px;
  }
}
.modal-header {
  color: #292929;
  padding: 0;
  border-bottom: 0;
  text-align: left;
  border-bottom: 1px solid #979797;
  margin-bottom: 20px;
  h2{
    margin-top: 0;
    .material-icons {
      position: relative;
      top: 5px;
      margin-left: 5px;
      font-size: 32px;
    }
  }
}
.modal-body{
  padding: 0;
  text-align: left;
  p {
    text-transform: uppercase;
    color: #9a9a9a;
  }
}
.modal-content{
  background-color: #f7f7f7;
  border-radius: 0;
  padding: 24px 32px;
  border: none;
}
</style>
