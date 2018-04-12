<template lang="pug">
    section
      h1 {{ translations.aside_gift_card_title | tktranslate(lang) }}
      p {{ translations.aside_gift_card_paragraph | tktranslate(lang) }}
      .gift-card
        img(:src='translations.aside_gift_card_image | tktranslate(lang)', :alt='translations.aside_gift_card_image_alt | tktranslate(lang)')
      tk-modal-gift-card(:name="translations.event_page_gift_card_button | tktranslate(lang)", :translations='translations', :cssstyle='translations.aside_gift_card_style_2 | tktranslate(lang)')
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: [
      'data',
      'translations'
    ],
    computed: {
      ...mapGetters({
        lang: 'selectedLanguage'
      })
    }
  }
</script>

<style lang="less" scoped>
section{
  background-color: #fff;
  text-align: center;
  padding: 40px 20px;
  border: 1px solid #9a9a9a;
  margin-bottom: 80px;
  h1{
    margin: 0 0 10px 0;
  }
  img{
    margin: 50px auto;
    width: auto;
    height: 250px;
  }
  button{
    width: 50%;
  }
}
/* Media Queries */
/* Extra Small */
@media(min-width:0px) and (max-width:767px){
  section{
    margin-bottom: 24px;
    padding: 24px 8px;
    img {
      margin: 8px auto;
      height: 200px;
    }
    h1{
      font-size: 20px;
      margin-bottom: 16px;
    }
    h1, p{
      text-align: left;
    }
    button{
      width: 100%;
    }
  }
}
</style>