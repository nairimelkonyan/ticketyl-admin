<template lang="pug">
  section
    .section-content
      .section-body
        .container
          .row
            .col-sm-8.col-sm-offset-2
              img(src='/static/logo.png')
              h1 You have been invited
              p All we need from you before we get started is for you to set a safe password
              .row
                .col-sm-5.col-sm-offset-1
                  p Password
                .col-sm-6
                  tk-input-type-text-password#new(name='new', v-model='user.new', v-validate="'required|alpha_dash'", :has-error="errors.has('new')", data-vv-value-path='text', data-vv-validate-on="none")
                  .error(v-if="errors.has('new')")
                    p The field under may contain alphabetic characters, numbers, dashes or underscores.
                .col-sm-5.col-sm-offset-1
                  p Repeat Password
                .col-sm-6
                  tk-input-type-text-password#newRepeat(name='repeat', v-model='user.new_repeat', v-validate="'required|alpha_dash'", :has-error="errors.has('repeat')", data-vv-value-path='text', data-vv-validate-on="none")
                  .error(v-if="errors.has('repeat')")
                    p The field under may contain alphabetic characters, numbers, dashes or underscores.
                .col-sm-6
                .col-sm-6
                  tk-secondary-button(v-if='!user.new || !user.new_repeat', name="Set Password", @click='hash')
                  tk-primary-button(v-if='user.new && user.new_repeat', name="Set Password", @click='validateBeforeSubmit')
</template>

<script>
  import Api from '@/services/ApiService'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        validate: false,
        user: {
          new: '',
          new_repeat: ''
        }
      }
    },
    methods: {
      hash () {
      },
      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result && this.user.new === this.user.new_repeat) {
            this.validate = true
            new Api().postUserPasswordSet({invitation_id: this.$route.params.id, password: this.user.new, hash: this.$route.params.hash}).then(response => {
              this.$router.push({name: 'CreateEvent'})
            }).catch(response => { this.wrong = true })
            return
          }
        })
      }
    },
    props: ['translations'],
    computed: {
      ...mapGetters({
        defaultLang: 'defaultLanguage'
      })
    }
  }
</script>

<style lang="less" scoped>
section{
  .section-content{
    text-align: center;
    display: table;
    width: 100%;
    min-height: 100vh;
    .section-body{
      display: table-cell;
      vertical-align: middle;
      img{
        height: 80px;
        margin-bottom: 56px;
      }
    }
  }  
  h1 + p{
    margin-bottom: 24px;
    text-align: center;
    margin-top: 0;
    border-bottom: 1px solid #979797;
    padding-bottom: 25px;
  }
  .line{
    margin-bottom: 24px;
  }
  p{
    text-align: left;
    margin-top: 14px;
  }
  input[type='text']{
    margin-bottom: 24px;
  }
  .col-sm-6:last-child{
    text-align: left;
  }
  button{
    margin-bottom: 96px;
  }
}
.wrongInput{
  border: 3px solid #292929 !important;
}
.error, .success{
  text-align: left;
  margin-top: -16px;
  margin-bottom: 14px;
  p{
    font-size: 12px;
    font-weight: bold;
    margin: 0;
  }
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  section{
    text-align: left;
    margin-top: 16px;
    h1, p, h1 + p{
      text-align: left;
    }
    h1 + p{
      padding-bottom: 16px;
      margin-bottom: 21px;
    }
    p{
      margin-top: 0;
    }
    input[type='text']{
      margin-bottom: 16px;
    }
    button{
      width: 100%;
      margin-bottom: 32px;
    }
  }
}
</style>
