<template lang="pug">
  .ticket-settings
    #ticket-settings.modal.fade(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-content-wrapper
            .modal-header
              h3 Ticket Settings
              p Adjust the preferences of this ticket type
            .modal-body
              h4 General
              p Ticket Description
              tk-input-translation(placeholder="shortly about this ticket type", :target="ticket_settings.description", @change="translate_description")
              h4 Sales Dates
              p Ticket Sales Start
              .row.date
                .col-sm-6
                  tk-input-type-text(v-model="ticket_settings.start_date")
                .col-sm-6
                  tk-input-type-text(v-model="ticket_settings.start_time")
              p Ticket Sales End
                .row.date
                  .col-sm-6
                    tk-input-type-text(v-model="ticket_settings.end_date")
                  .col-sm-6
                    tk-input-type-text(v-model="ticket_settings.end_time")
              h4 Sales Order Sizes
              .row
                .col-sm-6
                  p Minimum Tickets
                  tk-input-type-text(placeholder='1', v-model='ticket_settings.min_tickets')
                .col-sm-6
                  p Maximum Tickets
                  tk-input-type-text(placeholder='10', v-model='ticket_settings.max_tickets')
          .modal-footer
            .row
              .col-sm-6.text-left
                .footer-wrapper
                  .footer-body
                    button.action(data-dismiss="modal") cancel
              .col-sm-6.text-right
                .footer-wrapper
                  .footer-body
                    tk-primary-button(name='save settings', @click='save')
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as mutationTypes from '@/store/mutation-types'
  import modal from '@/services/Modal/Modal'

  // import moment from 'moment'

  export default {
    data () {
      return {
        ticket_settings: {
          description: '',
          channels: '',
          start_date: '',
          start_time: '',
          end_date: '',
          end_time: '',
          min_tickets: '',
          max_tickets: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        edit_ticket: 'edit_ticket',
        tickets: 'tickets'
      })
    },
    methods: {
      translate_description (translations) {
        this.ticket_settings.description = translations
      },
      load (ticket) {
        var obj = JSON.parse(JSON.stringify(ticket))
        this.ticket_settings.description = obj.translations.description
        this.ticket_settings.channels = ''
        this.ticket_settings.start_date = obj.configuration.sales_start_date
        this.ticket_settings.start_time = obj.configuration.start_time
        this.ticket_settings.end_date = obj.configuration.sales_end_date
        this.ticket_settings.end_time = obj.configuration.end_time
        this.ticket_settings.min_tickets = obj.configuration.minimum_ticket_count
        this.ticket_settings.max_tickets = obj.configuration.maximum_ticket_count
      },
      save () {
        const data = {
          configuration: {
            minimum_ticket_count: this.ticket_settings.min_tickets,
            maximum_ticket_count: this.ticket_settings.max_tickets,
            visible: 'visible',
            status: 'public',
            sales_start_date: this.ticket_settings.start_date,
            sales_end_date: this.ticket_settings.end_date
          },
          translations: {
            description: this.ticket_settings.description
          }
        }
        this.$store.commit(mutationTypes.UPDATE_TICKET_SETTINGS, data)
        modal.hide('#ticket-settings')
      }
    },
    created () {
      if (this.edit_ticket) {
        this.load(this.tickets[this.edit_ticket])
      }
    },
    mounted () {
      // this.$refs.startDate.date = moment().format('YYYY-MM-DD')
      // this.$refs.startTime.time = moment().format('HH:MM')
    },
    watch: {
      edit_ticket (index) {
        this.load(this.tickets[index])
      }
    }
  }
</script>

<style lang="less">
  .flatpickr-calendar.open {
    z-index: 100000001;
  }
</style>

<style lang="less" scoped>
  .date {
    .col-sm-6 {
      margin-bottom: 15px;
    }
  }
  button{
    outline: 0;
  }
</style>
