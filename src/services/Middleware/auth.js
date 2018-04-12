import store from '@/store'
export default {
  guest: (to, from, next) => {
    next()
  },
  auth: (to, from, next) => {
    console.log(store.getters.user)
    if (store.getters.logged) {
      console.log(store.getters.merchant.configuration.state)
      if (store.getters.merchant.configuration.state === 'installed') {
        next()
      } else {
        if (to.path === '/event-list') {
          next({
            path: '/onboarding-organization',
            query: { redirect: to.name }
          })
        } else {
          next()
        }
      }
    } else {
      next({
        path: '/',
        query: { redirect: to.name }
      })
    }
  }
}
