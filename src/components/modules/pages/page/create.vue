<template lang="pug">
  section
    tk-header-admin
    .wrapper
      .container
        #page
          .row
            .col-sm-6
              .setup-content
                .setup-body
                  p Page Setup
                  h2 Main Details - New Page
                  span draft
            .col-sm-6.text-right
              .setup-content
                .setup-body
                  tk-secondary-button(name='save as draft')
                  tk-primary-button(name='next step')
        #content
          .row
            .col-sm-10.col-sm-offset-1
              #basic-details
                .row
                  .col-sm-8
                    h3 1. Basic Details
                    p All crucial information about this event
                    span * Page title
                    tk-input-type-text(placeholder='a short and recognizable title', v-validate.initial="'required|alpha_num'", style='margin-bottom: 32px;')
                    span * Page url
                    tk-input-type-text(placeholder='myshop.ticketyl.com/new-page')
              #relation
                .row
                  .col-sm-8
                    h3 2. Page Relation 
                    p Select which area of your website does this Page belong to
                    span * Belonging to
                    tk-custom-select-string(:options='relation')
              #optional
                .row
                  .col-sm-8
                    h3 3. Optional Page Section
                    p(style='margin-bottom: 30px;') Add optional modules to this page to suit you needs
                    form(action='')
                      input(type='checkbox', name='page', id="tickets") 
                      label(for="tickets") Sell tickets directly on this page
                      input(type='checkbox', name='page', id="Gift") 
                      label(for="Gift") Sell Gift Cards on this page
    tk-footer-admin
</template>

<script>
  import store from '@/store'

  export default {
    data () {
      return {
        relation: ['Dinner in the Sky', 'Dinner in the Sky', 'Dinner in the Sky']
      }
    },
    beforeRouteEnter (to, from, next) {
      if (store.getters.logInAdminToken === '') {
        next('/')
      }
      next()
    }
  }
</script>

<style lang="less" scoped>
  .wrapper{
    margin-bottom: 120px;
    #content{
      margin-bottom: 120px;
      span{
        display: block;
        margin-bottom: 8px;
      }
    }
    h3{
      margin: 0 0 14px 0;
      +p{
        font-size: 18px;
        margin-bottom: 18px;
      }
    }
    #basic-details, #relation, #optional{
      border-bottom: 1px solid #979797;
      padding-bottom: 32px;
      margin-bottom: 32px;
    }
    #page{
      border-bottom: 1px solid #979797;
      margin-bottom: 32px;
      .setup-content{
        display: table;
        height: 152px;
        width: 100%;
        .setup-body{
          display: table-cell;
          vertical-align: middle;
          p{
            font-size: 18px;
            font-weight: bold;
            margin: 0;
          }
          h2{
            max-width: 700px;
            word-wrap: break-word;
            margin: 0 0 16px 0;
          }
          span{
            font-weight: bold;
            border: 1px solid #292929;
            text-transform: uppercase;
            padding: 4px;
          }
          button{
            margin-left: 24px;
          }
        }
      }
    }
  }
</style>
