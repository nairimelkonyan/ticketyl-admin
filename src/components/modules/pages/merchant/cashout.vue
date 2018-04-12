<template lang="pug">
  section
    tk-header-admin
    .content
      .container
        h2 Cashout
        .navigation
          .row
            .col-sm-12
              .menu-content
                .menu-body
                  button(@click='showRequest', v-bind:class="{ active: request }") Request Cashout
                  button(@click='showMethods', v-bind:class="{ active: methods }") Cashout Methods
                  button(@click='showHistory', v-bind:class="{ active: history }") Cashout History
        .history-body(v-if='history')
          .row
            .col-sm-12
              h3 Your Cashout History
              p See all of your cashouts and relevant data about them
              tk-table-cashout
        .methods-body(v-if='methods')
          .row
            .col-sm-8.col-sm-offset-2
              h3 Cashout Methods
              p Save your prefered cashout methods to withdraw your earnings
              .row
                .col-sm-10.col-sm-offset-2
                  h4 PayPal
                  .selected-method
                    .row
                      .col-sm-6
                        p PayPal email address
                      .col-sm-6
                        tk-input-type-text
                  h4 Bank Account
                  .bank-account
                    .row
                      .col-sm-6
                        p IBAN or account number
                      .col-sm-6
                        tk-input-type-text
                      .col-sm-6
                        p SWIFT code
                      .col-sm-6
                        tk-input-type-text
                      .col-sm-6
                        p Beneficiary Name
                      .col-sm-6
                        tk-input-type-text
                      .col-sm-6
                        p Bank Name
                      .col-sm-6
                        tk-input-type-text
                      .col-sm-6
                        p Bank Address
                      .col-sm-6
                        tk-input-type-text
                  tk-secondary-button.revert(name='revert to saved')
                  tk-primary-button(name='save changes')
        .content-body(v-if='request')
          .row
            .col-sm-8.col-sm-offset-2
              h3 Request Cashout
              p Create a request for a cashout, we process all requests every week on Wednesdays. The funds will arrive in your account in 7 to 10 working days.
              .cashout
                .row
                  .col-sm-4
                    .cashout-content
                      .cashout-body.cashout-left.text-center
                        h2 5 539
                          span .00
                          span &euro;
                        h4 Available for cashout
                  .col-sm-8
                    .cashout-content
                      .cashout-body.text-left
                        .dropdown
                        tk-cashout-method(:currency='currency')
                        p.user john_smith@ticketyl.com
                        .row
                          .col-sm-5
                            tk-input-type-text-admin-currency(placeholder='200.00')
                          .col-sm-7
                            tk-primary-button(name='request cashout')
              p.total Your total funds are 
                strong 6 193.00 €
                |, but we have to withhold a part of your income for savety reasons. We withhold a portion of your income for events that are yet to take place. Find out more in out 
                a(href='#') Terms and Conditions
    tk-footer-admin
</template>
<script>
  export default {
    data () {
      return {
        request: true,
        methods: false,
        history: false,
        currency: [ 'Paypal', 'Visa', 'Master', 'Bitcoin' ]
      }
    },
    methods: {
      showRequest () {
        this.request = true
        this.methods = false
        this.history = false
      },
      showMethods () {
        this.request = false
        this.methods = true
        this.history = false
      },
      showHistory () {
        this.request = false
        this.methods = false
        this.history = true
      }
    }
  }
</script>
<style lang="less" scoped>
.content{
  h2{
    margin: 46px 0 42px 0;
  }
}
.navigation{
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
  margin-bottom: 29px;
  .menu-content{
    display: table;
    height: 88px;
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
.content-body{
  margin-bottom: 160px;
  h3{
    margin: 0 0 8px 0;
    +p{
      margin-bottom: 24px;
    }
  }
  .cashout{
    border: 1px solid #292929;
    margin-bottom: 24px;
    .cashout-content{
      height: 200px;
      display: table;
      width: 100%;
      text-align: center;
      padding: 24px 16px;
      .cashout-left{
        border-right: 1px solid #979797;
      }
      .cashout-body{
        display: table-cell;
        vertical-align: middle;
        h2{
          margin: 0;
        }
        span{
          font-size: 18px;
          &:last-child{
            font-size: 14px;
            vertical-align: super;
          }
        }
        h4{
          font-size: 14px;
          text-transform: uppercase;
          font-weight: normal;
          color: #9a9a9a;
        }
        .user{
          font-size: 12px;
          margin-bottom: 24px;
        }
        .cashout-method{
          outline: 0;
          padding: 0;
          margin-bottom: 8px;
          border: none;
          text-transform: uppercase;
          text-decoration: underline;
          background-color: transparent;
          .material-icons{
            vertical-align: middle;
            margin-left: 8px;
            font-size: 20px;
          }
        }
      }
    }        
  }
  a{
    text-decoration: underline;
    text-transform: none;
    &:hover{
      color: #292929;
    }
  }
}
.dropdown-menu{
  border-radius: 0;
}
.dropdown-menu>li>a{
  text-decoration: none;
}
.methods-body{
  margin-bottom: 160px;
  h3{
    margin: 0 0 8px 0;
    +p{
      margin-bottom: 24px;
    }
  }
  .revert{
    margin-right: 32px;
  }
  .selected-method, .bank-account{
    border-bottom: 1px solid #979797;
    margin-bottom: 32px;
    input[type='text']{
      margin-bottom: 32px;
    }
    p{
      margin-top: 12px;
    }
  }
}
.history-body{
  margin-bottom: 160px;
  h3{
    margin: 0 0 8px 0;
    +p{
      margin-bottom: 24px;
    }
  }
}
</style>