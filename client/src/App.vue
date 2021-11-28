<template>
  <div id="app">
    <ul>
      <div id="nav">
        <li> <router-link to="/">Home</router-link> </li>
        <li> <router-link to="/hola">Hola</router-link> </li>
        <li> <router-link to="/about">About</router-link> </li>
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
  methods: {       
    logoutUser() {
      logOut();
      this.$router.Push('/');
    }
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
  background-color: rgb(197, 189, 189);
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
  background-color: #0b54c2;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #0b54c2;
}
</style>
