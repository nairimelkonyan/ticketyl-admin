<template lang="pug">
  section
    #tickets-and-seating
      .row
        .col-sm-8
          h4 Seating 
          p Choose a ticket allocation model for this event
          form(action='')
            input#open(type='radio', name='open', value='open', v-model='seating')
            label(for="open") Open Admittance
            input#reserved(type='radio', name='open', value='reserved', v-model='seating')
            label(for="reserved") Reserved Seating
            //-input#mixed(type='radio', name='open', value='mixed')
              label(for="mixed") Mixed Seating
      .row(v-if='seating === "reserved"')
        .col-xs-12
          tk-seats-io-designer(@chart="chartSelected", :selected_chart_key="edit_object.configuration.chart_key")
    div
      .row
        .col-sm-12
          h4 Tickets
          p Create and organize all ticket types of this event
          tk-table-ticket-seatings(style='margin-bottom: 24px;')
    div
      .row
        .col-sm-9
          section(v-if='seating === "open"')
            tk-secondary-button(name='add paid ticket', @click='addTicket("paid")')
            //-
              | &nbsp;
              tk-secondary-button(name='add free ticket', @click='addTicket("free")')
              | &nbsp;
              tk-secondary-button(name='add donation ticket', @click='addTicket("donation")')
              | &nbsp;
        .col-sm-3.text-right
          p.center TOTAL TICKETS: 
            strong {{ tickets_count }}
</template>

<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      seating: 'open',
      chart_key: null
    }
  },
  methods: {
    seatsForSubChart (subchart, section) {
      var seats = []
      var k, s
      for (k in subchart.rows) {
        for (s in subchart.rows[k].seats) {
          if (!subchart.rows[k].seats[s].categoryKey && section) { subchart.rows[k].seats[s].categoryKey = section.categoryKey }
          seats.push(subchart.rows[k].seats[s])
        }
      }
      for (k in subchart.tables) {
        for (s in subchart.tables[k].seats) {
          if (!subchart.tables[k].seats[s].categoryKey && section) { subchart.tables[k].seats[s].categoryKey = section.categoryKey }
          seats.push(subchart.tables[k].seats[s])
        }
      }
      for (k in subchart.sections) {
        seats = seats.concat(this.seatsForSubChart(subchart.sections[k].subChart, subchart.sections[k]))
      }
      return seats
    },
    seatsInCategory (category, seats) {
      var count = 0
      for (var i in seats) {
        if (parseInt(seats[i].categoryKey) === parseInt(category.key)) {
          count++
        }
      }
      return count
    },
    update_object () {
      var obj = JSON.parse(JSON.stringify(this.edit_object))
      if (!this.chart_key) { obj.configuration.chart_key = this.chart_key }
      this.$store.commit(types.SET_EDIT_OBJECT, obj)
    },
    chartSelected (chart) {
      console.log('chart selected', chart)
      this.$store.commit(types.CLEAR_EVENT_TICKETS, ticket)
      this.chart_key = chart.chart_key

      var obj = JSON.parse(JSON.stringify(this.edit_object))
      obj.configuration.chart_key = this.chart_key
      this.$store.commit(types.SET_EDIT_OBJECT, obj)

      var seats = this.seatsForSubChart(chart.subChart)

      for (var i in chart.categories.list) {
        var category = chart.categories.list[i]
        var ticket = {
          code: 'sio_' + category.key,
          quantity: this.seatsInCategory(category, seats),
          type: 'seats.io',
          price: {
            'amount': 0,
            'currency': 'eur'
          },
          charges: {
            'can': [],
            'must': [],
            'deny': []
          },
          own_charges: [],
          special_pricing: {},
          translations: {
            name: { en: category.label },
            description: {}
          },
          configuration: {}
        }
        this.$store.commit(types.ADD_EVENT_TICKET, ticket)
      }
    },
    addTicket (type) {
      var ticket = {
        quantity: 1,
        type: type,
        price: {
          'amount': 0,
          'currency': 'eur'
        },
        charges: {
          'can': [],
          'must': [],
          'deny': []
        },
        own_charges: [],
        special_pricing: {},
        translations: {
          name: {},
          description: {}
        },
        configuration: {}
      }
      this.$store.commit(types.ADD_EVENT_TICKET, ticket)
    },
    load (object) {
      if (object.configuration.chart_key) {
        this.chart_key = object.configuration.chart_key
        this.seating = 'reserved'
      } else {
        this.seating = 'open'
        this.chart_key = null
      }
    }
  },
  mounted () { if (this.edit_object) { this.load(this.edit_object) } },
  watch: {
    seating (type) {
      if (type === 'open') {
        this.chart_key = null
        var obj = JSON.parse(JSON.stringify(this.edit_object))
        obj.configuration.chart_key = null
        this.$store.commit(types.SET_EDIT_OBJECT, obj)
      }
    },
    edit_object (object) { this.load(object) }
  },
  computed: {
    ...mapGetters({
      tickets: 'tickets',
      tickets_count: 'ticket_count',
      merchant: 'merchant',
      edit_object: 'edit_object'
    })
  }
}
</script>

<style lang="less" scoped></style>
