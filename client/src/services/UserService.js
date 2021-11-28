const ENDPOINT_PATH = "http://localhost:3000/api/user";

export async function login(us, ps) {
  console.log("PARTE USERSERVICE")  
  console.log(us)
  console.log(ps)
  
  var stringLogin = "/login"
  var callAPI = ENDPOINT_PATH + stringLogin

  const response = await fetch(callAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({userName: us, password: ps})
  })

  return await response.json();
}

export function logOut() {
  localStorage.token = ""
  localStorage.user = ""
  localStorage.registrado = false
}