<template lang="pug">
   .count
      button(:class='{active: total > 0}', @click='decrement')
        i.material-icons remove
      .spinner {{ total }}
      button(@click='increment')
        i.material-icons add
</template>

<script>
  export default{
    created () {
      this.total = this.initial
    },
    props: {
      initial: {
        default: 0
      },
      maxTickets: {
        default: 22
      }
    },
    methods: {
      increment () {
        if (this.total < this.maxTickets) {
          this.total = this.total + 1
          this.$emit('input', this.total)
        }
      },
      decrement () {
        if (this.total === 0) {
          return
        }
        this.total = this.total - 1
        this.$emit('input', this.total)
      }
    },
    data () {
      return {
        total: 0
      }
    }
  }
</script>

<style lang="less" scoped>
.material-icons{
  font-size: 18px;
  vertical-align: middle;
}
.count{
    display: inline-block;
  .spinner{
    display: inline-table;
    font-size: 18px;
    min-height: 48px;
    border-radius: 0;
    padding: 11px 20px;
    background-color: #fff;
    color: #292929;
    border-top: 1px solid #292929;
    border-bottom: 1px solid #292929;
  }
  .spinner:first-child{
    border: none;
    font-size: 18px;
    padding: 12px 20px;
    background-color: #9a9a9a;
    color: #fff;
    &:hover{
      cursor: pointer;
    }
  }
  button{
    color: #fff;
    vertical-align: top;
    font-size: 18px;
    background-color: transparent;
    border-radius: 0;
    border: none;
    padding: 0;
    min-height: 48px;
    padding: 0 16px;
    outline: none !important;
    border: 1px solid transparent;
    vertical-align: baseline;
    &:first-child{
      background-color: #9a9a9a;
    }
    &:last-child{
      background-color: #292929;
    }
  }
  .spinner:last-child{
    border: none;
    font-size: 18px;
    padding: 12px 20px;
    background-color: #292929;
    color: #fff;
    &:hover{
      cursor: pointer;
    }
  }
}
.active{
  background-color: #292929 !important;
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  .count{
    display: block;
    text-align: left;
  }
}
</style>
