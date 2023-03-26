import axios from "axios";

export default function likeService() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token")
    const api = axios.create({
        baseURL: BASE_URL, headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const services = {
        async getLikes({ postId }) {
            return await api.post("/getlikes", { postId })
        },

        async newLike({ userId, postId }) {
            return await api.post("/newlike", { userId, postId })
        },

        async removeLike({ userId, postId }) {
            return await api.post("/removelike", { userId, postId })
        },

        async getTwoUsers({ postId }) {
            return await api.post("/twousers", { postId })
        },

        async youLike({ userId, postId }) {
            return await api.post("/youlike", { userId, postId })
        }
    }
    return services
}