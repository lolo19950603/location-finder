<template>
  <div id="app">
    <h1>Location Finder</h1>
    <CurrentLocation :currentLatitude="currentLatitude" :currentLongitude="currentLongitude" @updateCurrentLocation="updateCurrentLocation"/>
    <SearchLocation :searchLatitude="searchLatitude" :searchLongitude="searchLongitude" />
    <MapContainer :currentLatitude="currentLatitude" :currentLongitude="currentLongitude"/>
  </div>
</template>

<script>
import CurrentLocation from './components/CurrentLocation.vue'
import SearchLocation from './components/SearchLocation.vue'
import MapContainer from './components/MapContainer.vue'

export default {
  name: 'App',
  components: {
    CurrentLocation,
    SearchLocation,
    MapContainer
  },
  data() {
    return {
      currentLatitude: 0,
      currentLongitude: 0,
      searchLatitude: 1,
      searchLongitude: 1,
    };
  },
  methods: {
    updateCurrentLocation(currentLatitude, currentLongitude) {
      this.currentLatitude = currentLatitude;
      this.currentLongitude = currentLongitude;
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
