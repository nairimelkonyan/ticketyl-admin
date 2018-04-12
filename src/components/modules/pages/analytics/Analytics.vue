<template lang='pug'>
  section
    tk-header-admin
    .content
      .container
        h2 Sales Analytics
        .navigation
          .row
            .col-sm-12
              .menu-content
                .menu-body
                  button(@click='showSummary', v-bind:class='{ active: summary }') Summary
                  button(@click='showEvent', v-bind:class='{ active: event }') Event Status
                  button(@click='showLoad', v-bind:class='{ active: load }') Load Factor
        .event(v-if='load')
          .sub-menu
            .row
              .col-sm-8
                .sub-menu-content
                  .sub-menu-body
                    h3 Load Factor
                    p Overview of all ticket sales actitiy by day
                    button TED LATVIA
                      i.material-icons keyboard_arrow_down
                    button Dinner in the Sky
                      i.material-icons keyboard_arrow_down
                    button DOWNLOAD EXEL FILE
                      i.material-icons keyboard_arrow_down
              .col-sm-4
                .sub-menu-content
                  .sub-menu-body
                    button.days Last 30 days
                      i.material-icons keyboard_arrow_down
          .event-menu
            h4 overview
            .row
              .col-sm-3
                h2 1294
                p TOTAL CAPACITY
              .col-sm-3
                h2 751
                p TOTAL CAPACITY AVAILABLE
              .col-sm-3
                h2 543
                p TOTAL FILLED CAPACITY
              .col-sm-3
                h2 42%
                p TOTAL LOAD FACTOR (%)
          tk-table-analytics-load
        .event(v-if='event')
          .sub-menu
            .row
              .col-sm-8
                .sub-menu-content
                  .sub-menu-body
                    h3 Event Status
                    p All events with ticket sales and status overview
                    button TED LATVIA
                      i.material-icons keyboard_arrow_down
                    button DOWNLOAD EXEL FILE
                      i.material-icons keyboard_arrow_down
              .col-sm-4
                .sub-menu-content
                  .sub-menu-body
                    button.days Last 30 days
                      i.material-icons keyboard_arrow_down
          .event-menu
            h4 overview
            .row
              .col-sm-3
                h2 550
                p TOTAL TICKETS AVAILABLE
              .col-sm-3
                h2 321
                p TOTAL TICKETS SOLD
              .col-sm-3
                h2 5 539.00
                p TOTAL POSSIBLE RENEVUE
              .col-sm-3
                h2 3 432.00
                p TOTAL EARNED REVENUE
          tk-table-analytics-event
        .summary(v-if='summary')
          .sub-menu
            .row
              .col-sm-8
                .sub-menu-content
                  .sub-menu-body
                    h3 Sales Summary
                    p All vital data about how your busines is doing in terms of sales
                    button All Events
                      i.material-icons keyboard_arrow_down
                    button All Sub Events
                      i.material-icons keyboard_arrow_down
                    button All Sales Channels
                      i.material-icons keyboard_arrow_down
              .col-sm-4
                .sub-menu-content
                  .sub-menu-body
                    button.days Last 30 days
                      i.material-icons keyboard_arrow_down
          .summary-inner
            .block.block-right
              .summary-content
                .summary-body
                  h4 Overview
                  <line-chart :data='chartData'></line-chart>
            .block.block-left
              .summary-content
                .summary-body
                  h4 Performance Indicators
                  <line-chart :data='chartData'></line-chart>
            .block.block-right
              .summary-content
                .summary-body
                  h4 Activity
                  <line-chart :data='chartData'></line-chart>
            .block.block-left
              .summary-content
                .summary-body
                  h4 Summary
                  <line-chart :data='chartData'></line-chart>
            .block.block-last
              .summary-content
                .summary-body
                  h4 Sales Channels
                  <line-chart :data='chartData'></line-chart>
    tk-footer-admin
</template>

<script src="https://www.gstatic.com/charts/loader.js"></script>
<script>
  import Chartkick from 'chartkick'
  import VueChartkick from 'vue-chartkick'
  import Vue from 'vue'

  Vue.use(VueChartkick, { Chartkick })
  export default {
    data () {
      return {
        summary: true,
        event: false,
        load: false,
        chartData: [['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]
      }
    },
    methods: {
      showSummary () {
        this.summary = true
        this.event = false
        this.load = false
      },
      showEvent () {
        this.summary = false
        this.event = true
        this.load = false
      },
      showLoad () {
        this.summary = false
        this.event = false
        this.load = true
      }
    }
  }
</script>


<style lang='less' scoped>
.sub-menu{
  border-bottom: 1px solid #979797;
  .sub-menu-content{
    display: table;
    height: 182px;
    width: 100%;
    .sub-menu-body{
      display: table-cell;
      vertical-align: middle;
      .days{
        float: right;
        margin-top: 100px;
        margin-right: 0;
      }
      h3{
        margin: 0 0 14px 0;
        +p{
          font-size: 18px;
          margin-bottom: 34px;
        }
      }
      button{
        outline: 0;
        padding: 0;
        margin-bottom: 8px;
        margin-right: 24px;
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
.content{
  margin-bottom: 160px;
  h2{
    margin: 46px 0 42px 0;
  }
}
.navigation{
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
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
    content: '';
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
.summary-inner{
  overflow: auto;
  .block-right{
    box-sizing: border-box;
    border-right: 1px solid #979797;
    border-bottom: 1px solid #979797;
  }
  .block-left{
    box-sizing: border-box;
    border-bottom: 1px solid #979797;
  }
  .block-last{
    box-sizing: border-box;
    border-right: 1px solid #979797;
  }
  .block{
    width: 50%;
    float: left;
    .summary-content{
      display: table;
      width: 100%;
      height: 366px;
      .summary-body{
        padding: 16px;
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
}
.event-menu{
  h4{
    margin: 18px 0;
  }
  h2{
    margin: 0 0 8px 0;
  }
  p{
    font-size: 14px;
    color: #9a9a9a;
    text-transform: uppercase;
    font-weight: normal;
    margin-bottom: 24px;
  }
}
</style>