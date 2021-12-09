
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">>

    <div class="container">
  
        <h1 id="texto">Ver detalles: </h1> <br>
        
        <div class="row">

          <table id="table" class="table table-striped table-bordered table-hover">
            <tabla-detalles :detalles="detalles"/>
          </table> <br>
        </div>

    </div>

        <button> <router-link to="/myplaces">Volver</router-link> </button>
  </div>

</template>


<script>
import TablaDetalles from '@/components/TablaDetalles.vue';
export default {

  data(){
    return{
      detalles: []
    }
  },

  components: {
    TablaDetalles
  },
  
  methods:{
    async getDetalles(){
      try{
        console.log(localStorage)
        var tokenBearer = 'Bearer ' + localStorage.token;
        console.log("AQUIIII:")
        var idPlace = this.$route.params.id
        const response = await fetch('http://localhost:3000/api/place/' + idPlace, {
          method: 'GET',
          headers: { 'Authorization': tokenBearer },
        });

        var aux = await response.json();
        console.log(aux);
        this.detalles = aux['respuesta']
        console.log(this.myplaces)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
  },

  mounted() {
      this.getDetalles()

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



         
