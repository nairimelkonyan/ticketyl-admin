<template lang="pug">
  section
    tk-header-admin
    tk-modal-ticket-settings
    tk-price-modifications
    tk-price-group-modal
    tk-price-special-modal
    .wrapper
      .container
        #setup
          .row
            .col-sm-6
              .setup-content
                .setup-body
                  p Event Setup
                  h2.title-filled {{ serie.translations.name | tktranslate("en") }}
                    tk-tools(style='margin-left: 16px;')
                  span.status published
            .col-sm-6.text-right
              .setup-content
                .setup-body
                  tk-primary-button(name='Layout settings' @click='nextStep')
                  tk-primary-button(name='save', @click="publish")
        #content
          .row
            .col-sm-10.col-sm-offset-1
              #basic-details
                .row
                  .col-sm-8
                    h3 1. Basic Details
                    p All crucial information about this event
                    
                    span * Event title
                    //- span.count(v-if="name") {{ name.length }} / 50
                    //- span.count(v-if="!name") 0 / 50
                    tk-input-translation(label="* Event title", placeholder="A short and recognizable title", :target="serie.translations.name", @change="translate_title", maxlength='50')
                    p(v-if="errors.has('title')").error.error-title Event title is required
                    br
                    button.action(v-if='!has_subevents', @click='set_has_subevents') Create Sub-Events
                    button.action(v-if='has_subevents', @click='set_no_subevents', style='margin-bottom: 24px;') No Sub-Events
              tk-subevent-manager(v-if='has_subevents')
              tk-location-manager(v-if='showSettings')
              tk-dates-manager(v-if='showSettings')
        
    tk-footer-admin
</template>

<script>
import * as types from '@/store/mutation-types'
import api from '@/services/TicketylOS/TicketylOS'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { mapGetters, mapState } from 'vuex'

Vue.use(VeeValidate)

export default {
  data () {
    return {
      name: null,
      location: null,
      has_subevents: false
    }
  },
  methods: {
    translate_title (translations) {
      this.$store.commit(types.SET_EVENT_TITLE, translations)
    },
    set_has_subevents () {
      this.has_subevents = true
    },
    set_no_subevents () {
      this.has_subevents = false
      this.$store.commit(types.CLEAR_SUBEVENTS)
    },
    store () {
      var data = {
        serie: this.serie,
        packages: this.packages
      }
      if (this.draft_id) { data.code = this.draft_id }
      api
        .token(this.token)
        .admin().event().create(data)
        .then(response => {
          this.nextStep()
        })
    },
    publish () {
      var data = {
        serie: this.serie,
        packages: this.packages
      }
      if (this.draft_id) { data.code = this.draft_id }
      api
        .token(this.token)
        .admin().event().create(data)
        .then(response => {
          alert('done!')
        })
    },
    nextStep () {
      this.$router.push({name: 'VisualEditor'})
    },
    updateEventTitle (value) {
      this.$store.commit(types.SET_EVENT_TITLE, { title: this.name })
    },
    load (id) {
      // store ID
      api
        .token(this.token)
        .admin().event(id).get()
        .then(response => {
          var draft = JSON.parse(JSON.parse(response.blueprints.draft))
          draft.id = response.code
          this.has_subevents = draft.packages.length > 0
          this.$store.commit(types.LOAD_EVENT_DRAFT, draft)
        })
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.load(this.$route.query.id)
    } else {
      this.has_subevents = this.packages.length > 0
    }
  },
  computed: {
    ...mapGetters({
      token: 'logInAdminToken',
      serie: 'serie',
      packages: 'packages',
      tickets: 'tickets',
      active_target: 'active_target',
      draft_id: 'draft_id'
    }),
    ...mapState({
      eventTitle: state => state.eventSetup.event_title
    }),
    showSettings () {
      if (this.has_subevents) {
        return !!this.active_target.code
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #special-pricing {
    margin-top: 30px;
  }
  
  .wrapper{
    margin-bottom: 120px;
    .select{
      margin-bottom: 24px;
    }
    .count{
      float: right;
      font-size: 12px;
      margin-top: 3px;
    }
    .discount{
      margin-bottom: 16px;
    }
    .title-filled{
      margin-right: 16px;
    }
    .center{
      margin: 0;
      margin-top: 12px;
    }
    
    .margin{
      margin-bottom: 24px;
    }
    .action{
      outline: 0;
      text-transform: uppercase;
      padding: 0;
      background-color: transparent;
      text-decoration: underline;
      border: none;
      margin: 0;
      color: #292929;
    }
    #setup{
      border-bottom: 1px solid #979797;
      margin-bottom: 32px;
    }
    
    #event-date{
      label{
        margin-bottom: 10px;
      }
    }
    #basic-details, #event-date, #tickets-and-seating, #location{
      padding-bottom: 24px;
      margin-bottom: 24px;
      border-bottom: 1px solid #979797;
    }
    #tickets-and-seating{
      form{
        margin-bottom: 24px;
      }
      button{
        margin-right: 32px;
      }
    }
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
        .status{
          font-weight: bold;
          border: 1px solid #292929;
          text-transform: uppercase;
          margin: 0;
          padding: 4px;
        }
        button{
          margin-left: 24px;
        }
      }
    }
    h3{
      margin: 0 0 14px 0;
      &+p{
        font-size: 18px;
        margin-bottom: 18px;
      }
    }
    h4{
      margin-bottom: 16px;
      & + p{
        font-size: 18px;
        margin-bottom: 24px;
      }
    }
    span{
      display: inline-block;
      margin-bottom: 8px;
    }   
  }
  .error-title{
    margin-top: -24px;
  }
  
</style>