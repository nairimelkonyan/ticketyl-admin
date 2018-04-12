<template lang="pug">
  section
    .event-info
      .row
        .col-sm-4
            h5 Location
              button.delete
                i.material-icons close
            p Brīvības iela 154, Rīga, Latvija
        .col-sm-4
          tk-event-info
</template>

<script>

</script>

<style lang="less" scoped>
.event-info{
  margin-bottom: 64px;
  padding-bottom: 15px;
  border-bottom: 1px solid #979797;
  .delete{
    padding: 0;
    outline: 0;
    border: none;
    background-color: transparent;
    .material-icons{
      font-size: 14px;
      margin-left: 8px;
      vertical-align: bottom;
    }
  }
  .col-sm-4{
    margin-bottom: 40px;
    h5{
      color: #9a9a9a;
      margin: 0 0 10px 0;
      font-size: 14px;
      text-transform: uppercase;
    }
    p{
      margin-bottom: 0;
    }
  }
}
button{
  outline: 0;
}
.action{
  padding: 0;
  border: none;
  text-transform: uppercase;
  text-decoration: underline;
  background-color: transparent;
  .material-icons{
    font-size: 18px;
    vertical-align: sub;
    padding-right: 8px;
  }
}
</style>