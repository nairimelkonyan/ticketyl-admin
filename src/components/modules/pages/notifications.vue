<template lang="pug">
  section
    tk-header-admin
    .content
      .container
        h2 Notifications
        .row
          .col-sm-6.col-sm-offset-3
            .menu
              .row
                .col-sm-6.text-left
                  .dropdown
                    button(type='button', data-toggle='dropdown')
                      | All alerts
                      i.material-icons keyboard_arrow_down
                    ul.dropdown-menu
                      li
                        a(href='#') HTML
                      li
                        a(href='#') CSS
                      li
                        a(href='#') JavaScript
                .col-sm-6.text-right
                  a(href='#') Notification Settings
            .notifications
              ul
                li
                  h4 LANGUAGES
                  p Event 
                    strong Dinner In The Sky 
                    | is missing a 
                    strong German 
                    | translation
                  span 2 minutes ago
                li
                  h4 LANGUAGES
                  p Event 
                    strong Dinner In The Sky 
                    | is missing a 
                    strong German 
                    | translation
                  span 2 minutes ago
                li
                  h4 LANGUAGES
                  p Event 
                    strong Dinner In The Sky 
                    | is missing a 
                    strong German 
                    | translation
                  span 2 minutes ago
                li
                  h4 LANGUAGES
                  p Event 
                    strong Dinner In The Sky 
                    | is missing a 
                    strong German 
                    | translation
                  span 2 minutes ago
    tk-footer-admin
</template>
<script>
</script>
<style lang="less" scoped>
section{
  .content{
    min-height: 80vh;
    margin-bottom: 160px;
    h2{
      border-bottom: 1px solid #979797;
      margin: 46px 0 27px 0;
      padding-bottom: 42px;
    }
    .menu{
      padding-bottom: 27px;
      border-bottom: 1px solid #979797;
      a{
        &:hover{
          color: #292929;
        }
      }
    }
    .notifications{
      ul{
        list-style-type: none;
        padding: 0;
        li{
          &:hover{
            background-color: #e4e4e4;
          }
          cursor: pointer;
          padding: 16px 8px;
          border-bottom: 1px solid #979797;
          h4{
            font-size: 14px;
            margin-top: 0;
            color: #9a9a9a;
            text-transform: uppercase;
            font-weight: normal;
          }
          p{
            font-size: 18px;
          }
          span{
            font-size: 12px;
            color: #9a9a9a;
          }
        }
      }
    }
  }
}
button{
  color: #292929;
  outline: 0;
  padding: 0;
  margin-bottom: 8px;
  border: none;
  text-transform: uppercase;
  text-decoration: underline;
  background-color: transparent;
  .material-icons{
    vertical-align: middle;
    margin-left: 8px;
    font-size: 20px;
  }
}
</style>