
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<template>
  <div>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">>

    <div class="container">
  
        <h1 id="texto">Categorías: </h1> <br>
        
        <div class="row">

          <table id="table" class="table table-striped table-bordered table-hover">
            <tabla-categorias :categories="categories"/>
          </table>

        </div>

    </div>

  </div>

</template>


<script>
import { getCategory } from '../services/CategoryService';
import TablaCategorias from '@/components/TablaCategorias.vue';
export default {

  data(){
    return{
      categories: []
    }
  },

  components: {
    TablaCategorias
  },
  
  methods:{
    async getCategories(){
      try{
        this.categories = await getCategory()
        console.log(this.categories)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
  },

  mounted() {
      this.getCategories()

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



         
