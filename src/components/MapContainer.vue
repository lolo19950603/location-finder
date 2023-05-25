<template>
  <div>
    <div id="map" style="height: 400px; width:100%"></div>
  </div>
</template>

<script>
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import currentMarkerIconPng from '@/assets/current-marker.png';

export default {
  name: "MapContainer",
  props: {
    latitude: Number,
    longitude: Number
  },
  mounted() {
    const latitude = this.latitude;
    const longitude = this.longitude;

    // Initialize the map
    const map = L.map("map").setView([latitude, longitude], 10);

    // Add a tile layer to the map (e.g., using OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data © OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);

    // Add a you are here marker for the location
    const currentMarkerIcon = L.icon({
      iconUrl: currentMarkerIconPng,
      iconSize: [64, 64],
      iconAnchor: [32,64]
    });
    L.marker([latitude, longitude], { icon: currentMarkerIcon }).addTo(map);
  },
};
</script>

<style scoped></style>
