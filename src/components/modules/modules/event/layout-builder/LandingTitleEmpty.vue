<template lang="pug">
  .empty-title
    tk-input-type-text(placeholder='page title...', :value='prevTitle || null' ,style='margin-bottom: 24px;', name='title', v-validate="'alpha_spaces'", :has-error="errors.has('title') || (emptyTitle && !title)", data-vv-validate-on="none", @input='updateTitle')
    tk-input-type-text(placeholder='page subtitle explaining the meaning of this page', :value='prevSubtitle || null', style='margin-bottom: 4px;', name='subtitle', @input='updateSubtitle')
    // hr
    // tk-text-area(placeholder='description / paragraph', style='margin-bottom: 24px;')
    tk-primary-button(name='add event info' @click='validate')
    button.action(@click='cancelEditing') Cancel
</template>

<script>
  import * as mutationTypes from '@/store/mutation-types'
  import clone from 'clone-array'

  import { mapState } from 'vuex'

  export default {
    props: ['index'],
    data () {
      return {
        title: '',
        subtitle: '',
        emptyTitle: false
      }
    },
    computed: {
      ...mapState({
        content: state => state.eventSetup.serie.layout.main
      }),
      prevTitle () {
        return this.content[this.index].title || ''
      },
      prevSubtitle () {
        return this.content[this.index].subtitle || ''
      }
    },
    methods: {
      updateTitle (v) {
        this.title = v
      },
      updateSubtitle (v) {
        this.subtitle = v
      },
      validate () {
        this.emptyTitle = !this.title
        if (!this.emptyTitle) {
          this.$validator.validateAll().then((result) => {
            if (result) {
              let temp = clone(this.content)
              temp[this.index].title = this.title
              temp[this.index].subtitle = this.subtitle || ''
              this.$store.commit(mutationTypes.UPDATE_LAYOUT_MAIN, temp)
              this.$emit('addHeading')
            }
          })
        }
      },
      cancelEditing () {
        this.$emit('cancelEditing')
      }
    },
    mounted () {
      this.title = this.prevTitle
      this.subtitle = this.prevSubtitle
    }
  }
</script>

<style lang="less" scoped>
button{
  margin: 18px 0 64px;
  &.action {
    text-transform: uppercase;
    border: none;
    padding: 0;
    text-decoration: underline;
    margin-left: 20px;
    background-color: transparent;
  }
}
</style>