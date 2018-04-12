<template lang="pug">
  section
    .row
      .col-sm-3
        .slide
          button(@click='moveUp')
            i.material-icons keyboard_arrow_up
          button(@click='moveDown')
            i.material-icons keyboard_arrow_down
          button(@click='remove')
            i.material-icons close
        .carousel-content
          .carousel-body
            img(src='/static/doc_types.svg')
            h5 Gallery photo
            label.custom-file-upload
              input(type='file' @change='addImage($event)' accept='image/jpeg,image/png')
              | Browse images
      .col-sm-3(v-for='(img, i) in gallery')
        .carousel-content.selected(:style='getBGstyle(i)')
          .carousel-body.selected-border
            button(@click='removeImage(i)')
              i.material-icons clear
</template>

<script>
import * as mutationTypes from '@/store/mutation-types'
import { mapState } from 'vuex'
import clone from 'clone-array'

export default {
  props: ['index'],
  data () {
    return { }
  },
  computed: {
    ...mapState({
      content: state => state.eventSetup.serie.layout.main
    }),
    gallery () {
      return this.content[this.index].gallery
    }
  },
  methods: {
    remove () {
      this.$emit('removeContent', {
        i: this.index
      })
    },
    moveUp () {
      this.$emit('moveContent', {
        i: this.index,
        direction: 'up'
      })
    },
    moveDown () {
      this.$emit('moveContent', {
        i: this.index,
        direction: 'down'
      })
    },
    removeImage (imageI) {
      let temp = clone(this.content)
      temp[this.index].gallery.splice(imageI, 1)
      console.log(temp, this.content)
      this.$store.commit(mutationTypes.UPDATE_LAYOUT_MAIN, temp)
    },
    addImage (event) {
      const reader = new FileReader()
      const file = event.target.files[0]
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        reader.readAsDataURL(file)
        reader.onload = () => {
          let temp = clone(this.content)
          if (!temp[this.index].gallery) {
            temp[this.index].gallery = []
          }
          temp[this.index].gallery.push(reader.result)
          this.$store.commit(mutationTypes.UPDATE_LAYOUT_MAIN, temp)
        }
      }
    },
    getBGstyle (i) {
      return {
        'background-image': `url('${this.gallery[i]}')`,
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.selected-border{
  border: none !important;
}
  section{
    margin-bottom: 32px;
    .col-sm-3{
      position: relative;
      margin-bottom: 32px;
    }
    .selected{
      position: relative;
      button{
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
        .material-icons{
          font-size: 16px;
          color: #292929;
          vertical-align: sub;
          margin-left: 8px;
        }
      }
    }
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
    .carousel-content{
      box-sizing: border-box;
      padding: 4px;
      background-color: #fff;
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
      color: #9a9a9a;
      text-align: center;
      display: table;
      height: 140px;
      width: 100%;
      .carousel-body{
        border: 4px dashed #f7f7f7;
        padding: 16px 4px;
        display: table-cell;
        vertical-align: middle;
        h5{
          font-weight: bold;
        }
        img{
          height: 32px;
        }
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
  font-size: 14px;
  color: #fff;
  padding: 2px 8px;
  margin: 0;
  border-radius: 0;
  border: none;
  outline: none !important;
  &:hover{
    background-color: #a9a9a9;
  }
}
</style>