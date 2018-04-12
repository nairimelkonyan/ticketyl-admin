<template lang="pug">
  .search
    .input-group#searchField(v-click-outside="outside" @click="inside")
      input#searchBox(type='text', :placeholder='translate(translations.search[defaultLang])', v-model='searchinput')
      span.input-group-btn(@click='show')
        button.btn.btn-secondary.input-black-button-arrow-right(type='button', @click='find')
          i.material-icons.md-24#searchIcon search
</template>

<script>
  import Api from '@/services/ApiService'
  import * as types from '@/store/mutation-types'
  import { mixin as onClickOutside } from 'vue-on-click-outside'
  import { mapGetters } from 'vuex'
  const api = new Api()
  export default {
    mixins: [onClickOutside],
    props: ['translations'],
    data () {
      return {
        searchinput: '',
        shows: false
      }
    },
    computed: {
      ...mapGetters({
        defaultLang: 'defaultLanguage'
      })
    },
    directives: {
      'click-outside': {
        bind: function (el, binding, vNode) {
          // Provided expression must evaluate to a function.
          if (typeof binding.value !== 'function') {
            const compName = vNode.context.name
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
            if (compName) { warn += `Found in component '${compName}'` }
            console.warn(warn)
          }
          // Define Handler and cache it on the element
          const bubble = binding.modifiers.bubble
          const handler = (e) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
              binding.value(e)
            }
          }
          el.__vueClickOutside__ = handler

          // add Event Listeners
          document.addEventListener('click', handler)
        },
        unbind: function (el, binding) {
          // Remove Event Listeners
          document.removeEventListener('click', el.__vueClickOutside__)
          el.__vueClickOutside__ = null
        }
      }
    },
    methods: {
      find () {
        var params = api
        .filter()
        .search([this.searchinput])
        api.shop().series(params).then(response => {
          this.$store.commit(types.SEARCH_RESULT, response)
        })
        if (this.searchinput !== '') {
          this.$router.push({name: 'Search'})
        }
      },
      translate (translate) {
        return this.$options.filters.translate(translate)
      },
      outside: function (e) {
        window.jQuery('#searchBox').css('visibility', 'hidden')
        window.jQuery('.input-group-btn').css('background-color', '#f7f7f7')
        window.jQuery('#searchIcon').css('color', '#292929')
        window.jQuery('#searchField').css('z-index', '1')
        this.searchinput = ''
      },
      inside: function (e) {
      },
      show () {
        window.jQuery('#searchBox').css('visibility', 'visible').focus()
        window.jQuery('#searchField').css('z-index', '9999999')
        window.jQuery('.input-group-btn').css('background-color', '#292929')
        window.jQuery('#searchIcon').css('color', '#fff')
      },
      open () {
        this.showPopover = true
      },
      close () {
        this.showPopover = false
      }
    }
  }
</script>

<style lang="less" scoped>
.search{
  display: inline-table;
}
.input-group-btn{
  .material-icons{
    color: #292929;
    vertical-align: middle;
    font-size: 18px;
  }
}
input[type='text']{
  font-size: 18px;
  border: 1px solid #292929;
  visibility: hidden;
}
button{
  border: none;
  background-color: transparent;
  padding: 0;
  position: relative;
  outline: none !important;
}
.fade-enter-active{
  transition: all .3s
}
.fade-enter{
  opacity: 0
}
.fade-leave-to, .fade-leave-active{
  transition: opacity 0s
}
.input-group{
  /*
  top: 34.5%;
  right: 247px;
  */
  z-index: 1;
  input::placeholder {
    text-transform: uppercase;
  }
  input[type="text"]{
    width: 550px;
    min-height: 48px;
    padding: 10px;
    border-radius: 0;
  }
  button{
    transition: 0.3s;
    background-color: transparent;
    border: none;
    border-radius: 0;
    min-height: 48px;
    min-width: 48px;
  }
}
@media(min-width:0px) and (max-width:767px){
  .search{
    visibility: hidden;
  }
}
@media(min-width:768px) and (max-width:991px){
  input[type="text"]{
    width: 250px !important;
  }
}
@media(min-width:992px) and (max-width:1199px){
   input[type="text"]{
    width: 400px !important;
  }
}
</style>
