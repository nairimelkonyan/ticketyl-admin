<template lang="pug">
  section
    .content
      .content-body
        img(:src="'/static/' + logo.custom_fields.image_url").img-responsive
</template>

<script>
  export default {
    props: [ 'logo' ]
  }
</script>

<style lang="less" scoped>
section{
  .content{
    text-align: center;
    background-color: #fff;
    display: table;
    height: 250px;
    width: 100%;
    border-bottom: 1px solid #979797;
    .content-body{
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      padding: 25px 15px;
      position: relative;
      background-color: #fff;
      display: table-cell;
      vertical-align: middle;
      img{
        height: 120px;
        margin: 0 auto;
      }
    }
  }
}
</style>