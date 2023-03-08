import axios from "axios";
import { BASE_URL } from "../constants/constants.js";

export function searchApi(search) {
  return axios.get(`${BASE_URL}/search/${search}`);
}
