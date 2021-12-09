<template>
  <div id="tabla-planes">
    <div v-if="!plans.length" class="alert alert-info" role="alert">
      No existen planes
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in plans" :key="p.id">
          <td>{{ p.name }}</td>
          <td > <button v-on:click="mostrarDetalles(p.id)"> Ver detalles aqui </button> </td> 

        </tr>
      </tbody>
    </table> <br>

        <div v-if="visible == true">     
        <table id="table" class="table table-striped table-bordered table-hover">
          <tabla-detalles-planes :detalles="detalles"/>
        </table> <br>
    </div>

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

import TablaDetallesPlanes from '@/components/TablaDetallesPlanes.vue';
  export default {
    name: 'tabla-plans',
    props: {
       plans: Array,
    },
    data(){
        return{
          visible: false,
          detalles: []
        }
  },
    components: {
    TablaDetallesPlanes
  },
    methods: {
      async mostrarDetalles(id){
      try{
        console.log(localStorage)
        var tokenBearer = 'Bearer ' + localStorage.token;
        console.log("AQUIIII:")
        console.log(id)
        var idPlan = id
        const response = await fetch('http://localhost:3000/api/plan/' + idPlan, {
          method: 'GET',
          headers: { 'Authorization': tokenBearer },
        });

        var aux = await response.json();
        console.log(aux);
        this.detalles = aux['respuesta']
        this.visible = true;
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

