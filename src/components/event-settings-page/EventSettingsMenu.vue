<template lang="pug">
  section
    .container
      #settings
        .row
          .col-sm-4
            .settings-content
              .settings-body
                h2 Event Settings
          .col-sm-8.text-right
            .settings-content
              .settings-body
                button.back back to event
                tk-secondary-button(name='revert to saved')
                tk-primary-button(name='save changes')
</template>

<script>
</script>

<style lang="less" scoped>
  section{
    background-color: #f7f7f7;
    #settings{
      border-bottom: 1px solid #979797;
      margin-bottom: 32px;
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
</style>
