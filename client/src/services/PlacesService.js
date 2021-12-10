require('cors')

import authservice from '../services/auth-header';

export async function createPlace(n,d,a,ci,ca) {
    //var tokenBearer = 'Bearer ' + localStorage.token;
    const response = await fetch('http://localhost:3000/api/place', {
        method: 'POST',
        headers: { 
            'Authorization': authservice().Authorization, 
            'Access-Control-Request-Headers': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                name: n,
                description: d,
                city: ci,
                address: a,
                category_id: ca
            }),
    });
    var aux = await response.json()
    console.log("RESPUESTA")
    console.log(aux)
    return aux;
}

export async function modifyPlace(n,d,a,ci,ca, ID) {
    const response = await fetch('http://localhost:3000/api/place/' + ID, {
        method: 'PUT',
        headers: { 
            'Authorization': authservice().Authorization, 
            'Access-Control-Request-Headers': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                name: n,
                description: d,
                city: ci,
                address: a,
                category_id: ca
            }),
    });
    var aux = await response.json()
    console.log("RESPUESTA")
    console.log(aux)
    return aux;
}

export async function getPlace() {
    const response = await fetch("http://localhost:3000/api/place");
    var aux = await response.json();
  
    return aux['respuesta']['data'];
  }
  
  export function getIdPlace(arrayPl, name){
    for(let i = 0; i < arrayPl.length; i++){
      console.log(arrayPl[i])
      if(arrayPl[i]['type'] == name){
        return arrayPl[i]['id'];
      }
    }
  }