<template>
  <div id="app">
    <h1>Location Finder</h1>
    <CurrentLocation @updateLocation="updateLocation"/>
    <MapContainer :latitude="latitude" :longitude="longitude"/>
  </div>
</template>

<script>
import CurrentLocation from './components/CurrentLocation.vue'
import MapContainer from './components/MapContainer.vue'

export default {
  name: 'App',
  components: {
    CurrentLocation,
    MapContainer
  },
  data() {
    return {
      latitude: 50.1304,
      longitude: -98.3468
    };
  },
  methods: {
    updateLocation(latitude, longitude) {
      this.latitude = latitude;
      this.longitude = longitude;
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
