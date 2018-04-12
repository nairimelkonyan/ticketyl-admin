import * as types from '../mutation-types'

const state = {
  components: null,
  data: null
}
const mutations = {
  [types.LOAD_MODAL] (state, data) {
    state.data = data.data
    state.component = data.component
  }
}
const getters = {
  modal_component: state => { return state.component },
  modal_data: state => { return state.data }
}
export default {
  state,
  mutations,
  getters
}
