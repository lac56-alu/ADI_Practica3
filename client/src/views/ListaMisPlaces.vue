<template>
  <div>
    <div>
      <nav>
        <ul>
          <li><a href="/#/places">Ver todos los lugares</a></li>
          <li><a href="#">Mi perfil</a></li>
        </ul>
      </nav>
    </div>

    <h1>Lista de mis lugares:</h1>
    
    <div class="row">
      <div class="col-md-12">
        <tabla-my-places :myplaces="myplaces"/>
      </div>
    </div>
  </div>

</template>



<script>
import TablaMyPlaces from '@/components/TablaMyPlaces.vue';
export default {

  data(){
    return{
      myplaces: []
    }
  },

  components: {
    TablaMyPlaces
  },
  
  methods:{
    async getMyPlaces(){
      try{
        console.log(localStorage)
        var tokenBearer = 'Bearer ' + localStorage.token;
        const response = await fetch('http://localhost:3000/api/mi/place', {
          method: 'GET',
          headers: { 'Authorization': tokenBearer },
        });

        var aux = await response.json();
        console.log(aux);
        this.myplaces = aux['respuesta']
        console.log(this.myplaces)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
  },

  mounted() {
      this.getMyPlaces()

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



         
