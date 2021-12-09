<template>
  <div id="tabla-detalles-planes" name="tabla-detalles-planes">
    <div v-if="!detallesPlanes.length" class="alert alert-info" role="alert">
      No existe informacion del lugar
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Descripcion </th>
          <th>Usuario </th>
          <th>Lugar </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in detallesPlanes" :key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.name }}</td>
          <td>{{ d.description }}  </td>
          <td> {{ d.user_id }}</td>
          <td> {{ d.place_id }}  </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'tabla-detalles-planes',
    props: {
       detallesPlanes: Array,
    },
    
  }
</script>

<style>

.table{
    margin: 0 auto;
    border-spacing: 0;
}

th {
  padding: 30px;
}

td {
  padding: 30px;
}

tr:nth-child(even) {background-color: #f2f2f2;}


</style>
