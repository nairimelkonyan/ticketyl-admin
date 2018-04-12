<template lang="pug">
  section
    p {{ translations.aside_newsletter | tktranslate(lang) }}
    tk-send#emails(:placeholder='translations.aside_newsletter_placeholder | tktranslate(lang)', v-model='email', @click='postNewsLetter')
    p(v-if='!signedUp')
    p(v-if='signedUp && !wrongEmail') {{ translations.aside_newsletter_success | tktranslate(lang) }}
    p(v-if='wrongEmail') {{ translations.aside_newsletter_invalid | tktranslate(lang) }}
</template>

<script>
import Api from '@/services/ApiService'
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
  data () {
    return {
      signedUp: false,
      wrongEmail: false,
      email: ''
    }
  },
  methods: {
    translate (translate) {
      return this.$options.filters.translate(translate)
    },
    postNewsLetter () {
      var mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      if (this.email.match(mailformat)) {
        document.getElementById('emails').classList.remove('wrongInput')
        this.wrongEmail = false
        this.signedUp = true
        new Api().postNewsLetter({email: this.email}).then(response => {})
      } else {
        document.getElementById('emails').classList.add('wrongInput')
        document.getElementById('emails').focus()
        this.wrongEmail = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
section{
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  padding: 20px 15px;
  text-align: left;
  margin-bottom: 24px;
  p:first-child{
    text-transform: uppercase;
    color: #9a9a9a;
  }
  p:last-child{
    color: #292929;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 0;
    text-transform: capitalize;
    margin-top: 8px;
  }
}
</style>