<template lang="pug">
  footer
    .container
      .row
        .col-sm-12
          .footer.content
            .footer.body
              router-link(:to="{name: 'EventSetup'}")
                img(src='static/icn_main_setup_white.svg')
              router-link(:to="{name: 'VisualEditor'}")
                img(src='static/icn_visual_editor_white.svg')
              router-link(:to="{name: 'Transaction'}")
                img(src='static/icn_ticket_settings_white.svg')
              // router-link(:to="{name: 'Privacy'}")
                  img(src='static/icn_analytics_white.svg')
              // router-link(:to="{name: 'Privacy'}")
                  img(src='static/icn_promotion_white.svg')
</template>

<script>
  export default {
    data () {
      return {
        currency: [ 'DITS at', 'DITS cz' ]
      }
    }
  }
</script>

<style lang="less" scoped>
  footer{
    text-align: center;
    background-color: #292929;
    .footer.content{
      display: table;
      height: 80px;
      width: 100%;
      .footer.body{
        display: table-cell;
        vertical-align: middle;
        a{
          padding-right: 64px;
          &:last-child{
            padding-right: 0;
          }
        }
      }
    }        
  }
</style>
