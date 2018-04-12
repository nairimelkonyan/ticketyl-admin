import store from '@/store'
import * as types from '@/store/mutation-types'
class Modal {
  error = '#error_modal';
  warn (code, message) {
    window.jQuery('#error_modal').find('#message').html(message)
    window.jQuery('#error_modal').find('#code').html(code)
    this.show('#error_modal')
  }
  show (selector) {
    this.hide('.modal')
    window.jQuery(selector).modal('show')
  }
  hide (selector) {
    window.jQuery(selector).modal('hide')
  }
  load (component, data) {
    store.commit(types.LOAD_MODAL, {
      component: component,
      data: data
    })
    console.log('showing')
    this.show('#loadable_modal')
  }
}
export default new Modal()
