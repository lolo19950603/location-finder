<template>
  <div>
    <h3>Searched Records</h3>
    <div class="d-flex justify-content-start">
      <button class="btn btn-danger btn-sm" @click="deleteSelectedMarkers">Delete Selected Records</button>
      <button class="btn btn-success btn-sm" @click="clearSelections">Clear Selections</button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Location</th>
          <th>Time Zone</th>
          <th>Lat</th>
          <th>Lng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(marker) in paginatedMarkers" :key="marker.options.title[2]">
          <td>
            <input type="checkbox" v-model="selectedMarkers" :value="marker.options.title[2]">
          </td>
          <td>{{ marker.options.title[0] }}</td>
          <td>{{ marker.options.title[1] }}</td>
          <td>{{ marker.getLatLng().lat.toFixed(6) }}°</td>
          <td>{{ marker.getLatLng().lng.toFixed(6) }}°</td>
        </tr>
      </tbody>
    </table>
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" href="#" @click="goToPage(currentPage - 1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
          <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" @click="goToPage(currentPage + 1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'SearchMarkerList',
  data() {
    return {
      markersPerPage: 10,
      currentPage: 1,
      selectedMarkers: []
    }
  },
  props: {
    searchMarkerList: Array
  },
  computed: {
    paginatedMarkers() {
      const start = (this.currentPage - 1) * this.markersPerPage;
      const end = start + this.markersPerPage;
      return this.searchMarkerList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.searchMarkerList.length / this.markersPerPage);
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    clearSelections() {
      this.selectedMarkers = []
    },
    deleteSelectedMarkers() {
      this.$emit('deleteSelectedMarkers', this.selectedMarkers);
      this.selectedMarkers = []
      this.goToPage(1)
    },
  }
}
</script>
<style scoped>
</style>
