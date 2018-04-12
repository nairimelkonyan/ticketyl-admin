import store from '@/store'
import * as types from '@/store/mutation-types'
import moment from 'moment'
import api from '@/services/TicketylOS/TicketylOS'
class User {
  constructor () {
    this.user = null
    this.expires = null
    this.timer = null
  }
  setUser (user) {
    if (user) {
      console.log(user)
      this.user = user
      this.expires = user.expires
      this.timer = setInterval(() => {
        this.tick()
      }, 1000)
    } else {
      clearInterval(this.timer)
    }
  }
  tick () {
    if (this.expires) {
      var now = moment.utc()
      var expires = moment.utc(this.expires.date)
      var left = expires.diff(now, 'seconds')
      if (left < 60 && !this.reloading) { this.reload() }
    }
  }
  reload () {
    this.reloading = true
    api
      .token(store.getters.token)
      .admin().user().refresh()
      .then(response => {
        clearInterval(this.timer)
        this.reloading = false
        store.commit(types.USER_INIT, response)
      })
      .catch(response => {
        clearInterval(this.timer)
        this.reloading = false
        store.commit(types.USER_INIT, null)
      })
  }
}
export default new User()
