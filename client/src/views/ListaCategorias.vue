
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <div class="container">
  
      <h1 id="texto"> Categorías: </h1> <br>
      
      <div class="row">

        <!-- <table id="table" class="table table-striped table-bordered table-hover">
          <tabla-categorias :categories="categories"/>
        </table> -->
        
        <th v-for="c in categories" :key="c.id">
          <button class="btn btn-info btn-md" v-on:click="mostrarCategoria(c.id)"> {{ c.type }}</button>   
        </th>
      
      </div>

      <br>
      <div v-if="visible == true">
        <button class="btn btn-info btn-md" id="botonX" v-on:click="ocultarPlaces"> X </button> <br>

        <br> <div id="no_existen" v-if="!places_c.length" class="alert alert-info" role="alert">
          No existen lugares de esta categoría
        </div> <br>

        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th> </th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="p in places_c" :key="p.id">
              <td>{{ p.id }}</td>
              <td>{{ p.name }}</td>
              <td > <button v-on:click="mostrarDetalles(p.id)"> Ver detalles aqui </button> </td> 
            </tr>
          </tbody>

        </table> <br>

        <div v-if="visible == true">     
        <table id="table" class="table table-striped table-bordered table-hover">
          <tabla-detalles :detalles="detalles"/>
        </table> <br>
    </div>

      </div>
    </div>

  </div>
  
</template>


<script>

import TablaDetalles from '@/components/TablaDetalles.vue';
import { getCategory, getPlacesByCategory } from '../services/CategoryService';

export default {
  

  data(){
    return{
      categories: [],
      places_c: [],
      visible: false,
      detalles: []
    }
  },
  components: {
    TablaDetalles
  },

  methods:{
    async getCategories(){
      try{
        this.categories = await getCategory()
        console.log(this.categories)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
    async mostrarCategoria(id){
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
      
      this.visible = true;
    },
    ocultarPlaces(){
      this.visible = false;
    },
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
        this.visible = true;
        console.log(this.visible)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    }
  },

  mounted() {
    this.getCategories(),
    this.mostrarDetalles();

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



         
