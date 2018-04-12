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
        .gift-card
          tk-visual-editor-aside-gift-card
</template>

<script>
import * as mutationTypes from '@/store/mutation-types'

export default {
  props: ['index'],
  data () {
    return { }
  },
  methods: {
    remove () {
      this.$store.commit(mutationTypes.REMOVE_ASIDE_CONTENT, {
        i: this.index
      })
    },
    moveUp () {
      this.$store.commit(mutationTypes.MOVE_UP_ASIDE_CONTENT, {
        i: this.index
      })
    },
    moveDown () {
      this.$store.commit(mutationTypes.MOVE_DOWN_ASIDE_CONTENT, {
        i: this.index
      })
    }
  }
}
</script>

<style lang="less" scoped>
  section{
    margin-bottom: 32px;
    .col-sm-12{
      position: relative;
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
  }
</style>