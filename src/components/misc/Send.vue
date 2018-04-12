<template lang="pug">
  .input-group
    input(type='text', :placeholder='placeholder', @keypress='updateValue', @input='updateValue', v-model='name' @keyup.enter='send')
    span.input-group-btn
      button.btn.btn-secondary.input-black-button-arrow-right(type='button', @click="send" :disabled='!name.length')
        i.material-icons arrow_forward
</template>

<script>
  export default {
    props: [
      'placeholder'
    ],
    data () {
      return {
        name: ''
      }
    },
    methods: {
      updateValue (e) {
        this.$emit('input', e.target.value)
      },
      send () {
        this.$emit('click', this.name)
        this.name = ''
      }
    }
  }
</script>

<style lang="less" scoped>
.input-group{
  width: 100%;
  z-index: 1;
  input::placeholder {
    text-transform: uppercase;
  }
  input[type="text"]{
    font-size: 18px;
    border-radius: 0;
    width: 100%;
    padding: 10px 12px;
    min-height: 48px;
    border: 1px solid #292929;
  }
  button{
    transition: 0.3s;
    background-color: #292929;
    border: none;
    border-radius: 0;
    padding: 11.5px 15px;
    height: 48px;
    &:hover{
      background-color: #424242;
    }
    .material-icons{
      color: #fff;
      font-size: 20px;
      vertical-align: middle
    }
  }
}
/* Media Queries */
/* Extra Small */
@media(min-width:768px) and (max-width:991px){
  input::placeholder {
    font-size: 12px;
  }
}
</style>
