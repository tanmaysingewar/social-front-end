import { API } from "../../backend"

export const likePost = (postId,userId,token)=>{
    return fetch(`${API}/post/like/${postId}/${userId}`,{
        method : 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
    }
})
.then(res =>{
    return res.json()
})
.catch(err => console.log(err))}


export const islikedPost = (postId,token)=>{
    return fetch(`${API}/post/liked/${postId}`,{
        method : 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
    }
})
.then(res =>{
    console.log(res)
    return res.json()
})
.catch(err => console.log(err))}

export const commentPost = (postId , token, comment)=>{
    return fetch(`${API}/post/comment/${postId}`,{
        method : 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
    },
    body: JSON.stringify(comment)
})
.then(res =>{
    console.log(res)
    return res.json()
})
.catch(err => console.log(err))}



export const updateProfile = (userId , token, data)=>{
    return fetch(`${API}/user/${userId}`,{
        method : 'PUT',
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
    },
    body: JSON.stringify(data)
})
.then(res =>{
    console.log(res)
    return res.json()
})
.catch(err => console.log(err))}