<template>
  <div class="login">
    <h1 class="title">Login in the page</h1>
    <form name="form" @submit.prevent="loginUser">
        <label for="userName">User: </label>
        <input class="form-control" v-model="captarUserName" type="text" name="userName" required placeholder="userName">
        <!-- CONTROL DE ERRORES -> TEXTO EN ROJO -->
        
        <br><br>

        <label for="password">Password: </label>
        <input class="form-control" v-model="captarPassword" type="password" name="password" required placeholder="password">
        <!-- CONTROL DE ERRORES -> TEXTO EN ROJO -->

        <br><br>

        <input class="form-submit" type="submit" value="Login">
        
    </form>

    <div v-show="registrado">
        {{ token }}
    </div>

  </div>
</template>

<script>
    import { login } from '../services/UserService';
    import User from '../models/user';

    export default {
        data() {
            return{
                user: new User('',''),
                captarUserName: '',
                captarPassword: '',
                registrado: false,
                token: ""
            }
        },
        computed:{
            //operaciones que hacer sobre las propiedades que queramos
        },
        methods: {       
            loginUser() {
                login(this.captarUserName, this.captarPassword).then(response => {
                    if(response.token){
                        this.registrado = true
                        this.token = response.token 
                        console.log(response)
                        localStorage.user = this.captarUserName;
                        localStorage.token = response.token;
                        localStorage.registrado = true;
                        console.log(localStorage.user)
                        
                    }
                    else{
                        console.log("no token")
                    }
                });
            }
        }
    };
</script>