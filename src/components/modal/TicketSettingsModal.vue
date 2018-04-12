<template lang="pug">
  .div
    button(type='button', data-toggle='modal', data-target='#ticketSettings') Ticket settings
    #ticketSettings.modal.fade(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-content-wrapper
            .modal-header
              h2 Ticket Settings
              p Adjust the preferences of this ticket type
            .modal-body
              h4 General
              p Ticket Description
              tk-text-area(placeholder='shortly about this ticket type')
              p Sales Channels
              tk-custom-select-string(style='margin-bottom: 24px;')
              p Ticket fees
              tk-custom-select-string(style='margin-bottom: 24px;')
              h4 Sales Dates
              p Ticket Sales Start
              .row
                .col-sm-6
                  tk-input-type-text
                .col-sm-6
                  tk-input-type-text
              p Ticket Sales End
              .row
                .col-sm-6
                  tk-input-type-text
                .col-sm-6
                  tk-input-type-text
              h4 Sales Order Sizes
              .row
                .col-sm-6
                  p Minimum Tickets
                  tk-input-type-text
                .col-sm-6
                  p Maximum Tickets
                  tk-input-type-text
          .modal-footer
            .row
              .col-sm-6.text-left
                .footer-wrapper
                  .footer-body
                    button.action cancel
              .col-sm-6
                .footer-wrapper
                  .footer-body
                    tk-primary-button(name='save settings')
</template>

<script>

</script>

<style lang="less" scoped>
button{
  outline: 0;
}
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
  margin-bottom: 24px;
  h2{
    margin: 0 0 8px 0;
  }
  p{
    margin-bottom: 0;
  }
}
.modal-content-wrapper{
  padding: 0 32px 32px 32px;
}
.modal-body{
  padding: 0;
  h4{
    margin-bottom: 18px;
  }
  input[type='text']{
    margin-bottom: 24px;
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
