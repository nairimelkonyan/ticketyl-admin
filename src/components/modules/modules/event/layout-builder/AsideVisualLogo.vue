<template lang="pug">
  section
    .content
      vue-dropzone(
        ref="dropzoneLogo"
        id="dropzoneLogo"
        :options="dropzoneLogoOptions"
        @vdropzone-thumbnail='collectLogoDataURL'
        @vdropzone-removed-file='photoRemoved')
      .content-body(:style='{ "background": `url(${logo}) no-repeat center center` }')
        .select(:style='{ "opacity": logo ? 0 : 1 }')
          img(src='/static/doc_types.svg')
          h3 Drag and drop
          p
            strong Event logo 
            | min 370x370 px
          label.custom-file-upload
            input(type='file')
            | Browse images
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'

  export default {
    data () {
      return {
        logo: undefined,
        dropzoneLogoOptions: {
          url: 'null',
          thumbnailWidth: null,
          thumbnailHeight: null,
          autoProcessQueue: false,
          acceptedFiles: '.png,.jpg',
          maxFiles: 1,
          dictDefaultMessage: `<div class='dropzone-logo'>
          </div>`,
          previewTemplate: `<div><div class="selected">
              <button class="dz-remove" data-dz-remove>delete <i class="material-icons">clear</i></button>
            </div></div>`
        }
      }
    },
    methods: {
      collectLogoDataURL (file, dataUri) {
        if (dataUri) {
          this.logo = dataUri
          this.$refs.dropzoneLogo.disable()
        }
      },
      photoRemoved () {
        this.logo = undefined
        this.$refs.dropzoneLogo.enable()
      }
    },
    components: {
      vueDropzone: vue2Dropzone
    }
  }
</script>

<style lang="less" scoped>
  section{
    color: #9a9a9a;
    background-color: #f7f7f7;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    position: absolute;
    width: 92.5%;
    z-index: 3;
    .content{
      padding: 4px;
      text-align: center;
      background-color: #fff;
      display: table;
      height: 250px;
      width: 100%;
      .dropzone {
        height: 280px;
        margin-left: -4px;
        &:not(.dz-clickable):hover{
          background-color: transparent;
          cursor: default;
        }
      }
      .content-body{
        border: 4px dashed #f7f7f7;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        padding: 25px 15px;
        position: relative;
        background-color: #fff;
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-upload{
    display: inline-block;
    cursor: pointer;
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
  }
</style>

<style lang="less">
  .dropzone {
    .selected{
      button{
        position: absolute;
        top: 8px;
        right: 16px;
        text-transform: uppercase;
        color: #292929;
        margin: 0;
        padding: 0;
        outline: 0;
        border: none;
        background-color: transparent;
        font-family: 'Noto Sans', sans-serif;
        cursor: pointer;
        .material-icons{
          font-size: 16px;
          color: #292929;
          vertical-align: sub;
          margin-left: 8px;
        }
      }
      img{
        height: 120px;
        margin: 0 auto;
      }
    }
  }
</style>