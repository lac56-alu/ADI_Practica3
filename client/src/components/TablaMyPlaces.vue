<template>
  <div id="tabla-my-places" name="tabla-my-places">
    <div v-if="myplaces.length == 0" class="alert alert-info" role="alert">
      No existen lugares
    </div>
    
    <div v-if="myplaces.length != 0">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="place in myplaces" :key="place.id">
            <td>{{ place.name }}</td>
            <!-- <td> <router-link :to="{name: 'detalles', params: {id: place.id}}">  Ver detalles </router-link> </td> -->
            <td > <button v-on:click="mostrarDetalles(place.id)"> Ver detalles aqui </button> </td> 
            <td> <button> <router-link :to="{name: 'eliminar', params: {id: place.id}}" style="color: black">  Eliminar </router-link>  </button> </td>
            <td> <button> <router-link :to="{name: 'modificar', params: {id: place.id}}" style="color: black">  Modificar </router-link> </button> </td>

          </tr>
        </tbody>
      </table>
      <br>
      
      <div v-if="mostrarMyPlaces">
        <div style="text-align: right;"> <button class="btn btn-info btn-md" id="botonX" v-on:click="ocultarDetalles"> Ocultar Detalles </button> </div>
        <br>
        <div class="card" style="margin: 0 auto; width: 18rem;">
          <div class="card-body" v-for="d in detalles" :key="d.id">
            <h5 class="card-title">{{ d.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ d.city }} </h6>
            <p class="card-text"> {{ d.description }} </p>
            <p class="card-text"> {{ d.address }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authservice from '../services/auth-header';

export default {
  name: 'tabla-my-places',
  props: {
    myplaces: Array,
  },
  data(){
    return{
      detalles: [],
      mostrarMyPlaces: false,
    }
  },
  methods: {
    async mostrarDetalles(id){
      try{
        var idPlace = id
        const response = await fetch('http://localhost:3000/api/place/' + idPlace, {
          method: 'GET',
          headers: { 'Authorization': authservice().Authorization },
        });

        var aux = await response.json();
        console.log(aux);
        this.detalles = aux['respuesta']
        console.log(this.myplaces)
        this.visibleDetalles = true;
        console.log(this.visible)
        this.mostrarMyPlaces = true;
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
    ocultarDetalles(){
      this.mostrarMyPlaces = false;
    }
  },
  mounted() {
    //this.mostrarDetalles();
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
