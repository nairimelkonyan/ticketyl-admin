import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  lang: '',
  token: '',
  token_admin: '',
  name: {},
  search_result: [],
  allowed_gateways: [],
  event_information: [],
  languages: [],
  default_language: '',
  shop: {}
}
const mutations = {
  [types.EVENT_INFO] (state, t) {
    state.event_information = t
  },
  [types.ALLOWED_GATEWAYS] (state, t) {
    state.allowed_gateways = t
  },
  [types.SEARCH_RESULT] (state, t) {
    state.search_result = t
  },
  [types.SET_LANGUAGE] (state, l) {
    state.lang = l
    Vue.i18n.set(l)
  },
  [types.ADD_TOKEN] (state, t) {
    state.token = t
  },
  [types.ADD_TOKEN_ADMIN] (state, t) {
    state.token_admin = t
  },
  [types.DELETE_TOKEN] (state, d) {
    state.token = ''
  },
  [types.SET_CURRENT_ADMIN_NAME] (state, t) {
    state.name = t
  },
  [types.DELETE_ADMIN_TOKEN] (state, d) {
    state.token_admin = ''
  },
  [types.SET_LANGUAGES] (state, ls) {
    state.languages = ls
  },
  [types.SET_DEFAULT_LANG] (state, l) {
    state.default_language = l
  },
  [types.SET_CURRENT_SHOP] (state, shop) {
    state.shop = shop
  }
}
const getters = {
  getEventInfo: state => {
    return state.event_information
  },
  getAllowedGateways: state => {
    return state.allowed_gateways
  },
  getSearchResult: state => {
    return state.search_result
  },
  selectedLanguage: state => {
    return state.lang
  },
  languages: state => {
    return state.languages
  },
  logInToken: state => {
    return state.token
  },
  defaultLanguage: state => {
    return state.default_language
  }
}
export default {
  state,
  mutations,
  getters
}
