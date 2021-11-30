<template>
  <div id="tabla-detalles" name="tabla-detalles">
    <div v-if="!detalles.length" class="alert alert-info" role="alert">
      No existe informacion del lugar
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Descripcion </th>
          <th>Ciudad </th>
          <th> Dirección </th>
          <th> Categoria </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in detalles" :key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.name }}</td>
          <td>{{ d.description }}  </td>
          <td> {{ d.city }}</td>
          <td> {{ d.address }}  </td>
          <td> {{d.category_id}} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'tabla-detalles',
    props: {
       detalles: Array,
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
