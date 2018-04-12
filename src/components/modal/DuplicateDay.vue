<template lang="pug">
  .duplicate_day
    a.action(@click='open') duplicate day
    #duplicate-day.modal.fade(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            h3 Select duplicate date
          .modal-body
            p Choose the day you want to copy 
              strong {{ dateReadable }} 
              | to
            month(:month='m', :year='y', side='both', :events='eventList', :newEvent='dayToDuplicate', @switchedLeft='prev', @switchedRight='next')   
        .modal-footer
            .row
              .col-sm-6.text-left
                .footer-wrapper
                  .footer-body
                    button.action(data-dismiss="modal") cancel
              .col-sm-6.text-right
                .footer-wrapper
                  .footer-body
                    tk-primary-button(name='duplicate day')
</template>

<script>
  import Month from '@/components/misc/Calendar/Month'
  import moment from 'moment'

  export default {
    props: ['eventList', 'selectedDate', 'currentDateEvents'],
    data () {
      return {
        m: this.selectedDate.m,
        y: this.selectedDate.y
      }
    },
    computed: {
      dayToDuplicate () {
        if (this.m === this.selectedDate.m && this.y === this.selectedDate.y) {
          return [this.selectedDate.d, this.selectedDate.d]
        } else {
          return []
        }
      },
      dateReadable () {
        return moment(`${this.selectedDate.y}-${this.selectedDate.m}-${this.selectedDate.d}`).format('MMMM DD')
      }
    },
    methods: {
      open () {
        if (this.selectedDate.d && this.currentDateEvents.length) {
          window.jQuery('#duplicate-day').modal('show')
        }
      },
      prev () {
        if (this.m === 1) {
          this.m = 12
          this.y--
        } else {
          this.m--
        }
      },
      next () {
        if (this.m === 12) {
          this.m = 1
          this.y++
        } else {
          this.m++
        }
      }
    },
    watch: {
      selectedDate (newVal) {
        this.m = newVal.m
        this.y = newVal.y
      }
    },
    components: {
      month: Month
    }
  }
</script>

<style lang="less" scoped>
  .duplicate_day{
    display: inline-block;
    .modal-dialog{
      width: 570px;
    }
    .modal-body{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 23px 0 18px;
    }
    .modal-content{
      border: none;
      border-radius: 0;
      padding: 0 15px;
      text-align: left;
      box-shadow: none;
      background-color: #f7f7f7;
      p {
        margin-bottom: 20px;
      }
      .month {
        margin-bottom: 0;
      }
    }
    .modal-header {
      text-align: center;
      border-bottom: 2px solid #c7c7c7;
      padding: 0 24px;
      h3 {
        margin: 23px 0;
      }
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
    a.action {
      cursor: pointer;
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
  }
</style>
