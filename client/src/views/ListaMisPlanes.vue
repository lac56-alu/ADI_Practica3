
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
            <tabla-my-plans :myplans="myplans"/>
          </table>

        </div>

    </div>

  </div>

</template>


<script>
import TablaMyPlans from '@/components/TablaMyPlans.vue';
import authservice from '../services/auth-header';

export default {

  data(){
    return{
      myplans: []
    }
  },

  components: {
    TablaMyPlans
  },
  
  methods:{
    async getMyPlans(){
      try{
        console.log("MISSSS PLANEEESSS")
        console.log(authservice().Authorization)
        const response = await fetch('http://localhost:3000/api/mi/plan', {
          method: 'GET',
          headers: { 'Authorization': authservice().Authorization },
        });

        var aux = await response.json();
        console.log(aux);
        this.myplans = aux['respuesta']
        console.log(this.myplans)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
  },

  mounted() {
    this.getMyPlans()
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



         
