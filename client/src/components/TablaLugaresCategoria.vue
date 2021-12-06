<template>
  <div id="tabla-places-category" name="tabla-places-category">
    <div v-if="!places_c.length" class="alert alert-info" role="alert">
      No existen lugares
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="place in places_c" :key="place['id']">
          <td>{{ place['id'] }}</td>
          <td>{{ place['name'] }}</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'tabla-places-category',
    props: {
      places_c: Array,
    },
  }
</script>

<style>

.table{
  margin: 0 auto;
  border-spacing: 0;
}

th {
  padding: 15px;
}

td {
  padding: 15px;
}

tr:nth-child(even) {background-color: #f2f2f2;}


</style>
