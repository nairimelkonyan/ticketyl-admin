import axios from 'axios'
import modal from '@/services/Modal/Modal'
import store from '@/store'

class Promise {
  successcallback = null;
  errorcallback = null;
  constructor (promise) {
    promise.then(response => {
      if (response.data.error) {
        if (this.errorcallback) {
          this.errorcallback(response.data.error)
        } else {
          this.error(response.data.error)
        }
      } else if (this.successcallback) { this.successcallback(response.data) }
    }).catch((error) => {
      if (!error.data) {
        alert(error)
      } else {
        if (this.errorcallback) {
          this.errorcallback(error.data.error)
        } else {
          this.error(error.data.error)
        }
      }
    })
  }
  then (func) {
    this.successcallback = func
    return this
  }
  catch (func) {
    this.errorcallback = func
    return this
  }
  error (error) {
    console.log('ERROR', error)
    modal.warn(error.code, this.translate(error.translations.message))
  }
  translate (object) {
    var lang = 'en'
    if (!object) { return 'column.404' }
    if (object[lang]) { return object[lang] }
    return 'translation.404'
  }
}

class TicketylOS {
  constructor () {
    this.error_object = null
    this.default = {}
    this.calls = []

    this.api_url = 'https://os.ticketyl.com'
    // this.api_url = 'https://api.ticketyl.dev'
    this.front_url = 'https://danceworld.ticketyl.com'
    this.axios = axios.create({
      baseURL: this.api_url
    })
  }
  activeRequest (request) {
    if (request) {
      this.request = request
      return this
    }
    return this.request
  }
  doRequest (promise) {
    var promiseobj = new Promise(promise)
    this.calls.push(promiseobj)
    return promiseobj
  }
  then (func) {
    this.success_callback = func
    return this
  }
  catch (func) {
    this.error_callback = func
    return this
  }

  get (endpoint, data) {
    this.success_callback = null
    this.error_callback = null
    return this.doRequest(this.axios.get(endpoint, { params: this.mergedParams(data) }))
  }
  post (endpoint, data) {
    this.success_callback = null
    this.error_callback = null
    return this.doRequest(this.axios.post(endpoint, this.mergedParams(data)))
  }
  delete (endpoint, data) {
    // x
  }
  mergedParams (data) {
    data = data || {}
    if (store.getters.token) { data.token = store.getters.token }
    var p = Object.assign({}, this.default, data)
    return p
  }
  token (token) {
    if (token) { this.session_token = token; return this }
    return this.session_token
  }
  admin () {
    return {
      user: () => {
        return {
          refresh: (data) => { return this.post('admin/user/refresh', data) },
          login: (data) => { return this.post('admin/login', data) },
          register: (data) => { return this.post('admin/register', data) },
          close: (data) => { return this.post('admin/user/close', data) },
          password: () => {
            return {
              new: (data) => { return this.post('admin/user/password/new', data) },
              set: (data) => { return this.post('admin/user/password/set', data) },
              reset: (data) => { return this.post('admin/user/password/reset', data) },
              change: (data) => { return this.post('admin/user/password/change', data) }
            }
          }
        }
      },
      merchant: () => {
        return {
          get: (data) => { return this.get('/admin/merchant') },
          update: (data) => { return this.post('admin/merchant', data) },
          series: (data) => { return this.get('/admin/series', data) },
          events: (data) => { return this.get('/admin/events', data) },
          orders: (data) => { return this.get('/admin/orders', data) },
          shops: (data) => { return this.get('/admin/shops', data) },
          subscriptions: (data) => { return this.get('/admin/subscriptions', data) },
          members: (data) => { return this.get('/admin/members', data) },
          upload: (data) => { return this.post('/admin/upload', data) },
          seatsio: (data) => { return this.post('/admin/merchant/seatsio', data) },
          siocharts: (data) => { return this.get('/admin/merchant/seatsio/charts', data) },
          siochart: (data) => { return this.get('/admin/merchant/seatsio/chart', data) },
          stripe: (data) => { return this.post('/admin/merchant/stripe', data) }
        }
      },
      member: (id) => {
        return {
          get: () => { return this.get('/admin/member/' + id) },
          create: (data) => { return this.post('admin/merchant', data) },
          update: (data) => { return this.post('admin/merchant/' + id, data) }
        }
      },
      shop: (id) => {
        return {
          get: () => { return this.get('/admin/shop/' + id) },
          create: (data) => { return this.post('admin/shop', data) },
          update: (data) => { return this.post('admin/shop/' + id, data) },
          special_pricing: (id) => {
            return {
              get: () => { return this.get('/admin/package/' + id) },
              create: (data) => { return this.post('admin/package', data) },
              update: (data) => { return this.post('admin/package/' + id, data) },
              delete: (data) => { console.log(this) }
            }
          }
        }
      },
      event: (id) => {
        return {
          get: () => { return this.get('/admin/event/' + id) },
          create: (data) => { return this.post('admin/event', data) },
          update: (data) => { return this.post('admin/event/' + id, data) },
          layout: (data) => { return this.post('admin/event/' + id + '/layout', data) },
          delete: () => { console.log(this) },
          subevent: (id) => {
            return {
              get: () => { return this.get('/admin/package' + id) },
              create: (data) => { return this.post('admin/package', data) },
              update: (data) => { return this.post('admin/package/' + id, data) },
              delete: (data) => { console.log(this) }
            }
          },
          date: (id) => {
            return {
              get: () => { return this.get('/admin/act' + id) },
              create: (data) => { return this.post('admin/act', data) },
              update: (data) => { return this.post('admin/act/' + id, data) },
              delete: (data) => { console.log(this) }
            }
          }
        }
      },
      subscription: (id) => {
        return {
          get: () => { return this.get('/admin/subscription/' + id) },
          create: (data) => { return this.post('admin/subscription', data) },
          update: (data) => { return this.post('admin/subscription/' + id, data) }
        }
      },
      order: (id) => {
        return {
          get: () => { return this.get('/admin/order/' + id) }
        }
      }
    }
  }
  filter () {
    return {
      filter_search: null,
      filter_categories: [],
      filter_page: 1,
      filter_limit: 50,
      filter_status: null,
      search: function (term) { this.filter_search = term; return this },
      category: function (id) { this.filter_categories.push(id); return this },
      page: function (page) { this.filter_page = page; return this },
      limit: function (limit) { this.filter_limit = limit; return this },
      status: function (status) { this.filter_status = status; return this },
      merge: function (data) {
        var filter = {}
        if (this.filter_search) { filter['filter.search'] = [this.filter_search] }
        if (this.filter_page) { filter['filter.page'] = this.filter_page }
        if (this.filter_limit) { filter['filter.limit'] = this.filter_limit }
        if (this.filter_status) { filter['filter.status'] = this.filter_status }
        if (this.filter_categories) { filter['filter.categories'] = this.filter_categories }
        return Object.assign({}, filter, data)
      }
    }
  }
}
export default new TicketylOS()
