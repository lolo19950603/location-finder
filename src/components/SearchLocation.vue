<template>
  <div class="search-location">
    <h3>
      Latest searched Location: {{ this.searchLatitude }}, {{ this.searchLongitude }}
    </h3>
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
    <div class="error">{{ this.errorMessage }}</div>
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
      searchPlace: null,
      libraries: 'places',
      errorMessage: '',
      isSelected: false,
      searchInput: ''
    };
  },
  mounted() {
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
        this.errorMessage = ''
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
      console.log(place);
      this.errorMessage = '';
      this.isSelected = true;
      this.searchPlace = place;
    },
    updateSearchLocation(latitude, longitude, place) {
      this.$emit('updateSearchLocation', latitude, longitude, place);
    },
    handleButtonClick() {
      if (this.$refs.autocomplete.autocompleteText === '') {
        this.errorMessage = "Cannot be empty!";
      }
      else if (this.isSelected !== true) {
        // this.errorMessage = 'Invalid Entry'
      }
      else {
        const lat = this.searchPlace.latitude;
        const lng  = this.searchPlace.longitude;
        this.updateSearchLocation(lat, lng, this.$refs.autocomplete.autocompleteText)
        this.$refs.autocomplete.autocompleteText = '';
        this.searchPlace = null;
        this.errorMessage = '';
        this.isSelected = false;
      }
    },
    handleKeyDown() {
      console.log(this.$refs.autocomplete.autocompleteText)
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
