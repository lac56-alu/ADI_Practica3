
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<template>
  <div id="register">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form id="login-form2" class="form" name="form" @submit.prevent="register">
              <h3 class="text-center text-info">Register</h3>

              <label for="username" class="text-info">Username:  </label>
              <input class="form-control" type="text" id="userName" name="userName" required pattern="\S+" title="No se admiten espacios" v-model="userName">
              <br>

              <label for="mail" class="text-info">Email:  </label>
              <input class="form-control" type="email" id="email" name="email" required pattern="\S+" title="No se admiten espacios" v-model="email" > 
              <br>
              
              <label for="mail" class="text-info">Name:  </label>
              <input class="form-control" type="text" id="name" name="name" required pattern="\S+" title="No se admiten espacios" v-model="name">
              <br>
              
              <label for="mail" class="text-info">Lastname:  </label>
              <input class="form-control" type="text" id="lastname" name="lastname" required pattern="\S+" title="No se admiten espacios" v-model="lastname">
              <br>
              
              <label for="mail" class="text-info">City:  </label>
              <input class="form-control" type="text" id="city" name="city" required pattern="\S+" title="No se admiten espacios" v-model="city">
              <br>

              <label for="mail" class="text-info">Password:  </label>
              <input class="form-control" type="password" id="password" name="password" required pattern="\S+" title="No se admiten espacios" v-model="password">
              <br>
              
              <div style="text-align: center;"><button id="but_reg" class="btn btn-info btn-md" type="submit" value="Register"> Register </button></div> <br>


              <div v-if="mensajeMalo" class="alert alert-danger" role="alert">
                {{ this.mensajeMalo}}
              </div>


            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
export default {
  data(){
    return{
        userName: "",
        email: "",
        name: "",
        lastname: "",
        city: "",
        password: "",
        mensajeMalo: ""
    }
  },
  methods: {
    async register() {
        try {
            const response = await fetch('http://localhost:3000/api/user/registro', {
                method: 'POST',
                body: JSON.stringify({
                    userName: this.userName,
                    name: this.name,
                    lastname: this.lastname,
                    password: this.password,
                    email: this.email,
                    city: this.city,
                    }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            });
            var aux = await response.json()
            console.log(aux)
            if(aux.respuesta == "Ya existe un usuario con ese userName registrado"){
              this.mensajeMalo ="Ya existe un usuario con ese email o nombre de usuario"
            }else{
              this.$router.push({path: 'login'});
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }
  }
};
</script>

<style scoped>


#register .container #login-form2{
  padding: 10px;

}

#register .container #but_reg{
  padding: 10px;
}



#register .container #login-row #login-column #login-box {
  margin: top -10x;
  max-width: 600px;
  height: 730px;
  background-color: #EAEAEA;
  padding: 50px;
}
#register .container #login-row #login-column #login-box #login-form {
  padding: 100px;
}
#register .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -20px;
 
}

</style>

