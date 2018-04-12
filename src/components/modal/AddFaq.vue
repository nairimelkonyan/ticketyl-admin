<template lang="pug">
  .div
    button.action(type='button', data-toggle='modal', :data-target='"#faq" + index')
      i.material-icons add
      | Add FAQ
    .modal.fade(role='dialog', :id='"faq" + index')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            h2 Add FAQ
            p Create a new Frequently asked questions
          .modal-body
            tk-input-type-text(placeholder='question', style='margin-bottom: 24px;' @input='updateQ')
            tk-text-area(placeholder='answer', style='margin-bottom: 24px;' @input='updateA')
            tk-primary-button(name='add now', style='width: 100%; margin-bottom: 24px;' @click='add')
</template>

<script>
  import * as mutationTypes from '@/store/mutation-types'

  export default {
    props: ['index'],
    data () {
      return {
        q: '',
        a: ''
      }
    },
    methods: {
      updateQ (v) {
        this.q = v
      },
      updateA (v) {
        this.a = v
      },
      add () {
        if (this.q && this.a) {
          this.$store.commit(mutationTypes.ADD_FAQ, {
            i: this.index,
            q: this.q,
            a: this.a
          })
          window.jQuery(`#faq${this.index}`).modal('hide')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.div{
  display: inline-block;
}
.action{
  padding: 0;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  text-decoration: underline;
  .material-icons{
    font-size: 18px;
    vertical-align: sub;
    margin-right: 8px;
  }
}            
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
  span{
    text-transform: uppercase;
  }
}
.modal-content{
  background-color: #f7f7f7;
  border-radius: 0;
  padding: 24px 32px;
  border: none;
}
.modal-footer{
  text-transform: uppercase;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  padding: 0 32px;
  .footer-wrapper{
    display: table;
    height: 75px;
    width: 100%;
    .footer-body{
      display: table-cell;
      vertical-align: middle;
      .action{
        text-transform: uppercase;
        border: none;
        padding: 0;
        text-decoration: underline;
        background-color: transparent;
      }
    }
  }
}
</style>
