
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<template>
    <div id="createPlaces">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form2" class="form" name="form" @submit.prevent="updatePlace">
                            <h3 class="text-center text-info">Modificar Lugar</h3>
                            
                            <label for="category" class="text-info">Categoria:  </label><br>
                            <select id="selectCategory" for="selectCategory" name="selectCategory">
                                <option v-for="cat in this.categories" :key="cat['id']">
                                    {{ cat['type'] }}
                                </option>
                            </select>
                            <br><br>

                            <label for="name" class="text-info">Nombre:  </label>
                            <input id="nameChange" class="form-control" type="text" name="name" required v-bind:value="this.detalles[0].name">
                            <br>

                            <label for="description" class="text-info">Descripcion:  </label>
                            <textarea class="form-control" type="text" rows="3" id="descriptionChange" 
                            name="description" required v-bind:value="this.detalles[0].description"></textarea>
                            <br>
                        
                            <label for="address" class="text-info">Dirección:  </label>
                            <input class="form-control" type="text" id="addressChange" name="address" required v-bind:value="this.detalles[0].address">
                            <br>

                            <label for="city" class="text-info">Ciudad:  </label>
                            <input class="form-control" type="text" id="cityChange" name="city" required v-bind:value="this.detalles[0].city">
                            <br>
                            
                            
                            <div style="text-align: center;"><button id="but_reg" class="btn btn-info btn-md" type="submit" value="Modificar"> Modificar </button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { getCategory, getIdCategory } from '../services/CategoryService';
import authservice from '../services/auth-header';

export default {

  data(){
    return{
      detalles: [],
      categories: '',
      userID: '',
      name: '',
      description: '',
      address: '',
      city: '',
      categoryID: '',
    }
  },
  async created() {
    this.getDetalles();
    var cat = await getCategory();
    this.categories = cat
    console.log(this.categories);
  },

  methods:{
    async updatePlace(){
      try{
        this.name = document.getElementById("nameChange").value;
        this.description = document.getElementById("descriptionChange").value;
        this.address = document.getElementById("addressChange").value;
        this.city = document.getElementById("cityChange").value;
        this.categoryID = getIdCategory(this.categories, document.getElementById("selectCategory").value)
        var idPlace = this.$route.params.id

        const response = await fetch('http://localhost:3000/api/modify/place/' + idPlace, {
          method: 'PUT',
          headers: { 
            'Authorization': authservice().Authorization, 
            'Access-Control-Request-Headers': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: this.name,
              description: this.description,
              city: this.city,
              address: this.address,
              category_id: this.categoryID
          }),
        });
        
        console.log(response)
        var aux = await response.json();
        
        console.log("REPUESTAAAAAAA")
        console.log(aux)
        this.$router.push("/myplaces");

      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    },
    async getDetalles(){
      try{
        console.log("AQUIIII:")
        var idPlace = this.$route.params.id
        const response = await fetch('http://localhost:3000/api/place/' + idPlace, {
          method: 'GET',
          headers: { 'Authorization': authservice().Authorization },
        });

        var aux = await response.json();
        console.log(aux);
        this.detalles = aux['respuesta']
        console.log("QUIEEEEEEEEEEEEEEEROOOOOOOOOOO ESTOOOOOOOOOOOOOOOOOOOOO")
        console.log(this.detalles)
      }catch (error)  {
        //En ese caso, no mostrar la vista!!!!!!!!!!!
        console.error(error);
      }
    }   
  }
}

   
</script>

<style scoped>

#login .container #login-row #login-column #login-box {
  margin-top: 10px;
  max-width: 600px;
  height: 320px;
  background-color: #EAEAEA;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -85px;
}

</style>
