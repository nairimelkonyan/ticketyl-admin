<template lang="pug">
  .div
    tk-secondary-button(type='button', data-toggle='modal', :data-target='"#video" + index', name='add new video') 
    .modal.fade(role='dialog', :id='"video" + index')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          .modal-header
            h2 Add video
            p Paste a Youtube, Vimeo or other link
          .modal-body
            tk-input-type-text(name='url' placeholder='video url', v-validate="'required|url:{require_protocol?}'", v-model='url', style='margin-bottom: 24px;', :has-error="errors.has('url')", data-vv-validate-on="none")
            p(v-if="errors.has('url')").error Url is incorrect
            tk-primary-button(name='add now', style='width: 100%; margin-bottom: 24px;', @click='validate' )
</template>

<script>
  export default {
    props: ['index'],
    data () {
      return {
        url: ''
      }
    },
    methods: {
      validate () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$emit('addVideo', { url: this.url })
            window.jQuery(`#video${this.index}.modal`).modal('hide')
          }
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
p.error {
  font-size: 12px;
  margin-top: -24px !important;
  font-weight: bold;
  border-bottom: none;
  color: #000;
  text-transform: none;
}
</style>
