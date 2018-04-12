<template lang="pug">
  header
    .container
      .row
        .col-sm-6
          .header-content
            .header-body
              img(src='static/powered-by-ticketyl@3x.png')
              tk-shop-switch
        .col-sm-6.text-right
          .header-content
            .header-body
              tk-account-price
              tk-notifications
              tk-admin-user
    tk-loadable-modal
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  header{
    background-color: #292929;
    .header-content{
      display: table;
      height: 144px;
      width: 100%;
      .header-body{
        display: table-cell;
        vertical-align: middle;
        img{
          height: 36px;
          vertical-align: top;
        }
      }
    }        
  }
</style>
