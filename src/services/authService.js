import http from "./httpService";
import jwtDecode from "jwt-decode"; //jwtDecode is the default function/object
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt); //If we pass null/an empty string/invalid jwt to this Decode(), we will get an exception
  } catch (ex) {
    return null;
  } //If we have an error, we just ignore that.Technically this is not an application error, this is only to handle the scenario where we don't have a valid jwt in the localStorage.}
}

export function getJwt() {
  localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
