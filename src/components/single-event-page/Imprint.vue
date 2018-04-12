<template lang="pug">
  section
    .imprint
      h5 {{ translations.aside_organizer | tktranslate(lang) }}
      p {{ data.translations.name | tktranslate(lang) }}
      p {{ data.translations.street1 | tktranslate(lang) }}
      p {{ data.translations.city | tktranslate(lang) }}
      p {{ data.translations.postcode | tktranslate(lang) }}
      p {{ data.translations.country | tktranslate(lang) }}
      p {{ data.translations.vat_number | tktranslate(lang) }}
      p {{ data.translations.registration_number | tktranslate(lang) }}
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
  margin-bottom: 24px;
  .imprint{
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    padding: 22px 15px;
    text-align: left;
  }
    h5{
      color: #9a9a9a;
      text-transform: uppercase;
      margin: 0 0 16px 0;
      & + p{
        margin-bottom: 8px;
        font-weight: bold;
      }
    }
    p{
      margin-bottom: 0;
    }
  }
</style>