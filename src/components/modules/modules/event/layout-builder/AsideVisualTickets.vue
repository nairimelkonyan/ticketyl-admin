<template lang="pug">
  section.tickets
    .ticket-price-wrapper
      p Price range
      p.create (create prices in 
        router-link(:to="{'name': 'EventSetup'}") Tickets and seating
        |)
    .payment-method-wrapper
      img(src='/static/visa.png')
      img(src='/static/master_card.png')
      img(src='/static/american_express.png')
      img(src='/static/paypal.png')
    tk-disabled-button(name='tickets', style='width: 100%;')
</template>

<script>

</script>

<style lang="less" scoped>
section{
  background-color: #f7f7f7;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  margin-bottom: 64px;
  position: relative;
  top: 290px;
  .payment-method-wrapper{
    text-align: center;
    padding: 10px 15px;
    border-bottom: 1px solid #979797;
    img{
      height: 40px;
      width: auto;
      margin-right: 10px;
    }
  }
  .ticket-price-wrapper{
    text-align: center;
    border-bottom: 1px solid #979797;
    padding: 24px 15px;
    p{
      text-transform: uppercase;
      color: #9a9a9a;
    }
    .create{
      text-transform: uppercase;
    }
  }
}
</style>