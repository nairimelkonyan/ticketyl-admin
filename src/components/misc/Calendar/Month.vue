<template lang="pug">
  .month(:style='{ "padding-right": side === "left" ? "30px" : "0" }')
    header
      button(
        v-if='side === "left" || side === "both"'
        type="button"
        @click='switchClickedLeft')
        i.material-icons chevron_left
      span {{ monthName }}&nbsp;
        strong {{ year }}
      button(
        v-if='side === "right" || side === "both"'
        type="button"
        @click='switchClickedRight')
        i.material-icons chevron_right
    .table-container
      table
        thead
          tr
            th Sun
            th Mon
            th Tue
            th Wed
            th Thu
            th Fri
            th Sat
        tbody
          tr(v-for="week in daysArr")
            td(
              v-for='day in week'
              :class='{ "empty": !day, "has_event": dates.includes(day), "selected": isSelected(day, month, year), "newevent_selected": newEventDates.includes(day) }'
              @click='dayClicked(day, month, year, $event)')
              | {{ day ? day : '' }}
</template>

<script>
  import moment from 'moment'
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  export default {
    props: ['month', 'year', 'side', 'events', 'newEvent', 'selected_dates'],
    data () {
      return {
        selectedDay: null,
        eventByDay: {},
        addingMode: false
      }
    },
    computed: {
      dates () {
        let res = []
        this.eventByDay = {}
        this.events.map((v, i, arr) => {
          const curM = this.month - 1
          const start = new Date(v.date_start)
          const end = new Date(v.date_end)
          // full event in this month:
          if (start.getMonth() === end.getMonth()) {
            // one-day event:
            if (start.getDate() === end.getDate()) {
              this.addEventToDate(start.getDate(), v)
              if (!res.includes(start.getDate())) {
                res.push(start.getDate())
              }
            } else {
              // multiday event:
              for (let i = +start.getDate(); i <= +end.getDate(); i++) {
                if (!res.includes(i)) {
                  res.push(i)
                }
                this.addEventToDate(i, v)
              }
            }
          } else {
            // event between months
            // event begins in current month
            if (start.getMonth() === curM) {
              for (let i = +start.getDate(); i <= this.daysInMonth; i++) {
                if (!res.includes(i)) {
                  res.push(i)
                }
                this.addEventToDate(i, v)
              }
            } else if (end.getMonth() === curM) {
              // event ends in current month
              for (let i = 1; i <= +end.getDate(); i++) {
                if (!res.includes(i)) {
                  res.push(i)
                }
                this.addEventToDate(i, v)
              }
            } else {
              // event begins somewhere earlier and ends somewhere later
              for (let i = 1; i <= this.daysInMonth; i++) {
                if (!res.includes(i)) {
                  res.push(i)
                }
                this.addEventToDate(i, v)
              }
            }
          }
        })
        console.log(res)
        return res
      },
      monthName () {
        return monthNames[this.month - 1]
      },
      startDay () {
        return new Date(`${this.month}-01-${this.year}`)
      },
      startWeekday () {
        return this.startDay.getDay()
      },
      daysInMonth () {
        return new Date(this.year, this.month, 0).getDate()
      },
      emptyArr () {
        return this.startWeekday >= 0 ? Array(this.startWeekday).fill(null) : []
      },
      fullArr () {
        let fullArr = []
        for (let i = 1; i <= this.daysInMonth; i++) fullArr.push(i)
        return fullArr
      },
      weeks () {
        return Math.ceil((this.startWeekday + this.daysInMonth) / 7)
      },
      daysArr () {
        const daysArr = [...this.emptyArr, ...this.fullArr]
        let res = []
        for (let i = 0; i < this.weeks; i++) {
          res[i] = []
          for (let j = 0; j < 7; j++) {
            res[i][j] = daysArr[(i * 7) + j]
          }
        }
        return res
      },
      newEventDates () {
        let res = []
        if (this.newEvent) {
          if (this.newEvent[0] === -1 && this.newEvent[1] === -1) {
            // event is in the whole month
            for (let i = 1; i <= this.daysInMonth; i++) res.push(i)
            return res
          } else if (this.newEvent[0] === -1) {
            // event ends in this month
            for (let i = 1; i <= this.newEvent[1]; i++) res.push(i)
            return res
          } else if (this.newEvent[1] === -1) {
            // event starts in this month
            for (let i = this.newEvent[0]; i <= this.daysInMonth; i++) res.push(i)
            return res
          } else if (this.newEvent[0] === this.newEvent[1]) {
            // one-day event
            res.push(this.newEvent[0])

            console.log(res)
            return res
          } else {
            // multi-day event in month
            for (let i = this.newEvent[0]; i <= this.newEvent[1]; i++) res.push(i)
            return res
          }
        }
      }
    },
    methods: {
      switchClickedLeft () {
        this.eventByDay = {}
        this.$emit('switchedLeft')
      },
      switchClickedRight () {
        this.eventByDay = {}
        this.$emit('switchedRight')
      },
      dayClicked (d, m, y, e) {
        var date = moment().date(d).month(m - 1).year(y)
        this.$emit('daySelected', date, e)
      },
      addEventToDate (d, eventObj) {
        if (!this.eventByDay[d]) {
          this.eventByDay[d] = []
        }
        this.eventByDay[d].push(eventObj)
      },
      isSelected (d, m, y) {
        if (!d) { return false }
        var date = moment().date(d).month(m - 1).year(y)
        if (!this.selected_dates) { return false }
        for (var i in this.selected_dates) {
          if (this.selected_dates[i].startOf('day').isSame(date.startOf('day'))) {
            return true
          }
        }
        console.log('select')
        return false
      }
      /* pickDate (d) {
        this.selectedDay = d
        let payload = {
          d,
          m: this.month,
          y: this.year,
          events: [],
          side: this.side
        }
        if (this.eventByDay[d] && this.eventByDay[d].length) {
          for (let i = 0; i < this.eventByDay[d].length; i++) {
            payload.events.push({
              start_time: `${this.eventByDay[d][i].date_start.slice(-8, -3)} (${this.eventByDay[d][i].date_start.slice(8, 10)}.${this.eventByDay[d][i].date_start.slice(5, 7)})`,
              end_time: `${this.eventByDay[d][i].date_end.slice(-8, -3)} (${this.eventByDay[d][i].date_end.slice(8, 10)}.${this.eventByDay[d][i].date_end.slice(5, 7)})`,
              location: this.eventByDay[d][i].subevent_location
            })
          }
        }
        this.$emit('daySelected', payload)
      } */
    }
  }
</script>

<style lang="less" scoped>
  .month {
    margin-bottom: 30px;
  }
  header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #979797;
    padding-bottom: 22px;
    span {
      width: 100%;
      text-align: center;
      font-size: 1.7em;
      text-transform: uppercase;
    }
  }
  button {
    transition: 0.3s;
    background-color: #9a9a9a;
    text-transform: uppercase;
    font-size: 18px;
    color: #fff;
    min-height: 48px;
    padding: 10px 16px;
    border-radius: 0;
    border: none;
    outline: none !important;
  }
  table {
    border-collapse: separate;
    thead {
      text-transform: uppercase;
    }
    td, th {
      height: 54px;
      width: 54px;
      text-align: center;
    }
    th {
      font-weight: normal;
    }
    td:not(.empty) {
      box-sizing: auto;
      font-weight: bold;
      background: #FBFBFB;
      border: 2px solid #f7f7f7;
      font-size: 1.2em;
      cursor: pointer;
      &.has_event {
        padding-top: 8px;
        &::after {
          content: '\25A0';
          display: block;
          text-align: center;
          font-size: .5em;
          margin-top: -3px;
        }
      }
      &.newevent_selected {
        background: #9A9A9A;
        color: #fff;
      }
      &.selected {
        background: #292929;
        color: #fff;
        &::after {
          color: #fff;
        }
      }
    }
  }
</style>
