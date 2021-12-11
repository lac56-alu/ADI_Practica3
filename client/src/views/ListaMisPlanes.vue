
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">>

    <div class="container">
  
        <h1 id="texto">Planes creados por mi:</h1> <br>

        <div class="row">

          <table id="table" class="table">
            <div id="tabla-my-plans" name="tabla-my-plans">
              <div v-if="!mostrarPlans" class="alert alert-info" role="alert">
                No existen planes
              </div>
              <table v-if="mostrarPlans" class="table">
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

              <div v-if="visiblePlansDetalles">  
                <div style="text-align: right;"> <button class="btn btn-info btn-md" id="botonX" v-on:click="ocultarDetalles"> Ocultar Detalles </button> </div> <br>   
                <table id="table" class="table table-striped table-bordered table-hover">
                  <tabla-detalles-planes :detallesPlanes="detallesPlanes"/>
                </table> <br>
              </div>
            </div>
            
          </table>

        </div>

    </div>

  </div>

</template>


<script>
import TablaDetallesPlanes from '@/components/TablaDetallesPlanes.vue';
import authservice from '../services/auth-header';
import axios from 'axios';

export default {

  data(){
    return{
      myplans: [],
      detallesPlanes: [],
      mostrarPlans: false,
      visiblePlansDetalles: false
    }
  },

  components: {
    TablaDetallesPlanes
  },
  async created(){
    const response = await axios
    .get('http://localhost:3000/api/mi/plan', 
    {
      headers:{
        'Authorization': authservice().Authorization
      } 
    })
    .then(response => {
      this.myplans = response.data.respuesta
      console.log("REPUESTAAAAAAA")
      console.log(this.myplans)
    })
    .catch((error) => {
      console.error(error)
    });

    if(this.myplans.length > 0){
      this.mostrarPlans = true
    }

  },
  
  methods:{
    async mostrarDetalles(id){
      try{
        const response = await fetch('http://localhost:3000/api/place/' + id, {
          method: 'GET',
          headers: { 'Authorization': authservice().Authorization },
        });
        var aux = await response.json();
        this.detallesPlanes = aux['respuesta']

        this.visiblePlansDetalles = true;
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
    ocultarDetalles(){
      this.visiblePlansDetalles = false
    }
  },

  mounted() {
    //this.getMyPlans()
  }
}

</script>

<style scoped>

#texto{
  color: #17a2b8;
  font-weight:400;
}
#table{
  width: 80%;
}

</style>



         
