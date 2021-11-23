
export async function getAllPlaces() {

    const response = await fetch('http://localhost:3000/api/place');
    return await response.json();
}