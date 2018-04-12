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
                router-link(:to="{name: 'MainSettings'}") My Account
                router-link(:to="{name: 'ShopPreferences'}") Shop Preferences
                router-link.current(:to="{name: 'ManageTeam'}") Manage Team
                router-link(:to="{name: 'Notifications'}") Notifications
    .content
      .container
        .row
          .col-sm-4#js-scrollspy 
            nav#aside
              p Manage Team
              ul.js-scrollspy-nav
                li#accountLink(@click='accountSpy') 1. Your Account Information
                li#teamLink(@click='teamSpy') Team Members
          .col-sm-8#internal-content
            #team.section.scrollspy
              h3 2. Team Members
              p Add team members and control their permissions
              tk-secondary-button.last(name='add team member', @click="add_member")
              #all-sub-events
                span.sub-event(v-for='(item, index) in members',
                    @click='selected = index',
                    :class="{'active-subevent': selected === index}") {{ item.attributes.first_name }} {{ item.attributes.last_name }}
                  button
                    i.material-icons close
              hr
              | {{ members }}
              tk-settings-team-settings(@input="update", :model="member", v-if="member")
            .row
              .col-sm-8
                //- tk-secondary-button.right(name='revert to saved')
                tk-primary-button(name='save changes', @click="store")
    tk-footer-admin
</template>

<script>
  import { mapGetters } from 'vuex'
  import deepmerge from 'deepmerge'
  import api from '@/services/TicketylOS/TicketylOS'
  import * as types from '@/store/mutation-types'
  export default {
    data () {
      return {
        members: [],
        selected: null
      }
    },
    computed: {
      ...mapGetters({
        token: 'logInAdminToken',
        merchant: 'merchant'
      }),
      member () {
        if (this.selected == null) { return null }
        return this.members[this.selected]
      }
    },
    methods: {
      add_member () {
        this.members.push({
          attributes: { first_name: 'Unnamed', last_name: '' },
          translations: {},
          configuration: {}
        })
        this.selected = this.members.length - 1
      },
      update (data) { this.members[this.selected] = deepmerge(this.members[this.selected], data) },
      store () {
        console.log({ merchant: { members: this.members } })
        api.token(this.token)
          .admin().merchant().update({ merchant: { members: this.members } })
          .then(response => {
            this.$store.commit(types.MECHANT_INIT, response)
          })
      },
      accountSpy () { document.getElementById('account').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) },
      teamSpy () { document.getElementById('team').scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}) },
      load (merchant) {
        console.log('merchant', merchant)
        if (merchant && merchant.members) {
          for (var i in merchant.members) {
            var member = merchant.members[i]
            this.members.push({
              id: member.id,
              translations: member.translations,
              configuration: member.configuration,
              attributes: member.attributes,
              permissions: member.permissions
            })
          }
        }
      }
    },
    mounted () {
      this.load(this.merchant)
      const mq = window.matchMedia('(max-width: 767px)')
      var aside = window.jQuery('#aside')
      window.jQuery(window).scroll(function () {
        var scroll = window.jQuery(window).scrollTop()
        if (mq.matches) { return }
        if (scroll >= '350') { aside.addClass('fixed') } else { aside.removeClass('fixed') }
      })
    },
    watch: {
      merchant (merchant) { this.load(merchant) }
    }
  }
</script>

<style lang="less" scoped>
.sub-event{
  cursor: pointer;
  font-size: 18px;
  display: inline-block;
  padding: 8px;
  border: 1px solid #292929;
  margin-right: 24px;
  margin-bottom: 16px;
  &:hover{
    background-color: #fff;
  }
  &.active-subevent{
    border: 2px solid #292929 !important;
  }
  button{
    padding: 0;
    background-color: transparent;
    border: none;
    outline: 0;
    .material-icons{
      padding-left: 8px;
      vertical-align: middle;
      font-size: 18px;
    }
  }
}
#account, #team{
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
.margin-bottom{
  margin-bottom: 24px;
}
.last{
  margin-bottom: 32px !important;
}
.action{
  outline: 0;
  text-transform: uppercase;
  padding: 0;
  background-color: transparent;
  text-decoration: underline;
  border: none;
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
form{
  margin-bottom: 32px;
  img{
    height: 22px;
    width: 22px;
    margin-right: 8px;
  }
}
.gift-card-content{
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%), url('/static/giftcard_bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: table;
  height: 184px;
  width: 100%;
  margin-bottom: 32px;
  .gift-card-body{
    color: #fff;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    p{
      margin-bottom: 16px;
    }
  }
}
</style>
