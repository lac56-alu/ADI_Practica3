require('cors')

import authservice from '../services/auth-header';

export async function createPlan(n,d,ca) {
    //var tokenBearer = 'Bearer ' + localStorage.token;
    const response = await fetch('http://localhost:3000/api/plan', {
        method: 'POST',
        headers: { 
            'Authorization': authservice().Authorization, 
            'Access-Control-Request-Headers': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                name: n,
                description: d,
                category_id: ca
            }),
    });
    var aux = await response.json()
    console.log("RESPUESTA")
    console.log(aux)
    return aux;
}

