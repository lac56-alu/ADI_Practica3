<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<template>
  <div id="app">
    <ul>
      <div id="nav">
        <v-toolbar-items>
        <li> <router-link to="/home">Inicio</router-link> </li>
        <li v-if="currentUser" > <router-link to="/categories">Categorías</router-link> </li>
        <li v-if="currentUser" > <router-link to="/createPlace">Crear Lugar</router-link> </li>
        <li v-if="currentUser" > <router-link to="/myplaces">Ver mis lugares</router-link> </li>
        <li v-if="currentUser" > <router-link to="/places">Ver todos los lugares</router-link> </li> 
        <li v-if="currentUser" > <router-link to="/createPlan">Crear Plan</router-link> </li>
        <li v-if="currentUser" > <router-link to="/myplans">Ver mis planes</router-link> </li>
        <li v-if="currentUser" > <router-link to="/plans">Ver planes</router-link> </li>     
        <li v-if="currentUser" style="float:right"> <router-link to="/perfil"> Hola, {{ this.usuario.user[0]['name'] }} </router-link> </li>
        <li v-if="currentUser" style="float:right"> <a v-on:click="logoutUser">Log Out</a> </li>
        <li v-if="!currentUser" style="float:right"> <router-link to="/login">Login</router-link> </li>
        <li v-if="!currentUser" style="float:right"> <router-link to="/register">Registro</router-link> </li> 
        </v-toolbar-items>

      </div>
    </ul>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>


<script>
export default {
  data(){
    return{
      registrado: this.comprobarRegistro(),
      usuario: '',
      log: localStorage.registrado
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    }
  },
  created() {
    this.usuario = JSON.parse(this.$store.state.auth.user);
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
      this.$store.dispatch('auth/logout');
      this.$router.push('/home');
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

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .45s;
}
 
.fade-enter-active {
  transition-delay: .45s;
}
 
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
