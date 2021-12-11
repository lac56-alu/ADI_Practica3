
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<template>
    <div id="createPlaces">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form2" class="form" name="form" @submit.prevent="createPlans">
                            <h3 class="text-center text-info">Crear Plan</h3>
                            
                            <label for="category" class="text-info">Lugar:  </label><br>
                            <select id="selectPlace" for="selectPlace" name="selectPlace">
                                <option v-for="pl in this.places" :key="pl['id']">
                                    {{ pl['name'] }}
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
                            
                            <div style="text-align: center;"><button id="but_reg" class="btn btn-info btn-md" type="submit" value="Crear"> Crear </button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { getPlace, getIdPlace } from '../services/PlacesService';
    import { createPlan } from '../services/PlanService';

    export default {
        data() {
            return{
                places:'',
                plan: [],
                userID: '',
                name: '',
                description: '',
                placeID: '',
            }
        },
        async created() {
            var pl = await getPlace();
            this.places = pl
            console.log(this.places)
        },
        methods: { 
            async createPlans(){
                this.name = document.getElementById("name").value;
                this.description = document.getElementById("description").value;
                this.placeID = getIdPlace(this.places, document.getElementById("selectPlace").value)

                try{
                    var response = await createPlan(this.name, this.description, this.categoryID);
                    console.log("RESPUESTA POST")
                    console.log(response)
                    this.$router.push({path: 'myplans'});
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
