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
import { getPlacesByCategory } from '../services/CategoryService';

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
    async getPlacesCat(){
      console.log("PRUEBA LUIIIIIIIIIS")
      console.log(this.$route.params.id)
      
      console.log("RESPUESTA")
      var p = await getPlacesByCategory(this.$route.params.id)
      console.log(p)
      this.place_c = p;
      console.log("FIINAAAAAAAAAAAAALLL")
      console.log(this.place_c)
    }
  },
  mounted(){
    this.getPlacesCat()
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



         
