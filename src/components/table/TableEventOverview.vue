<template lang="pug">
  section(v-if='active_target.acts')
    h4 Events on selected dates
    p You can select a single or multiple events at once to edit the settings for each of them at once. The selection resets every time you change the calendar selection to save you from applying unwanted settings by a mistake
    br
    table
      thead
        tr.header
          th(scope='col') Event
          th(scope='col') Start
          th(scope='col') End
          th(scope='col') Tickets
          th(scope='col') Exp. Revenue
          th(scope='col') 
      tbody
        tr(v-for='(act, index) in sorted' @click="act_clicked($event, index)", :class="{ selected: selected_rows.indexOf(index) > -1 }")
          td(data-label='Event') {{ act.translations.name.en }}
          td(data-label='Start date') {{ act.date_start | date }}
          td(data-label='End date') {{ act.date_end | date }}
          td(data-label='Tickets') {{ act.ticket_count }}
          td(data-label='Exp revenue') {{ act.revenue }}
          td: small(v-if="selected_rows.indexOf(index) > -1") SELECTED
        tr.footer
          td(data-label='Total', colspan='7', style='text-align: right;')
            span SELECTED EVENTS: 
              strong {{ selected_rows.length }}
            span DISPLAYED EVENTS: 
              strong {{ sorted.length }}
            span TOTAL EVENTS: 
              strong {{ active_target.acts.length }}
            span TOTAL TICKETS:
              strong {{ tickets_count * active_target.acts.length }}
            span TOTAL EXP. REVENUE:
              strong {{ tickets_count * active_target.acts.length * revenue }}
    section(v-if="selected_rows.length > 1")
      hr
      tk-primary-button(name='Edit all selected events at once', @click="edit")
      | &nbsp;
      tk-secondary-button(name='Remove all selected events', @click="remove")
      | &nbsp;
      tk-secondary-button(name='Clear selection', @click="clear")
    section(v-if="selected_rows.length === 1")
      hr
      tk-primary-button(name='Edit selected event', @click="edit")
      | &nbsp;
      tk-secondary-button(name='Remove selected event', @click="remove")
      | &nbsp;
      tk-secondary-button(name='Clear selection', @click="clear")
</template>

<script>
  import * as types from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import moment from 'moment'

  export default {
    props: ['filtered_acts'],
    data () {
      return {
        selected_rows: [],
        last_selected: null
      }
    },
    watch: {
      filtered_acts (acts) {
        this.selected_rows = []
        this.last_selected = null
      }
    },
    computed: {
      sorted: function () {
        return this.filtered_acts.sort(function (x, y) {
          let a = moment(x.date_start)
          let b = moment(y.date_start)
          return a - b
        })
      },
      ...mapGetters({
        active_target: 'active_target',
        tickets_count: 'ticket_count',
        acts: 'acts',
        revenue: 'revenue'
      })
    },
    methods: {
      collect () {
        var acts = []
        for (var i in this.selected_rows) { acts.push(this.sorted[this.selected_rows[i]]) }
        return acts
      },
      edit () {
        var acts = this.collect()
        this.$store.commit(types.SET_SELECTED_ACTS, acts)
        console.log(acts)
      },
      remove () {
        var acts = this.collect()
        this.$store.commit(types.REMOVE_ACTS, acts)
        console.log(acts)
      },
      clear () {
        this.selected_rows = []
        this.last_selected = null
      },
      act_clicked (event, index) {
        if (event.shiftKey && this.last_selected !== null) {
          var a = this.last_selected
          var b = index
          var distance = 0
          var start
          var addition = 0
          if (a > b) {
            addition = 0
            distance = a - b
            start = b
          }
          if (b > a) {
            addition = 1
            start = a
            distance = b - a
          }
          for (var i = 0; i < distance; i++) {
            var idx = start + i + addition
            if (this.selected_rows.indexOf(idx) === -1) {
              this.selected_rows.push(idx)
            }
          }
        } else {
          if (this.selected_rows.indexOf(index) > -1) {
            this.selected_rows.splice(this.selected_rows.indexOf(index), 1)
          } else {
            this.selected_rows.push(index)
          }
        }
        this.last_selected = index
      }
    },
    filters: {
      date (value) {
        return moment(value, 'YYYY-MM-DD HH-mm').format('DD.MM.YYYY (HH:mm)')
      }
    }
  }
</script>

<style lang="less" scoped>
table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  margin-bottom: -24px;
  tbody{
    font-size: 18px;
  }
}
table caption {
  color: #292929;
  font-size: 18px;
  margin-bottom: 18px;
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
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
  cursor: pointer;
  &:hover{
    background-color: #e4e4e4;
  }
  &.selected {
    background-color: #eeeeee
  }
}
table th{
  padding: 16px;
}
table td {
  padding: 10px 16px;
  text-align: left;
}
table th {
  font-size: 14px;
}
.footer{
  font-size: 14px;
  border-bottom: none;
  span{
    margin-left: 40px;
    strong{
      margin-left: 8px;
    }
  }
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
  table thead {
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
</style>
