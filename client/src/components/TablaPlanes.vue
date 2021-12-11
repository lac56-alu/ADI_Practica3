<template>
  <div id="tabla-planes">
    <div class="row">
      <div v-if="!plans.length" class="alert alert-info" role="alert">
        No existen planes
      </div>


            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in plans" :key="p.id">
                  <td>{{ p.name }}</td>
                  <td > <button v-on:click="mostrarDetalles(p.id)"> Ver detalles </button> </td> 
                </tr>
              </tbody>
            </table> 
            <br>
          

          <div v-if="mostrarDetallesPlan">  
            <div style="text-align: right;">
              <button id="salir" class="btn btn-info btn-md" v-on:click="ocultarDetalles()"> Ocultar Detalles </button>
            </div>
            <br>   
            <table class="table table-striped table-bordered table-hover">
              <tabla-detalles-planes :detallesPlanes="detallesPlanes"/>
            </table> 
            <br>
          </div>

  </div>
  </div>
</template>

<style>

tr:nth-child(even) {background-color: #f2f2f2;}

.table{
  margin: 0 auto;
  border-spacing: 0;
}

th {
  padding: 30px;
}

td {
  padding: 60px;
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
import authservice from '../services/auth-header';

import TablaDetallesPlanes from '@/components/TablaDetallesPlanes.vue';
export default {
  name: 'tabla-plans',
  props: {
    plans: Array,
  },
  data(){
    return{
      mostrarDetallesPlan: false,
      detallesPlanes: []
    }
  },
  components: {
    TablaDetallesPlanes
  },
  methods: {
    async mostrarDetalles(id){
      try{
        const response = await fetch('http://localhost:3000/api/plan/' + id, {
          method: 'GET',
          headers: { 'Authorization': authservice().Authorization },
        });

        var aux = await response.json();
        console.log(aux);
        this.detallesPlanes = aux['respuesta']
        if(this.detallesPlanes.length > 0){
          this.mostrarDetallesPlan = true
        }

      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
    ocultarDetalles(){
      this.mostrarDetallesPlan = false;
    }
  },
  mounted() {
    //this.mostrarDetalles();
  }
}
</script>

