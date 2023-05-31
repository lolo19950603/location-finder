<template>
  <div class="search-location">
    <h3>
      Latest searched Location: {{ this.searchLatitude }}, {{ this.searchLongitude }}
    </h3>
    <p><b>Place:</b> {{ this.searchName }}</p>
    <p><b>Time Zone:</b> {{ searchTimeZone }}</p>
    <p><b>Local Time:</b> {{ searchLocalTime }}</p>
    <!-- <span @keydown="handleEnterKey"> -->
      <vue-google-autocomplete
        id="map-autocomplete"
        ref="autocomplete"
        :placeholder="'Enter a location'"
        types='geocode'
        @placechanged="handlePlaceChanged"
      ></vue-google-autocomplete>
    <!-- </span> -->
    <button @click="handleButtonClick">Search</button>
    <!-- <span class="error">{{ this.errorMessage }}</span> -->
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
      // errorMessage: '',
      isSelected: false,
      searchTimeZone: null,
      searchLocalTime: null
    };
  },
  mounted() {
    setInterval(this.updateTimeZoneAndLocalTime, 1000);
    const input = this.$refs.autocomplete.$refs.autocomplete;
    input.addEventListener('keydown', this.handleEnterKey);
  },
  props: {
    searchLatitude: Number,
    searchLongitude: Number,
  },
  methods: {
    handleEnterKey(event) {
      if (event.key === "Enter") {
        this.handleButtonClick()
      }
      else if (event.key === "Backspace") {
        // this.errorMessage = ''
        if (this.isSelected === true) {
          this.isSelected = false;
          this.searchPlace = null;
          this.$refs.autocomplete.autocompleteText = '';
        }
      }
      else {
        if (this.isSelected === true) {
          this.isSelected = false;
          this.searchPlace = null;
          this.$refs.autocomplete.autocompleteText = '';
        }
        this.errorMessage = ''
      }
    },
    handlePlaceChanged(place) {
      // this.errorMessage = '';
      this.isSelected = true;
      this.searchPlace = place;
    },
    updateSearchLocation(latitude, longitude, place) {
      this.$emit('updateSearchLocation', latitude, longitude, place);
    },
    handleButtonClick() {
      if (this.$refs.autocomplete.autocompleteText === '') {
        // this.errorMessage = "Cannot be empty!";
      }
      else if (this.isSelected !== true) {
        // this.errorMessage = 'Invalid Entry'
      }
      else {
        const lat = this.searchPlace.latitude;
        const lng  = this.searchPlace.longitude;
        this.searchName = this.$refs.autocomplete.autocompleteText;
        this.updateSearchLocation(lat, lng, this.$refs.autocomplete.autocompleteText)
        this.getTimeZoneAndLocalTime(lat, lng);
        this.$refs.autocomplete.autocompleteText = '';
        this.searchPlace = null;
        this.errorMessage = '';
        this.isSelected = false;
      }
    },
    getTimeZoneAndLocalTime(lat, lng) {
      const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?key=AIzaSyCCvxNCEJen7VzPMwgErCK9_6oL2I65M7E&location=${lat},${lng}&timestamp=${Math.floor(Date.now() / 1000)}`;

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
    },
    updateTimeZoneAndLocalTime() {
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
    }
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red;
    height: 10px;
  }
</style>
