<template>
  <div class="search-location">
    <h3>
      Searched Location: {{ this.searchLatitude }}, {{ this.searchLongitude }}
    </h3>
    <vue-google-autocomplete
      id="autocomplete"
      :placeholder="'Enter a location'"
      v-on:placechanged="handlePlaceChanged"
      types='geocode'
    ></vue-google-autocomplete>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
  name: "SearchLocation",
  components: {
    VueGoogleAutocomplete,
  },
  data() {
    return {
      libraries: 'places',
    };
  },
  props: {
    searchLatitude: Number,
    searchLongitude: Number,
  },
  methods: {
    handlePlaceChanged(place) {
      // Handle place change events
      const lat = place.latitude;
      const lng  = place.longitude;
      this.updateSearchLocation(lat, lng)
    },
    updateSearchLocation(latitude, longitude) {
      this.$emit('updateSearchLocation', latitude, longitude);
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
