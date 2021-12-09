
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<template>
    <div id="login">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

        <h3 class="text-center text-white pt-5">Login</h3>
        <div class="container" id="transicion-1">

        <transition name="slide-fade">

            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form" name="form" @submit.prevent="loginUser">
                            <h3 class="text-center text-info">Login</h3>
                            <div class="form-group">
                                <label for="username" class="text-info">Username:</label><br>
                                <input class="form-control" v-model="captarUserName" type="text" name="userName" required placeholder="userName" id="username">
                                 <!-- CONTROL DE ERRORES -> TEXTO EN ROJO -->
            
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br>
                                <input class="form-control" v-model="captarPassword" type="password" name="password" required placeholder="password" id="password" >
                                 <!-- CONTROL DE ERRORES -> TEXTO EN ROJO -->
                            </div>
                            <div class="form-group">
                                <button type="submit" name="submit" class="btn btn-info btn-md" value="Login" >
                                    Login
                                </button>
                                    
                            </div>
                        </form>

                        <div class="form-group">
                            <div v-if="mensaje" class="alert alert-danger" role="alert">{{mensaje}}</div>
                        </div>
                    </div>
                </div>
            </div>

        </transition>

        </div>        
    </div>
</template>

<script>
    import { login } from '../services/UserService';
    import User from '../models/user';

    export default {
        name: 'Login',
        data() {
            return{
                user: new User(),
                captarUserName: '',
                captarPassword: '',
                mensaje: ''
            }
        },
        computed:{
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        created() {
            if (this.loggedIn) {
                this.$router.push({path: 'myplaces'});
            }
        },
        methods: {       
            loginUser() {
                /*login(this.captarUserName, this.captarPassword).then(response => {
                    if(response.token){
                        this.registrado = true
                        this.token = response.token 
                        //console.log(response)
                        localStorage.user = this.captarUserName;
                        localStorage.token = response.token;
                        this.user = new User(response.user[0], response.token)
                        localStorage.registrado = true;
                        //console.log(localStorage.user)
                        //console.log(this.$router)
                        this.$router.push({path: 'myplaces'});
                        
                    }
                    else{
                        console.log("no token")
                    } 
                });*/
                if (this.captarUserName && this.captarPassword) {
                    var captados = [];
                    captados.push(this.captarUserName);
                    captados.push(this.captarPassword);

                    this.$store.dispatch('auth/login', captados).then(
                        () => {
                        this.$router.push({path: 'myplaces'});
                        },
                        error => {
                        this.loading = false;
                        this.mensaje = "Datos incorrectos"
                        }
                    );
                }
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

/* Las animaciones de entrada y salida pueden usar */
/* funciones de espera y duración diferentes.      */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
