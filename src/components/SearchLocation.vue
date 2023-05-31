<template>
  <div class="search-location">
    <h3>
      Latest searched Location
    </h3>
    <p><b>Place:</b> {{ this.searchName }}</p>
    <p><b>Geolocation:</b> {{ this.searchLatitude.toFixed(6) }}°, {{ this.searchLongitude.toFixed(6) }}°</p>
    <p><b>Time Zone:</b> {{ searchTimeZone }}</p>
    <p><b>Local Time:</b> {{ searchLocalTime }}</p>
    <vue-google-autocomplete
      class="form-control mb-1"
      id="map-autocomplete"
      ref="autocomplete"
      :placeholder="'Enter a location'"
      types='geocode'
      @placechanged="handlePlaceChanged"
    ></vue-google-autocomplete>
    <p>*please choose one of the suggestive locations when the dropdown is shown*</p>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import axios from 'axios';

export default {
  name: "SearchLocation",
  components: {
    VueGoogleAutocomplete,
  },
  data() {
    return {
      searchPlace: null,
      searchName: '',
      libraries: 'places',
      isSelected: false,
      searchTimeZone: null,
      searchLocalTime: null,
      arrowKeyIsPressed: false,
      uniqueId: 0
    };
  },
  mounted() {
    setInterval(this.updatePlace, 1000);
  },
  props: {
    searchLatitude: Number,
    searchLongitude: Number,
  },
  methods: {
    handlePlaceChanged(place) {
      this.searchPlace = place;
      const lat = this.searchPlace.latitude;
      const lng  = this.searchPlace.longitude;
      this.getPlace(lat, lng);
    },
    getPlace(lat, lng) {
      const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?key=AIzaSyCCvxNCEJen7VzPMwgErCK9_6oL2I65M7E&location=${lat},${lng}&timestamp=${Math.floor(Date.now() / 1000)}`;

      axios.get(apiUrl)
        .then(response => {
          const timeZoneId = response.data.timeZoneId;
          const localTime = new Date().toLocaleString('en-US', { timeZone: timeZoneId });

          this.searchTimeZone = timeZoneId;
          this.searchLocalTime = localTime;
          this.updateSearchLocation(lat, lng, [this.$refs.autocomplete.autocompleteText, this.searchTimeZone, this.uniqueId]);
          this.uniqueId += 1
          this.searchName = this.$refs.autocomplete.autocompleteText;
          this.$refs.autocomplete.autocompleteText = '';
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    updatePlace() {
      if (this.searchLatitude !== 0) {
        const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?key=AIzaSyCCvxNCEJen7VzPMwgErCK9_6oL2I65M7E&location=${this.searchLatitude},${this.searchLongitude}&timestamp=${Math.floor(Date.now() / 1000)}`;

        axios.get(apiUrl)
          .then(response => {
            const timeZoneId = response.data.timeZoneId;
            const localTime = new Date().toLocaleString('en-US', { timeZone: timeZoneId });

            this.searchTimeZone = timeZoneId;
            this.searchLocalTime = localTime;
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
    },
    updateSearchLocation(latitude, longitude, place) {
      this.$emit('updateSearchLocation', latitude, longitude, place);
    },
  },
};
</script>
<style scoped>
</style>
