import axios from "axios";
import { BASE_URL } from "../constants/constants.js";

export default function searchService() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const servises = {
    async searchApi(search) {
      return await api.get(`/search/${search}`);
    },

    async searchUserPosts({ id, offset, date }) {
      return await api.get(`/posts/${id}/?offset=${offset}&date=${date}`);
    },

    async searchUserData(id) {
      return await api.get(`/data/${id}`);
    },

    async searchPosts({ date, offset }) {
      return await api.get(`/posts/?offset=${offset}&date=${date}`);
    },

    async postsFromHashtagId({ hashtag, date, offset }) {
      return await api.get(
        `/hashtag/${hashtag}/?offset=${offset}&date=${date}`
      );
    },

    async trandingHashtags() {
      return await api.get(`/trendding`);
    },
    async newPostsCount({ date, config }) {
      return axios.get(`${BASE_URL}/posts/count/?date=${date}`, config);
    },
  };
  return servises;
}
