<template lang="pug">
  .dropdown
    button.dropdown-toggle(data-toggle="dropdown")
      | {{ selected_option }}
      i.material-icons keyboard_arrow_down
    ul.dropdown-menu
      li(v-for='o in options', @click='selected(o)') {{ o }}
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        selected_option: this.options[0]
      }
    },
    props: [
      'options'
    ],
    methods: {
      selected (e) {
        this.selected_option = e
        this.$emit('input', Number.parseInt(this.selected_option))
      }
    },
    computed: {
      ...mapGetters({
        defaultLang: 'defaultLanguage'
      })
    }
  }
</script>

<style lang="less" scoped>
.dropdown{
  text-align: left;
  .dropdown-menu{
    width: 100%;
    min-width: 104px;
    max-height: 154px;
    overflow-y: scroll;
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
    position: relative;
    width: 100%;
    font-size: 18px;
    text-align: left;
    min-height: 48px;
    padding: 10px 18px;
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