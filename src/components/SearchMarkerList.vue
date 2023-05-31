<template>
  <div>
    <h3>SearchMarkerList</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>Lat</th>
          <th>Lng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(marker, index) in searchMarkerList" :key="index">
          <td>{{ index }}</td>
          <td>{{ marker.options.title }}</td>
          <td>{{ marker.getLatLng().lat }}</td>
          <td>{{ marker.getLatLng().lng }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SearchMarkerList',
  props: {
    searchMarkerList: Array
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
