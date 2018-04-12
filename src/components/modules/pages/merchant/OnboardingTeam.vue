<template lang="pug">
  section
    tk-header-admin
    .content
      .container
        .menu
          .row
            .col-sm-6.text-left
              .menu-content
                .menu-body
                  h5  Step 3 of 3
                  h2 Team Setup
                  p Set up your own profile and invite people to collaborate
            .col-sm-6.text-right
              .menu-content
                .menu-body
                  button(@click='skip').action Skip this step
                  tk-primary-button(name='finish onboarding', @click='validateBeforeSubmit')
        main
          .team-information(v-if="team_member")
            .row
              .col-sm-8.col-sm-offset-2
                .team-content
                  h4 Team Members
                  p Add team members and control their permissions
                  transition(name='slide-fade')
                    .team-members(v-if='team_member.length > 0')
                      .row
                        .col-sm-5.col-sm-offset-1
                          p(v-if='team_member.length > 0') Team Members 
                            strong ( {{ team_member.length }} )
                          p(v-else) Team Members
                        .col-sm-6
                          .member(v-for='(m, index) in team_member')
                            span {{ m.member_email }}
                              button(@click='deleteMember(index)')
                                i.material-icons close
                      .row(v-if='team_member.length > 0')
                        .col-sm-11.col-sm-offset-1
                          .div-line
                  .row(style='margin-bottom: 40px;')
                    .col-sm-5.col-sm-offset-1
                      p.top Team Member Email
                    .col-sm-6
                      tk-input-type-text#email(placeholder='email@email.com', v-model='member_info.member_email')
                      p.error-member(v-if='!valid_email') Please provide valid email address
                  .row
                    .col-sm-5.col-sm-offset-1
                      p Permissions
                    .col-sm-6
                      form
                        input(type='checkbox', name='permissions', id="Events", value='shop', v-model='member_info.permissions')
                        label(for="Events") Manage Events
                        input(type='checkbox', name='permissions', id="Users", value='events', v-model='member_info.permissions')
                        label(for="Users") Manage Users
                        input(type='checkbox', name='permissions', id="Orders", value='team', v-model='member_info.permissions')
                        label(for="Orders") Manage Orders
                        input(type='checkbox', name='permissions', id="merchant", value='checkin', v-model='member_info.permissions')
                        label(for="merchant") Merchant
                        input(type='checkbox', name='permissions', id="Promotion", value='promotion', v-model='member_info.permissions')
                        label(for="Promotion") Promotion
                  // .row(style='margin-bottom: 40px;')
                      .col-sm-5.col-sm-offset-1
                        p Shops
                      .col-sm-6
                        button.action Only this shop
                          i.material-icons keyboard_arrow_down
                  .row
                    .col-sm-5.col-sm-offset-1
                    .col-sm-6
                      tk-secondary-button(name='add team member', @click='addMember', style='margin-bottom: 8px;')
    tk-footer-admin-white(:active='3', name='finish onboarding', @click='validateBeforeSubmit')
</template>

<script>
  import * as mutationTypes from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import api from '@/services/TicketylOS/TicketylOS'

  export default {
    data () {
      return {
        valid_email: true,
        personal_info: {
          title: 'Mr',
          first_name: '',
          last_name: '',
          email: ''
        },
        member_info: {
          member_email: '',
          shops: '',
          permissions: [],
          redirect: '/new-member/123/123'
        },
        title: [ 'Mr.', 'Ms.' ]
      }
    },
    methods: {
      skip () {
        this.$router.push({name: 'CreateEvent'})
      },
      addMember () {
        var mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if (this.member_info.member_email.match(mailformat)) {
          var member = JSON.parse(JSON.stringify(this.member_info))
          this.$store.commit(mutationTypes.ADD_MEMBER, member)
          this.member_info.member_email = ''
          this.member_info.permissions.length = 0
          this.valid_email = true
          document.getElementById('email').classList.remove('wrongInput')
        } else {
          document.getElementById('email').classList.add('wrongInput')
          document.getElementById('email').focus()
          this.valid_email = false
        }
      },
      deleteMember (index) {
        this.$store.commit(mutationTypes.REMOVE_TEAM_MEMBER, index)
      },
      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log(this.merchant_setup_data)
            api
              .token(this.token)
              .admin().merchant().update({
                merchant: this.merchant_setup_data
              })
              .then(response => {
                this.$store.commit(mutationTypes.MECHANT_INIT, response)
                this.$router.push({name: 'EventList'})
              })
            return
          }
        })
      }
    },
    computed: {
      ...mapGetters({
        team_member: 'team_member',
        merchant: 'merchant',
        token: 'logInAdminToken',
        merchant_setup_data: 'merchant_setup_data'
      })
    }
  }
</script>

<style lang="less" scoped>
.team-members{
  margin-bottom: 24px;
  .div-line{
    border-bottom: 1px solid #979797;
  }
  button{
    outline: 0;
    background-color: transparent;
    border: none;
    padding: 0;
    .material-icons{
      font-size: 20px;
      vertical-align: bottom;
    }
  }
  span{
    cursor: pointer;
    display: inline-block;
    margin-bottom: 24px;
    font-weight: bold;
    border: 2px solid #292929;
    padding: 8px;
    &:hover{
      background-color: #fff;
    }
  }
  p{
    margin: 0;
  }
}
.wrongInput{
  border: 3px solid #292929 !important;
}
button{
  outline: none;
}
.top{
  margin-top: 12px;
}
main{
  padding-bottom: 120px;
}
.team{
  padding-bottom: 8px;
  margin-bottom: 27px;
}
.team-content{
  .material-icons{
    padding-left: 8px;
    font-size: 20px;
    vertical-align: middle;
  }
  form{
    margin-bottom: 32px;
  }
  h4{
    margin-top: 0;
    +p{
      margin-top: 0;
      margin-bottom: 56px;
    }
  }
}
.account-content{
  padding-bottom: 8px;
  margin-bottom: 27px;
  border-bottom: 1px solid #979797;
  input[type='text']{
    margin-bottom: 24px;
  }
  h4{
    margin-top: 0;
    +p{
      margin-top: 0;
      margin-bottom: 56px;
    }
  }
  p{
    margin-top: 12px;
  }
}
.menu{
    margin-bottom: 20px;
    border-bottom: 1px solid #979797;
  .menu-content{
      display: table;
      height: 150px;
      width: 100%;
    .menu-body{
      display: table-cell;
      vertical-align: middle;
      h5{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      h2{
        margin: 0 0 16px 0;
      }
      p{
        font-weight: bold;
        margin: 0;
      }
      button{
        margin-left: 48px;
        &:first-child{
          margin: 0;
        }
      }
    }
  }              
}
.error{
  font-size: 12px;
  margin-top: -24px !important;
  font-weight: bold;
}
.error-member{
  font-size: 12px;
  font-weight: bold;
}
.action{
  padding: 0;
  border: none;
  text-transform: uppercase;
  text-decoration: underline;
  background-color: transparent;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
