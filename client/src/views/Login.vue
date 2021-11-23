<template>
  <div class="login">
    <h1 class="title">Login in the page</h1>
    <form name="form" @submit.prevent="loginUser">
        <label for="userName">User: </label>
        <input class="form-control" v-model="captarUserName" type="text" name="userName" required placeholder="userName">
        <!-- CONTROL DE ERRORES -> TEXTO EN ROJO -->

        <label for="password">Password: </label>
        <input class="form-control" v-model="captarPassword" type="password" name="password" required placeholder="password">
        <!-- CONTROL DE ERRORES -> TEXTO EN ROJO -->

        <input class="form-submit" type="submit" value="Login">
        
    </form>
  </div>
</template>

<script>
    import { login } from '../services/UserService';

    export default {
        data() {
            return{
                captarUserName: '',
                captarPassword: ''
            }
        },
        methods: {       
            loginUser() {
                login(this.captarUserName, this.captarPassword).then(response => {
                    console.log(response);
                });
            }
        }
    };
</script>