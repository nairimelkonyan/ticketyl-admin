<template lang="pug">
  .div
    button.action(type='button', data-toggle='modal', data-target='#LogIn') Log In
    #LogIn.fade.modal(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            h2 Log in
            p Access your Ticketyl ticket store
          .modal-body
            tk-input-type-text#email(placeholder='email', v-model='user.email', style='margin-bottom: 24px;')
            .error(v-if='wrongEmail')
              p Please provide valid email address
            tk-input-type-text-password(placeholder='password', v-model='user.password', style='margin-bottom: 24px;')
            .error(v-if='wrong')
              p The password and username you entered did not authenticate
            tk-primary-button(v-if='user.email && user.password', @click='signIn', name='sign in', style='width: 100%;')
            tk-secondary-button(v-else, name='sign in', style='width: 100%;')
</template>

<script>
  import Api from '@/services/ApiService'
  import * as types from '@/store/mutation-types'

  export default {
    data () {
      return {
        wrong: false,
        wrongEmail: false,
        user: {
          'email': '',
          'password': ''
        }
      }
    },
    mounted () {
      window.jQuery('#LogIn').on('hidden.bs.modal', e => {
        this.user.email = ''
        this.user.password = ''
      })
    },
    methods: {
      signIn () {
        var mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if (this.user.email.match(mailformat)) {
          this.wrongEmail = false
          this.wrong = false
          document.getElementById('email').classList.remove('wrongInput')
          new Api().postUserAuthAdmin({email: this.user.email, password: this.user.password}).then(response => {
            if (!response.data.error) {
              this.$store.commit(types.ADD_TOKEN_ADMIN, response.data.token)
              this.$store.commit(types.DELETE_TOKEN)
              this.$store.commit(types.USER_INIT, response.data)
              window.jQuery('#LogIn').modal('hide')
              this.$router.push({name: 'EventList'})
            } else {
              this.wrong = true
            }
          }).catch(response => { this.wrong = true })
        } else {
          this.wrongEmail = true
          document.getElementById('email').classList.add('wrongInput')
          document.getElementById('email').focus()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.div{
  display: inline-block;
}
.wrongInput{
  border: 3px solid #292929 !important;
}
.action{
  margin-left: 24px;
  padding: 0;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
}              
button{
  outline: 0;
}
.modal-dialog{
  width: 402px;
}
.modal-close{
  padding: 10px 0;
  text-align: right;
  .material-icons{
    font-size: 18px;
    vertical-align: text-bottom;
    padding-left: 4px;
  }
  button{
    padding: 0;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    width: auto;
    border: none;
    background-color: transparent;
    outline: none !important;
  }
}
.modal-header{
  color: #292929;
  padding: 0;
  border-bottom: 0;
  text-align: left;
  border-bottom: 1px solid #979797;
  margin-bottom: 24px;
  padding-bottom: 24px;
  h2{
    margin-top: 0;
  }
  p{
    margin-bottom: 0;
  }
}
.modal-body{
  padding: 0;
  text-align: left;
}
.modal-content{
  background-color: #f7f7f7;
  border-radius: 0;
  padding: 24px 32px 64px 32px;
  border: none;
}
.error{
  margin-top: -16px;
  margin-bottom: 14px;
  p{
    text-transform: none;
    color: #292929;
    font-size: 12px;
    font-weight: bold;
    margin: 0;
  }
}
</style>
