<template lang="pug">
  .div
    button.action(type='button', data-toggle='modal', data-target='#cancel-event')
    #cancel-event.modal(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            .modal-header-content
              h3 Cancel Event
          .modal-body
            .cancel
              h4 1. Cancellation Terms
              p Choose the procedure of cancelling this event
              input#fully(type='radio', name='ticket', value='fully')
              label(for="fully") Refund all tickets fully 
                span.price (100% - 6 135 $)
              input#partially(type='radio', name='ticket', value='partially')
              label(for="partially") Refund all tickets partially 
                span.price (65% - 4 032 $)
            .email
              h4 2. Email Attendees
              p Inform all attendees about the cancellation of this event
              .row
                .col-sm-10
                  p Name
                  tk-input-type-text(style='margin-bottom: 24px;')
                  p Reply To
                  tk-input-type-text(style='margin-bottom: 24px;')
                  p Send To
                  tk-custom-select-string(:options='send', style='margin-bottom: 24px;')
                  p Subject
                  tk-input-type-text(style='margin-bottom: 24px;')
                  p Message
                  tk-text-area(style='margin-bottom: 24px;')
          .modal-footer
            .row
              .col-sm-12.text-right
                .footer-wrapper
                  .footer-body
                    tk-primary-button(name='cancel event')
</template>

<script>
  export default {
    data () {
      return {
        create: true,
        assigned: false,
        send: [ 'All attendees', 'All attendees', 'All attendees' ]
      }
    },
    methods: {
      showCreate () {
        this.create = true
        this.assigned = false
      },
      showAssigned () {
        this.create = false
        this.assigned = true
      }
    }
  }
</script>

<style lang="less" scoped>
h4 + p{
  font-size: 18px;
  margin-bottom: 16px;
}
.price{
  color: #9a9a9a;
}
.cancel{
  padding: 16px 0;
  border-bottom: 1px solid #979797;
}
.email{
  padding: 16px 0;
}
.radio{
  margin-bottom: 24px;
}
.margin{
  margin-top: 12px;
}
.div{
  display: inline-block;
}
.save{
  padding: 24px 0;
  margin-bottom: 27px;
  border-bottom: 1px solid #979797;
}
.action{
  margin-left: 16px;
  padding: 0;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  text-decoration: underline;
}              
button{
  outline: 0;
}
.modal-dialog{
  width: 670px;
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
  color: #292929;
  padding: 24px 32px 0 32px;
  border-bottom: 0;
  text-align: center;
  margin-bottom: 0;
  .modal-header-content{
    border-bottom: 1px solid #979797;
    padding-bottom: 24px;
  }
  h3{
    margin: 0;
  }
  h2{
    margin-top: 0;
  }
  p{
    margin-bottom: 0;
  }
}
.modal-body{
  padding: 0 32px 24px 32px;
  text-align: left;
  h4{
    margin-bottom: 8px;
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
nav{
  border-bottom: 1px solid #979797;
  margin-bottom: 27px;
  .menu-content{
    display: table;
    height: 88px;
    width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      a{
        text-transform: none;
        position: relative;
        text-decoration: none;
        margin-right: 50px;
        color: #292929;
        font-size: 18px;
        .router-link-exact-active{
          position: relative;
          width: 10px;
          height: 2px;
          -webkit-text-stroke: 1px #292929;
          &:after{
            content: "";
            position: absolute;
            width: 10px;
            height: 1px;
            background-color: #292929;
            left: 0;
            right: 0;
            bottom: -10px;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
.navigation{
  .menu-content{
    display: table;
    height: 78px;
    width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      button{
        border: none;
        outline: 0;
        background-color: transparent;
        padding: 0;
        text-transform: none;
        position: relative;
        text-decoration: none;
        margin-right: 50px;
        color: #292929;
        font-size: 18px;
      }
    }
  }
}
.active{
  position: relative;
  height: 2px;
  font-weight: bold;
  &:after{
    content: "";
    position: absolute;
    width: 10px;
    height: 1px;
    background-color: #292929;
    left: 0;
    right: 0;
    bottom: -32px;
    margin: 0 auto;
  }
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
.assigned{
  h4{
    margin-bottom: 27px;
  }
}
</style>
