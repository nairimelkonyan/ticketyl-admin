<template lang="pug">
  section
    section
      hr
      section(v-if="!enabled && !selected_chart_key")
        p Before you can proceed with Seats.io you have to enable it for your account. This will create a separate collection of seats.io charts. Press "Enable SeatsIO" to enable it for your account.
        tk-primary-button(name="Enable Seats.io", @click="enable")
      section(v-if="enabled && !selected_chart_key")
        p Select a seats.io chart or create a new one to import subevent ticket data from selected chart
        .row
          .col-sm-4
            div(v-if="charts.length")
              div.list-group
                a.list-group-item(v-for="chart in charts", @click="edit_chart(chart.key)") {{ chart.name }}
            div(v-if="!charts.length")
              p You have no charts created. To create a new event, click the button "Create new" and set up your stage.
          .col-sm-4
            div
              p Click the button bellow to create a new chart
            tk-primary-button(name="Create chart" @click="create_chart()")
      section(v-if="selected_chart_key")
        p
          | You've selected chart {{ selected_chart_key }}
          a(@click="edit_chart(selected_chart_key)") Change
    section(v-show="is_open")
      div(id="seats_io" v-bind:class="{ opened: editing }")
      tk-primary-button(v-if="editing" name="Select Chart" @click="select_chart(chart_key)")
    hr
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from '@/services/TicketylOS/TicketylOS'

  export default {
    props: ['selected_chart_key'],
    data () {
      return {
        designer_chart: null,
        preview_chart: null,
        designer_key: null,
        public_key: null,
        chart_key: null,
        charts: [],
        editing: false,
        enabled: false,
        is_open: false
      }
    },
    computed: { ...mapGetters({
      shop: 'shop',
      token: 'logInAdminToken',
      merchant: 'merchant'
    }) },
    methods: {
      init_designer () {
        if (this.preview_chart) {
          this.preview_chart.destroy()
        }
        if (this.designer_key) {
          var config = {
            divId: 'seats_io',
            designerKey: this.designer_key,
            onChartCreated: (chartKey) => {
              this.chart_key = chartKey
            }
          }
          if (this.chart_key) { config.chartKey = this.chart_key }
          this.preview_chart = new window.seatsio.SeatingChartDesigner(config).render()
        }
      },
      enable () {
        api
          .token(this.token)
          .admin().merchant().seatsio()
          .then(response => {
            this.designer_key = response.designer_key
            this.public_key = response.public_key
            this.enabled = true
            this.reload_charts()
          })
      },
      create_chart () {
        this.is_open = true
        this.edit_chart(null)
      },
      edit_chart (chart) {
        this.is_open = true
        this.editing = true
        this.chart_key = chart
        this.init_designer()
      },
      select_chart (chart) {
        if (chart === '0' || !chart) { return }
        this.chart_key = chart
        api
          .token(this.token)
          .admin().merchant().siochart({ chart: this.chart_key })
          .then(response => {
            response.chart_key = this.chart_key
            this.is_open = false
            this.$emit('chart', response)
          })
      },
      reload_charts () {
        api
          .token(this.token)
          .admin().merchant().siocharts()
          .then(response => {
            this.charts = response
          })
      }
    },
    created () {
      let script = document.createElement('script')
      script.onload = () => {
        //
      }
      script.async = true
      script.src = 'https://cdn.seats.io/chart.js'
      document.head.appendChild(script)
      if (this.merchant.configuration['seatsio.id']) {
        this.designer_key = this.merchant.configuration['seatsio.designer_key']
        this.enabled = true
        this.reload_charts()
      }
    },
    watch: {
      // designer_key () { this.init_designer() },
      // shop () { this.init() }
    }
  }
</script>

<style lang="less" scoped>
  #seats_io {
    height: 0px;
    &.opened {
      height: 500px !important;
      margin-left: calc((1vw - 945px)/2);
      margin-right: calc((1vw - 945px)/2);
    }
  }
  a { cursor: pointer; }
</style>
