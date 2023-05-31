<template>
  <div class="container">
    <SearchLocation class="search-location" :searchLatitude="searchLatitude" :searchLongitude="searchLongitude" @updateSearchLocation="updateSearchLocation"/>
    <div id="map-container"></div>
    <SearchMarkerList class="search-markerList" :searchMarkerList="searchMarkerList" @deleteSelectedMarkers="deleteSelectedMarkers" />
  </div>
</template>

<script>
import SearchLocation from '../components/SearchLocation.vue'
import SearchMarkerList from '../components/SearchMarkerList.vue'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import currentMarkerIconPng from '@/assets/current-marker.png';
import searchMarkerIconPng from '@/assets/search-marker.png';

export default {
  name: "MapContainer",
  components: {
    SearchLocation,
    SearchMarkerList
  },
  data() {
    return {
      map: null,
      searchLatitude: 0,
      searchLongitude: 0,
      searchPlace: [],
      currentMarkerIcon: null,
      searchMarkerIcon: null,
      currentMarker: null,
      searchMarkerList: []
    };
  },
  props: {
    currentLatitude: Number,
    currentLongitude: Number,
    acquireClickCounter: Number
  },
  mounted() {
    this.initMap();
  },
  watch: {
    acquireClickCounter: function() {
      this.handleCurrentLocationChange();
    },
    searchLatitude: function() {
      this.handleSearchLocationChange();
    },
  },
  methods: {
    initMap() {
      // Create the map instance
      this.map = L.map('map-container').setView([50.1304, -98.3468], 1);
      // Add a tile layer (e.g., OpenStreetMap) to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors',
      }).addTo(this.map);

      // Set bounds
      const southWest = L.latLng(-89.98155760646617, -180),
      northEast = L.latLng(89.99346179538875, 180);
      const bounds = L.latLngBounds(southWest, northEast);
      this.map.setMaxBounds(bounds);

      // Create custom marker for current location
      this.currentMarkerIcon = L.icon({
        iconUrl: currentMarkerIconPng,
        iconSize: [96, 96],
        iconAnchor: [48,96]
      });
      this.searchMarkerIcon = L.icon({
        iconUrl: searchMarkerIconPng,
        iconSize: [50, 50],
        iconAnchor: [25, 50]
      });
    },
    handleCurrentLocationChange() {
      if (this.currentMarker) {
        this.currentMarker.removeFrom(this.map);
      }
      this.map.setView([this.currentLatitude, this.currentLongitude], 3);
      this.currentMarker = L.marker([this.currentLatitude, this.currentLongitude], { icon: this.currentMarkerIcon }).addTo(this.map);
    },
    handleSearchLocationChange() {
      this.map.setView([this.searchLatitude, this.searchLongitude], 3)
      this.updateMarkerList(L.marker([this.searchLatitude, this.searchLongitude], { title: this.searchPlace, icon: this.searchMarkerIcon }).addTo(this.map));
    },
    deleteSelectedMarkers(selectedMarkers) {
      const deletedMarkers = this.searchMarkerList.filter(marker => selectedMarkers.includes(marker.options.title[2]));
      deletedMarkers.forEach((marker) => {
        marker.removeFrom(this.map);
      });
      this.searchMarkerList = this.searchMarkerList.filter(marker => !selectedMarkers.includes(marker.options.title[2]));
      this.map.setView([50.1304, -98.3468], 1);
    },
    updateMarkerList(marker) {
      this.searchMarkerList.push(marker);
    },
    updateSearchLocation(searchLatitude, searchLongitude, searchPlace) {
      this.searchLatitude = searchLatitude;
      this.searchLongitude = searchLongitude;
      this.searchPlace = searchPlace;
    }
  },
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
}

.search-location {
  margin: auto;
}

.search-markerList {
  grid-column: span 2;
}

#map-container {
  height: 50vh;
}
</style>
