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
        .map
          tk-map-visual(style='margin-bottom: 0;')
</template>

<script>

export default {
  props: ['place', 'index'],
  data () {
    return { }
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
  }
</style>