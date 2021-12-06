 <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

  <div id="todo">
    <div class="container" style="">
  
        <h3 id="texto"> Lugares de la categoría seleccionada: </h3> <br>
        
        <div class="row">

          <table id="table" class="table table-striped table-bordered table-hover">
            <tabla-places-category :places_c="places_c"/>
          </table>

        </div>

    </div>
  </div>

  </div>

</template>


    <script src="https://unpkg.com/vue@2.5.17/dist/vue.min.js"> </script>

<script>
import TablaLugaresCategoria from '@/components/TablaLugaresCategoria.vue';
export default {

  data(){
    return{
      places_c: []
    }
  },

  components: {
    TablaLugaresCategoria,
  },
  
  methods:{
    async getPlacesCategory(){
      try{
        console.log(localStorage)
        var tokenBearer = 'Bearer ' + localStorage.token;
        console.log("idCat:")
        var idCat = this.$route.params.id
        console.log(idCat)
        const response = await fetch('http://localhost:3000/api/places/category/' + idCat, {
          method: 'GET',
          headers: { 'Authorization': tokenBearer },
        });
        var aux = response.json();
        console.log(aux)
        this.places_c = aux['respuesta']
        //console.log(aux['respuesta'])
      } catch (error) {
          console.error(error);
      }
    },
  },

  mounted(){
    this.getPlacesCategory()
  }
}

</script>

<style scoped>

#todo {
  position: relative;
  top: 50px;
  left: 400px;
}

#texto{
  color: #17a2b8;
  font-weight:400;
}
#table{
  width: 500px;
}

</style>



         
