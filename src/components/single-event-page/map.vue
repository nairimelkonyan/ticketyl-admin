<template>
  <div>
    <GmapMap
      :zoom='parseInt(14)'
      map-type-id="roadmap"
      style="width: 100%; height: 290px"
      :center="(this.lat && this.lon) ? {
          lat: this.lat,
          lng: this.lon,
        } : {lat: 0, lng: 0}"
    >
      <GmapMarker
        v-if="this.lat && this.lon"
        label="★"
        :position="{
          lat: this.lat,
          lng: this.lon,
        }"
        />
    </GmapMap>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCILt4m-5ujba6NgTJM03899OmkRFV3NT0',
      libraries: 'places'
    }
  })

  export default {
    props: [ 'main_content', 'lat', 'lon' ],
    data () {
      return { }
    }
  }
</script> 

<style lang="less" scoped>
  .vue-map-container{
    margin-bottom: 32px;
  }
</style>
