<template>
  <div class="current-location">
    <button @click="getLocation">Acquire current locaiton</button>
  </div>
</template>

<script>
export default {
  name: 'CurrentLocation',
  props: {
    msg: String
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
      console.log(latitude, longitude)
      console.log(this.msg)
    },
    handleError(error) {
      // Code to handle geolocation error
      // error.code contains the error code, and error.message contains the error message
      console.log(error)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
