<template>
  <div class="search-location">
    <h3>
      Searched Location: {{ this.searchLatitude }}, {{ this.searchLongitude }}
    </h3>
  </div>
</template>

<script>
import VueGooglePlacesAutocomplete from 'vue-google-places';

export default {
  name: "SearchLocation",
  data() {
    return {
      searchQuery: "",
    };
  },
  props: {
    searchLatitude: Number,
    searchLongitude: Number,
  },
  methods: {
    getLocation() {
      console.log("sucess");
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
