<template lang="pug">
  .div
    button.action(type='button', data-toggle='modal', data-target='#event-info', name='add new video')
      i.material-icons add
      | Add info
    #event-info.modal.fade(role='dialog')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            h2 Add Event Info
            p Create title and paragraph for your event
          .modal-body
            tk-input-type-text(placeholder='add title', v-validate.initial="'required'", style='margin-bottom: 24px;')
            tk-text-area(placeholder='add paragraph', v-validate.initial="'required'", style='margin-bottom: 24px;')
            tk-primary-button(name='add now', style='width: 100%; margin-bottom: 24px;', @click='validate')
</template>

<script>
  export default {
    data () {
      return {
        url: ''
      }
    },
    methods: {
      validate () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            alert('From Submitted!')
            return
          }
          alert('Error!')
        })
      }
    }
  }
</script>

<style lang="less" scoped>         
button{
  outline: 0;
}
.modal-dialog{
  width: 402px;
}
.modal-close{
  padding: 10px 0;
  text-align: right;
  .material-icons{
    font-size: 18px;
    vertical-align: text-bottom;
    padding-left: 4px;
  }
  button{
    padding: 0;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    width: auto;
    border: none;
    background-color: transparent;
    outline: none !important;
  }
}
.modal-header{
  color: #292929;
  padding: 0;
  border-bottom: 0;
  text-align: left;
  border-bottom: 1px solid #979797;
  margin-bottom: 24px;
  padding-bottom: 24px;
  h2{
    margin-top: 0;
  }
  p{
    margin-bottom: 0;
  }
}
.modal-body{
  padding: 0;
  text-align: left;
  h3{
    margin-top: 0;
  }
  h3,p{
    text-transform: uppercase;
    color: #9a9a9a;
  }
  p{
    padding-bottom: 16px;
    margin-bottom: 21px;
    border-bottom: 1px solid #979797;
  }
}
.modal-content{
  background-color: #f7f7f7;
  border-radius: 0;
  padding: 24px 32px;
  border: none;
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
