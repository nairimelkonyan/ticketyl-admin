<template lang="pug">
  button(@click="clicked") {{name}}
</template>

<script>
  export default {
    props: [
      'name'
    ],
    methods: {
      clicked () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less" scoped>
button{
  transition: 0.3s;
  background-color: #9a9a9a;
  text-transform: uppercase;
  font-size: 18px;
  color: #fff;
  min-height: 48px;
  padding: 10px 16px;
  border-radius: 0;
  border: none;
  outline: none !important;
  &:hover{
    background-color: #a9a9a9;
  }
}
</style>
