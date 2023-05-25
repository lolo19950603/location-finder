<template>
  <div id="app">
    <CurrentLocation msg="Welcome to Your Vue.js App"/>
    <MapContainer :latitude="43.7092352" :longitude="-79.3935872"/>
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
  }
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
