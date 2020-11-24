import {API} from '../../backend'

export const createPost = (data,token,userId) =>{
    return fetch(`${API}/post/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const savePost = (postId , userId , token) =>{
    return fetch(`${API}/user/save/${postId}/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const isPostSaved = (postId , userId , token) =>{
    return fetch(`${API}/user/check/save/${postId}/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}



export const ondeletePost = (postId , userId , token) =>{
    return fetch(`${API}/post/${postId}/${userId}`,{
        method: "DELETE",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}