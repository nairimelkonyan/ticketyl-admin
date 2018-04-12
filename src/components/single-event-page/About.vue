<template lang="pug">
  section
    h4 {{ main_content.translations.title | tktranslate(lang) }}
    p(v-if='main_content.translations.paragraph') {{ main_content.translations.paragraph | tktranslate(lang) }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      lang: 'selectedLanguage',
      defaultLang: 'defaultLanguage'
    })
  },
  props: [
    'main_content'
  ]
}
</script>

<style lang="less" scoped>
h4{
  margin-top: 0;
  margin-bottom: 16px;
}
p{
  margin-bottom: 32px;
}
@media(min-width:0px) and (max-width:767px){
  .content{
    margin-bottom: 16px;
  }
}
</style>