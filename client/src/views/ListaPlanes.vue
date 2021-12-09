 <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <div class="container" style="">
  
        <h3 id="texto">Descubre los mejores planes: </h3> <br>
        
        <div class="row">

          <table id="table" class="table table-striped table-bordered table-hover">
            <tabla-planes :plans="plans"/>
          </table>

        </div>

    </div>
  </div>

</template>


    <script src="https://unpkg.com/vue@2.5.17/dist/vue.min.js"> </script>

<script>
import TablaPlanes from '@/components/TablaPlanes.vue';
export default {

  data(){
    return{
      plans: []
    }
  },

  components: {
    TablaPlanes,
  },
  
  methods:{
    async getAllPlans(){
      try{
        const response = await fetch('http://localhost:3000/api/plan');
        
        var aux = await response.json();
        console.log(aux)
        this.plans = aux['respuesta']['data']
        console.log(aux['respuesta']['data'])
      } catch (error) {
          console.error(error);
      }
    },
  },

  mounted(){
    this.getAllPlans()
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



         
