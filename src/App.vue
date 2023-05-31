<template>
  <div id="app">
    <h1>Location Finder</h1>
    <CurrentLocation :currentLatitude="currentLatitude" :currentLongitude="currentLongitude" @updateCurrentLocation="updateCurrentLocation"/>
    <SearchLocation :searchLatitude="searchLatitude" :searchLongitude="searchLongitude" @updateSearchLocation="updateSearchLocation"/>
    <MapContainer :currentLatitude="currentLatitude" :currentLongitude="currentLongitude" :acquireClickCounter="acquireClickCounter" :searchLatitude="searchLatitude" :searchLongitude="searchLongitude" :searchPlaceName="searchPlaceName" :searchClickCounter="searchClickCounter" :searchMarkerList="searchMarkerList" @updateMarkerList="updateMarkerList"/>
    <SearchMarkerList :searchMarkerList="searchMarkerList" />
  </div>
</template>

<script>
import CurrentLocation from './components/CurrentLocation.vue'
import SearchLocation from './components/SearchLocation.vue'
import MapContainer from './components/MapContainer.vue'
import SearchMarkerList from './components/SearchMarkerList.vue'

export default {
  name: 'App',
  components: {
    CurrentLocation,
    SearchLocation,
    MapContainer,
    SearchMarkerList
  },
  data() {
    return {
      currentLatitude: 0,
      currentLongitude: 0,
      acquireClickCounter: 0,
      searchLatitude: 0,
      searchLongitude: 0,
      searchPlaceName: '',
      searchClickCounter: 0,
      searchMarkerList: []
    };
  },
  methods: {
    updateCurrentLocation(currentLatitude, currentLongitude) {
      this.currentLatitude = currentLatitude;
      this.currentLongitude = currentLongitude;
      this.acquireClickCounter += 1;
    },
    updateSearchLocation(searchLatitude, searchLongitude, searchPlaceName) {
      this.searchLatitude = searchLatitude;
      this.searchLongitude = searchLongitude;
      this.searchPlaceName = searchPlaceName;
      this.searchClickCounter += 1;
    },
    updateMarkerList(marker) {
      this.searchMarkerList.push(marker);
    }
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
