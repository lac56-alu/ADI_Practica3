<template>
  <div id="tabla-categorias" name="tabla-categorias">
    <div v-if="!categories.length" class="alert alert-info" role="alert">
      No existen categorías
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in categories" :key="c.id">
          <td class="transformacion3">{{ c.type }}</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'tabla-categorias',
    props: {
       categories: Array,
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

.transformacion3 { text-transform: uppercase;} 


</style>
