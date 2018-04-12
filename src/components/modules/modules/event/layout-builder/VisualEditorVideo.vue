<template lang="pug">
  section
    .row
      .col-sm-12
        .slide
          button(@click='moveUp')
            i.material-icons keyboard_arrow_up
          button(@click='moveDown')
            i.material-icons keyboard_arrow_down
          button(@click='remove')
            i.material-icons close
        youtube(v-if='videoId' :video-id='videoId')
        .video-content(v-if='!videoId')
          .video-body
            h4 Implement video
            p Place your video here
            tk-modal-video(@addVideo='addVideo')
</template>

<script>
import * as mutationTypes from '@/store/mutation-types'
import { mapState } from 'vuex'
import clone from 'clone-array'

import Vue from 'vue'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)

export default {
  props: ['index'],
  data () {
    return { }
  },
  computed: {
    ...mapState({
      content: state => state.eventSetup.serie.layout.main
    }),
    videoId () {
      let url = this.content[this.index].url
      return url ? url.slice(url.indexOf('=') + 1, url.length) : undefined
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
    addVideo (data) {
      let temp = clone(this.content)
      if (!temp[this.index].url) {
        temp[this.index].url = ''
      }
      temp[this.index].url = data.url
      this.$store.commit(mutationTypes.UPDATE_LAYOUT_MAIN, temp)
    }
  }
}
</script>

<style lang="less" scoped>
  section{
    margin-bottom: 64px;
    .col-sm-4{
      position: relative;
    }
    .selected{
      background-image: url('/static/dits2.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
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
    .video-content{
      padding: 4px;
      background-color: #fff;
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
      color: #9a9a9a;
      text-align: center;
      display: table;
      height: 376px;
      width: 100%;
      .video-body{
        border: 4px dashed #f7f7f7;
        display: table-cell;
        vertical-align: middle;
        padding: 16px;
        img{
          height: 48px;
        }
      }
    }
  }
</style>