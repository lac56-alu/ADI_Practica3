<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>

<template>
  <div>  
    <br>

    <div class="row">
        <div class="col-sm-6">
            <br><br>
            <div class="flip-box">
                <div class="flip-box-inner">
                    <div class="flip-box-front">
                        <img id="img" src="../imagenes/avatar.png" style="width:250px;height:250px">
                    </div>
                    <div class="flip-box-back">
                        <br><br><br><br>
                        <h2>Bienvenido</h2>
                        <h3> {{ this.perfil.user[0]['userName'] }} </h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="card" style="color: black; width: 50%;">
                <div class="card-header" style="color: black;">
                    <b>Datos Usuario</b>
                </div>
                <div class="card-body">
                    <table style="margin: 0 auto;">
                        <tr>
                            <th>UserName: </th>
                            <td> {{ this.perfil.user[0]['userName'] }} </td>
                        </tr>
                        <tr>
                            <th>Nombre: </th>
                            <td> {{ this.perfil.user[0]['name'] }} </td>
                        </tr>
                        <tr>
                            <th>Apellidos: </th>
                            <td> {{ this.perfil.user[0]['lastname']}} </td>
                        </tr>
                        <tr>
                            <th>Email: </th>
                            <td> {{ this.perfil.user[0]['email'] }} </td>
                        </tr>
                        <tr>
                            <th>Ciudad: </th>
                            <td> {{ this.perfil.user[0]['city'] }} </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>


    
  </div>

</template>



<script>
//import authservice from '../services/auth-header';
//import axios from 'axios';

export default {

  data(){
    return{
      perfil: ''
    }
  },
  
  created(){
    //console.log(this.$store.state.auth.user)
    console.log("LOCALSTORAGEEE")
    this.perfil = JSON.parse(localStorage.getItem('user'))
    console.log(this.perfil.user);
  }
}

</script>


<style scoped>
.table{
    margin: 0 auto;
    border-spacing: 0;
}

th {
    padding: 10px;
}

td {
    padding: 15px;
}


.flip-box {
  background-color: transparent;
  width: 250px;
  height: 250px;
  perspective: 1000px;
  margin: 0 auto;
}

.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-box:hover .flip-box-inner {
  transform: rotateY(180deg);
}

.flip-box-front, .flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-box-front {
  background-color: #bbb;
  color: black;
}

.flip-box-back {
    background-color: rgb(255, 255, 255);
    color: black;
    transform: rotateY(180deg);
}

</style>



         
