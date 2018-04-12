<template lang="pug">
  section
    p {{ data.translations.heading | tktranslate(lang) }}
    a(v-for='d in data.layout.list', :href='d.translations.full_url | tktranslate(lang)')
      img(:src="'/static/' + d.custom_fields.icon")
      span {{ d.translations.link_text | tktranslate(lang) }}
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
  },
  methods: {
    icon (i) {
      return 'fa fa-' + i
    }
  }
}
</script>

<style lang="less" scoped>
section{
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  padding: 20px 15px;
  margin-bottom: 24px;
  img{
    width: 24px;
    height: 22px;
    margin-right: 24px;
  }
  p{
    text-transform: uppercase;
    color: #9a9a9a;
  }
  a{
    text-transform: lowercase;
    display: block;
    color: #292929;
    margin-bottom: 10px;
  }
}
</style>