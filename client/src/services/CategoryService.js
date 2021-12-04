export async function getCategory() {
  const response = await fetch("http://localhost:3000/api/category");
  var aux = await response.json();
  let respuesta = aux['respuesta']['data'];
  var resp = []
  for(let i = 0; i < respuesta.length; i++){
    var tupla = [respuesta[i]['id'], respuesta[i]['type']]
    resp.push(tupla);
  }

  return resp;
}

export function getIdCategory(arrayCat, name){
  for(let i = 0; i < arrayCat.length; i++){
    if(arrayCat[i][1] == name){
      return arrayCat[i][0];
    }
  }
}
