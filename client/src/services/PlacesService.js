require('cors')

export async function createPlace(n,d,a,ci,ca) {
    var tokenBearer = 'Bearer ' + localStorage.token;
    const response = await fetch('http://localhost:3000/api/place', {
        method: 'POST',
        headers: { 
            'Authorization': tokenBearer, 
            'Access-Control-Request-Headers': '*',
            'Content-Type': 'application/json'
        },
        body: {
            name: n,
            description: d,
            city: ci,
            address: a,
            category_id: ca
        },
    });

    console.log("RESPUESTA")
    console.log(response)
    return response;
}