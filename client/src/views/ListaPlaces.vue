<template>
  <div>
    <div>
      <nav>
        <ul>
          <li><a href="/#/login">Login</a></li>
          <li><a href="/#/register">Registro</a></li>
        </ul>
      </nav>
    </div>

    <h1>Lista de los lugares:</h1>
    
    <div class="row">
      <div class="col-md-12">
        <tabla-places :places="places"/>
      </div>
    </div>
  </div>

</template>



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
nav a{
    text-decoration:none;
    color:inherit;
    font-size:14px;
    } 
    nav li{
    display:inline-block;
    width:10%;
    padding:5px 10px;
    background-color:#000;
    border:1px solid #000;
    text-align:center;
    color:#fff;
    }
    nav li:hover{
    background-color:#fff;
    color:#000;
    }

</style>

         
