<template lang="pug">
  .carousel
    .container
      .row
        .col-sm-12
          .carousel-content
            .carousel-body
              .selected
                .row
                  .col-sm-2
                    .celected-body
              img(src='/static/doc_types.svg')
              h3 Drag and drop
              p Up to 6 
                strong event cover images 
                | min 1200x480 px
              tk-secondary-button(name='browse images')
            .date-container
              .container
                .date
                  span.start_date 16
                  span.start_month Jul
                  span.divider -
                  span.end_date 28
                  span.end_month Aug
</template>

<script>
</script>

<style lang="less" scoped>
.celected-body{
  height: 64px;
  width: 64px;
  background-image: url('/static/dits.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.date-container{
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  .date{
    position: relative;
    width: 180px !important;
    height: 85px !important;
    .start_date{
      top: 0;
      left: 0;
      position: absolute;
      color: #9a9a9a;
      font-size: 48px !important;
      font-weight: bold;
    }
    .start_month{
      position: absolute;
      bottom: 0;
      left: 0;
      color: #9a9a9a;
      font-size: 24px !important;
      font-weight: normal;
      text-transform: uppercase;
      font-weight: bold;
    }
    .divider{
      position: absolute;
      top: 15%;
      left: 45%;
      color: #9a9a9a;
      font-size: 48px !important;
      font-weight: normal;
    }
    .end_date{
      position: absolute;
      top: 0;
      right: 0;
      color: #9a9a9a;
      font-size: 48px !important;
      font-weight: bold;
    }
    .end_month{
      position: absolute;
      bottom: 0;
      right: 0;
      color: #9a9a9a;
      font-size: 24px !important;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
.carousel{
  text-align: center;
  color: #9a9a9a;
  background-color: #fff;
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
</style>