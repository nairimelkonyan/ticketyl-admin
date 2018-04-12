<template lang="pug">
  section
    h5 {{ translations.aside_faq | tktranslate(lang) }}
    .divs(v-for='(f, index) in data.layout.list')
      h4(type='button', data-toggle='collapse', :data-target="'#faq' + _uid + index", @click="activeLink") {{ f.translations.question | tktranslate(lang) }}
        i.material-icons keyboard_arrow_down
      .collapse(:id="'faq' + _uid + index")
        ul
          li {{ f.translations.text | tktranslate(lang) }}
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: [
      'data',
      'translations'
    ],
    methods: {
      activeLink (event) {
        event.target.classList.toggle('active')
      }
    },
    computed: {
      ...mapGetters({
        lang: 'selectedLanguage'
      })
    }
  }
</script>

<style lang="less" scoped>
section{
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
  margin-bottom: 24px;
  [aria-expanded="true"] .material-icons{
    font-weight: bold;
  }
  h5{
    color: #9a9a9a;
    text-transform: uppercase;
    padding: 16px 15px;
    margin: 0;
  }
  h4{
    font-size: 14px;
    font-weight: lighter;
    border-top: 1px solid #979797;
    padding: 14px 16px;
    cursor: pointer;
    margin: 0;
  }
  ul{
    position: relative;
    padding: 8px 16px;
    margin: 0;
    list-style-type: none;
    li{
      position: relative;
      margin: 0;
      padding: 0 0 8px 0;
    }
  }
  .active{
    font-weight: bold;
  }
  .material-icons{
    float: right;
    vertical-align: middle;
    font-size: 18px;
    pointer-events: none;
  }
}
.material-icons{
  transition: 0.1s;
}
[aria-expanded="true"] .material-icons{
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>