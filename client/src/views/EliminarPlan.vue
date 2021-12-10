
<template>
  <div>


    <div class="container">
  
        <h1 id="texto"> ¿Desea eliminar el plan selecionado? </h1> <br>
        
        <div class="row">
          <br>
          <button id="delete_yes" v-on:click="deletePlan">  SÍ </button>
          <router-link to="/myplans" id = "delete_no" tag="button"> NO </router-link>
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
  
  methods:{
    async deletePlan(){
      try{
        console.log(localStorage)
        var tokenBearer = 'Bearer ' + localStorage.token;
        var idPlace = this.$route.params.id
        const response = await fetch('http://localhost:3000/api/plan/' + idPlace, {
          method: 'DELETE',
          headers: { 'Authorization': tokenBearer },
        });

        var aux = await response.json();
        console.log(aux);
        this.detalles = aux['respuesta']
        this.$router.push({path: 'myplans'}); ////////////////////////////// redirige mal 
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
  },

  mounted() {
      this.deletePlan()

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



         
