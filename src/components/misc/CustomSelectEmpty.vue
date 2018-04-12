<template lang="pug">
  .dropdown
    button.dropdown-toggle(data-toggle="dropdown")
      i.material-icons keyboard_arrow_down
    ul.dropdown-menu
      li
</template>

<script>
  
</script>

<style lang="less" scoped>
.dropdown{
  text-align: left;
  .dropdown-menu{
    border: 1px solid #979797;
    width: 100%;
    min-width: 104px;
    border-radius: 0;
    li{
      cursor: pointer;
      font-size: 18px;
      padding: 12px 16px;
      &:hover{
        background-color: #f7f7f7;
      }
    }
  }
  button{
    position: relative;
    width: 100%;
    font-size: 18px;
    text-align: left;
    height: 48px;
    padding: 12px 16px;
    border-radius: 0;
    color: #292929;
    border: 1px solid #292929;
    background-color: #fff;
    .material-icons{
      position: absolute;
      top: 13px;
      right: 12px;
      transition: 0.1s;
      vertical-align: middle;
    }
  }
}
[aria-expanded="true"] .material-icons {
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
