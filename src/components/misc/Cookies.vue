<template lang="pug">
  .cookies(v-if='show')
    .container
      .cookies-inner
        .row
          .col-sm-9
            .cookies-content
              .cookies-body.text-left
                p We use cookies to offer our services. By using our Website you permit us the user of cookies in accordance to our
                  router-link(:to="{name: 'Privacy'}") Privacy Policy.
          .col-sm-3
            .cookies-content
              .cookies-body.text-center
                button(@click='closePrivacy') I Accept this Policy      
</template>

<script>
  export default {
    data () {
      return {
        show: true
      }
    },
    methods: {
      closePrivacy () {
        this.show = false
      }
    }
  }
</script>

<style lang="less" scoped>
.cookies{
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 0;
  z-index: 9999999999999;
  color: #fff;
  opacity: 0.8;
  .cookies-inner{
    width: 800px;
    margin: 0 auto;
    background: rgba(0, 0, 0, .9);
    padding: 0 16px;
  }
  .cookies-content{
    display: table;
    height: 80px;
    width: 100%;
    .cookies-body{
      width: 100%;
      display: table-cell;
      vertical-align: middle;
      p{
        margin: 0;
      }
      a{
        text-decoration: none;
        text-decoration: underline;
        color: #fff;
        text-transform: capitalize;
        margin-left: 4px;
      }
      button{
        outline: 0;
        padding: 0;
        border: none;
        background-color: transparent;
      }
    }
  }
}
@media(min-width:0px) and (max-width:767px){
  .cookies{
    width: 110%;
    .cookies-inner{
      width: 100%;
      padding: 8px 16px;
    }
    .cookies-content{
      height: 40px;
    }
  }
}
</style>
