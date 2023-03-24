import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({baseURL: BASE_URL, headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
}})

export async function getLikes({postId}){
    return await api.post("/getlikes", {postId})
}

export async function newLike({userId, postId}){
    return await api.post("/newlike", {userId, postId})
}

export async function removeLike({userId, postId}){
    return await api.post("/removelike", {userId, postId})
}

export async function getTwoUsers({postId}){
    return await api.post("/twousers", {postId})
}

export async function youLike({userId, postId}){
    return await api.post("/youlike", {userId, postId})
}