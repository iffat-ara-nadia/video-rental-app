import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    //I missed return keyword
    //this object we should include in the body of the request.
    email: user.username,
    password: user.password,
    name: user.name
  });
}
