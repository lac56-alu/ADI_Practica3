
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <div class="container">
  
      <h1 id="texto"> Categorías: </h1> <br>
      
      <div >

        <!-- <table id="table" class="table table-striped table-bordered table-hover">
          <tabla-categorias :categories="categories"/>
        </table> -->
        
        <th v-for="c in categories" :key="c.id" style="margin: 0 auto;">
          <button class="btn btn-info btn-md" v-on:click="mostrarCategoria(c.id)"> {{ c.type }}</button>   
        </th>
      
      </div>

      <br>
      <div v-if="visibleCategorias == true">
        <div style="text-align: right;"> <button class="btn btn-info btn-md" id="botonX" v-on:click="ocultarPlaces"> Ocultar Lugares </button> </div>

        <br> 
        <div id="no_existen" v-if="!mostrarPlaces" class="alert alert-info" role="alert">
          No existen lugares de esta categoría
        </div> 
        <br>
        
        <div v-if="mostrarPlaces">
          <table class="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th> </th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for="p in places_c" :key="p.id">
                <td>{{ p.name }}</td>
                <td > <button v-on:click="showDetalles(p.id)"> Ver detalles aqui </button> </td> 
              </tr>
            </tbody>
          </table>

          <br>

          <div v-if="mostrarDetalles"> 
            <div style="text-align: right;"> <button class="btn btn-info btn-md" id="botonX" v-on:click="ocultarDetalles"> Ocultar Detalles </button> </div>

            <br>

            <table id="table" class="table table-striped table-bordered table-hover">
              <tabla-detalles :detalles="detalles"/>
            </table>
          </div>
          <br>


        </div>

      </div>
    </div>

  </div>
  
</template>


<script>

import TablaDetalles from '@/components/TablaDetalles.vue';
import { getCategory, getPlacesByCategory } from '../services/CategoryService';
import authservice from '../services/auth-header';

export default {
  data(){
    return{
      categories: [],
      places_c: [],
      visibleCategorias: false,
      mostrarPlaces: false,
      mostrarDetalles: false,
      detalles: []
    }
  },
  components: {
    TablaDetalles
  },
  async created(){
    try{
      this.categories = await getCategory()
      console.log(this.categories)
    }catch (error)  {
      //En ese caso, no mostrar la vista!!!!!!!!!!!
      console.error(error);
    }
  },
  methods:{
    async mostrarCategoria(id){
      if(this.mostrarPlaces){
        this.ocultarPlaces();
      }

      console.log("PRUEBA LUIIIIIIIIIS")
      console.log(id)
      
      console.log("RESPUESTA")
      await getPlacesByCategory(id).then(
        resp => {
          if(resp.respuesta == "Error"){
            this.places_c = []
          }
          else{
            this.places_c = resp.respuesta
            console.log(resp)
          }
      })
      console.log("FIINAAAAAAAAAAAAALLL")
      console.log(this.places_c)
      if(this.places_c.length > 0){
        this.mostrarPlaces = true
      }

      this.mostrarDetalles = false;
      this.visibleCategorias = true;
    },
    async showDetalles(id){
      if(this.mostrarDetalles){
        this.ocultarDetalles();
      }

      try{
        //var tokenBearer = 'Bearer ' + localStorage.token;
        console.log("AQUIIII:")
        var idPlace = id
        const response = await fetch('http://localhost:3000/api/place/' + idPlace, {
          method: 'GET',
          headers: { 'Authorization': authservice().Authorization },
        });

        var aux = await response.json();
        console.log(aux);
        this.detalles = aux['respuesta']
        this.mostrarDetalles = true;
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
    ocultarPlaces(){
      this.mostrarPlaces = false,
      this.mostrarDetalles = false,
      this.visibleCategorias = false;
    },
    ocultarDetalles(){
      this.mostrarDetalles = false;
    }
  },

  mounted() {
    //this.mostrarDetalles();

  }
}

</script>

<style scoped>

#no_existen{
  background-color: rgb(248, 205, 201);
  border-color: rgb(248, 205, 201);
}

#botonX{
  background-color: rgb(3, 104, 104);
}

#texto{
  color: #17a2b8;
  font-weight:400;
}
#table{
  width: 80%;
}

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



         
