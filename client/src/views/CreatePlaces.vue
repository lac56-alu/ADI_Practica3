
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
                            <select for="category" name="category">
                                <option v-for="cat in categories" :key="cat.id">
                                    {{ cat.name }}
                                </option>
                            </select>
                            <br><br>

                            <label for="name" class="text-info">Nombre:  </label>
                            <input class="form-control" type="text" id="name" name="name" v-model="name">
                            <br>

                            <label for="description" class="text-info">Descripcion:  </label>
                            <textarea class="form-control" type="text" rows="3" id="description" name="description" v-model="description"></textarea>
                            <br>
                        
                            <label for="adress" class="text-info">Dirección:  </label>
                            <input class="form-control" type="text" id="adress" name="adress" v-model="adress">
                            <br>

                            <label for="city" class="text-info">Ciudad:  </label>
                            <input class="form-control" type="text" id="city" name="city" v-model="city">
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
    import { getCategory } from '../services/CategoryService';

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
        created(){
            var response = getCategory();
            console.log("CATEGORIAS")
            console.log(response)
            

        },
        methods: { 
            createPlaces(){
                this.getCategoryFor();
            }
        }
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
