<template lang="pug">
  .div
    tk-secondary-button(type='button', @click='open', name='add new') 
    .modal.fade(role='dialog', :id='"performer" + index')
      .modal-dialog
        .modal-close
          button(data-dismiss="modal") Close
            i.material-icons clear
        .modal-content
          vue-dropzone(
            ref="dropzonePerformer"
            id="dropzonePerformer"
            :options="dropzonePerformerOptions"
            @vdropzone-removed-file='photoRemoved'
            @vdropzone-thumbnail='collectDataURL')
          .modal-header(:style='BGstyle')
            .performer-content(:style='{ "opacity": photo ? 0 : 1 }')
              .performer-body
                img(src='/static/doc_types.svg')
                h4 Drag and drop
                p 
                  strong Performer image 
                  | min 570x570 px
                tk-secondary-button(name='browse images')
          .modal-body
            tk-input-type-text(placeholder='performer name', @input='updateName', style='margin-bottom: 24px;', name='name', v-validate="'alpha_spaces'",  :has-error="errors.has('name') || (emptyName && !name)", data-vv-validate-on="none")
            tk-input-type-text(placeholder='performer title', @input='updateTitle', name='title', v-validate="'alpha_spaces'",  :has-error="errors.has('title') || (emptyTitle && !title)", data-vv-validate-on="none")
            hr
            tk-input-type-text(placeholder='subtitle text', @input='updateSubtitle', style='margin-bottom: 24px;')
            tk-text-area(placeholder='paragraph / description', @input='updateDesc', style='margin-bottom: 24px;')
          .modal-footer
            .row
              .col-sm-6.text-left
                .footer-wrapper
                  .footer-body
                    button.action(data-dismiss="modal") cancel
              .col-sm-6.text-right
                .footer-wrapper
                  .footer-body
                    tk-secondary-button(name='add performer' @click='validate')
</template>

<script>
  import * as mutationTypes from '@/store/mutation-types'

  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'

  export default {
    props: ['index'],
    data () {
      return {
        photo: undefined,
        name: '',
        title: '',
        subtitle: '',
        description: '',
        dropzonePerformerOptions: {
          url: 'null',
          thumbnailWidth: null,
          thumbnailHeight: null,
          autoProcessQueue: false,
          acceptedFiles: '.png,.jpg',
          maxFiles: 1,
          dictDefaultMessage: `<div class='dropzone-performer'>
          </div>`,
          previewTemplate: `<div>
            <button class="delete dz-remove" data-dz-remove>delete image
              <i class="material-icons">clear</i>
            </button>
          </div>`
        },
        emptyName: false,
        emptyTitle: false
      }
    },
    computed: {
      BGstyle () {
        return {
          'background-image': `url('${this.photo}')`,
          'background-position': 'center',
          'background-repeat': 'no-repeat',
          'background-size': 'cover'
        }
      }
    },
    methods: {
      open () {
        console.log(`#performer${this.index}`)
        window.jQuery(`#performer${this.index}`).modal('show')
      },
      collectDataURL (file, dataUri) {
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
          this.photo = dataUri
          this.$refs.dropzonePerformer.disable()
        }
      },
      photoRemoved () {
        this.photo = undefined
        this.$refs.dropzonePerformer.enable()
      },
      updateName (v) {
        this.name = v
      },
      updateTitle (v) {
        this.title = v
      },
      updateSubtitle (v) {
        this.subtitle = v
      },
      updateDesc (v) {
        this.description = v
      },
      validate () {
        this.emptyTitle = !this.title
        this.emptyName = !this.name
        if (!this.emptyTitle && !this.emptyName) {
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.$store.commit(mutationTypes.ADD_PERFORMER, {
                i: this.index,
                performer: {
                  photo: this.photo || null,
                  name: this.name,
                  title: this.title,
                  subtitle: this.subtitle,
                  description: this.description
                }
              })
              window.jQuery(`#performer${this.index}`).modal('hide')
            }
          })
        }
      }
    },
    components: {
      vueDropzone: vue2Dropzone
    }
  }
</script>

<style lang="less" scoped>
  #dropzonePerformer {
    height: 578px;
    &:not(.dz-clickable):hover {
      background-color: transparent;
      cursor: default;
    }
  }
  .performer-content{
    border: 4px dashed #f7f7f7;
    display: table;
    height: 568px;
    width: 100%;
    background-color: #fff;
    .performer-body{
      text-align: center;
      display: table-cell;
      vertical-align: middle;
    }
  }               
  button{
    outline: 0;
  }
  .modal-dialog{
    width: 570px;
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
    background-color: #fff;
    text-align: center;
    padding: 4px;
    border-bottom: 0;
  }
  .modal-body{
    padding: 24px 32px;
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

<style lang='less'>
  .delete.dz-remove {
    position: absolute;
    top: 8px;
    right: 8px;
    text-transform: uppercase;
    color: #292929;
    margin: 0;
    padding: 0;
    outline: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    .material-icons {
      font-size: 16px;
      color: #292929;
      vertical-align: sub;
      margin-left: 8px;
    }
  }
</style>
