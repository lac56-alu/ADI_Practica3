 <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

  <div>
    <h1 id="titulo"> findyourplace.com</h1>
  </div>

  <div>

    <img id="img1" src="../imagenes/rom.jpg" >
    <img id="img2" src="../imagenes/ply.jpg">
    

  </div>

  <div id="todo">
    <div class="container">
  
        <h3 id="texto">Descubre los mejores lugares: </h3> 
        
        <div class="row">

          <table id="table" class="table table-striped table-bordered table-hover">
            <tabla-places :places="places"/>
          </table>

        </div>

    </div>
  </div>

  </div>

</template>


<script src="https://unpkg.com/vue@2.5.17/dist/vue.min.js"> </script>

<script>
import TablaPlaces from '@/components/TablaPlaces.vue';
export default {

  data(){
    return{
      places: []
    }
  },

  components: {
    TablaPlaces,
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

  mounted(){
    this.getAllPlaces()
  }
}

</script>

<style scoped>

#img1{

  width: 500px;
  height: 250px;
  position: absolute;
  display: block;
  top: 200px;
  left: 150px;
}

#img2{

  width: 500px;
  height: 250px;
  position: absolute;
  display: block;
  top: 500px;
  left: 250px;
}

#titulo{
  font-style: oblique;
}

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



         
