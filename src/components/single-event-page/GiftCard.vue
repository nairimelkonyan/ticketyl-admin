<template lang="pug">
  section
    h3 {{ translations.aside_gift_card_title | tktranslate(lang) }}
    p {{ translations.aside_gift_card_paragraph | tktranslate(lang) }}
    img(:src='translations.aside_gift_card_image | tktranslate(lang)', :alt='translations.aside_gift_card_image_alt | tktranslate(lang)')
    tk-modal-gift-card(:name="translations.event_page_gift_card_button | tktranslate(lang)", :translations='translations', :cssstyle='translations.aside_gift_card_style | tktranslate(lang)', @toCheckout='checkout')
</template>

<script>
import Vue from 'vue'
import ModalGiftCard from '@/components/modal/ModalGiftCard'
Vue.component('tk-modal-gift-card', ModalGiftCard)
import { mapGetters } from 'vuex'

export default {
  props: [
    'translations'
  ],
  data () {
    return {
      components: [
        {
          code: 'tk-modal-gift-card',
          data: {}
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      lang: 'selectedLanguage'
    })
  },
  methods: {
    checkout () {
      this.$router.push({name: 'Checkout'})
    },
    translate (translate) {
      return this.$options.filters.translate(translate)
    }
  },
  components: {
    tkModalGiftCard: ModalGiftCard
  }
}
</script>

<style lang="less" scoped>
section{
  padding: 30px 25px;
  background-color: #fff;
  border: 1px solid #979797;
  margin-bottom: 24px;
  h3{
    margin-top: 10px;
  }
  button{
    width: 100%;
  }
  img{
    margin: 32px auto;
    display: block;
    height: 145px;
    width: auto;
  }
}
</style>