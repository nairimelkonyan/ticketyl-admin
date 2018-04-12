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
        .newsletter-content
          .newsletter-body
            p Sign up to event newsletter
            tk-send(placeholder='your email address', style='margin-bottom: 8px;')
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
    margin-bottom: 64px;
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
    .newsletter-content{
      background-color: #f7f7f7;
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
      color: #9a9a9a;
      text-align: center;
      display: table;
      width: 100%;
      .newsletter-body{
        text-align: left;
        padding: 20px 15px;
        display: table-cell;
        vertical-align: middle;
        p{
          text-transform: uppercase;
          color: #9a9a9a;
        }
      }
    }
  }
</style>