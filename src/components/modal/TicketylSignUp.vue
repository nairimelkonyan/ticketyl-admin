<template lang="pug">
  .div
    button.action(type='button', data-toggle='modal', data-target='#SignUp') Sign Up
    #SignUp.fade.modal(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            h2 Sign up
            p Create a new Ticketyl account now
          .modal-body
            tk-input-type-text(placeholder='first name', v-model='user.first_name', style='margin-bottom: 24px;')
            tk-input-type-text(placeholder='last name', v-model='user.last_name', style='margin-bottom: 24px;')
            tk-input-type-text#emailSignUp(placeholder='email', v-model='user.email', style='margin-bottom: 24px;')
            .error(v-if='wrongEmail')
              p Please provide valid email address
            tk-input-type-text-password(placeholder='password', v-model='user.password', style='margin-bottom: 24px;')
            tk-primary-button(v-if='user.first_name && user.last_name && user.email && user.password', @click='signUp', name='create account', style='width: 100%;')
            tk-disabled-button(v-else, name='create account', style='width: 100%;')
</template>

<script>
  import Api from '@/services/ApiService'
  import * as types from '@/store/mutation-types'

  export default {
    data () {
      return {
        wrongEmail: false,
        user: {
          'first_name': '',
          'last_name': '',
          'email': '',
          'password': ''
        }
      }
    },
    methods: {
      signUp () {
        var mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if (this.user.email.match(mailformat)) {
          this.wrongEmail = false
          document.getElementById('emailSignUp').classList.remove('wrongInput')
          new Api().postUserAdminRegister({first_name: this.user.first_name, last_name: this.user.last_name, email: this.user.email, password: this.user.password}).then(response => {
            this.$store.commit(types.ADD_TOKEN_ADMIN, response.data.token)
            this.$store.commit(types.SET_CURRENT_ADMIN_NAME, response.data.attributes)
            this.$store.commit(types.DELETE_TOKEN)
            window.jQuery('#SignUp').modal('hide')
            window.jQuery('#LogIn').modal('show')
            window.jQuery('#LogIn').find('#email').val(this.user.email)
            window.jQuery('#LogIn').find('#password12').val(this.user.password)
          }).catch(response => { this.wrong = true })
        } else {
          this.wrongEmail = true
          document.getElementById('emailSignUp').classList.add('wrongInput')
          document.getElementById('emailSignUp').focus()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.div{
  display: inline-block;
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
.wrongInput{
  border: 3px solid #292929 !important;
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
.action{
  margin-left: 24px;
  border: 1px solid #292929;
  height: 40px;
  width: 90px;
  padding: 0;
  background-color: transparent;
  text-transform: uppercase;
} 
</style>
