import axios from 'axios'
export default class ApiService {

  constructor () {
    this.success_callback = null
    this.error_callback = null
    this.defaultParams = {
      shop: 'danceworld.ticketyl.com'
    }
    this.session_token = null
    this.api_url = 'https://os.ticketyl.com'
    this.api_url = 'https://api.ticketyl.dev'
    this.front_url = 'https://danceworld.ticketyl.com'
    // this.front_url = 'https://localhost:8080'
    this.axios = axios.create({
      baseURL: 'https://os.ticketyl.com'
      // baseURL: 'http://192.168.10.10'
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
    this.activeRequest(promise)
    promise.then(response => {
      if (this.success_callback) { this.success_callback(response.data) }
    }).catch((error, response) => {
      this.error(error)
      if (this.error_callback) { this.error_callback(error.response.data) }
    })
    return this
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
  error (error) {
    console.log(error.response.data)
    // alert(error.response.data.code)
  }
  mergedParams (data) {
    data = data || {}
    if (this.token) { data.token = this.session_token }
    var p = Object.assign({}, this.defaultParams, data)
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
          login: (data) => { return this.post('admin/login', data) },
          register: (data) => { return this.post('admin/register', data) },
          password: () => {
            return {
              new: (data) => { return this.post('admin/user/password/new', data) },
              set: (data) => { return this.post('admin/user/password/set', data) },
              reset: (data) => { return this.post('admin/user/password/reset', data) }
            }
          }
        }
      },
      merchant: function () {
        return {
          get: (data) => { return this.get('/admin/merchant/') },
          update: (data) => { return this.post('admin/merchant/', data) },
          series: (data) => { return this.get('/admin/series', data) },
          events: (data) => { return this.get('/admin/events', data) },
          orders: (data) => { return this.get('/admin/orders', data) },
          shops: (data) => { return this.get('/admin/shops', data) },
          subscriptions: (data) => { return this.get('/admin/subscriptions', data) },
          members: (data) => { return this.get('/admin/members', data) },
          upload: (data) => { return this.post('/admin/upload', data) }
        }
      },
      member: function (id) {
        return {
          api: this.api,
          get: function () { return this.api.get('/admin/member/' + id) },
          create: function (data) { return this.api.post('admin/merchant', data) },
          update: function (data) { return this.api.post('admin/merchant/' + id, data) }
        }
      },
      shop: function (id) {
        return {
          api: this.api,
          get: function () { return this.api.get('/admin/shop/' + id) },
          create: function (data) { return this.api.post('admin/shop', data) },
          update: function (data) { return this.api.post('admin/shop/' + id, data) },
          special_pricing: function (id) {
            return {
              api: this.api,
              get: function () { return this.api.get('/admin/package/' + id) },
              create: function (data) { return this.api.post('admin/package', data) },
              update: function (data) { return this.api.post('admin/package/' + id, data) },
              delete: function (data) { console.log(this) }
            }
          }
        }
      },
      event: function (id) {
        return {
          api: this.api,
          get: function () { return this.api.get('/admin/event/' + id) },
          create: function (data) { return this.api.post('admin/event', data) },
          update: function (data) { return this.api.post('admin/event/' + id, data) },
          layout: function (data) { return this.api.post('admin/event/' + id + '/layout', data) },
          delete: function () { console.log(this) },
          subevent: function (id) {
            return {
              api: this.api,
              get: function () { return this.api.get('/admin/package' + id) },
              create: function (data) { return this.api.post('admin/package', data) },
              update: function (data) { return this.api.post('admin/package/' + id, data) },
              delete: function (data) { console.log(this) }
            }
          },
          date: function (id) {
            return {
              api: this.api,
              get: function () { return this.api.get('/admin/act' + id) },
              create: function (data) { return this.api.post('admin/act', data) },
              update: function (data) { return this.api.post('admin/act/' + id, data) },
              delete: function (data) { console.log(this) }
            }
          }
        }
      },
      subscription: function (id) {
        return {
          api: this.api,
          get: function () { return this.api.get('/admin/subscription/' + id) },
          create: function (data) { return this.api.post('admin/subscription', data) },
          update: function (data) { return this.api.post('admin/subscription/' + id, data) }
        }
      },
      order: function (id) {
        return {
          api: this.api,
          get: function () { return this.api.get('/admin/order/' + id) }
        }
      }
    }
  }
  shop () {
    return {
      api: this,
      get: function (data) { return this.api.get('/shop', data) },
      routes: function (data) { return this.api.get('/shop/routes', data) },
      route: function (id) {
        return {
          api: this.api,
          layout: function () { return this.api.get('/shop/route/' + id + '/layout') }
        }
      },
      newsletter (email) { return this.axios.post('/shop/newsletter', { email: email }) },
      series: function (params) { return this.api.get('/shop/series', params) },
      serie: function (id) { return this.api.get('/shop/serie/' + id) },
      packages: function (seriesId) { return this.api.get('/shop/serie/' + seriesId + '/packages') },
      events () {
        return {
          api: this.api,
          filter (filter) { return this.api.get('/shop/events', filter.merge({})) }
        }
      },
      seats: function (eventId) { return this.api.get('/shop/event/' + eventId + '/seats') },
      subscriptions: function () { return this.api.get('/shop/subscriptions') }
    }
  }
  gateway (key) {
    return {
      api: this,
      key: key,
      pay: function (transactionId, data) {
        var url = this.api.api_url + '/gateway/' + transactionId + '/pay?' + Object.keys(data).map(function (key) { return key + '=' + data[key] }).join('&')
        console.log(url)
        document.location.href = url
      }
    }
  }
  order (code) {
    return {
      api: this,
      code: code,
      reserve: function (data) { return this.axios.post('/order', data) },
      get: function (code) { return this.api.get('/order/' + code) },
      finalize: function (code) { return this.axios.post('/order/' + code + '/finalize') }
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

  // Get
  getShopRoutes (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/routes', { params: p })
  }
  getShop (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop', { params: p })
  }
  getShopSeries (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/series', { params: p })
  }
  getShopPackages (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/packages', { params: p })
  }
  getShopEvents (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/events', { params: p })
  }
  getShopSeats (params) {
    params = params || {}
    // var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/event/' + params.series_id + '/seats', {params: this.defaultParams})
  }
  getShopgiftCards (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/gift_cards', { params: p })
  }
  getShopVoucher (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/voucher', { params: p })
  }
  getUserLogin (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/user/authenticate', { params: p })
  }
  gettOrderInvoice (id, params) {
    return this.axios.get('/order/' + id + '/invoice', { params: params })
  }
  getOrderGiftCard (id, params) {
    return this.axios.get('/order/' + id + '/gift_card', { params: params })
  }
  getOrderTicket (id, params) {
    return this.axios.get('/order/' + id + '/ticket', { params: params })
  }
  getOrderId (id, params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/order/' + id + '?shop=' + p.shop)
  }
  // Post
  postOrder (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('/order?shop=' + p.shop, p)
  }
  postNewsLetter (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('/shop/newsletter?shop=' + p.shop + '&email=' + p.email, {})
  }
  payOrder (id, params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    var url = 'https://staging.v2.ticketyl.com/gateway/' + id + '/pay?' + Object.keys(p).map(function (key) { return key + '=' + p[key] }).join('&')
    console.log(url)
    document.location.href = url
  }
  postOrderFinalize (id, params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('/order/' + id + '/finalize?shop=' + p.shop, p)
  }
  postUserAuth (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('/user/authenticate', p)
  }
  postUserRefresh (id, params) {
    return this.axios.post('/user/refresh', params)
  }
  getRoutes (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/routes', {params: p})
  }
  getRouteLayout (id, params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/route/' + id + '/layout', {params: p})
  }
  getSerieLayout (id, params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.get('/shop/serie/' + id, { params: p })
  }
  // Admin
  postUserAuthAdmin (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('admin/user/login', p)
  }
  postUserAdminRegister (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('admin/user/register', p)
  }
  postUserPasswordSet (params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('admin/user/password/set', p)
  }
  postMerchant (token, params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('admin/merchant?token=' + token, p)
  }
  postShop (token, params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('admin/shop?token=' + token, p)
  }
  postEvent (token, params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('admin/event?token=' + token, p)
  }
  postEventLayout (id, status, params, token) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    p.status = status
    return this.axios.post('admin/event/' + id + '/layout?token=' + token, p)
  }
  /* Get */
  getMerchant (token) {
    return this.axios.get('/admin/merchant?token=' + token)
  }
  getAdminOrders (token, params) {
    params = params || {}
    var p = Object.assign({}, this.defaultParams, params)
    return this.axios.post('admin/orders?download=false&token=' + token + '&filter.status=approved&filter.series=1', { params: p })
  }
}
