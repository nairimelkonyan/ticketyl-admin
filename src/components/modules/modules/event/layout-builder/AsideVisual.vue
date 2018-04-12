<template lang="pug">
  aside
    tk-aside-visual-logo
    tk-aside-visual-tickets
    component(v-for='(section, key) in components' :is='section' :key='key' :index='key' place='aside')
    tk-visual-editor-about-event-aside(@addContent='add')
</template>

<script>
  const CONTENT_TYPES = {
    SOCIAL_NETWORKS: 'tk-visual-editor-social',
    MAILING_LIST: 'tk-visual-editor-newsletter',
    GIFT_CARD: 'tk-visual-editor-aside-gift-card-content',
    PICTURE_GALLERY: undefined,
    LOCATION_MAP: 'tk-visual-editor-map',
    FAQ: 'tk-visual-editor-faq',
    ORGANIZER: undefined
  }

  import * as mutationTypes from '@/store/mutation-types'
  import { mapState } from 'vuex'

  import clone from 'clone-array'

  export default {
    data () {
      return { }
    },
    computed: {
      ...mapState({
        'content': state => state.eventSetup.serie.layout.aside
      }),
      components () {
        return this.content.map((v, i, arr) => {
          return v.type
        })
      }
    },
    methods: {
      add (n) {
        switch (n) {
          case 'Social Networks': this.addContent(CONTENT_TYPES.SOCIAL_NETWORKS)
            break
          case 'Gift Card Promo': this.addContent(CONTENT_TYPES.GIFT_CARD)
            break
          case 'Event FAQS': this.addContent(CONTENT_TYPES.FAQ)
            break
          case 'Mailing List Signup': this.addContent(CONTENT_TYPES.MAILING_LIST)
            break
          case 'Location Map': this.addContent(CONTENT_TYPES.LOCATION_MAP)
            break
        }
      },
      addContent (type) {
        let temp = clone(this.content)
        temp.push({ type })
        this.$store.commit(mutationTypes.UPDATE_LAYOUT_ASIDE, temp)
      },
      removeContent (payload) {
        let temp = clone(this.content)
        temp.splice(payload.i, 1)
        this.$store.commit(mutationTypes.UPDATE_LAYOUT_ASIDE, temp)
      },
      moveContent (payload) {
        let temp = clone(this.content)
        if (payload.direction === 'up' && payload.i !== 0) {
          const component = temp[payload.i]
          temp[payload.i] = temp[payload.i - 1]
          temp[payload.i - 1] = component
          this.$store.commit(mutationTypes.UPDATE_LAYOUT_ASIDE, temp)
        } else if (payload.direction === 'down' && payload.i !== this.content.length) {
          const component = temp[payload.i]
          temp[payload.i] = temp[payload.i + 1]
          temp[payload.i + 1] = component
          this.$store.commit(mutationTypes.UPDATE_LAYOUT_ASIDE, temp)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  aside{
    margin-top: -337px;
    z-index: 1;
  }
</style>

<style lang="less">
  section.tickets + section {
    margin-top: 350px;
  }
</style>