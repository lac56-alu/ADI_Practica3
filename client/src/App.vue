<template>
  <div id="app">
    <ul>
      <div id="nav">
        <li> <router-link to="/places">Inicio</router-link> </li>
        <li> <router-link to="/categories">Categorías</router-link> </li>
        <li> <router-link to="/createPlace">Crear Place</router-link> </li>
        <li> <router-link to="/plans">Ver planes</router-link> </li>
        <li style="float:right"> <a v-on:click="logoutUser">LogOut </a> </li>
        <li style="float:right"> <router-link to="/login">Login</router-link> </li>
        <li style="float:right"> <router-link to="/register">Registro</router-link> </li>
      </div>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import { logOut } from './services/UserService';
export default {
  data(){
    return{
      registrado: this.comprobarRegistro(),
      usuario: localStorage.userName,
      log: localStorage.registrado
    }
  },
  created() {
    console.log(this.registrado)
    if(localStorage.registrado){
      this.registrado = false
      return false
    }
    else{
      if(localStorage.registrado == true){
        this.registrado = localStorage.registrado
        return true
      }
      else{
        this.registrado = localStorage.registrado
        return false
      }
    }
  },
  methods: {       
    logoutUser() {
      logOut();
      this.$router.push('/places');
    },
    comprobarRegistro(){
      
    }
  },
  mounted() {
    this.comprobarRegistro()
  }
};
</script>

<style>

ul {
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #EAEAEA;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 14px;
  text-decoration: none;
}

#nav a:hover:not(.active) {
  background-color: rgb(98, 216, 216);
}

.active {
  background-color: #17a2b8;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #EAEAEA;
}

#nav a {
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #17a2b8;
}


</style>
