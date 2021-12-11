<template>
  <div id="tabla-my-plans" name="tabla-my-plans">
    <div v-if="myplans == []" class="alert alert-info" role="alert">
      No existen planes
    </div>
    <table v-if="myplans.length > 0" class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <td> </td>
          <td> </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in myplans" :key="p.id">
          <td>{{ p.name }}</td>
          <td > <button v-on:click="mostrarDetalles(p.id)"> Ver detalles </button> </td> 
          <td> <button> <router-link :to="{name: 'eliminarPlan', params: {id: p.id}}" style="color: black">  Eliminar </router-link>  </button> </td> 

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
import authservice from '../services/auth-header';

export default {
  name: 'tabla-my-plans',
  props: {
    myplans: Array,
  },
  data(){
    return{
      detalles: [],
      visibleDetalles: '',
    }
  },
  created(){

  },
  methods: {
    async mostrarDetalles(id){
      try{
        const response = await fetch('http://localhost:3000/api/place/' + id, {
          method: 'GET',
          headers: { 'Authorization': authservice().Authorization },
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
