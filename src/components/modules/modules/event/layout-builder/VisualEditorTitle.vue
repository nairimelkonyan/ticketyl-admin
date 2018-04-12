<template lang="pug">
  section
    .row
      .col-sm-12
        .slide
          button(@click='edit')
            i.material-icons edit
          button(@click='moveUp')
            i.material-icons keyboard_arrow_up
          button(@click='moveDown')
            i.material-icons keyboard_arrow_down
          button(@click='remove')
            i.material-icons close
        .content
          tk-landing-title-empty(v-if='editingMode' :index='index' @cancelEditing='cancelEditing' @addHeading='showHeading')
          tk-landing-title-completed(v-else :index='index')
</template>

<script>
import { mapState } from 'vuex'

import LandingTitleCompleted from './LandingTitleCompleted'
import LandingTitleEmpty from './LandingTitleEmpty'

export default {
  props: ['index'],
  data () {
    return {
      editingMode: false
    }
  },
  computed: {
    ...mapState({
      content: state => state.eventSetup.serie.layout.main
    }),
    title () {
      return this.content[this.index].title || ''
    }
  },
  components: {
    'tk-landing-title-completed': LandingTitleCompleted,
    'tk-landing-title-empty': LandingTitleEmpty
  },
  methods: {
    edit () {
      this.editingMode = true
    },
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
    cancelEditing () {
      if (!this.title) {
        this.remove()
      } else {
        this.showHeading()
      }
    },
    showHeading () {
      this.editingMode = false
    }
  },
  mounted () {
    if (!this.title) {
      this.editingMode = true
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>