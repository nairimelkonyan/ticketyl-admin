<template lang="pug">
  section
    .modal.fade#loadable_modal(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-body
            .modal-content-wrapper
              component(:is='modal_component', :data="modal_data")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['component', 'data'],
  methods: {},
  computed: {
    ...mapGetters({
      modal_component: 'modal_component',
      modal_data: 'modal_data'
    })
  }
}
</script>

<style lang="less" scoped>
  .modal-dialog{
    width: 570px;
  }
  .modal-close{
    padding: 10px 0;
    text-align: right;
    .material-icons{
      font-size: 18px;
      vertical-align: text-bottom;
      padding-left: 4px;
    }
    button{
      padding: 0;
      font-size: 14px;
      text-transform: uppercase;
      color: #fff;
      width: auto;
      border: none;
      background-color: transparent;
      outline: none !important;
    }
  }
  .modal-header{
    padding: 24px 0;
    border-bottom: 1px solid #979797;
    margin-bottom: 27px;
    h3{
      margin: 0 0 8px 0;
    }
    p{
      margin-bottom: 0;
    }
  }
  .modal-content-wrapper{
    padding: 0 32px 64px 32px;
  }
  .modal-body{
    padding: 0;
    h4{
      margin-bottom: 18px;
    }
  }
  .modal-content{
    background-color: #f7f7f7;
    border-radius: 0;
    border: none;
  }
  .modal-footer{
    text-transform: uppercase;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    padding: 0 32px;
    .footer-wrapper{
      display: table;
      height: 75px;
      width: 100%;
      .footer-body{
        display: table-cell;
        vertical-align: middle;
        .action{
          text-transform: uppercase;
          border: none;
          padding: 0;
          text-decoration: underline;
          background-color: transparent;
        }
      }
    }
  }
</style>