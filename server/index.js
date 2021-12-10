//Cargamos el módulo express
const path = require("path")
const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors({
   origin: 'http://localhost:8080'
}))

var jwt = require('jwt-simple')
var jwt2 = require('jsonwebtoken')
var moment = require('moment');

// Paginacion
const { attachPaginate } = require('knex-paginate');
attachPaginate();

var secret="ak3iunasokfnoafnkkasoidnOKSG0903"

//Base de datos:
const knex = require("knex")({
   client: "sqlite3",
   connection:{
      filename: path.resolve(__dirname, "db/database.db")
   },
   useNullAsDefault: true
});


//Authorization
function checkJWT(pet, resp, next){
   var token = getTokenFromAuthHeader(pet)
   try{
      var decoded = jwt.decode(token, secret);
   
      if(decoded) {
         resp.login_del_usuario = decoded['userName']
         next()
      }
      else{
         resp.status(403)
         resp.send({ERROR: "No tienes permiso."})
      }
   }
   catch(error){
      resp.status(401).send({error: "Token incorrecto o expirado"})
   }
}

function getTokenFromAuthHeader(pet) {
   var cabecera = pet.header('Authorization')
   
   if(cabecera){
      var campos = cabecera.split(' ')
      if (campos.length > 1 && cabecera.startsWith('Bearer')){
         return campos[1] 
      }
   }

   return undefined
}

// GET API/PLACES/CATEGORY/:ID (devuelve todos los datos de una coleccion/tabla con la categoria indicada)
   // para devolver toda la colección de cualquier tabla, sí hace falta estar loggeado
   app.get('/api/places/category/:id', checkJWT, async function(pet, resp){
 
      var token = getTokenFromAuthHeader(pet)
      var decoded = jwt.decode(token, secret);
   
      var consult = await knex.select().table('user').where('userName', decoded.login).asCallback(function(error, res){
         if(error){
            resp.status(500).send({error: "Error interno 1"})
         }else{
            //var aux_id = res[0].id; //id del usuario que ha iniciado sesion
   
            knex.select().table('place').where('category_id', pet.params.id).asCallback(function(error, res){ //buscamos lugares con esa categoria
               if(error){
                  resp.status(500).send({error: "Error interno 2"})
               }
               else{   
                  if(res == 0){
                     resp.status(404).send({"respuesta": "Error"})
                     
                  }else{
   
                        console.log(res)
                        resp.status(200).send({"respuesta": res})
                          
                  }
               }
            })
         }    
      })
   });



// GET API/MI/PLACE (devuelve todos los datos de una coleccion/tabla creados por el usuario loggeado)
   // para devolver toda la colección de cualquier tabla, sí hace falta estar loggeado
app.get('/api/mi/place/', checkJWT, async function(pet, resp){
 
   console.log("aquiiiiiiiiiiiiiiiiiiiiiiiiiii")
   var token = getTokenFromAuthHeader(pet)
   var decoded = jwt.decode(token, secret);

   var consult = await knex.select().table('user').where('userName', decoded.login).asCallback(function(error, res){
      if(error){
         resp.status(500).send({error: "Error interno"})
      }else{
         var aux_id = res[0].id; //id del usuario que ha iniciado sesion

         knex.select().table('place').where('user_id', aux_id).asCallback(function(error, res){ //buscamos lugares creados por el usuario loggeado
            if(error){
               resp.status(500).send({error: "Error interno"})
            }
            else{   
               if(res == 0){
                  resp.status(404).send({"respuesta": "Error"})
                  
               }else{

               
                     console.log(res)
                     resp.status(200).send({"respuesta": res})
                           
                     
                    
               }
            }
         })
      }    
   })
});




// GET API/MI/PLAN (devuelve todos los datos de una coleccion/tabla creados por el usuario loggeado)
   app.get('/api/mi/plan/', checkJWT, async function(pet, resp){
 
      var token = getTokenFromAuthHeader(pet)
      var decoded = jwt.decode(token, secret);
   
      var consult = await knex.select().table('user').where('userName', decoded.login).asCallback(function(error, res){
         if(error){
            resp.status(500).send({error: "Error interno"})
         }else{
            var aux_id = res[0].id; //id del usuario que ha iniciado sesion
   
            knex.select().table('plan').where('user_id', aux_id).asCallback(function(error, res){ //buscamos lugares creados por el usuario loggeado
               if(error){
                  resp.status(500).send({error: "Error interno"})
               }
               else{   
                  if(res == 0){
                     resp.status(404).send({"respuesta": "Error"})
                     
                  }else{
   
                  
                        console.log(res)
                        resp.status(200).send({"respuesta": res})
                              
                        
                       
                  }
               }
            })
         }    
      })
   });




// GET API/COLECCION (devuelve todos los datos de una coleccion/tabla)
   // para devolver toda la colección de cualquier tabla, no hace falta estar loggeado
   // este método es genérico, devuelve cualquier colección de la base de dato
app.get('/api/:coleccion', async function(pet, resp){
   var elementosPagina = pet.query.perPage;
   var paginaPeticion = pet.query.currentPage;

   if(elementosPagina != null && paginaPeticion != null){
      var consult = await knex.select().table(pet.params.coleccion).paginate({ perPage: 50, currentPage: paginaPeticion}).asCallback(function(error, res){
         if(error){
            resp.status(404).send({error: "La colección introducida no existe"})
         }
         else{
            if(res.data == ""){
               resp.status(404).send({error: "La pagina introducida no existe"})
            }
            else{
               var aux1 = parseInt(paginaPeticion) + 1
               var urlSiguiente = "http://localhost:3000/api/" + pet.params.coleccion + "?perPage=2&currentPage=" + aux1.toString();
               console.log(res)

               if(parseInt(paginaPeticion) > 1){
                  var aux2 = parseInt(paginaPeticion) - 1
                  var urlAnterior = "http://localhost:3000/api/" + pet.params.coleccion + "?perPage=2&currentPage=" + aux2.toString();
                  resp.status(200).send({"respuesta": res, previousURL: urlAnterior, nextURL: urlSiguiente})
               }
               else{
                  resp.status(200).send({"respuesta": res, previousURL: "None", nextURL: urlSiguiente})
               }
               
            }
         }
      })
   }
   else{
      var consult = await knex.select().table(pet.params.coleccion).paginate({ perPage: 20, currentPage: 1}).asCallback(function(error, res){
         if(error){
            resp.status(404).send({error: "La colección introducida no existe"})
         }
         else{
            if(res == ""){
               resp.status(404).send({error: "La pagina introducida no existe"})
            }
            else{
               console.log(res)
               resp.status(200).send({"respuesta": res, "paginate": res.paginate })
               
            }
         }
      })
   }
   
});


// GET API/COLECCION/ID (devuelve el objeto de la tabla indicada con el id indicado)
   // para ver los datos de un objeto de una tabla, no hace falta estar loggeado
   // método genérico que sirve para cualquier coleccion de la base de datos
app.get('/api/:coleccion/:id', async function(pet,resp) {

   knex.select().table(pet.params.coleccion).where('id', pet.params.id).asCallback(function(error, res){
      if(error){
         resp.status(500).send({error: "Error interno"})
      }
      else{  

         if(res == ""){
            console.log(res)
            resp.status(404).send({"respuesta": "El id introducido no se encuentra en la base de datos"})
            
         }else{
            console.log(res)
            resp.status(200).send({"respuesta": res})
            
         }        
      }
   })
});


// POST API/PLACE (crea un elemetno de la coleccion place, siempre que los parametros del body esten bien)
   // para poder crear unaa publicacion de un ligar, el usuario deberá estar loggeado
   // el lugar creado se le asignará automáticamente al propio usuario, cuyo id extraemos a través del token
app.post('/api/place', checkJWT, async function(pet, resp){

   const nuevoElemento = pet.body; 

   var token = getTokenFromAuthHeader(pet)
   var decoded = jwt.decode(token, secret);

   knex.select().table('user').where('userName', decoded.login).asCallback(function(error, res){
      if(error){
         resp.status(500).send({error: "Error interno"})
      }else{
         nuevoElemento.user_id = res[0].id;
         knex.insert(nuevoElemento).into('place').asCallback(function(error, res){
            if(error){  
               resp.status(404).send({error: "La colección introducida no existe"})
            }
            else{
               console.log(res)
               resp.status(201).send({"respuesta": "Lugar creado correctamente"})
               
            } 
         })
      } 
   })

});

// POST API/pLAN (crea un elemetno de la coleccion plan, siempre que los parametros del body esten bien)
   app.post('/api/plan', checkJWT, async function(pet, resp){

      const nuevoElemento = pet.body; 
   
      var token = getTokenFromAuthHeader(pet)
      var decoded = jwt.decode(token, secret);
   
      knex.select().table('user').where('userName', decoded.login).asCallback(function(error, res){
         if(error){
            resp.status(500).send({error: "Error interno"})
         }else{
            nuevoElemento.user_id = res[0].id;
            knex.insert(nuevoElemento).into('plan').asCallback(function(error, res){
               if(error){  
                  resp.status(404).send({error: "La colección introducida no existe"})
               }
               else{
                  console.log(res)
                  resp.status(201).send({"respuesta": "Plan creado correctamente"})
                  
               } 
            })
         } 
      })
   
   });


// DELETE API/PLACE/ID (elimina el lugar con el id indicado de la tabla indicada)
   // para poder eliminar un lugar, el usuario deberá estar loggeado
   // para eliminarlo, el lugar indicado tendrá que haber sido creado por el propio usuario que ha inciado sesion y desea eliminarlo
app.delete('/api/place/:id', checkJWT, async function(pet, resp){

   var token = getTokenFromAuthHeader(pet)
   var decoded = jwt.decode(token, secret);

   knex.select().table('user').where('userName', decoded.login).asCallback(function(error, res){
      if(error){
         resp.status(500).send({error: "Error interno"})
      }else{
         var aux_id = res[0].id; //id del usuario que ha iniciado sesion

         knex.select().table('place').where('id', pet.params.id).asCallback(function(error, res){
            if(error){
               resp.status(500).send({error: "Error interno"})
            }
            else{   
               if(res == 0){
                  resp.status(404).send({"respuesta": "El id introducido no se encuentra en la base de datos"})
                  
               }else{

                  if(aux_id == res[0].user_id){

                     knex.select().table('place').where('id', pet.params.id).delete().asCallback(function(error, res){
                        if(error){
                           resp.status(500).send({error: "Error interno"})
                        }
                        else{   
                           resp.status(204)
                        }
                     })
                  }else{
                     resp.status(401).send({"respuesta": "No puede eliminar el lugar indicado, ya que no ha sido creado por usted"})
                  }
               }
            }
         })    
      } 
   })
});


// DELETE API/USER/ID (elimina el lugar con el id indicado de la tabla indicada)
app.delete('/api/user/:id', async function(pet,resp) {

   knex.select().table('user').where('id', pet.params.id).delete().asCallback(function(error, res){
      if(error){
         resp.status(500).send({error: "Error interno"})
      }
      else{  

         if(res == ""){
            console.log(res)
            resp.status(404).send({"respuesta": "El id introducido no se encuentra en la base de datos"})
            
         }else{
            console.log(res)
            resp.status(200).send({"respuesta": "Borrado"})
            
         }        
      }
   })
});

// PUT (modifica los elementos con el id de la coleccion place que se le pasen por el body)
   // para poder modificar un lugar, el usuario deberá estar loggeado
   // para modificarlo, el lugar indicado tendrá que haber sido creado por el propio usuario que ha inciado sesion y desea modificarlo
app.put('/api/modify/place/:id', checkJWT, async function(pet,resp) {

   var token = getTokenFromAuthHeader(pet)
   var decoded = jwt.decode(token, secret);

   knex.select().table('user').where('userName', decoded.login).asCallback(function(error, res){
      if(error){
         resp.status(500).send({error: "Error interno"})
      }else{
         var aux_id = res[0].id; //id del usuario que ha iniciado sesion

         knex.select().table('place').where('id', pet.params.id).asCallback(function(error, res){
            if(error){
               resp.status(500).send({error: "Error interno"})
            }
            else{   
               if(res == 0){
                  resp.status(404).send({"respuesta": "El id introducido no se encuentra en la base de datos"})
                  
               }else{

                  if(aux_id == res[0].user_id){

                     knex.select().table('place').where('id', pet.params.id).update(pet.body).asCallback(function(error, res){
                        if(error){
                           resp.status(500).send({error: "No se puede modificar el elemento"})
                        }
                        else{       
                           console.log(res)
                           resp.status(204) .send({"respuesta": "Se ha modificado el lugar de forma correcta."})                    
                        }
                     })

                  }else{
                     resp.status(401).send({"respuesta": "No puede modificar el lugar indicado, ya que no ha sido creado por usted"})
                     
                  }
               }
            }
         })    
      } 
   })

});



// POST /api/comment/:idPlace (crear un comentario sobre un lugar en concreto)
   // para poder crear un comentario asociado a un lugar, el usuario deberá estar loggeado
app.post('/api/comment/:idPlace', checkJWT, async function(pet, resp){

   const nuevoElemento = pet.body; 

   var token = getTokenFromAuthHeader(pet)
   var decoded = jwt.decode(token, secret);

   knex.select().table('user').where('userName', decoded.login).asCallback(function(error, res){
      if(error){
         resp.status(500).send({error: "Error interno"})
      }else{
         var aux_id = res[0].id; //id del usuario que ha iniciado sesion

         knex.select().table('place').where('id', pet.params.idPlace).asCallback(function(error, res){  //buscamos el lugar en la bd con el id indicado en la url
            if(error){
               resp.status(500).send({error: "Error interno"})
            }
            else{   
               if(res == 0){
                  resp.status(404).send({"respuesta": "El id del lugar introducido no se encuentra en la base de datos"})
                  
               }else{

                  nuevoElemento.user_id = aux_id;
                  nuevoElemento.place_id = pet.params.idPlace;
                  knex.insert(nuevoElemento).into('comment').asCallback(function(error, res){
                     if(error){  
                        resp.status(404).send({error: "La colección introducida no existe"})
                     }
                     else{          
                        console.log(res)
                        resp.status(201).send({"respuesta": "Comentario registrado correctamente"})
                        
                     } 
                  })
               }
            }
         })
      }    
   })
});


//LOGIN /api/user/login (hay que pasarle el token por la cabecera)
app.post('/api/user/login', async function(pet, resp){

   var nick = pet.body.userName;
   var pass = pet.body.password;

   if(nick != null && pass != null){
      knex.select().table('user').where('userName', nick).asCallback(function(error, res){
         if(error){
            resp.status(500).send({error: "Error interno"})
         }
         else{       
            if(res != "" && res[0].password == pass){
               var userRegistrado = res;
               var payload = {
                  login: nick,
                  //exp: moment().add(20, 's').valueOf()
               }

               //var token = jwt.encode(payload, secret);
               var token = jwt2.sign(payload, secret, {expiresIn: 2000}) // Tiempo para que expire el token: 20 segundos 
               resp.status(201).send({mensaje: "Usuario logeado correctamente.", user: userRegistrado, token: token})
            }else{
               resp.status(404).send({mensaje: "Usuario no encontrado"})
               
            }
         }
      })
   }else{
      resp.status(406).send({mensaje: "Debe introducir el userName y la password obligatoriamente"})
   }
});


//REGISTRO /api/user/registro (devuelve el token para poder iniciar sesion)
app.post('/api/user/registro', async function(pet, resp){
console.log("AQUIIIIIIIIIIIIIIIIIIII")
   var userName = pet.body.userName;
   var pass = pet.body.password;
   var email = pet.body.email;

   if(userName != null && pass != null && email != null){ //elementos obligatorios para registrar un usuario (userName, passsword y email)

      //comprobar que no existe ningun usuario con ese userName
      knex.select().table('user').where('userName', userName).asCallback(function(error, res){
         if(error){
            resp.status(500).send({error: "Error interno"})
         }else{       
            if(res == ""){
               
               //comprobar que tampoco existe ningun usuario con ese email
               knex.select().table('user').where('email', email).asCallback(function(error, res){
                  if(error){
                     resp.status(500).send({error: "Error interno"})
                  }else{       
                     if(res == ""){
                        //registramos el usuario
                        const nuevoElemento = pet.body; 
                        knex.insert(nuevoElemento).into('user').asCallback(function(error, res){
                           if(error){  
                              resp.status(500).send({error: "Error interno"})
                           }
                           else{       
                              console.log(res)
                              resp.status(201).send({"respuesta": "Usuario registrado correctamente"})
                              
                           } 
                        }) 
      
                     } else {
                        resp.status(401).send({"respuesta": "Ya existe un usuario con ese email registrado"})
                        
                     }
                  }
               })

            } else {
               resp.status(401).send({"respuesta": "Ya existe un usuario con ese userName registrado"})
               
            }
         }
      })
   }else{
      resp.status(400).send({error: "Falta algun parametro obligatorio"})
   }
});

//Este método delega en el server.listen "nativo" de Node
app.listen(3000, function () {
   console.log("El servidor express está en el puerto 3000");
});

