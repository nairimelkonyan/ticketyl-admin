<template lang="pug">
  section
    h3 Looking for a gift?
    p We offer a variety of Gift Card options for you to choose from.
    img(src='/static/gift_cards.png')
    tk-primary-button(name='see all gift cards', style='width: 100%;')
</template>

<script>

</script>

<style lang="less" scoped>
section{
  padding: 30px 25px;
  background-color: #fff;
  border: 1px solid #979797;
  h3{
    margin-top: 10px;
  }
  button{
    width: 100%;
  }
  img{
    margin: 32px auto;
    display: block;
    height: 145px;
    width: auto;
  }
}
</style>