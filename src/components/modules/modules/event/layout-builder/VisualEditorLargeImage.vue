<template lang="pug">
  div
    .row
      .col-sm-12
        .slide
          button(@click='moveUp')
            i.material-icons keyboard_arrow_up
          button(@click='moveDown')
            i.material-icons keyboard_arrow_down
          button(@click='remove')
            i.material-icons close
    section(:style='BGstyle')
      .row
        .carousel-content
          .carousel-body(:style='{ "opacity": image ? 0 : 1 }')
            img(src='/static/doc_types.svg')
            h3 Drag and drop
            p
              strong Large body image 
              | min 770x280 px
            tk-secondary-button(name='browse images')
        vue-dropzone(
          ref="dropzoneLarge"
          id="dropzoneLarge"
          :options="dropzoneLargeOptions"
          @vdropzone-thumbnail='collectDataURL'
          @vdropzone-removed-file='imageRemoved')
</template>

<script>
  import * as mutationTypes from '@/store/mutation-types'
  import { mapState } from 'vuex'

  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'

  export default {
    props: ['index'],
    data () {
      return {
        dropzoneLargeOptions: {
          url: 'null',
          autoProcessQueue: false,
          acceptedFiles: '.png,.jpg',
          maxFiles: 1,
          thumbnailWidth: null,
          thumbnailHeight: null,
          dictDefaultMessage: `<div class='dropzone-image'>
          </div>`,
          previewTemplate: `<div><div class="selected">
              <button class="dz-remove" data-dz-remove>delete <i class="material-icons">clear</i></button>
            </div></div>`
        }
      }
    },
    computed: {
      ...mapState({
        content: state => state.createdEvent.visual_editor.main
      }),
      image () {
        return this.content[this.index].image
      },
      BGstyle () {
        if (this.image) {
          return {
            'background-image': `url('${this.image}')`,
            'background-position': 'center center',
            'background-repeat': 'no-repeat',
            'background-size': 'auto 260px'
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      remove () {
        this.$store.commit(mutationTypes.REMOVE_MAIN_CONTENT, {
          i: this.index
        })
      },
      moveUp () {
        this.$store.commit(mutationTypes.MOVE_UP_MAIN_CONTENT, {
          i: this.index
        })
      },
      moveDown () {
        this.$store.commit(mutationTypes.MOVE_DOWN_MAIN_CONTENT, {
          i: this.index
        })
      },
      collectDataURL (file, dataUri) {
        if (dataUri) {
          this.$store.commit(mutationTypes.ADD_LARGE_IMAGE, {
            i: this.index,
            url: dataUri
          })
          this.$refs.dropzoneLarge.disable()
        }
      },
      imageRemoved () {
        this.$store.commit(mutationTypes.REMOVE_LARGE_IMAGE, {
          i: this.index
        })
        this.$refs.dropzoneLarge.enable()
      }
    },
    components: {
      vueDropzone: vue2Dropzone
    }
  }
</script>

<style lang="less" scoped>
  .col-sm-12{
    position: relative;
    .slide{
      position: absolute;
      margin-top: -32px;
      button{
        outline: 0;
        padding: 0;
        border: none;
        background-color: transparent;
        padding: 0 8px;
        border-right: 1px solid #979797;
        &:last-child{
          border-right: none;
        }
        .material-icons{
          font-size: 20px;
          vertical-align: middle;
        }
      }
    }
  }
  section{
    text-align: center;
    color: #9a9a9a;
    background-color: #fff;
    margin-bottom: 49px;
    .carousel-content{
      position: relative;
      display: table;
      width: 100%;
      height: 271px;
      padding: 5px 20px;
      .carousel-body{
        border: 4px dashed #f7f7f7;
        display: table-cell;
        vertical-align: middle;
        padding: 30px 0;
      }
    }
  }
  .vue-dropzone {
    width: 96.5%;
    height: 281px;
    margin-left: 15px;
    margin-top: -281px;
    &:not(.dz-clickable):hover {
      background-color: transparent;
      cursor: default;
    }
  }
</style>