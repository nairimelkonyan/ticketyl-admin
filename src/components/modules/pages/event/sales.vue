<template lang="pug">
  section
    tk-header-admin
    .wrapper
      .container
        #booking-menu
          .row
            .col-sm-6
              .setup-content
                .setup-body
                  p Tickets and sales
                  h2 Dinner in the Sky
                    tk-tools(style='margin-left: 16px;')             
                  span public
            .col-sm-6.text-right
              .setup-content
                .setup-body
                  tk-primary-button(name='update event')
        nav
          .row
            .col-sm-12
              .menu-content
                .menu-body
                  button(@click='showSales', :class="{'active-nav': sales === true}") Sales Overview
                  button(@click='showCheck', :class="{'active-nav': check === true}") Check In
        main
          .row
            .col-sm-12
              h3 Sales Overview
              p All tickets sold for this event
          .sub-menu
            .row
              .col-sm-6.text-left
                button All sub events
                  i.material-icons keyboard_arrow_down
              .col-sm-6.text-right
                button Download exel file
          .row
            .col-sm-12
              tk-table-ticket-and-sales
    tk-footer-admin
</template>

<script>
  import store from '@/store'

  export default {
    data () {
      return {
        sales: true,
        check: false
      }
    },
    beforeRouteEnter (to, from, next) {
      if (store.getters.logInAdminToken === '') {
        next('/ticketyl')
      }
      next()
    },
    methods: {
      showSales () {
        this.sales = true
        this.check = false
      },
      showCheck () {
        this.sales = false
        this.check = true
      }
    }
  }
</script>

<style lang="less" scoped>
main{
  padding-bottom: 160px;
  h3{
    margin: 0 0 16px 0;
    +p{
      font-size: 18px;
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
nav{
  border-bottom: 1px solid #979797;
  margin-bottom: 30px;
  .menu-content{
    display: table;
    height: 80px;
    width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      button{
        font-size: 18px;
        padding: 0;
        outline: 0;
        background-color: transparent;
        border: none;
        margin-right: 61px;
      }
    }
  }
}
  #booking-menu{
    border-bottom: 1px solid #979797;
    .setup-content{
      display: table;
      height: 152px;
      width: 100%;
      .setup-body{
        display: table-cell;
        vertical-align: middle;
        p{
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
        h2{
          max-width: 700px;
          word-wrap: break-word;
          margin: 0 0 16px 0;
        }
        span{
          font-weight: bold;
          border: 1px solid #292929;
          text-transform: uppercase;
          padding: 4px;
        }
        button{
          margin-left: 24px;
        }
      }
    }
  }
  .active-nav{
    position: relative;
    font-weight: bold;
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
</style>