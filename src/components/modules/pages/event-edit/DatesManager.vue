<template lang="pug">
  section
    #event-date
      .row
        .col-sm-8
          h3 2. Event dates
          p Specify when will this event take place or create an event series
      #calendar(v-if="!selected_acts")
        .row
          .col-sm-12
            tk-calendar-interface(
              :month='current_month'
              :year='current_year'
              :eventList='active_target.acts'
              @addDates='addDates'
              @selection_changed="selectionchanged"
            )
      .row
        .col-sm-12

          .events-table(v-if="filtered_acts.length && !selected_acts")
            .empty(v-if="!filtered_acts.length")
              p To see events on a selected dates, you have to select needed dates in the calendar above
            tk-table-event-overview(:filtered_acts="filtered_acts")
          tk-act-multiedit(v-if="selected_acts")

</template>

<script>
import * as types from '@/store/mutation-types'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      current_month: moment().format('M'),
      current_year: moment().format('YYYY'),
      filtered_acts: []
    }
  },
  methods: {
    selectionchanged (dates) {
      this.filtered_acts = []
      for (var i in this.active_target.acts) {
        for (var k in dates) {
          if (this.isActOnDate(this.active_target.acts[i], dates[k])) {
            this.filtered_acts.push(this.active_target.acts[i])
          }
        }
      }
    },
    isActOnDate (act, date) {
      let start = moment(act.date_start)
      let end = moment(act.date_end)

      var a = start.startOf('day')
      var b = date.startOf('day')
      var c = end.startOf('day')

      if (a <= b && b <= c) {
        return true
      }
      return false
    },
    addDates (dates) {
      for (var i in dates) {
        dates[i].configuration = { visible: 'visible', status: 'public' }
        dates[i].translations = { name: this.serie.translations.name }
        dates[i].id = this.uuidv4()
        dates[i].tickets = []
        this.$store.commit(types.ADD_EVENT, dates[i])
      }
    },
    uuidv4 () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    }
  },
  computed: {
    ...mapGetters({
      active_target: 'active_target',
      serie: 'serie',
      selected_acts: 'selected_acts'
    })
  },
  watch: {
    active_target (target) {
      //
    }
  }
}
</script>

<style lang="less" scoped>
  .event-date-nav{
    border-bottom: 1px solid #979797;
    padding-bottom: 27px;
    margin-bottom: 21px;
    button{
      font-size: 18px;
      padding: 0;
      outline: 0;
      background-color: transparent;
      border: none;
      margin-right: 61px;
    }
    .active-nav{
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
  }
  .calendar-start-end{
    border-bottom: 1px solid #979797;
    padding-bottom: 24px;
    margin-bottom: 24px;
  }
  .events-on-this-date{
    border-top: 1px solid #979797;
    margin-top: 24px;
    padding-top: 24px;
    .events-sub-menu{
      margin-bottom: 14px;
    }
    .total{
      text-transform: uppercase;
    }
    .events-title{
      text-transform: uppercase;
      color: #9a9a9a;
    }
    span{
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
  .error {
    font-size: 12px;
    font-weight: bold;
  }
</style>
