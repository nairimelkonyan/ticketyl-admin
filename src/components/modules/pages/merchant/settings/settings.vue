<template lang="pug">
  section
    tk-header-admin
    .settings
      .container
        #settings
          .row
            .col-sm-4
              .settings-content
                .settings-body
                  h2 Main Settings
            .col-sm-8.text-right
              .settings-content
                .settings-body
                  //- tk-secondary-button(name='revert to saved')
                  tk-primary-button(name='save changes', @click="store")
    .container
      .navigation
        .row
          .col-sm-12
            .menu-content
              .menu-body
                router-link.current(:to="{name: 'MainSettings'}") My Account
                router-link(:to="{name: 'ShopPreferences'}") Shop Preferences
                router-link(:to="{name: 'ManageTeam'}") Manage Team
                router-link(:to="{name: 'Notifications'}") Notifications
    .content
      .container
        .row
          .col-sm-4#js-scrollspy 
            nav#aside
              p My Account
              ul.js-scrollspy-nav
                li#personalLink(@click='personalSpy') 1. Account Information
                li#passwordLink(@click='passwordSpy') 2. Change Password
                li#newsletterLink(@click='newsletterSpy') 3. Newsletter Subscription
                li#deleteLink(@click='deleteSpy') 4. Delete Account
          .col-sm-8#internal-content
            div#personal-scroll
              h3 1. Account Information
              p All of the information we need to pre-fill the purchase details for you when you make a purchase.
              h4 Personal Info
              #personal.section.scrollspy
                tk-settings-personal-info(@input="update", :model="merchant")
              h4 Billing address
              #billing.section.scrollspy
                tk-settings-billing-address(@input="update", :model="merchant")
            div#password-scroll
              h3 2. Change Password
              p For safety reasons we recommend you change your password regularely.
              tk-settings-change-password(@input="change_password")
            div#subscription-scroll
              h3 3. Newsletter Subscription
              p We have news regarding your events, enter your email address to stay updated.
              tk-settings-newsletter-subscription(@input="update", :model="merchant")
            div#delete-scroll
              h3 4. Delete Account
              p Delete all you account details and purchase history.
              tk-settings-delete-account(@input="close_account")
              p * The account details cannot be retraced after the account has been deleted, so only delete your account if you are sure no valuable information will be deleted.
            .row
              .col-sm-8
                tk-primary-button(name='save changes', @click="store")
    tk-footer-admin
</template>

<script>
  import deepmerge from 'deepmerge'
  import api from '@/services/TicketylOS/TicketylOS'
  import * as types from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        data: {},
        storing: false
      }
    },
    methods: {
      update (data) { this.data = deepmerge(this.data, data) },
      store () {
        api.token(this.token)
          .admin().merchant().update({ merchant: this.data })
          .then(response => {
            this.$store.commit(types.MECHANT_INIT, response)
          })
      },
      change_password (data) {
        api.token(this.token)
          .admin().user().password().change(data)
          .then(response => {
            this.$store.commit(types.USER_INIT, response)
          })
      },
      close_account (data) {
        api.token(this.token)
          .admin().user().close()
          .then(response => {
            this.$store.commit(types.USER_INIT, response)
          })
      },
      personalSpy () { document.getElementById('personal').scrollIntoView({behavior: 'smooth', block: 'end', inline: 'end'}) },
      passwordSpy () { document.getElementById('password-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) },
      newsletterSpy () { document.getElementById('subscription-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) },
      deleteSpy () { document.getElementById('delete-scroll').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) }
    },
    computed: {
      ...mapGetters({
        merchant: 'merchant',
        token: 'logInAdminToken'
      })
    },
    mounted () {
      const mq = window.matchMedia('(max-width: 767px)')
      var aside = window.jQuery('#aside')
      window.jQuery(window).scroll(function () {
        var scroll = window.jQuery(window).scrollTop()
        if (mq.matches) { return }
        if (scroll >= '350') { aside.addClass('fixed') } else { aside.removeClass('fixed') }
      })
    }
  }
</script>

<style lang="less" scoped>
#personal, #billing, #password-scroll, #subscription-scroll, #delete-scroll{
  margin-bottom: 32px;
  border-bottom: 1px solid #979797;
}
.navigation{
  border-bottom: 1px solid #979797;
  margin-bottom: 32px;
  .menu-content{
    display: table;
    height: 88px;
    width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      a{
        text-transform: none;
        position: relative;
        text-decoration: none;
        margin-right: 50px;
        color: #292929;
        font-size: 18px;
        .router-link-exact-active{
          position: relative;
          width: 10px;
          height: 2px;
          -webkit-text-stroke: 1px #292929;
          &:after{
            content: "";
            position: absolute;
            width: 10px;
            height: 1px;
            background-color: #292929;
            left: 0;
            right: 0;
            bottom: -10px;
            margin: 0 auto;
          }
        }
      }
    }
  }
}               
.settings{
  background-color: #f7f7f7;
  #settings{
    border-bottom: 1px solid #979797;
  }
  .settings-content{
    display: table;
    height: 116px;
    width: 100%;
    .settings-body{
      display: table-cell;
      vertical-align: middle;
      h2{
        margin: 0;
      }
      button{
        margin-left: 24px;
      }
      .back{
        text-transform: uppercase;
        padding: 0;
        border: none;
        outline: 0;
        text-decoration: underline;
        background-color: transparent;
      }
    }
  }        
}
.content{
  margin-bottom: 120px;
}
nav{
  padding: 24px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  p{
    color: #9a9a9a;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  ul{
    text-decoration: none;
    padding: 0;
    list-style-type: none;
    li{
      margin-bottom: 16px;
      cursor: pointer;
      &:last-child{
        margin: 0;
      }
    }
    a{
      cursor: pointer;
      text-transform: capitalize;
      text-decoration: none;
      &:hover{
        color: #292929;
      }
    }
  }
}
.active{
  font-weight: bold;
}
.center{
  margin: 0;
  margin-top: 12px;
}
.current{
  position: relative;
  -webkit-text-stroke: 1px #292929;
  &:after{
    position: absolute;
    content: '';
    width: 14px;
    height: 1px;
    background-color: #292929;
    bottom: -11px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
.fixed{
  position: fixed;
  background-color: #f7f7f7;
  z-index: 1;
  width: 360px;
  top: 32px;
}
input[type='text']{
  margin-bottom: 24px;
}
.last{
  margin-bottom: 32px !important;
}
.right{
  margin-right: 32px;
}
h3{
  margin-top: 0;
  +p{
    margin-bottom: 32px;
  }
}
h4{
  margin-bottom: 24px;
}
</style>
