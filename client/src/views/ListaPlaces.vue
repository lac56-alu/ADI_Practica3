<template>
  <div class="about">
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

