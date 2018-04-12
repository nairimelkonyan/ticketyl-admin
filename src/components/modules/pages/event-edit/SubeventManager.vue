<template lang="pug">
  section(v-if="active_target")
    .row
      .col-sm-8
        #sub-event
          span New sub event name
          tk-send(placeholder='sub-event title', style='margin-bottom: 24px;',
          @input='updateSubeventName',
          @click='add_subevent')
    .row
      .col-sm-12
        #all-sub-events
          span(style='display: block;') All sub-events
          span.sub-event(v-for='(item, index) in packages',
              @click='set_active_package(index)',
              :class="{'active-subevent': item.translations.name.en === active_target.translations.name.en}") {{ item.translations.name.en }}
            button(@click='delete_subevent(index)')
              i.material-icons close
</template>

<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      new_subevent_name: ''
    }
  },
  methods: {
    updateSubeventName (value) {
      this.new_subevent_name = value
    },
    set_active_package (index) {
      this.$store.commit(types.SET_ACTIVE_PACKAGE, index)
    },
    add_subevent (value) {
      this.$store.commit(types.ADD_SUBEVENT, {
        translations: {
          name: {
            en: value
          }
        },
        location: '',
        show_map: false,
        code: 'code'
      })
      this.new_subevent_name = ''
    },

    delete_subevent (index) {
      this.$store.commit(types.DELETE_SUBEVENT, index)
    }
  },
  computed: {
    ...mapGetters({
      packages: 'packages',
      active_target: 'active_target'
    })
  }
}
</script>

<style lang="less" scoped>
  
  .sub-event{
    cursor: pointer;
    font-size: 18px;
    display: inline-block;
    padding: 8px;
    border: 1px solid #292929;
    margin-right: 24px;
    margin-bottom: 16px;
    &:hover{
      background-color: #fff;
    }
    &.active-subevent{
      border: 2px solid #292929 !important;
    }
    button{
      padding: 0;
      background-color: transparent;
      border: none;
      outline: 0;
      .material-icons{
        padding-left: 8px;
        vertical-align: middle;
        font-size: 18px;
      }
    }
  }
</style>