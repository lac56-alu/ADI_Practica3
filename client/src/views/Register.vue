<template>
    
    <form action class="form" @submit.prevent="register">
 <ul>
  <li>
    <label for="name">UserName: </label>
    <input type="text" id="userName" name="userName" v-model="userName">
  </li> <br>
  <li>
    <label for="mail">Correo electrónico: </label>
    <input type="email" id="email" name="email" v-model="email" > 
  </li><br>
    <li>
    <label for="mail">Name: </label>
    <input type="text" id="name" name="name" v-model="name">
  </li><br>
    <li>
    <label for="mail">Lastname: </label>
    <input type="text" id="lastname" name="lastname" v-model="lastname">
  </li><br>
    <li>
    <label for="mail">City: </label>
    <input type="text" id="city" name="city" v-model="city">
  </li><br>
    <li>
    <label for="mail">Password: </label>
    <input type="text" id="password" name="password" v-model="password">
  </li><br>
  <button class="form-submit" type="submit" value="Register"> Register </button>

 </ul>
</form>

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
        password: ""
    }
  },
  methods: {
    async register() {
        try {
            await fetch('http://localhost:3000/api/user/registro', {
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
            //this.$router.push('/login');
            
        } catch (error) {
            console.log(error);
        }
    }
  }
};
</script>

