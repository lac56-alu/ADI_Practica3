export async function getCategory() {
  const response = await fetch("http://localhost:3000/api/category");
  var aux = await response.json();
  console.log("AQUI TIRAAAAAAAAAAA ASFUHASUFI")
  console.log(aux['respuesta']['data'])
  return aux['respuesta']['data'];
}
