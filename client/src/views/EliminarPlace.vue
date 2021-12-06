
<template>
  <div>


    <div class="container">
  
        <h1 id="texto"> ¿Desea eliminar el lugar selecionado? </h1> <br>
        
        <div class="row">
          <br>
          <button id="delete_yes" v-on:click="deletePlace">  SÍ </button>
          <router-link to="/myplaces" id = "delete_no" tag="button"> NO </router-link>
        </div>

    </div>

  </div>

</template>


<script>
export default {

  data(){
    return{
      detalles: []
    }
  },

  components: {
      
  },
  
  methods:{

      async deletePlace(){
      try{
        console.log(localStorage)
        var tokenBearer = 'Bearer ' + localStorage.token;
        var idPlace = this.$route.params.id
        const response = await fetch('http://localhost:3000/api/place/' + idPlace, {
          method: 'DELETE',
          headers: { 'Authorization': tokenBearer },
        });

        var aux = await response.json();
        console.log(aux);
        this.detalles = aux['respuesta']
        console.log(this.myplaces)
        this.$router.push({path: 'myplaces'}); ////////////////////////////// redirige mal 
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },

  },

  mounted() {
      this.deletePlace()

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

#delete_yes{
    width: 80px;
    height: 50px;
     margin-right: 100px;
}

#delete_no{
    width: 80px;
    height: 50px;
     margin-left: 100;
}

</style>



         
