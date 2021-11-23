<template>
  <div class="login">
    <h1 class="title">Login in the page</h1>
    <form action class="form">
        <label class="form-label" for="#userName">User: </label>
        <input v-model="userName" type="text" required placeholder="userName">
        <!-- <input class="form-input" type="text" id="userName" required placeholder="userName"> -->
        <label class="form-label" for="#password">Password: </label>
        <input v-model="password" type="password" required placeholder="password">
        <!-- <input class="form-input" type="password" id="password" required placeholder="Password"> -->
        <input class="form-submit" type="submit" value="Login">
    </form>
  </div>
</template>

<script>
    import { login } from '../services/UserService';

    export default {
        data: () => ({
            userName: "",
            password: ""
        }),
        methods: {                    
            loginUser(data) {
                console.log('data:::', data)
                login(data).then(response => {
                    console.log(response);
                });
            }
        }
    };
</script>