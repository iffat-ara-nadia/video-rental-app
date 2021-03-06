import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function deleteMovie(MovieId) {
  return http.delete(apiEndPoint + "/" + MovieId);
}
