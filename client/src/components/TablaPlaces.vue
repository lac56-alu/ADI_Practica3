<template>
  <div id="tabla-places">
    <div v-if="!places.length" class="alert alert-info" role="alert">
      No existen lugares
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="place in places" :key="place.id">
          <td>{{ place.id }}</td>
          <td>{{ place.name }}</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

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

<script>
  export default {
    name: 'tabla-places',
    props: {
       places: Array,
    },
  }
</script>

