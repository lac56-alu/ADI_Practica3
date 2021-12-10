<template>
  <div id="tabla-my-places" name="tabla-my-places">
    <div v-if="!myplaces.length" class="alert alert-info" role="alert">
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
        <tr v-for="place in myplaces" :key="place.id">
          <td>{{ place.id }}</td>
          <td>{{ place.name }}</td>
          <!-- <td> <router-link :to="{name: 'detalles', params: {id: place.id}}">  Ver detalles </router-link> </td> -->
          <td > <button v-on:click="mostrarDetalles(place.id)"> Ver detalles aqui </button> </td> 
          <td> <button> <router-link :to="{name: 'eliminar', params: {id: place.id}}" style="color: black">  Eliminar </router-link>  </button> </td>
          <td> <button> <router-link :to="{name: 'modificar', params: {id: place.id}}" style="color: black">  Modificar </router-link> </button> </td>

        </tr>
      </tbody>
    </table>
    <br>
    {{ this.visibleDetalles }}
    
    <div v-if="visibleDetalles">
      <div class="card" style="width: 18rem;">
        <div class="card-body" v-for="d in detalles" :key="d.id">
          <h5 class="card-title">{{ d.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ d.city }} </h6>
          <p class="card-text"> {{ d.description }} </p>
          <a href="#" class="card-link"> {{ d.address }} </a>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'tabla-my-places',
  props: {
    myplaces: Array,
  },
  data(){
    return{
      visibleDetalles: false,
      detalles: []
    }
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
        this.toggleVisible();
        console.log(this.visible)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
    toggleVisible(){
      if(this.visibleDetalles == true){
        this.visibleDetalles = false;
      }
      else{
        this.visibleDetalles = true;
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
