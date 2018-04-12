import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import preferences from './modules/preferences'
import merchant from './modules/merchant'
import user from './modules/user'
import eventSetup from './modules/event_setup'
import createdEvent from './modules/created_event'
import modal from './modules/modal'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    merchant,
    user,
    eventSetup,
    preferences,
    createdEvent,
    modal
  },
  strict: debug,
  plugins: [createPersistedState()]
})
