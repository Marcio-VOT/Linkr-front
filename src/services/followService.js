import axios from 'axios'

const api = axios.create({baseURL: process.env.REACT_APP_API_URL, headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
}})

export async function follow({followerId, userId, setDisabled}){
    setDisabled(true)
    api.post("/follow", {followerId, userId}).then(
        (response) => {
            setDisabled(false)
        }
    )
    .catch(() => {
        setDisabled(false)
    })
}

export async function unfollow({userId, setDisabled}){
    setDisabled(true)
    return await api.delete(`/follow/${userId}`).then(
        (response) => {
            setDisabled(false)
        }
    )
    .catch(() => {
        setDisabled(false)
    })
}

export async function verifyFollow({userId}){
    return api.get(`/follow/${userId}`)
}