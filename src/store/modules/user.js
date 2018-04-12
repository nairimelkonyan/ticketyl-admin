import * as mutationTypes from '../mutation-types'
import moment from 'moment'
import currentUser from '@/services/User/User'

const state = {
  user: null,
  expires: null,
  token: null,
  merchant: null,
  shop: null
}
const mutations = {
  [mutationTypes.USER_INIT] (state, user) {
    console.log('user', user)
    if (user) {
      state.user = user
      state.token = user.token
      state.expires = user.expires
      state.merchant = user.merchant
      if (!this.shop && user.merchant.shops.length) { this.shop = user.merchant.shops[0] }
      currentUser.setUser(user)
    } else {
      state.user = null
      state.token = null
      state.expires = null
      state.merchant = null
      state.shop = null
      currentUser.setUser(null)
    }
  },
  [mutationTypes.MECHANT_INIT] (state, merchant) {
    console.log('merchant', merchant)
    state.merchant = merchant
    if (!this.shop && merchant.shops.length) { this.shop = merchant.shops[0] }
  },
  [mutationTypes.SHOP_SELECT] (state, shop) {
    console.log('shop', shop)
    state.shop = shop
  }
}
const getters = {
  logged: state => {
    if (state.token) {
      var now = moment.utc()
      var expires = moment.utc(state.expires.date)
      var left = expires.diff(now, 'seconds')
      console.log('session expires in ' + left + ' seconds')
      if (left > 0) { return true }
    }
    return false
  },
  user: state => { return state.user },
  expires: state => { return state.expires },
  token: state => { return state.token },
  merchant: state => { return state.merchant },
  shop: state => { return state.shop },
  logInAdminToken: state => { return state.token }
}

export default {
  state,
  mutations,
  getters
}
