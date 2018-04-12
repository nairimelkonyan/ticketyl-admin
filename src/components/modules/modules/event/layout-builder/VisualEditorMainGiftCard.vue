<template lang="pug">
    section
      h1 Looking for a gift?
      p We offer a variety of Gift Card options for you to choose from.
      .gift-card
        img(src='/static/gift_cards.png')
      tk-primary-button(name='see all gift cards')
</template>

<script>

</script>

<style lang="less" scoped>
section{
  background-color: #fff;
  text-align: center;
  padding: 40px 20px;
  border: 1px solid #9a9a9a;
  h1{
    margin: 0 0 10px 0;
  }
  img{
    margin: 50px auto;
    width: auto;
    height: 250px;
  }
  button{
    width: 50%;
  }
}
</style>