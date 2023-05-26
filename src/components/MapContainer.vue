<template>
  <div class="map">
    <div ref="map" class="leaflet-map"></div>
  </div>
</template>

<script>
import L from "leaflet";
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
    latitude: Number,
    longitude: Number
  },
  mounted() {
    this.renderMap();
  },
  watch: {
    latitude: function() {
      this.handleLatitudeChange();
    },
  },
  methods: {
    renderMap() {
      this.map = L.map(this.$refs.map).setView([this.latitude, this.longitude], 2)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors',
        noWrap: true
      }).addTo(this.map);
      const southWest = L.latLng(-89.98155760646617, -180),
      northEast = L.latLng(89.99346179538875, 180);
      const bounds = L.latLngBounds(southWest, northEast);
      this.map.setMaxBounds(bounds);
      this.currentMarkerIcon = L.icon({
        iconUrl: currentMarkerIconPng,
        iconSize: [96, 96],
        iconAnchor: [48,96]
      });
    },
    handleLatitudeChange() {
      if (this.currentMarker) {
        this.currentMarker.removeFrom(this.map);
      }
      this.map.setView([this.latitude, this.longitude], 6)
      this.currentMarker = L.marker([this.latitude, this.longitude], { icon: this.currentMarkerIcon }).addTo(this.map);
    },
  }
};
</script>

<style scoped>
.map {
  padding-top: 10px;
}
.leaflet-map {
  height: 700px;
}
</style>
