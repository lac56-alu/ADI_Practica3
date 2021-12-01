
<template>
  <div>


    <div class="container">
  
        <h1 id="texto"> ¿Desea eliminar el lugar selecionado? </h1> <br>
        
        <div class="row">
          <br>
          <button id="delete_yes">  SÍ </button>
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





  },

  mounted() {
      //this.getDetalles()

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



         
