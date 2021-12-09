import authservice from '../services/auth-header';

export async function getCategory() {
  const response = await fetch("http://localhost:3000/api/category");
  var aux = await response.json();
  /*let respuesta = aux['respuesta']['data'];
  var resp = []
  for(let i = 0; i < respuesta.length; i++){
    var tupla = [respuesta[i]['id'], respuesta[i]['type']]
    resp.push(tupla);
  }*/

  return aux['respuesta']['data'];
}

export function getIdCategory(arrayCat, name){
  for(let i = 0; i < arrayCat.length; i++){
    console.log(arrayCat[i])
    if(arrayCat[i]['type'] == name){
      return arrayCat[i]['id'];
    }
  }
}

export async function getPlacesByCategory(id) {
  const response = await fetch('http://localhost:3000/api/places/category/' + id, {
    method: 'GET',
    headers: { 'Authorization': authservice().Authorization },
  });
  var resp = await response.json();
  return resp;
}