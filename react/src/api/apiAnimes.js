const API_URL = "http://127.0.0.1:8000";
export async function fetchAnimes(page = 1) {
  const response = await fetch(API_URL + `/anime?page=${page}`);
  if (!response.ok) throw new Error("Erro ao buscar animes");
  const data = await response.json();
  return data.data;
}

export async function searchAnimes(query) {
  const response = await fetch(API_URL + `/anime/search?search=${query}`);
  if (!response.ok) throw new Error("Erro na busca");
  const data = await response.json();
  return data.data;
}