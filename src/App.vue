<template>
  <div id="app">
    <tk-error-message></tk-error-message>
    <router-view></router-view>
  </div>
</template>

<script>
  import currentUser from '@/services/User/User'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    created () {
      currentUser.setUser(this.user)
    },
    computed: {
      ...mapGetters({
        user: 'user'
      })
    }
  }
</script>

<style>
</style>
