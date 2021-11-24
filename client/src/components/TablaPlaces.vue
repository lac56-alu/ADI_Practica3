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
    border-spacing: 10px;
}

#th {
    text-align: center; 
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

