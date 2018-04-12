import * as types from '../mutation-types'
import moment from 'moment'
const initialState = {
  id: null,
  active_target: null,
  serie: {
    translations: {
      name: {}
    },
    configuration: {},
    layout: {
      aside: [],
      main: []
    }
  },
  packages: [],
  acts: [],
  tickets: [],
  revenue: 0, // per event
  ticket_count: 0, // per event
  editable_ticket: null,
  selected_acts: null,
  edit_object: null,
  set_time: function (datestr, timestr) {
    var date = moment(datestr)
    var time = timestr.split(':')
    if (time.length > 0) { date.hour(time[0]) }
    if (time.length > 1) { date.minute(time[1]) }
    return date
  },
  mutate: function (act, object, override) {
    var i
    if (object.tickets) {
      if (override) {
        act.tickets = object.tickets
      } else { for (i in object.tickets) { act.tickets.push(object.tickets[i]) } }
    }
    if (object.translations) {
      for (i in object.translations) { act.translations[i] = object.translations[i] }
    }
    if (object.configuration) {
      for (i in object.configuration) { act.configuration[i] = object.configuration[i] }
    }
    if (object.start_time) {
      act.date_start = this.set_time(act.date_start, object.start_time)
    }
    if (object.end_time) { act.date_end = this.set_time(act.date_end, object.end_time) }

    act.ticket_count = 0
    act.revenue = 0
    for (i in act.tickets) {
      act.ticket_count += parseInt(act.tickets[i].quantity)
      act.revenue += parseInt(act.tickets[i].quantity * act.tickets[i].price.amount)
    }
  },
  collect_selected_indexes: function () {
    var indexes = []
    for (var i in this.target().acts) {
      for (var k in this.selected_acts) {
        if (this.selected_acts[k].id === this.target().acts[i].id) {
          indexes.push(i)
          break
        }
      }
    }
    return indexes
  },
  override: function (object) {
    var indexes = this.collect_selected_indexes()
    for (var i in indexes) {
      this.mutate(this.target().acts[indexes[i]], object, true)
    }
  },
  append: function (object) {
    var indexes = this.collect_selected_indexes()
    for (var i in indexes) {
      this.mutate(this.target().acts[indexes[i]], object, false)
    }
  },
  update: function (data) {
    for (var i in data) {
      this.target()[i] = data[i]
    }
  },
  target: function () {
    if (this.active_target !== null) {
      if (!this.packages.length) { return this.serie }
      if (this.packages.length - 1 < this.active_target) {
        return this.packages[0]
      }
      return this.packages[this.active_target]
    } else {
      return this.serie
    }
  },
  refresh: function () {
    this.ticket_count = 0
    this.revenue = 0
    for (var i in this.tickets) {
      this.ticket_count += parseInt(this.tickets[i].quantity)
      this.revenue += parseInt(this.tickets[i].price.amount)
    }
  }
}

const state = {...initialState}
const mutations = {
  [types.LOAD_EVENT_DRAFT] (state, data) {
    state.serie = data.serie
    state.packages = data.packages
    state.id = data.id
  },
  [types.UPDATE_LAYOUT_ASIDE] (state, data) {
    state.serie.layout.aside = [...data]
  },
  [types.UPDATE_LAYOUT_MAIN] (state, data) {
    state.serie.layout.main = [...data]
  },

  [types.SET_TICKET_EDITABLE] (state, i) {
    state.editable_ticket = i
  },
  [types.SET_ACTIVE_PACKAGE] (state, index) {
    state.active_target = index
  },
  [types.UPDATE_ACTIVE_TARGET] (state, data) {
    state.update(data)
  },
  [types.REMOVE_ACTS] (state, acts) {
    // state.selected_acts = acts
  },
  [types.SET_EDIT_OBJECT] (state, data) {
    state.edit_object = data
  },
  [types.SET_SELECTED_ACTS] (state, acts) {
    state.selected_acts = acts
    state.edit_object = {
      tickets: [],
      translations: { name: {}, description: {} },
      configuration: {}
    }
    if (acts && acts.length === 1) {
      const act = acts[0]
      state.edit_object = {
        tickets: act.tickets,
        translations: act.translations,
        configuration: act.configuration,
        start_time: moment(act.date_start).format('HH:mm'),
        end_time: moment(act.date_end).format('HH:mm')
      }
    }
  },
  [types.SET_TICKET_EDITABLE] (state, i) { state.editable_ticket = i },
  [types.SET_ACTIVE_PACKAGE] (state, index) { state.active_target = index },
  [types.UPDATE_ACTIVE_TARGET] (state, data) { state.update(data) },
  [types.SET_EVENT_TITLE] (state, data) {
    if (!state.serie.translations) { state.serie.translations = {} }
    state.serie.translations.name = data
  },
  [types.SET_ACTIVE_TARGET_NAME] (state, data) {
    if (!state.target().translations) { state.target().translations = {} }
    state.target().translations.name = data
  },
  [types.ADD_SUBEVENT] (state, e) {
    state.packages.push(e)
    state.active_target = state.packages.length - 1
  },
  [types.DELETE_SUBEVENT] (state, i) {
    state.packages.splice(i, 1)
    state.active_target = state.packages.length - 1
  },
  [types.CLEAR_SUBEVENTS] (state) { state.packages = [] },
  [types.ADD_EVENT] (state, act) {
    if (!state.target().acts) { state.target().acts = [] }
    state.target().acts.push(act)
    state.refresh()
  },
  [types.DELETE_ADMIN_EVENT] (state, index) {
    state.target().acts.splice(index, 1)
    state.refresh()
  },
  [types.DUPLICATE_ADMIN_EVENT] (state, index) {
    var currentEvent = state.target().acts[index]
    var duplEvent = Object.assign({}, currentEvent)
    state.target().acts.push(duplEvent)
    state.refresh()
  },
  [types.ADD_EVENT_TICKET] (state, ticket) {
    state.edit_object.tickets.push(ticket)
    state.refresh()
  },
  [types.UPDATE_EVENT_TICKET_NAME] (state, data) {
    state.edit_object.tickets[data.index].translations.name = data.translations
  },

  [types.RESET_EVENT] (state, data) {
    Object.keys(state).forEach((key) => {
      state[key] = initialState[key]
    })
    state.all_events = []
  },
  [types.CLEAR_EVENT_TICKETS] (state) {
    state.edit_object.tickets = []
    state.refresh()
  },
  [types.DELETE_ADMIN_TICKETS] (state, index) {
    state.edit_object.tickets.splice(index, 1)
    state.refresh()
  },
  [types.DUPLICATE_ADMIN_TICKET] (state, index) {
    var findEvent = state.edit_object.tickets[index]
    var duplicateEvent = Object.assign({}, findEvent)
    state.edit_object.tickets.push(duplicateEvent)
    state.refresh()
  },
  [types.UPDATE_EVENT_TICKET_QUANTITY] (state, data) {
    state.edit_object.tickets[data.index].quantity = data.value
    state.refresh()
  },
  [types.UPDATE_EVENT_TICKET_PRICE] (state, data) {
    state.edit_object.tickets[data.index].price = { amount: data.value, currency: data.currency }
    state.refresh()
  },
  [types.UPDATE_TICKET_SETTINGS] (state, data) {
    for (var i in data.translations) { state.edit_object.tickets[state.editable_ticket].translations[i] = data.translations[i] }
    for (i in data.configuration) { state.edit_object.tickets[state.editable_ticket].configuration[i] = data.configuration[i] }
  },
  [types.ADD_CHARGE] (state, charge) {
    state.edit_object.tickets[state.editable_ticket].own_charges.push(charge)
  },
  [types.REMOVE_CHARGE] (state, payload) {
    state.edit_object.tickets[state.editable_ticket].own_charges.splice(payload.i, 1)
  },
  [types.DUPLICATE_CHARGE] (state, payload) {
    state.edit_object.tickets[state.editable_ticket].own_charges.push(state.edit_object.tickets[state.editable_ticket].own_charges[payload.i])
  },
  [types.STORE_CHARGE_GROUP] (state, group) {
    state.edit_object.tickets[state.editable_ticket].charges.must.push(group)
    state.edit_object.tickets[state.editable_ticket].own_charges = []
  },
  [types.ADD_SPECIAL_PRICE] (state, item) {
    if (!state.edit_object.tickets[state.editable_ticket].special_pricing[item.code]) {
      state.edit_object.tickets[state.editable_ticket].special_pricing[item.code] = item
    }
  },
  [types.REMOVE_SPECIAL_PRICE] (state, item) {
    if (state.edit_object.tickets[state.editable_ticket].special_pricing[item.code]) {
      delete state.edit_object.tickets[state.editable_ticket].special_pricing[item.code]
    }
  },
  [types.SET_SPECIAL_PRICE_AMOUNT] (state, data) {
    if (state.edit_object.tickets[state.editable_ticket].special_pricing[data.item.code]) {
      state.edit_object.tickets[state.editable_ticket].special_pricing[data.item.code].amount = data.amount
    }
  },
  [types.SET_SPECIAL_PRICE_QUANTITY] (state, data) {
    if (state.edit_object.tickets[state.editable_ticket].special_pricing[data.item.code]) {
      state.edit_object.tickets[state.editable_ticket].special_pricing[data.item.code].quantity = data.quantity
    }
  },
  [types.APPEND_SETTINGS] (state) {
    state.override(state.edit_object)
    state.selected_acts = null
  },
  [types.OVERRIDE_SETTINGS] (state) {
    state.append(state.edit_object)
    state.selected_acts = null
  }
}
const getters = {
  edit_ticket: state => { return state.editable_ticket },
  all_events: state => { return state.all_events },
  all_tickets: state => { return [] },
  subevents: state => { return state.subevents },
  packages: state => { return state.packages },
  draft_id: state => { return state.id },
  tickets: state => {
    if (!state.edit_object) { return null }
    return state.edit_object.tickets
  },
  serie: state => { return state.serie },
  active_target: state => { return state.target() },
  acts: state => { return state.target().acts },
  revenue: state => { return state.revenue },
  ticket_count: state => { return state.ticket_count },
  selected_acts: state => { return state.selected_acts },
  edit_object: state => { return state.edit_object }
}
export default {
  state,
  getters,
  mutations
}
