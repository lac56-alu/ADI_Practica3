
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">>

    <div class="container">
  
        <h1 id="texto">Lista de todos los lugares:</h1> <br>

        <table style='table-layout:fixed; width:100% height: 100%'> 
          <td id="col1">
                  <div class="row">

                    <table id="table" class="table">
                        
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <td> </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="place in places" :key="place.id">
                          <td>{{ place.name }}</td>
                          <td > <button v-on:click="mostrarDetalles(place.id)"> Ver detalles aqui </button> </td> 
                        </tr>
                      </tbody>

                    </table>

                  </div>
          </td>
          <td id="col2" v-if="visibleDetalles">
            <div style="text-align: left;"> <button class="btn btn-info btn-md" id="botonX" v-on:click="ocultarDetalles"> Ocultar Detalles </button> </div> <br>
                  <div>
                    <table id="table" class="table table-striped table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Descripcion </th>
                            <th>Ciudad </th>
                            <th> Dirección </th>
                            <th> Categoria </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="d in detalles" :key="d.id">
                            <td>{{ d.name }}</td>
                            <td>{{ d.description }}  </td>
                            <td> {{ d.city }}</td>
                            <td> {{ d.address }}  </td>
                            <td> {{d.category_id}} </td>
                          </tr>
                        </tbody>
                    </table> <br>
                  </div>
          </td>
        </table>

    </div>

  </div>

</template>


<script>

import authservice from '../services/auth-header';

export default {

  data(){
    return{
      places: [],
      visibleDetalles: false,
      detalles: []
    }
  },

  created(){
    this.visibleDetalles = false;
  },
  
  methods:{
    async getAllPlaces(){
      try{
        const response = await fetch('http://localhost:3000/api/place');
        //console.log(response.json())
        var aux = await response.json();
        this.places = aux['respuesta']['data']
        console.log(aux['respuesta']['data'])
        this.visibleDetalles = false;
        //this.places =  await response.json();
      } catch (error) {
          console.error(error);
      }
    },
    async mostrarDetalles(id){
      try{
        console.log(localStorage)
        //var tokenBearer = 'Bearer ' + localStorage.token;
        this.visibleDetalles = true;
        console.log("AQUIIII:")
        console.log(id)
        var idPlace = id
        const response = await fetch('http://localhost:3000/api/place/' + idPlace, {
          method: 'GET',
          headers: { 'Authorization': authservice().Authorization },
        });

        var aux = await response.json();
        console.log(aux);
        this.detalles = aux['respuesta']
        console.log(this.visibleDetalles)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    } ,
    ocultarDetalles(){
      this.visibleDetalles = false;
    }   
  },

  mounted() {
    this.getAllPlaces(),
    this.mostrarDetalles()
  }
}

</script>

<style scoped>

#col1{
  width: 70%;
}
#col2{
  width: 30%;
}

#texto{
  color: #17a2b8;
  font-weight:400;
}
#table{
  width: 80%;
}

</style>



         
