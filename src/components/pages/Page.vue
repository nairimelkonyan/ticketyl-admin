<template lang="pug">
  div
    template(v-for='component in header')
      component(:is='component.code', :translations="component.translations")
    template(v-for="component in components")
      component(:is="component.code", :translations="component.translations", :layout="component.layout")
    template(v-for='component in footer')
      component(:is='component.code', :translations="component.translations")
</template>
<script>
import Api from '@/services/ApiService'
import { mapGetters } from 'vuex'
import Vue from 'vue'
import store from '@/store'

const api = new Api()

export default {
  name: 'Page',
  props: ['pageId'],
  data () {
    return {
      header: [],
      components: [],
      footer: []
    }
  },
  created () {
    this.getPageLayout(this.pageId)
  },
  watch: {
    pageId (id) {
      this.getPageLayout(id).then(() => {
        // document.body.scrollTop = document.documentElement.scrollTop = 0
      })
      window.jQuery('.modal').modal('hide')
    }
  },
  methods: {
    getPageLayout (id) {
      return api.getRouteLayout(this.pageId).then(response => {
        const data = response.data[0]
        this.header.length = 0
        this.components.length = 0
        this.footer.length = 0
        this.buildLayout(data.layout.content, this.components)
        this.buildLayout(data.layout.header, this.header)
        this.buildLayout(data.layout.nav, this.header)
        if (data.layout.footer) {
          this.buildLayout(data.layout.footer, this.footer)
        }
        // Object.entries(data.layout).forEach(
        // ([key, value]) => this.buildLayout(value)
        // )
      })
    },
    buildLayout (pageLayout, components) {
      pageLayout.forEach(layout => {
        components.push({
          code: layout.code,
          translations: layout.translations
        })
        Object.entries(layout.translations).forEach(
          ([key, value]) => {
            this.buildTranslations(value)
          }
        )
      })
    },
    buildTranslations (obj) {
      this.translateLangs.forEach(l => {
        if (!obj[l.code]) {
          return
        }
        var defaultMsg = obj[this.defaultLang]
        var msg = {}
        msg[defaultMsg] = obj[l.code]
        Vue.i18n.add(l.code, msg)
      })
    }
  },
  computed: {
    ...mapGetters({
      languages: 'languages',
      defaultLang: 'defaultLanguage',
      cart: 'get_cart'
    }),
    translateLangs () {
      return this.languages.filter(lang => { return lang.code !== this.defaultLang })
    }
  },
  beforeRouteEnter (to, from, next) {
    // nevar iet uz /success un /error
    if (to.name === 'Checkout') {
      if (store.getters.get_cart.length > 0) {
        return next()
      }
      return next('/')
    }
    return next()
  }
}
</script>
<style>
</style>