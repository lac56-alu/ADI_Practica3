
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">>

    <div class="container">
  
        <h1 id="texto">Lista de todos los lugares:</h1> <br>

        <div class="row">

          <table id="table" class="table">
            <tabla-places-loggeado :places="places"/>
          </table>

        </div>

    </div>

  </div>

</template>


<script>
import TablaPlacesLoggeado from '@/components/TablaPlacesLoggeado.vue';

export default {

  data(){
    return{
      places: []
    }
  },

  components: {
    TablaPlacesLoggeado
  },
  
  methods:{
    async getAllPlaces(){
      try{
        const response = await fetch('http://localhost:3000/api/place');
        //console.log(response.json())
        var aux = await response.json();
        this.places = aux['respuesta']['data']
        console.log(aux['respuesta']['data'])
        //this.places =  await response.json();
      } catch (error) {
          console.error(error);
      }
    },
  },


  mounted() {
    this.getAllPlaces()
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



         
