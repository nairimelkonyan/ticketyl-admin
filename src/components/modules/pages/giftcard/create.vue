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
                  p Gift Card Setup
                  h2(v-if='!info.name') New Gift Card
                  h2(v-if='info.name') {{ info.name }}
                  span draft
            .col-sm-6.text-right
              .setup-content
                .setup-body
                  tk-secondary-button(name='save as draft')
                  tk-primary-button(name='PUBLISH GIFT CARD')
        #content
          .row
            .col-sm-10.col-sm-offset-1
              #basic-details
                .row
                  .col-sm-8
                    h3 1. Basic Details
                    p A meaningful title unifying the group of events
                    span * Gift Card Name
                    span.count.pull-right {{ info.name.length }} / 50
                    tk-input-type-text(placeholder='a short and recognizable title', maxlength='50', v-model='info.name', style='margin-bottom: 32px;')
                    span * Gift Card Price
                    .row
                      .col-sm-5
                        tk-input-type-text-admin-currency(placeholder='5.00', v-on:keypress="isNumber", style='margin-bottom: 32px;')
                    span * Gift Card Description
                    tk-text-area(placeholder='shortly about this gift card')
              #relation
                .row
                  .col-sm-5
                    h3 2. Gift Card Picture
                    p.gift-card-paragraph Customize the picture visible on this Gift Card
                    .gift-card-content
                      .gift-card-body
                        h4 Upload New
                        p
                          strong Gift Card image
                          | min 435x200 px
                        tk-secondary-button(name='browse images')
              #optional
                .row
                  .col-sm-8
                    h3 3. Select Events
                    p(style='margin-bottom: 30px;') Specify the events that will be included in this Gift Card
                    .navigation
                      .menu-content
                        .menu-body
                          button(@click='showTable', v-bind:class="{ active: table }") Table
                          button(@click='showCalendar', v-bind:class="{ active: calendar }") Calendar
                    tk-shop-button(:currency='currency')
                    tk-static-search.search(v-if='!calendar', placeholder='search by anything')
                .table(v-if='table')
                  .row
                    .col-sm-12
                      tk-table-gift-card
                .calendar(v-if='calendar')
                  .row
                    .col-sm-12
                      h1 single-event-page -> Calendar.vue
                      tk-calendar
    tk-footer-admin
</template>

<script>
  import Calendar from '@/components/single-event-page/Calendar'
  export default {
    data () {
      return {
        table: true,
        calendar: false,
        currency: [ 'Ted latvia', 'dits' ],
        info: {
          'name': ''
        }
      }
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
      span{
        display: block;
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
    #basic-details, #relation{
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
  }
  .gift-card-paragraph{
    font-size: 14px !important;
  }
  .gift-card-content{
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%), url('/static/giftcard_bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: table;
  height: 184px;
  width: 100%;
  .gift-card-body{
    color: #fff;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    p{
      margin-bottom: 16px;
    }
  }
}
.navigation{
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
  margin-bottom: 29px;
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
.button-drop-down{
  color: #292929;
  outline: 0;
  padding: 0;
  margin-right: 32px;
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
.select{
  margin-bottom: 32px;
}
.search{
  margin-top: 16px;
  margin-bottom: 24px;
}

</style>
