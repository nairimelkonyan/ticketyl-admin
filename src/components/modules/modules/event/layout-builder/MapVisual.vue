<template>
  <gmap-map
    :center="center"
    :zoom="15"
    map-type-id="roadmap"
    style="width: 100%; height: 376px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCILt4m-5ujba6NgTJM03899OmkRFV3NT0',
      libraries: 'places'
    }
  })
  export default {
    props: [ 'main_content' ],
    data () {
      return {
        center: {lat: 56.9496487, lng: 24.1051865},
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]
      }
    }
  }
</script> 

<style lang="less" scoped>
.vue-map-container{
  margin-bottom: 32px;
}
</style>
