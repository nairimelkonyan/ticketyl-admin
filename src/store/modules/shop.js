import * as mutationTypes from '../mutation-types'
import * as actionTypes from '../action-types'
import TicketylOS from '@/services/TicketylOS/TicketylOS'

const state = {
  merchant: null,
  organization: {
    business_details: {},
    business_address: {}
  },
  personal: {},
  shop: {},
  team: []
}
const mutations = {
  [mutationTypes.ADD_ORGANIZATION] (state, o) {
    state.organization = o
  },
  [mutationTypes.ADD_SHOP] (state, s) {
    state.shop = s
  },
  [mutationTypes.ADD_MEMBER] (state, t) {
    state.team.push(t)
  },
  [mutationTypes.SET_MERCHANT] (state, m) {
    state.merchant = m
  },
  [mutationTypes.ADD_PERSONAL_INFO] (state, m) {
    state.personal = m
  },
  [mutationTypes.REMOVE_TEAM_MEMBER] (state, index) {
    state.team.splice(index, 1)
  }
}
const getters = {
  merchant_details: state => {
    return state.merchant
  },
  team_member: state => {
    return state.team
  },
  merchant: state => {
    console.log(state.personal)
    return {
      'title': state.personal.title,
      'first_name': state.personal.first_name,
      'last_name': state.personal.last_name,
      'email': state.personal.email,
      'business_type': state.organization.business_type,
      'company_name': state.organization.business_details.company_name,
      'company_registration_number': state.organization.business_details.registration_no,
      'company_tax_number': state.organization.business_details.tax_no,
      'organization_type': state.organization.organization_type,
      'billing_address': {
        'country': state.organization.business_address.country,
        'address': state.organization.business_address.street_address,
        'city': state.organization.business_address.city,
        'zip': state.organization.business_address.zip
      },
      'shops': [
        {
          'name': state.shop.name,
          'logo': state.shop.logo,
          'domain': state.shop.domain,
          'subdomain': state.shop.subdomain,
          'default_language': state.shop.default_language,
          'default_currency': state.shop.default_currency,
          'allowed_gateways': state.shop.allowed_gateways
        }
      ],
      'team': state.team
    }
  }
}

const actions = {
  [actionTypes.FETCH_MERCHANT] (context, token) {
    TicketylOS.token(token)
    .admin().merchant().get()
    .then(response => {
      console.log(response)
      context.commit(mutationTypes.SET_MERCHANT, response)
    })
  },
  [actionTypes.POST_MERCHANT] (context, token, data) {
    TicketylOS.token(token)
    .admin().merchant().update({
      'merchant': context.getters.merchant
    })
    .then(response => {
      console.log(response)
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
