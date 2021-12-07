
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<template>
    <div id="createPlaces">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form2" class="form" name="form" @submit.prevent="createPlaces">
                            <h3 class="text-center text-info">Crear Lugar</h3>
                            
                            <label for="category" class="text-info">Categoria:  </label><br>
                            <select id="selectCategory" for="selectCategory" name="selectCategory">
                                <option v-for="cat in this.categories" :key="cat['id']">
                                    {{ cat['type'] }}
                                </option>
                            </select>
                            <br><br>

                            <label for="name" class="text-info">Nombre:  </label>
                            <input class="form-control" type="text" id="name" name="name" v-model="name" required placeholder="Nombre">
                            <br>

                            <label for="description" class="text-info">Descripcion:  </label>
                            <textarea class="form-control" type="text" rows="3" id="description" 
                            name="description" v-model="description" required placeholder="Descripcion breve"></textarea>
                            <br>
                        
                            <label for="adress" class="text-info">Dirección:  </label>
                            <input class="form-control" type="text" id="adress" name="adress" v-model="adress" required placeholder="Dirección">
                            <br>

                            <label for="city" class="text-info">Ciudad:  </label>
                            <input class="form-control" type="text" id="city" name="city" v-model="city" required placeholder="Ciudad">
                            <br>
                            
                            <div style="text-align: center;"><button id="but_reg" class="btn btn-info btn-md" type="submit" value="Crear"> Crear </button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { getCategory, getIdCategory } from '../services/CategoryService';
    import { createPlace } from '../services/PlacesService';

    export default {
        data() {
            return{
                categories: '',
                place: [],
                userID: '',
                name: '',
                description: '',
                adress: '',
                city: '',
                categoryID: '',
            }
        },
        async created() {
            var cat = await getCategory();
            this.categories = cat
            console.log(this.categories)
        },
        methods: { 
            async createPlaces(){
                this.name = document.getElementById("name").value;
                this.description = document.getElementById("description").value;
                this.adress = document.getElementById("adress").value;
                this.city = document.getElementById("city").value;
                this.categoryID = getIdCategory(this.categories, document.getElementById("selectCategory").value)

                try{
                    var response = await createPlace(this.name, this.description, this.adress, this.city, this.categoryID);
                    console.log("RESPUESTA POST")
                    console.log(response)
                    this.$router.push({path: 'myplaces'});
                }
                catch(error){
                    console.log(error)
                }
                    
            }
        },
    };
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
