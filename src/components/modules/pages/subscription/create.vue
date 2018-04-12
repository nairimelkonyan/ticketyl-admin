<template lang="pug">
  section
    tk-header-admin
    .wrapper
      .container
        #page
          .row
            .col-sm-6
              .setup-content
                .setup-body
                  p Subscription Setup
                  h2(v-if='!info.name') New Subscription
                  h2(v-if='info.name') {{ info.name }}
                  span.status draft
            .col-sm-6.text-right
              .setup-content
                .setup-body
                  tk-secondary-button(name='save as draft')
                  tk-primary-button(name='publish subscription')
        #content
          .row
            .col-sm-10.col-sm-offset-1
              #basic-details
                .row
                  .col-sm-8
                    h3 1. Basic Details
                    p A meaningful title unifying the group of events
                    span * Subscription Name
                    span.count.pull-right {{ info.name.length }} / 50
                    tk-input-type-text(placeholder='a short and recognizable title', style='margin-bottom: 32px;', maxlength='50', v-model='info.name', v-validate.initial="'required|alpha_num'")
                    span.pull-left * Subscription Price
                .row
                  .col-sm-3
                    tk-input-type-text-admin-currency(placeholder='5.00', v-model='info.price', v-on:keypress="isNumber", style='margin-bottom: 32px;')
                .row
                  .col-sm-8
                    span * Gift Card Description
                    tk-text-area(placeholder='shortly about this subscription')
              #select
                .row
                  .col-sm-8
                    h3 2. Select Events
                    p Specify the events that will be included in this subscription
              nav
                .row
                  .col-sm-7
                    .menu-content
                      .menu-body
                        button(@click='showTable', :class="{'active-nav': table === true}") Table
                        button(@click='showCalendar', :class="{'active-nav': calendar === true}") Calendar
                        button(:to="{name: 'Events', query: {filter: 'upcoming'}}") Selected (5)
              .sub-menu
                .row
                  .col-sm-12.text-left
                    button.action Dinner in the Sky
                      i.material-icons keyboard_arrow_down
                    button.action Dinner in the Sky
                      i.material-icons keyboard_arrow_down
              #events(v-if='!calendar && table')
                .row(style='margin-bottom: 30px;')
                  .col-sm-6
                    tk-static-search(placeholder='search by anything')
                .row
                  .col-sm-12
                    tk-table-subscription
              #events-calendar(v-if='calendar && !table')
                .row
                  .col-sm-4
                    h1 single-event-page -> Calendar.vue
                    tk-calendar
                  .col-sm-4
                    h1 single-event-page -> Calendar.vue
                    tk-calendar
                .row
                  .col-sm-12.text-right
                    .total-events
                      p Total events: 
                        strong 6
    tk-footer-admin
</template>

<script>
  import store from '@/store'
  import Calendar from '@/components/single-event-page/Calendar'

  export default {
    data () {
      return {
        table: true,
        calendar: false,
        info: {
          'name': '',
          'price': '',
          'currency': '',
          'events': [],
          'status': ''
        },
        relation: ['Dinner in the Sky', 'Dinner in the Sky', 'Dinner in the Sky']
      }
    },
    beforeRouteEnter (to, from, next) {
      if (store.getters.logInAdminToken === '') {
        next('/ticketyl')
      }
      next()
    },
    methods: {
      showTable () {
        this.table = true
        this.calendar = false
      },
      showCalendar () {
        this.table = false
        this.calendar = true
      },
      isNumber (e) {
        var iKeyCode = (e.which) ? e.which : e.keyCode
        if (iKeyCode !== 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
          e.preventDefault()
          return false
        } else {
          return true
        }
      }
    },
    components: {
      tkCalendar: Calendar
    }
  }
</script>

<style lang="less" scoped>
  .wrapper{
    margin-bottom: 120px;
    #content{
      margin-bottom: 120px;
      .active{
        position: relative;
        -webkit-text-stroke: 1px #292929;
        &:after{
          content: '';
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
      span{
        display: inline-block;
        margin-bottom: 8px;
      }
    }
    h3{
      margin: 0 0 14px 0;
      +p{
        font-size: 18px;
        margin-bottom: 18px;
      }
    }
    #select{
      border-bottom: 1px solid #979797;
      padding-bottom: 32px;
      margin-bottom: 0;
      p{
        margin: 0;
      }
    }
    #basic-details, #optional{
      border-bottom: 1px solid #979797;
      padding-bottom: 32px;
      margin-bottom: 32px;
    }
    #page{
      border-bottom: 1px solid #979797;
      margin-bottom: 32px;
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
          .status{
            display: inline-block;
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
.sub-menu{
  margin-bottom: 30px;
  button{
    outline: 0;
    border: none;
    padding: 0;
    background-color: transparent;
    text-transform: uppercase;
    text-decoration: underline;
    margin-right: 32px;
    &:last-child{
      margin: 0;
    }
    .material-icons{
      font-size: 20px;
      vertical-align: bottom;
      padding-left: 8px;
    }
  }
}
.count{
  font-size: 12px;
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
.total-events{
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
  padding: 24px 0;
  p{
    text-transform: uppercase;
    margin: 0;
  }
}
</style>
