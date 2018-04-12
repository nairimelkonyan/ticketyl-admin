<template lang="pug">
  section
    .content
      .container
        .create-content
          .create-body
            button(@click='goTo') close
              i.material-icons clear
            h3.title Create New
            .row
              .col-sm-12
                h4 Content pages
            .row.first-section
              .col-sm-6
                router-link(:to="{name: 'EventSetup'}")
                  .page-content
                    .page-body
                      img(src='static/event.svg')
                      h3 Event Page
                      p Schedule events and sell tickets
              .col-sm-6
                router-link(:to="{name: 'SetupEmpty'}")
                  .page-content
                    .page-body
                      img(src='static/subscription.svg')
                      h3 Landing Page
                      p Promote events and special offers
            .row
              .col-sm-12
                h4 Promotion
            .row
              .col-sm-6
                router-link(:to="{name: 'Subscription'}")
                  .page-content
                    .page-body
                      img(src='static/event.svg')
                      h3 Subscription
                      p Unite multiple events in a single product
              .col-sm-6
                router-link(:to="{name: 'GiftCard'}")
                  .page-content
                    .page-body
                      img(src='static/subscription.svg')
                      h3 Gift Card
                      p Create custom-purpose gift offers
</template>

<script>
  import store from '@/store'

  export default {
    methods: {
      goTo () {
        this.$router.push({name: 'CreateEvent'})
      }
    },
    beforeRouteEnter (to, from, next) {
      if (store.getters.logInAdminToken === '') {
        next('/ticketyl')
      }
      next()
    }
  }
</script>

<style lang="less" scoped>
  .content{
    min-height: 80vh;
    .create-content{
      display: table;
      width: 100%;
      height: 80vh;
      margin: 32px 0;
      button{
        text-align: right;
        outline: 0;
        padding: 0;
        margin-bottom: 24px;
        text-decoration: none;
        text-transform: uppercase;
        border: none;
        background-color: transparent;
        .material-icons{
          font-size: 18px;
          vertical-align: text-bottom;
          padding-left: 4px;
        }
      }
      .create-body{
        text-align: right;
        display: table-cell;
        vertical-align: middle;
        .first-section{
          margin-bottom: 48px;
        }
        h4{
          font-size: 14px;
          font-weight: normal;
          margin-bottom: 24px;
          text-align: center;
          color: #9a9a9a;
          text-transform: uppercase;
        }
        img{
          float: left;
          margin-right: 56px;
        }
        a{
          text-transform: none;
          text-decoration: none;
        }
        .title{
          text-align: center;
          border-bottom: 1px solid #979797;
          margin-bottom: 37px;
          padding-bottom: 24px;
        }
        .page-content{
          display: table;
          width: 100%;
          transition: 0.3s;
          text-align: center;
          background-color: #fff;
          box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
          padding: 24px;
          height: 176px;
          &:hover{
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
          }
          .page-body{
            display: table-cell;
            vertical-align: middle;
            text-align: left;
            p{
              color: #9a9a9a;
            }
          }
          h3{
            color: #292929;
            border: none;
          }
        }
      }
    } 
  }
</style>