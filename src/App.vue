<template>
  <div id="app">
    <h1>Location Finder</h1>
    <CurrentLocation class="current-location" :currentLatitude="currentLatitude" :currentLongitude="currentLongitude" @updateCurrentLocation="updateCurrentLocation"/>
    <MapContainer class="map-container" :currentLatitude="currentLatitude" :currentLongitude="currentLongitude" :acquireClickCounter="acquireClickCounter" />
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
      currentLatitude: 0,
      currentLongitude: 0,
      acquireClickCounter: 0,
    };
  },
  methods: {
    updateCurrentLocation(currentLatitude, currentLongitude) {
      this.currentLatitude = currentLatitude;
      this.currentLongitude = currentLongitude;
      this.acquireClickCounter += 1;
    }
  },
}
</script>

<style>
#app {
  background-color: whitesmoke;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 20px;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 1fr 7fr;
}

.current-location {
  margin: auto;
}
</style>
