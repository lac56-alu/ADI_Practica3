<template>
  <div class="register">
    <h1> Register Page</h1>
    <div>
      {{ registro() }}
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return{
        token: ""
      }
    },
    methods: {
      registro(){
        console.log(localStorage.token)
        this.token = localStorage.token
      } 
    }
  };
</script>