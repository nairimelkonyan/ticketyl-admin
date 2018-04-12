<template lang="pug">
  div
    p.hint Press
      strong Shift
      | to select dates for new event
    .calendar-interface
      month(
        :month='m1',
        :year='y1',
        :events='dates1',
        :selected_dates='dates',
        side='left',
        :newEvent='newEvent1',
        @switchedLeft='prev',
        @daySelected='daySelected',
        ref='month1'
      )
      month(
        :month='m2',
        :year='y2',
        :events='dates2',
        :selected_dates='dates',
        side='right',
        :newEvent='newEvent2',
        @switchedRight='next',
        @daySelected='daySelected',
        ref='month2'
      )
    .calendar-start-end
      .row
        .col-sm-3
          p Start
          tk-timepicker(@input='selectStartTime')
        .col-sm-3
          p End
          tk-timepicker(@input='selectEndTime')
        .col-sm-6
          p &nbsp;
          tk-secondary-button(name='add dates' @click='addDates')
      p.col-sm-12.error.error-title(v-if='!dateRangeValid') Invalid date range
    hr
    //- .events-on-this-date
      .row.events-sub-menu
        .col-sm-6
          p.events-title Events on this date
        .col-sm-6.text-right
          p.total Total events:
            strong(v-if="eventList") {{ eventList.length }}
            strong(v-if="!eventList") 0
      .row
        .event-item(v-for='event in currentDateEvents')
          tk-tools(style='margin-right: 14px; margin-top: -8px;')
          span Time:
            strong {{ `${event.start_time} - ${event.end_time}` }}
            | |
            strong Location: {{ event.location ? event.location : 'unknown' }}
</template>

<script>
  import Month from './Month'
  import moment from 'moment'

  export default {
    props: ['month', 'year', 'eventList'],
    data () {
      return {
        m1: +this.month,
        y1: +this.year,
        dates1: [],
        dates2: [],
        currentDateEvents: [],
        newStartDate: '',
        newEndDate: '',
        newStartTime: '',
        newEndTime: '',
        newEvent1: [],
        newEvent2: [],
        selectedDate: {},
        lastSelectedDate: null,
        dates: []
      }
    },
    computed: {
      y2 () {
        return this.m1 === 12 ? +this.y1 + 1 : +this.y1
      },
      m2 () {
        return this.m1 === 12 ? 1 : +this.m1 + 1
      },
      dateRangeValid () {
        const emptyField = !this.newStartDate || !this.newEndDate || !this.newStartTime || !this.newEndTime
        if (emptyField) {
          return true
        } else {
          if (this.newStartDate.valueOf() === this.newEndDate.valueOf() && +this.newStartTime.substr(0, 2) > +this.newEndTime.substr(0, 2)) {
            return false
          } else {
            return true
          }
        }
      }
    },
    methods: {
      prev () {
        if (this.m1 === 1) {
          this.m1 = 12
          this.y1--
        } else {
          this.m1--
        }
        this.checkExistingDates()
        this.checkBothNewDates()
      },
      next () {
        if (this.m1 === 12) {
          this.m1 = 1
          this.y1++
        } else {
          this.m1++
        }
        this.checkExistingDates()
        this.checkBothNewDates()
      },
      daySelected (date, e) {
        if (e.shiftKey && this.lastSelectedDate) {
          var a = this.lastSelectedDate.startOf('day')
          var b = date.startOf('day')

          var diff = a.diff(b, 'days')
          var days = (diff < 0) ? diff * -1 : diff
          for (var i = 0; i < days; i++) {
            var current
            if (a < b) {
              current = moment(a).add(i + 1, 'days')
            } else if (a > b) {
              current = moment(a).subtract(i + 1, 'days')
            }
            if (!this.hasDate(current)) { this.addDate(current) }
          }
        } else {
          if (this.hasDate(date)) {
            this.removeDate(date)
          } else {
            this.addDate(date)
          }
        }
        this.lastSelectedDate = date
        this.$emit('selection_changed', this.dates)
      },
      hasDate (date) {
        for (var i in this.dates) {
          if (this.dates[i].startOf('day').isSame(date.startOf('day'))) {
            return true
          }
        }
        return false
      },
      addDate (date) {
        this.dates.push(date)
      },
      removeDate (date) {
        for (var i in this.dates) {
          if (this.dates[i].startOf('day').isSame(date.startOf('day'))) {
            this.dates.splice(i, 1)
            return
          }
        }
      },
      showDayEvents (payload) {
        this.selectedDate = Object.assign({}, {
          d: payload.d,
          m: payload.m,
          y: payload.y
        })
        this.currentDateEvents = [...payload.events]
        if (payload.side === 'left') {
          this.$refs.month2.selectedDay = null
        } else {
          this.$refs.month1.selectedDay = null
        }
      },
      eventInInterval (start, end, month, year) {
        if (+start.getFullYear() === +year ||
            +end.getFullYear() === +year ||
            (+start.getFullYear() < +year && +end.getFullYear() > +year)) {
          if (+start.getMonth() === +month ||
              +end.getMonth() === +month ||
              (+start.getMonth() < +month && +end.getMonth() > +month)) {
            return true
          }
        }
        return false
      },
      checkEventsInside (month, year) {
        if (!this.eventList) { return [] }
        const m = month - 1
        let dates = []
        this.eventList.map((v, i, arr) => {
          const start = new Date(v.date_start)
          const end = new Date(v.date_end)
          if (this.eventInInterval(start, end, m, year)) {
            dates.push(v)
          }
        })
        return dates
      },
      checkExistingDates () {
        this.dates1 = this.checkEventsInside(this.m1, this.y1)
        this.dates2 = this.checkEventsInside(this.m2, this.y2)
      },
      checkNewDates (month, y, n) {
        this[`newEvent${n}`] = []
        const m = month - 1
        // both dates are present
        if (this.newStartDate && this.newEndDate) {
          // check if this interval is in current month: eventInInterval for month
          if (this.eventInInterval(this.newStartDate, this.newEndDate, m, y)) {
            // -- event is in the same month
            if (this.newStartDate.getMonth() === this.newEndDate.getMonth()) {
              // ---- one-day event
              if (this.newStartDate.getDate() === this.newEndDate.getDate()) {
                // ------ add day
                this[`newEvent${n}`] = [this.newStartDate.getDate(), this.newStartDate.getDate()]
                // ---- multi-day event
              } else {
                // ------ add to month (start ... end)
                this[`newEvent${n}`] = [this.newStartDate.getDate(), this.newEndDate.getDate()]
              }
              // -- event only starts in month
            } else if (this.newStartDate.getMonth() === m) {
              // ---- add to month ( start ... length )
              this[`newEvent${n}`] = [this.newStartDate.getDate(), -1]
              // -- event only ends in month
            } else if (this.newEndDate.getMonth() === m) {
              // ---- add to month (0 ... end)
              this[`newEvent${n}`] = [-1, this.newEndDate.getDate()]
              // -- event takes full month
            } else {
              // ---- add to month (0 ... length)
              this[`newEvent${n}`] = [-1, -1]
            }
          }
        }
      },
      checkBothNewDates () {
        this.checkNewDates(this.m1, this.y1, 1)
        this.checkNewDates(this.m2, this.y2, 2)
      },
      selectDay (payload) {
        const dateString = new Date(payload.dateString)
        if (!this.newStartDate) {
          this.newStartDate = dateString
          this.newEndDate = dateString
        } else {
          if (this.newStartDate.valueOf() === this.newEndDate.valueOf() && this.newStartDate.valueOf() === dateString.valueOf()) {
            this.newStartDate = ''
            this.newEndDate = ''
          } else if (this.newStartDate.valueOf() === dateString.valueOf()) {
            this.newStartDate = new Date(moment(this.newStartDate).add(1, 'days').format())
          } else if (this.newEndDate.valueOf() === dateString.valueOf()) {
            this.newEndDate = new Date(moment(this.newEndDate).subtract(1, 'days').format())
          } else {
            if (dateString >= this.newStartDate) {
              this.newEndDate = dateString
            } else {
              this.newStartDate = dateString
            }
          }
        }
        if (this.dateRangeValid) this.checkBothNewDates()
      },
      selectEndDate (dateString) {
        this.newEndDate = new Date(dateString)
        if (this.dateRangeValid) this.checkBothNewDates()
      },
      selectStartTime (timeString) {
        this.newStartTime = timeString
        if (this.dateRangeValid) this.checkBothNewDates()
      },
      selectEndTime (timeString) {
        this.newEndTime = timeString
        if (this.dateRangeValid) this.checkBothNewDates()
      },
      addNewDate () {
        if (this.newStartDate && this.newEndDate && this.newStartTime && this.newEndTime && this.dateRangeValid) {
          this.$emit('addNewDate', {
            date_start: moment(this.newStartDate).format('YYYY-MM-DD'),
            time_start: this.newStartTime,
            date_end: moment(this.newEndDate).format('YYYY-MM-DD'),
            time_end: this.newEndTime
          })
        }
      },
      addTimeToDate (date, timeStr) {
        var time = timeStr.split(':')
        if (time.length > 0) { date = moment(date).hour(parseInt(time[0])) }
        if (time.length > 1) { date = moment(date).minute(parseInt(time[1])) }
        return date
      },
      addDates () {
        if (this.newStartTime && this.newEndTime) {
          var formated = []
          for (var i in this.dates) {
            formated.push({
              date_start: this.addTimeToDate(this.dates[i], this.newStartTime),
              date_end: this.addTimeToDate(this.dates[i], this.newEndTime)
            })
          }
          this.$emit('addDates', formated)
          this.dates = []
        }
      }
    },
    components: {
      'month': Month
    },
    mounted () {
      this.checkExistingDates()
    }
  }
</script>

<style lang="less" scoped>
  .calendar-interface {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
  }
  .calendar-start-end {
    margin-bottom: 35px;
  }
  .calendar-interface {
    display: flex;
  }
  .calendar-sub-menu {
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    border-bottom: 1px solid #979797;
    .action {
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .row.events-sub-menu {
    padding: 20px 0 15px;
    p {
      text-transform: uppercase;
      &.events-title {
        color: #9A9A9A;
      }
    }
  }
  .event-item {
    margin-bottom: 10px;
    font-size: 1.2em;
  }
  .error {
    font-size: 12px;
    font-weight: bold;
  }
  .hint {
    margin-bottom: 20px;
    color: #9a9a9a;
  }
</style>
