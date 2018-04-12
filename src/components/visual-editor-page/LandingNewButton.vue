<template lang="pug">
  section
    .completed-title
      tk-primary-button(v-if='1 > 0', name='new button')
      tk-primary-button(v-if='1 < 0', name='visit our partner events')
      .slide
        button
          i.material-icons keyboard_arrow_up
        button
          i.material-icons keyboard_arrow_down
        button
          i.material-icons close
      p.link link to:
      .link-to(v-if='1 > 0')
        .row
          .col-sm-3
            button.action Shop page
              i.material-icons keyboard_arrow_down
          .col-sm-5
            button.action Parent Page - tedlatvia.com
              i.material-icons keyboard_arrow_down
      .external-page(v-if='1 < 0')
        .row
          .col-sm-3
            button.action External page
              i.material-icons keyboard_arrow_down
          .col-sm-5
            tk-send(placeholder='partnerweb.com')
</template>

<script>
</script>

<style lang="less" scoped>
section{
  margin-bottom: 32px;
}
.link{
  margin-bottom: 24px;
}
.external-page{
  button{
    margin-top: 14px;
  }
}
.link-to{
  button{
    &:first-child{
      margin-right: 32px;
    }
  }
}
.action{
  outline: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  text-decoration: underline;
  .material-icons{
    font-size: 18px;
    vertical-align: sub;
    margin-left: 8px;
  }
}
p{
  text-transform: uppercase;
  color: #9a9a9a;
}
.completed-title{
  position: relative;
  button{
    margin-bottom: 32px;
  }
}
.slide{
  position: absolute;
  top: -32px;
  button{
    outline: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    padding: 0 8px;
    border-right: 1px solid #979797;
    &:last-child{
      border-right: none;
    }
    .material-icons{
      font-size: 20px;
      vertical-align: middle;
    }
  }
}
</style>