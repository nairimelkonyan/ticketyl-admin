<template lang="pug">
  button(@click="clicked", @mouseover="$emit('mouseover')", @mouseleave="$emit('mouseleave')") {{name}}
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
  background-color: #dadada;
  text-transform: uppercase;
  font-size: 18px;
  color: #9a9a9a;
  min-height: 48px;
  padding: 10px 16px;
  border-radius: 0;
  border: 0;
  outline: none !important;
}
/*
  &:hover {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
*/
</style>
