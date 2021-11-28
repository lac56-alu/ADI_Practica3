<template>
  <div id="tabla-places">
    <div v-if="!places.length" class="alert alert-info" role="alert">
      No existen lugares
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="place in places" :key="place.id">
          <td>{{ place.name }}</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>

.table{
    width:10px;
    margin: 0 auto;
    border-spacing: 0;
}

th {
  
  padding: 5px;
}

td {
  padding: 5px;
}
table tbody tr:nth-child(even) {
	background:white;
}
table thead {
  background: #17a2b8;
  color: white;
  font-size: 18px;
}

</style>

<script>
  export default {
    name: 'tabla-places',
    props: {
       places: Array,
    },
  }
</script>

