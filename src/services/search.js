import axios from "axios";
import { BASE_URL } from "../constants/constants.js";
const token = localStorage.getItem("token")

export function searchApi(search) {
  return axios.get(`${BASE_URL}/search/${search}`, {headers: {
    Authorization: `Bearer ${token}`
  }});
}

export function searchUserPosts(id) {
  return axios.get(`${BASE_URL}/posts/${id}`);
}
export function searchUserData(id) {
  return axios.get(`${BASE_URL}/data/${id}`);
}

export function searchPosts({ date, offset, config }) {
  return axios.get(`${BASE_URL}/posts/?offset=${offset}&date=${date}`, config);
}
