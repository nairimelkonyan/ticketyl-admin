<template lang="pug">
  section
    tk-header-admin
    main
      .transaction-details
        #transactionDetails.modal.fade(role='dialog')
          .modal-dialog
            .modal-close
              button(data-dismiss="modal") Close
                i.material-icons clear
            .modal-content(v-if="selected_order")
              .modal-content-wrapper
                .modal-header
                  h3 Transaction Details
                  p Control all activities regarding processing your client purchases
                .modal-body
                  #info
                    .row
                      .col-sm-6.text-left: h5 {{ formatDate(selected_order.date.date) }}
                      .col-sm-6.text-right: p Transaction Total
                  #info-sub
                    .row
                      .col-sm-6.text-left
                        h3 {{ selected_order.buyer.name }}
                          tk-tools(style='margin-left: 8px;')
                      .col-sm-6.text-right
                        h3 {{ selected_order.price | tkprice }}
                  #info-status
                    .row
                      .col-sm-6.text-left
                        p {{ selected_order.buyer.email }} | {{ selected_order.buyer.phone }}
                      .col-sm-6.text-right
                        span Reservation
                          i.material-icons(v-if="selected_order.status === 'approved'") check_circle
                          i.material-icons(v-if="selected_order.status !== 'approved'") query_builder
                        span Payment
                          i.material-icons(v-if="actual_transaction && selected_order.actual_transaction.status === 'approved'") check_circle
                          i.material-icons(v-if="actual_transaction && selected_order.actual_transaction.status !== 'approved'") query_builder
                  nav
                    .row
                      .col-sm-12
                        .menu-content
                          .menu-body
                            button(@click='showOverview', :class="{ active : overview }") Overview
                            // button(@click='showComment', :class="{ active : comment }") Comment
                            button(@click='showHistory', :class="{ active : history }") Log
                  .history(v-if='history')
                    h4 Log
                    .reservation-table
                      .row(v-for="(log, index) in selected_order.log")
                        .col-sm-12: p {{ log.message }}
                      br
                    .reservation-table
                      .row(v-for="(request, index) in selected_order.requests")
                        .col-sm-5: p {{ request.delay.toFixed(2) }}s {{ request.method }} {{ request.path }}
                        .col-sm-3: p {{ request.ip }}
                        .col-sm-3: p {{ formatDate(request.date.date) }}
                      br
                  .comment(v-if='comment')
                    h4 Ticket Comment
                    p Save special information such as bonus goods or allergires about each ticket
                    h4.ticket Ticket 1
                    p Row 
                      strong 12 
                      | | Seat 
                      strong 24a
                    .textarea
                      tk-text-area(style='margin-bottom: 0;', placeholder='comment')
                    tk-secondary-button.revert(name='revert to saved')
                    tk-primary-button(name='save changes')
                  .reservation-details-main(v-if='overview')
                    .row
                      .col-sm-12
                        h4.details Reservation Details
                    .reservation-table
                      .row
                        .col-sm-4
                          h5 Reservation ID
                          p {{ selected_order.code }}
                        .col-sm-4
                          h5 Reservation status
                          p {{ selected_order.status }}
                    
                    //-
                      .action-menu
                        .row
                          .col-sm-4
                            //tk-secondary-button(name='reschedule')
                          .col-sm-4
                            button.action Refund payment
                          .col-sm-4
                            button.action Cancel reservation
                    .row
                      .col-sm-12
                        h4.details Tickets / Gift Cards / Subscriptions
                    .reservation-table
                      .row
                        .col-sm-3: h5 Count
                        .col-sm-3: h5 Ticket price
                        .col-sm-3: h5 Sub total
                      .row(v-for="(line, index) in selected_order.order_lines")
                        .col-sm-3: p {{ line.amount }}
                        .col-sm-3: p {{ line.product.price | tkprice }}
                        .col-sm-3: p {{ { amount: line.product.price.amount * line.amount, currency: line.price.currency } | tkprice }}
                      br

                    //-
                      .action-menu
                        .row
                          .col-sm-4
                            tk-disabled-button(name='send pdf')
                          .col-sm-4
                            button.action generate pdf
                          .col-sm-4
                            button.action download pdf

                    .row(v-if="selected_order.transactions.length")
                      .col-sm-12
                        h4.details Payment
                        .reservation-table
                          .row
                            .col-sm-3: h5 Payment ID
                            .col-sm-3: h5 Gateway
                            .col-sm-3: h5 Payment status
                            .col-sm-3: h5 started
                          .row(v-for="(transaction, index) in selected_order.transactions")
                            .col-sm-3: p {{ transaction.code }}
                            .col-sm-3: p {{ transaction.gateway.code }}
                            .col-sm-3: p {{ transaction.status }}
                            .col-sm-3: p {{ formatDate(transaction.date.date) }}
                          br


                    //-
                      .action-menu-last
                        .row
                          .col-sm-4
                            button.action(@click='showPersonal') buying as personal
                          .col-sm-4
                            button.action(@click='showBusiness') buying as business
                          .col-sm-4
                            button.action Generate invoice url
                      transition(name='slide-fade')
                        .buying-business(v-if='personal')
                          .business-details
                            h4 Personal Info
                            .row
                              .col-sm-6
                                p Title
                              .col-sm-6
                                tk-custom-select-string(:options='title', style='margin-bottom: 24px;')
                              .col-sm-6
                                p First Name
                              .col-sm-6
                                tk-input-type-text
                              .col-sm-6
                                p Last Name
                              .col-sm-6
                                tk-input-type-text
                              .col-sm-6
                                p Email Address
                              .col-sm-6
                                tk-input-type-text
                          .business-address
                            h4 Buyer Address
                            .row
                              .col-sm-6
                                p Country
                              .col-sm-6
                                tk-custom-select-string(:options='countries', style='margin-bottom: 24px;')
                              .col-sm-6
                                p Street, Address, Number
                              .col-sm-6
                                tk-input-type-text
                              .col-sm-6
                                p City / Province
                              .col-sm-6
                                tk-input-type-text
                              .col-sm-6
                                p ZIP / Postal Code
                              .col-sm-6
                                tk-input-type-text
                          .business-save
                            .row
                              .col-sm-6
                                tk-secondary-button(name='save personal details')
                              .col-sm-6.text-right
                                button(@click='closePersonal').closebtn Close
                                  i.material-icons clear
                      transition(name='slide-fade')
                      .buying-business(v-if='business')
                        .business-details
                          h4 Business details
                          .row
                            .col-sm-6
                              p Company name
                            .col-sm-6
                              tk-input-type-text
                            .col-sm-6
                              p Registration No.
                            .col-sm-6
                              tk-input-type-text
                            .col-sm-6
                              p Tax Number
                            .col-sm-6
                              tk-input-type-text
                        .business-address
                          h4 Business address
                          .row
                            .col-sm-6
                              p Country
                            .col-sm-6
                              tk-custom-select-string(:options='countries', style='margin-bottom: 24px;')
                            .col-sm-6
                              p Street, Address, Number
                            .col-sm-6
                              tk-input-type-text
                            .col-sm-6
                              p City / Province
                            .col-sm-6
                              tk-input-type-text
                            .col-sm-6
                              p ZIP / Postal Code
                            .col-sm-6
                              tk-input-type-text
                        .business-save
                          .row
                            .col-sm-6
                              tk-secondary-button(name='save business details')
                            .col-sm-6.text-right
                              button(@click='closeBusiness').closebtn Close
                                i.material-icons clear
      .container
        .row
          .col-sm-12
            h1 Transaction Manager
            h3 Transaction Activity
            p Manage buyer, reservation and transaction details
        .row
          .col-sm-6
            tk-static-search(placeholder='Search by anything', style='margin-bottom: 8px;')
          .col-sm-6
        .sub-menu
          .row
            .col-sm-6.text-left
              button Dinner in the Sky
                i.material-icons keyboard_arrow_down
              button Status
                i.material-icons keyboard_arrow_down
              button Download exel file
            .col-sm-6.text-right
              button Last 30 days
                i.material-icons keyboard_arrow_down
        .row
          .col-sm-12
            table
              thead
                tr.header
                  th(scope='col') Transaction Date (Time)
                  th(scope='col') First Name
                  th(scope='col') Last Name
                  th(scope='col') Event Name, Time
                  th(scope='col') Transaction Total
                  th(scope='col') Reservation
                  th(scope='col') Payment
              tbody
                tr(v-for='(order, index) in orders', @click="show(order)")
                  td(data-label='Transaction Date') {{ formatDate(order.date.date) }}
                  td(data-label='First Name') {{ order.buyer.configuration.first_name }}
                  td(data-label='Last Name') {{ order.buyer.configuration.last_name }}
                  td(data-label='Event Name') -
                  td(data-label='Transaction Total') {{ order.price | tkprice }}
                  td(data-label='Reservation') {{ order.status }}
                  td(data-label='Payment'): span(v-if="order.actual_transaction") {{ order.actual_transaction.status }}
                    //i.material-icons cancel
                tr.footer
                  td(data-label='Total', colspan='8', style='text-align: right;') Total Transactions: 
                    strong {{ orders.length }}
    tk-footer-admin
</template>

<script>
  import store from '@/store'
  import moment from 'moment'
  import { mapGetters } from 'vuex'
  import api from '@/services/TicketylOS/TicketylOS'

  export default {
    data () {
      return {
        personal: false,
        business: false,
        overview: true,
        history: false,
        comment: false,
        countries: [
          'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
          'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia',
          'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia',
          'Slovenia', 'Spain', 'Sweden', 'United Kingdom'
        ],
        title: [ 'Mr.', 'Ms' ],
        currentOrder: null,
        orders: [],
        selected_order: null
      }
    },
    computed: {
      ...mapGetters({
        token: 'logInAdminToken'
      })
    },
    methods: {
      showHistory () {
        this.history = true
        this.overview = false
        this.comment = false
      },
      showOverview () {
        this.overview = true
        this.comment = false
        this.history = false
      },
      showComment () {
        this.comment = true
        this.overview = false
        this.history = false
      },
      showPersonal () {
        this.personal = true
        this.business = false
      },
      showBusiness () {
        this.business = true
        this.personal = false
      },
      closeBusiness () {
        this.business = false
      },
      closePersonal () {
        this.personal = false
      },
      formatDate (date) {
        return moment(date).format('DD.MM.YYYY (hh:mm)')
      },
      show (o) {
        this.selected_order = o
        window.jQuery('#transactionDetails').modal('show')
      }
    },
    beforeRouteEnter (to, from, next) {
      if (store.getters.logInAdminToken === '') {
        next('/ticketyl')
      }
      next()
    },
    created () {
      api
        .token(this.token)
        .admin().merchant().orders()
        .then(response => {
          console.log('X', response)
          this.orders = response
        })
    }
  }
</script>

<style lang="less" scoped>
  table {
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    tbody{
      font-size: 18px;
    }
    .footer{
      font-size: 14px;
      border-bottom: none;
      text-transform: uppercase;
    }
  }
  table caption {
    color: #292929;
    font-size: 18px;
  }
  .header{
    color: #fff;
    text-transform: none;
    background-color: #9a9a9a;
    &:hover{
      background-color: #9a9a9a !important;
    }
  }
  table tr {
    background: #f7f7f7;
    border-bottom: 1px solid #979797;
    &:hover{
      background-color: #e4e4e4;
    }
  }
  table th{
    padding: 16px;
  }
  table td {
    padding: 26px 16px;
    text-align: left;
    &:hover{
      cursor: pointer;
    }
    &:nth-child(6){
      font-size: 12px;
    }
    &:nth-child(7){
      font-size: 12px;
    }
    .material-icons{
      font-size: 16px;
      padding-left: 8px;
      vertical-align: sub;
    }
  }
  table th {
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    table {
      border: 0;
    }
    table caption {
      font-size: 1.3em;
    }
    table thead {
      font-size: 14px;
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    table tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: .625em;
    }
    table td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: .8em;
      text-align: right;
    }
    table td:before {
      /*
      * aria-label has no advantage, it won't be read inside a table
      content: attr(aria-label);
      */
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
    table td:last-child {
      border-bottom: 0;
    }
  }
  .closebtn{
    outline: 0;
    border: none;
    padding: 0;
    margin-top: 16px;
    background-color: transparent;
    text-transform: uppercase;
    text-decoration: underline;
    margin-right: 4px;
    .material-icons{
      font-size: 20px;
      vertical-align: bottom;
    }
  }
  .history{
    h4{
      margin-bottom: 32px;
    }
  }
  .comment{
    h4{
      margin-bottom: 18px;
      &+p{
        margin-bottom: 14px;
      }
    }
    .ticket{
      margin-bottom: 14px;
      &+p{
        margin-bottom: 14px;
      }
    }
    .textarea{
      padding-bottom: 32px;
      margin-bottom: 32px;
      border-bottom: 1px solid #979797;
    }
    .revert{
      margin-right: 32px;
    }
  }
  .active{
    position: relative;
    -webkit-text-stroke: 1px #292929;
    &:after{
      content: '';
      position: absolute;
      width: 8px;
      height: 1px;
      background-color: #292929;
      left: 0;
      right: 0;
      margin: auto;
      top: 32px;
    }
  }
  .business-address{
    border-bottom: 1px solid #979797;
    padding-top: 36px;
    padding-bottom: 24px;
    margin-bottom: 24px;
    h4{
      margin-top: 0;
      margin-bottom: 24px;
    }
    p{
      margin-top: 12px;
    }
    input[type='text']{
      margin-bottom: 24px;
    }
  }
  .business-details{
    border-top: 1px solid #979797;
    border-bottom: 1px solid #979797;
    padding-top: 36px;
    padding-bottom: 24px;
    h4{
      margin-top: 0;
      margin-bottom: 24px;
    }
    p{
      margin-top: 12px;
    }
    input[type='text']{
      margin-bottom: 24px;
    }
  }
  .text-left{
    button{
      margin-right: 32px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
  main{
    padding-bottom: 160px;
    h1{
      margin: 0;
      padding: 42px 0;
      margin-bottom: 21px;
      border-bottom: 1px solid #979797;
    }
    h3{
      margin-bottom: 14px;
      +p{
        font-size: 14px;
        margin-bottom: 18px;
      }
    }
  }
  .sub-menu{
    padding: 24px 0;
    margin-bottom: 16px;
    button{
      outline: 0;
      border: none;
      padding: 0;
      background-color: transparent;
      text-transform: uppercase;
      text-decoration: underline;
      .material-icons{
        font-size: 20px;
        vertical-align: bottom;
        padding-left: 8px;
      }
    }
  }
  /* Modal */
  .modal-dialog{
    width: 770px;
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
  .modal-body{
    padding: 0;
  }
  .modal-content{
    background-color: #f7f7f7;
    border-radius: 0;
    border: none;
  }
  .modal-content-wrapper{
    padding: 0 32px 56px 32px;
  }
  #info{
    margin-bottom: 10px;
    h5{
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }
    p{
      color: #9a9a9a;
      text-transform: uppercase;
      margin: 0;
    }
  }
  #info-sub{
    margin-bottom: 8px;
    h3{
      margin: 0;
    }
  }
  #info-status{
    padding-bottom: 26px;
    border-bottom: 1px solid #979797;
    p{
      margin: 0;
    }
    span{
      font-size: 12px;
      font-weight: bold;
      margin-left: 16px;
      .material-icons{
        font-size: 12px;
        margin-left: 8px;
        vertical-align: sub;
      }
    }
  }
  nav{
    border-bottom: 1px solid #979797;
    margin-bottom: 20px;
    .menu-content{
      display: table;
      height: 68px;
      width: 100%;
      .menu-body{
        display: table-cell;
        vertical-align: middle;
        button{
          outline: 0;
          border: none;
          background-color: transparent;
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
  .reservation-table{
    padding: 16px 16px 0 16px;
    border: 1px solid #979797;
    margin-bottom: 27px;
    .col-sm-4{
      margin-bottom: 16px;
    }
    h5{
      text-transform: uppercase;
      color: #9a9a9a;
      margin: 0 0 4px 0;
    }
    p{
      margin: 0;
    }
  }
  .details{
    margin: 0 0 20px 0;
  }
  .action{
    padding: 0;
    outline: 0;
    border: none;
    background-color: transparent;
    text-transform: uppercase;
    text-decoration: underline;
    margin-top: 12px;
  }
  .action-menu{
    border-bottom: 1px solid #979797;
    padding-bottom: 27px;
    margin-bottom: 20px;
  }
  .action-menu-last{
    padding-bottom: 27px;
    margin-bottom: 20px;
  }
  .modal-button{
    outline: 0;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
</style>