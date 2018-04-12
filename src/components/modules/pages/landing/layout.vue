<template lang="pug">
  section
    tk-header-admin
    tk-price-modifications
    tk-cancel-event
    tk-layout-builder
    tk-footer-admin
</template>

<script>
  import store from '@/store'

  export default {
    data () {
      return { }
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
  .carousel-inner{
    border: 4px dashed #f7f7f7;
  }
  .selected{
    margin-bottom: 24px;
  }
  .select{
    color: #fff;
    text-align: left;
    text-transform: uppercase;
  }
  .celected-body{
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    margin-right: 16px;
    display: inline-block;
    height: 64px;
    width: 64px;
    background-image: url('/static/2.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    button{
      margin: 0;
      padding: 0;
      outline: 0;
      border: none;
      float: right;
      background-color: transparent;
      .material-icons{
        font-size: 14px;
        color: #fff;
      }
    }
    &:last-child{
      margin: 0;
    }
  }
  main{
    padding-bottom: 320px;
  }
  main{
    h1{
      margin: 0;
      margin-bottom: 6px;
      +p{
        margin-bottom: 24px;
      }
    }
  }
  .date-container{
    display: inline-block;
    width: 300px;
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    .container{
      display: inline-block;
      width: 300px;
    }
    .date{
      position: relative;
      width: 180px !important;
      height: 85px !important;
      .start_date{
        top: 0;
        left: 0;
        position: absolute;
        color: #fff;
        font-size: 48px !important;
        font-weight: bold;
      }
      .start_month{
        position: absolute;
        bottom: 0;
        left: 0;
        color: #fff;
        font-size: 24px !important;
        font-weight: normal;
        text-transform: uppercase;
        font-weight: bold;
      }
      .divider{
        position: absolute;
        top: 15%;
        left: 45%;
        color: #fff;
        font-size: 48px !important;
        font-weight: normal;
      }
      .end_date{
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        font-size: 48px !important;
        font-weight: bold;
      }
      .end_month{
        position: absolute;
        bottom: 0;
        right: 0;
        color: #fff;
        font-size: 24px !important;
        text-transform: uppercase;
        font-weight: bold;
      }
    }
  }
  .carousel {
    height: 464px;
    padding: 4px;
    text-align: center;
    color: #9a9a9a;
    background: linear-gradient(#fff 55%, #979797);
    margin-bottom: 49px;
    .carousel-content{
      position: relative;
      display: table;
      width: 100%;
      height: 448px;
      .carousel-body{
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
  .editor-menu{
    .editor-menu-left{
      h2, h4{
        margin: 0;
      }
      h2{
        margin-bottom: 16px;
      }
      span{
        border: 1px solid #292929;
        font-weight: bold;
        padding: 4px;
        text-transform: uppercase;
      }
    }
    .editor-menu-right{
      .action{
        outline: 0;
        padding: 0;
        border: none;
        background-color: transparent;
        text-transform: uppercase;
        text-decoration: underline;
      }
      button{
        margin-left: 24px;
      }
    }
    .editor-menu-content{
      display: table;
      width: 100%;
      height: 152px;
      .editor-menu-body{
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-upload{
    display: inline-block;
    cursor: pointer;
    transition: 0.3s;
    background-color: #9a9a9a;
    text-transform: uppercase;
    font-size: 18px;
    color: #fff;
    min-height: 48px;
    padding: 10px 16px;
    border-radius: 0;
    border: none;
    outline: none !important;
    &:hover{
      background-color: #a9a9a9;
    }
  }
</style>

<style lang="less">
  .dropzone {
    cursor: pointer;
    height: 464px;
    position: absolute;
    width: 100%;
    z-index: 1;
    background: transparent;
    border: none;
    text-align: center;
    &:hover {
      background-color: rgba(246, 246, 246, 0.22);
    }
    .dz-preview.dz-image-preview {
      min-height: 64px;
      margin-right: 70px;
      margin-top: 54px;
      margin-left: 10px;
      .image-container {
        height: 64px;
        width: 64px;
        img {
          width: inherit;
          height: inherit;
          box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
        }
        a.dz-remove {
          opacity: 1;
          display: inline-block;
          border: none;
          padding: 0;
          margin-left: 48px;
          position: relative;
          top: -63px;
          i {
            font-size: 14px;
            color: #fff;
          }
        }
      }
      a.dz-remove {
        display: none;
      }
    }
  }
</style>