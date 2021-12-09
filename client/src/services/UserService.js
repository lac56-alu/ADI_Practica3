export function logOut() {
  localStorage.token = ""
  localStorage.user = ""
  localStorage.registrado = false
}
