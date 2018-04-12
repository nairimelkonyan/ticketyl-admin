<template lang="pug">
  section
    h4 !!! You're in date editing mode. You can change or append information to your dates !!!
    p To quit editing mode and see all the dates selected on this event, scroll down and press 'Cancel'. If you wish to continue with editing, follow the instructions.
    br
    section.event-date-nav
      button(@click="tab = 'seating'", :class="{ 'active-nav' : tab === 'seating' }") Seating & Tickets
      button(@click="tab = 'settings'", :class="{ 'active-nav' : tab === 'settings' }") Settings
    section(v-if="tab === 'seating'")
      tk-seating-manager
    section(v-if="tab === 'settings'")
      .row
        .col-sm-7
          span Override the title of the event on selected date/s
          tk-input-translation(placeholder="A short and recognizable title", :target="settings.name", @change="translate_title", maxlength='50')
      br
      .calendar-start-end
        .row
          .col-sm-3
            p Start time
            tk-input-type-text(@input='set_start_time', v-model="settings.start_time")
          .col-sm-3
            p End time
            tk-input-type-text(@input='set_end_time', v-model="settings.end_time")
    hr
    h4 Before you press Update:
    p You have two options to update the settings for the selected dates - overriding and appending. Appending works on tickets, but not the other settings. Settings like name, start date, etc. are overrideable only. Appending tickets works only with the "Open admittance" and "Mixed seating". It defaults to 'Override' when seats.io interface is used. By pressing Cancel button no changes will apply to any of the previously known information. You will lose all the configuration you've set above in the Settings an Seating & Tickets tabs
    br
    tk-secondary-button(name='Update & Append', @click="append()")
    | &nbsp;
    tk-secondary-button(name='Update & Override', @click="override()")
    | &nbsp;
    tk-primary-button(name='Cancel editing', @click="cancel")
                
</template>

<script>
import * as types from '@/store/mutation-types'
// import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      tab: 'seating',
      settings: {
        name: null,
        start_time: null,
        end_time: null
      }
    }
  },
  methods: {
    append () {
      this.$store.commit(types.APPEND_SETTINGS)
    },
    override () {
      this.$store.commit(types.OVERRIDE_SETTINGS)
    },
    translate_title (translations) {
      this.settings.name = translations
      this.update_object()
    },
    set_start_time (time) {
      this.settings.start_time = time
      this.update_object()
    },
    set_end_time (time) {
      this.settings.end_time = time
      this.update_object()
    },
    update_object () {
      var obj = JSON.parse(JSON.stringify(this.edit_object))
      if (!obj.translations) { obj.translations = {} }
      if (!obj.configuration) { obj.configuration = {} }
      if (this.settings.name) { obj.translations.name = this.settings.name }
      if (this.settings.start_time) { obj.start_time = this.settings.start_time }
      if (this.settings.end_time) { obj.end_time = this.settings.end_time }
      this.$store.commit(types.SET_EDIT_OBJECT, obj)
    },
    cancel () {
      this.$store.commit(types.SET_SELECTED_ACTS, null)
    },
    load (object) {
      if (object.translations.name.en) { this.settings.name = object.translations.name }
      if (object.start_time) { this.settings.start_time = object.start_time }
      if (object.end_time) { this.settings.end_time = object.end_time }
    }
  },
  mounted () {
    if (this.edit_object) { this.load(this.edit_object) }
  },
  computed: {
    ...mapGetters({
      active_target: 'active_target',
      serie: 'serie',
      selected_acts: 'selected_acts',
      edit_object: 'edit_object'
    })
  },
  watch: {
    edit_object (object) { this.load(object) }
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
