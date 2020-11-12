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