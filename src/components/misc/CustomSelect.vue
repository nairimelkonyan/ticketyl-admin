<template lang="pug">
  .dropdown(v-if='selected')
    button.dropdown-toggle(data-toggle="dropdown")
      | {{ selected.translations.name[selectedLang] | translate }}
      i.material-icons keyboard_arrow_down
    ul.dropdown-menu
      li(v-for='o in options', @click='selectEvent(o)') {{ o.translations.name[selectedLang] | translate }}
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: [
      'options'
    ],
    data () {
      return {
        selected: null
      }
    },
    watch: {
      options (options) {
        this.selected = options[0]
      }
    },
    methods: {
      selectEvent (event) {
        this.selected = event
        this.$emit('input', event.id)
      }
    },
    computed: {
      ...mapGetters({
        selectedLang: 'selectedLanguage',
        defaultLang: 'defaultLanguage'
      })
    },
    mounted () {
      if (this.options.length > 0) {
        this.selectEvent(this.options[0])
      }
    }
  }
</script>

<style lang="less" scoped>
.dropdown{
  text-align: left;
  .dropdown-menu{
    width: 100%;
    border: 1px solid #979797;
    min-width: 104px;
    border-radius: 0;
    li{
      cursor: pointer;
      font-size: 18px;
      padding: 12px 16px;
      &:hover{
        background-color: #f7f7f7;
      }
    }
  }
  button{
    overflow: hidden;
    position: relative;
    width: 100%;
    line-height: 32px;
    font-size: 18px;
    text-align: left;
    height: 48px;
    padding: 8px 40px 12px 16px;
    border-radius: 0;
    color: #292929;
    border: 1px solid #292929;
    background-color: #fff;
    .material-icons{
      position: absolute;
      top: 13px;
      right: 12px;
      transition: 0.1s;
      vertical-align: middle;
    }
  }
}
[aria-expanded="true"] .material-icons {
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
