<template lang="pug">
  .step-2
    button.action(@click='goBack')
      i.material-icons arrow_back
    .image
    .body
      h2 Faciliated Payment
      p Please provide the following information about your business to proceed
      .sofort
        h4 Sofort
        p Customer Number
        tk-input-type-text(placeholder='1234 5678 9102 1234')
        p Project ID
        tk-input-type-text(placeholder='1234')
        p API Key
        tk-input-type-text(placeholder='1234 5678 9102 1234')
        p Configuration key for your shop system
        tk-input-type-text(placeholder='1234 5678 9102 1234')
        .create
          .row
            .col-sm-6
              .create-content
                .create-body.text-left
                  button.action Create gateway account
            .col-sm-6
              .create-content
                .create-body.text-right
                  tk-secondary-button(name='connect gateway')
      .paypal
        h4 PayPal
        p Customer Number
        tk-input-type-text(placeholder='1234 5678 9102 1234')
        p Project ID
        tk-input-type-text(placeholder='1234')
        p API Key
        tk-input-type-text(placeholder='1234 5678 9102 1234')
        .create
          .row
            .col-sm-6
              .create-content
                .create-body.text-left
                  button.action Create gateway account
            .col-sm-6
              .create-content
                .create-body.text-right
                  tk-secondary-button(name='connect gateway')
    footer
      .row
        .col-sm-4.text-left
          .footer-content
            .footer-body
              p Step 2 of 3
        .col-sm-8.text-right
          .footer-content
            .footer-body
              tk-primary-button(name='next step - commissions', @click='goNext')
</template>

<script>
  export default {
    methods: {
      goNext () {
        this.$emit('stepTwo')
      },
      goBack () {
        this.$emit('stepInitial')
      }
    }
  }
</script>

<style lang="less" scoped>
.step-2{
  .body{
    padding: 24px 32px 40px 32px;
  }
  input[type='text']{
    margin-bottom: 16px;
  }
  .action{
    outline: 0;
    text-transform: uppercase;
    padding: 0;
    background-color: transparent;
    text-decoration: underline;
    border: none;
  }
  h2{
    margin-top: 0;
    +p{
      font-weight: bold;
      border-bottom: 1px solid #9a9a9a;
      margin-bottom: 24px;
      padding-bottom: 24px;
    }
  }
  h4{
    margin-top: 0;
    margin-bottom: 24px;
  }
  .image{
    height: 224px;
    background-image: url('/static/event_publish_bg@2x.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .sofort{
    padding-bottom: 8px;
    margin-bottom: 24px;
    border-bottom: 1px solid #9a9a9a;
  }
  .paypal{
    padding-bottom: 8px;
    margin-bottom: 24px;
  }
  .create{
    .create-content{
      display: table;
      height: 80px;
      width: 100%;
      .create-body{
        display: table-cell;
        vertical-align: middle;
      }
    }       
  }
  label{
    font-size: 18px;
  }
  .value{
    font-size: 14px;
    color: #9a9a9a;
  }
  .paragraph{
    font-size: 14px;
  }
  footer{
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    padding: 0 32px;
    .footer-content{
      display: table;
      height: 80px;
      width: 100%;
      .footer-body{
        display: table-cell;
        vertical-align: middle;
        p{
          color: #9a9a9a;
          font-weight: bold;
          margin: 0;
        }
      }
    }
  }
}
</style>