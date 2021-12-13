
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">>

    <div class="container">
  
        <h1 id="texto">Lista de lugares creados por mi:</h1> <br>

        <div v-if="!mostrarTabla" class="alert alert-info" role="alert">
          No existen lugares
        </div>

        <div class="row" v-if="mostrarTabla">

          <table id="table" class="table">
            <tabla-my-places :myplaces="myplaces"/>
          </table>

        </div>

    </div>

  </div>

</template>


<script>
import TablaMyPlaces from '@/components/TablaMyPlaces.vue';
import authservice from '../services/auth-header';

export default {

  data(){
    return{
      myplaces: [],
      mostrarTabla: false
    }
  },

  components: {
    TablaMyPlaces
  },
  
  async created() {
    try{
        /*console.log(localStorage)
        var u = JSON.parse(localStorage.getItem('user'));
        console.log("MISSSS PLANEEESSS")
        console.log(u.token)
        var tokenBearer = 'Bearer ' + u.token;*/
        const response = await fetch('http://localhost:3000/api/mi/place', {
          method: 'GET',
          headers: { 'Authorization': authservice().Authorization },
        });

        var aux = await response.json();
        console.log(aux);
        this.myplaces = aux['respuesta']
        console.log(this.myplaces)
        if(this.myplaces != "Error"){
          this.mostrarTabla = true;
        }

      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
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



         
