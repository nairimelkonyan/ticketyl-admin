<template lang="pug">
  .dropdown.account
    button#dLabel(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false') {{ user.email }}
      i.material-icons keyboard_arrow_down
    ul.dropdown-menu(aria-labelledby='dLabel')
      li: router-link(:to="{'path': '/events'}") Event List
      li: router-link(:to="{'path': '/analytics'}") Analytics
      li: router-link(:to="{'path': '/merchant/cashout'}") Cashout
      li: router-link(:to="{'path': '/transactions'}") Transaction Manager
      li: router-link(:to="{'path': '/merchant/settings'}") Main Settings
      li: a: span(@click='logOut') Log Out
</template>

<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  name: 'Account',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    toTransactionManager () {
      // this.$router.push({name: 'Transaction'})
    },
    logOut () {
      this.$store.commit(types.USER_INIT, null)
      this.$store.commit(types.DELETE_ADMIN_TOKEN)
      this.$router.push({name: 'Ticketyl'})
    }
  }
}
</script>

<style lang="less" scoped>
  .dropdown-menu{
    visibility: hidden;
    display: inline-block;
    opacity: 0;
    z-index: 2;
    background-color: #fff;
    padding: 10px 0;
    border-radius: 0;
    min-width: 180px;
    top: 125%;
    left: -30%;
    a{
      text-transform: none;
      letter-spacing: 0.5px;
      display: block;
      text-align: right;
      padding: 10px;
      font-size: 14px;
      cursor: pointer;
      color: #292929;
      text-decoration: none;
    }
    a:hover{
      background-color: #f7f7f7;
      text-decoration: none;
    }
  }
  .dropdown-menu::after{
    z-index: -1;
    position: absolute;
    left: 42%;
    top: -10px;
    width: 0;
    height: 0;
    content: '';
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #fff;
  }
  .account {
    display: inline-block;
    color: black;
    button{
      outline: 0;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
      border: none;
      background-color: transparent;
      padding: 0;
    }
    .material-icons{
      vertical-align: middle;
      color: #9a9a9a;
      font-size: 20px;
      padding-left: 8px;
    }
  }
  .open > .dropdown-menu {
  visibility: visible;
  display: block;
  opacity: 1;
  transition: all 0.1s linear;
  -webkit-transition: all 0.1s linear;
  top: 170%;
}
</style>
