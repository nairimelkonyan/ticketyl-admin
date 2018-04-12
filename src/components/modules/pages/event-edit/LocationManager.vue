<template lang="pug">
  section(v-if="active_target")
    #location
      
      .row
        .col-sm-7
          section
            h3 {{ active_target.translations.name.en }} settings
              tk-tools-second(style='margin-left: 16px;')
          section(v-if="packages.length")
            span * Subevent title
              tk-input-translation(label="* Event title", placeholder="A short and recognizable title", :target="active_target.translations.name" @change="translate_title", maxlength='50')
          br
          span * Location
            label
              GmapAutocomplete.place_search(@place_changed="setPlace")
            br
            br
            form(action='')
              input(type='checkbox', name='map', id="map", v-model='show_map', @change='updateMap')
              label(for="map", style='display: inline-block;') Show map on event page
            br
        .col-sm-5
          tk-map(v-if='active_target.show_map && active_target.location', style="margin-top: 96px", :lat='x', :lon='y')
</template>

<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      location: null,
      show_map: null,
      place: null,
      x: null,
      y: null
    }
  },
  methods: {
    translate_title (translations) {
      this.$store.commit(types.SET_ACTIVE_TARGET_NAME, translations)
    },
    updateMap () {
      this.$store.commit(types.UPDATE_ACTIVE_TARGET, { show_map: this.show_map })
    },
    updateLocation () {
      this.$store.commit(types.UPDATE_ACTIVE_TARGET, { location: this.location })
    },
    setPlace (place) {
      this.place = place
      this.location = place.name
      this.updateLocation()
      this.x = place.geometry.location.lat()
      this.y = place.geometry.location.lng()
    }
  },
  computed: {
    ...mapGetters({
      active_target: 'active_target',
      packages: 'packages'
    })
  },
  watch: {
    active_target (target) {
      this.location = target.location
      this.show_map = target.show_map
    }
  }
}
</script>

<style lang="less" scoped>
  #location{
    label{
      margin: 0;
    }
  }
  input[type="text"] {
    font-size: 18px;
    text-transform: uppercase;
    color: #9a9a9a;
    border-radius: 0;
    border: 1px solid #292929;
    width: 100%;
    height: 48px;
    padding: 12px 16px;
  }
</style>
