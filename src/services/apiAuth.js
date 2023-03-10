import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

export function singUp(body) {
  return axios.post(`${BASE_URL}/signup`, body);
}

export function signIn(body) {
  return axios.post(`${BASE_URL}/signin`, body);
}

export function validToken(body) {
  return axios.get(`${BASE_URL}/validtoken/${body.token}`);
}
