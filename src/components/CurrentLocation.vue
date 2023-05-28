<template>
  <div class="current-location">
    <h3>Current Location: {{ this.currentLatitude }}, {{ this.currentLongitude }}</h3>
    <button @click="getLocation">Acquire current locaiton</button>
  </div>
</template>

<script>
export default {
  name: 'CurrentLocation',
  props: {
    currentLatitude: Number,
    currentLongitude: Number
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.handleSuccess, this.handleError);
      }
    },
    handleSuccess(position) {
      // Code to handle successful geolocation retrieval
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Use latitude and longitude values as needed
      this.updateCurrentLocation(latitude, longitude)
    },
    handleError(error) {
      // Code to handle geolocation error
      // error.code contains the error code, and error.message contains the error message
      console.log(error)
    },
    updateCurrentLocation(latitude, longitude) {
      this.$emit('updateCurrentLocation', latitude, longitude);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
