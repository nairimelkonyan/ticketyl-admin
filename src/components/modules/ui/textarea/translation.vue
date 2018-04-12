<template lang="pug">
  section.input-translation(v-if="merchant.allowed_languages && language")
    div
      tk-text-area.select(v-for="(item, index) in merchant.allowed_languages", :key="item.code", v-if="language.code === item.code", v-model="translations[item.code]", :name='name', :placeholder='placeholder', :maxlength='maxlength', @input="update")
      .dropdown
        a.dropdown-toggle(type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false")
          span {{ language.code }}
          i.material-icons keyboard_arrow_down
        .dropdown-menu
          a.dropdown-item(
            v-for="(item, index) in merchant.allowed_languages",
            :key="item.code",
            v-if="language.code !== item.code",
            @click="change_language(item)") {{ item.code }}

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['label', 'inline', 'name', 'placeholder', 'maxlength', 'target'],
    data () {
      return {
        language: null,
        translations: {}
      }
    },
    methods: {
      update () { this.$emit('change', this.translations) },
      change_language (language) {
        this.language = language
      }
    },
    computed: {
      ...mapGetters({
        merchant: 'merchant_details'
      })
    },
    mounted () {
      this.language = this.merchant.allowed_languages[0]
      this.translations = Object.assign({}, this.target)
    },
    watch: {
      target (target) {
        this.translations = Object.assign({}, this.target)
      }
    }
  }
</script>

<style lang="less" scoped>
  .input-translation {

    > div {
      position: relative;

      .dropdown {
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100%;

        a.dropdown-toggle {
          position: absolute;
          top: 50%;
          right: 0px;
          padding: 0px 10px;
          white-space: nowrap;
          font-size: 16px;
          line-height: 24px;
          text-decoration: none;
          cursor: pointer;
          margin-top: -12px;

          * { vertical-align: middle; }

          .material-icons{
            font-size: 14px;
          }
        }
        .dropdown-menu {
          left: auto;
          right: 0px;
          top: 100%;
          padding: 0px;
          float: none;
          min-width: 0;
          margin: 0px;
          margin-top: -2px;
          margin-right: -1px;

          .dropdown-item {
            position: relative;
            display: block;
            padding: 10px 30px;
            text-decoration: none;
            border-top: 1px solid #cecece;
            cursor: pointer;

            &:first-child {
              border: none;
            }
          }
        }
      }
    }
  }
</style>
