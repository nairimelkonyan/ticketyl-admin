<template lang="pug">
  .div
    tk-secondary-button(type='button', data-toggle='modal', data-target='#subscription', name='subscription') 
    #subscription.modal.fade(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
          .modal-body
            h3 Is this Subscription ready?
            h4 Make sure all of the information is correct
            p The following details cannot be changed afterwards:
            ul
              li Subscription Name -
                strong A Year of TED
              li Total Events - 
                strong 12
            p This is the key data about the event:
            ul
              li Total vailable subscriptions -
                strong 200
              li Subscription price - 
                strong 250 eur
          .modal-footer
            .row
              .col-sm-4.text-left
                .footer-wrapper
                  .footer-body
                    button.action Cancel
              .col-sm-8.text-right
                .footer-wrapper
                  .footer-body
                    tk-primary-button(name='publish subscription')
</template>

<script>

</script>

<style lang="less" scoped>
.modal-header{
  height: 300px;
  background-image: url('/static/subscription.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}              
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
  padding: 0;
  border-bottom: 0;
}
.modal-body{
  padding: 24px 32px;
  text-align: left;
  ul{
    margin-bottom: 16px;
  }
  h3{
    margin-top: 0;
  }
  h3,h4{
    color: #292929;
  }
  h4{
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 16px;
    margin-bottom: 21px;
    border-bottom: 1px solid #979797;
  }
  span{
    text-transform: uppercase;
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
