<template>
  <div class="map">
    <div id="map-container"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import currentMarkerIconPng from '@/assets/current-marker.png';

export default {
  name: "MapContainer",
  data() {
    return {
      map: null,
      currentMarkerIcon: null,
      currentMarker: null,
    };
  },
  props: {
    currentLatitude: Number,
    currentLongitude: Number
  },
  mounted() {
    this.initMap();
  },
  watch: {
    currentLatitude: function() {
      this.handleCurrentLatitudeChange();
    },
  },
  methods: {
    initMap() {
      // Create the map instance
      this.map = L.map('map-container').setView([50.1304, -98.3468], 2);

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
    },
    handleCurrentLatitudeChange() {
      if (this.currentMarker) {
        this.currentMarker.removeFrom(this.map);
      }
      this.map.setView([this.currentLatitude, this.currentLongitude], 6)
      this.currentMarker = L.marker([this.currentLatitude, this.currentLongitude], { icon: this.currentMarkerIcon }).addTo(this.map);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  padding-top: 10px;
}
#map-container {
  height: 700px;
}
</style>
