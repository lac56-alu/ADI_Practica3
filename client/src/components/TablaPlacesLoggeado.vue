<template>
  <div id="tabla-places-loggeado" name="tabla-places-loggeado">
    <div v-if="!places.length" class="alert alert-info" role="alert">
      No existen lugares
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="place in places" :key="place.id">
          <td>{{ place.id }}</td>
          <td>{{ place.name }}</td>
          <td > <button v-on:click="mostrarDetalles(place.id)"> Ver detalles aqui </button> </td> 
          <td> <button> <router-link :to="{name: 'eliminar', params: {id: place.id}}" style="color: black">  Eliminar </router-link>  </button> </td>
          <td> <button> <router-link :to="{name: 'modificar', params: {id: place.id}}" style="color: black">  Modificar </router-link> </button> </td>

        </tr>
      </tbody>
    </table>
    <br> 

    <div>     
        <table v-if="visible == true" id="table" class="table table-striped table-bordered table-hover">
          <tabla-detalles :detalles="detalles"/>
        </table> <br>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tabla-places-loggeado',
  props: {
    places: Array,
  },
  data(){
    return{
      detalles: [],
      visibleDetalles: '',
    }
  },
  created(){
    this.visibleDetalles = false;
  },
  methods: {
    async mostrarDetalles(id){
      try{
        console.log(localStorage)
        var tokenBearer = 'Bearer ' + localStorage.token;
        console.log("AQUIIII:")
        console.log(id)
        var idPlace = id
        const response = await fetch('http://localhost:3000/api/place/' + idPlace, {
          method: 'GET',
          headers: { 'Authorization': tokenBearer },
        });

        var aux = await response.json();
        console.log(aux);
        this.detalles = aux['respuesta']
        console.log(this.myplaces)
        this.visibleDetalles = true;
        console.log(this.visible)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    }
  },
  mounted() {
    this.mostrarDetalles();
  }
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
