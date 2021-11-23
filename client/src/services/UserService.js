const ENDPOINT_PATH = "http://localhost:3000/api/user";

export async function login(data) {
    var stringLogin = "/login"
    var callAPI = ENDPOINT_PATH + stringLogin

    const response = await fetch(callAPI, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName: data.userName, password: data.password})
      })
    return await response.json();
}