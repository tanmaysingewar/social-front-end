const { API } = require("../../backend");

export const singup = user =>{
    return fetch(`${API}/singup`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const singin = user =>{
    return fetch(`${API}/singin`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}


export const checkUsername = data =>{
    return fetch(`${API}/user/check/username`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const authincate = (data,next)=>{
    if (JSON.stringify(data.error)) {
        return ''
    }
    if (typeof window !== 'undefined') {
        const { token , user } = data
        localStorage.setItem('jwt',JSON.stringify({token,user}))
        next()
    }
}

export const isAuthincated =()=>{
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}


export const isConformed = () =>{
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        const locdata = JSON.parse(localStorage.getItem('jwt'))
        const { user} = locdata
        return user.conform_id
    }
}

export const getUserById = (userId, token) =>{
    return fetch(`${API}/user/${userId}`,{
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
.catch(err => console.log(err))
}

export const getPostByUserId = (userId, token,skip ,limit)=>{
    return fetch(`${API}/post/allpost/${userId}?limit=${limit}&skip=${skip}`,{
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



export const searchUser =(serchTerm)=>{
    return fetch(`${API}/users/${serchTerm}`,{method:'GET'})
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const getAllPost = (token, skip, limit )=>{
    return fetch(`${API}/posts?limit=${limit}&skip=${skip}`,{
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

///////*************** */
export const sendOtp = (token)=>{
    return fetch(`${API}/send/otp`,{
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

/////************** */
export const checkOtp = (token, otp)=>{
    return fetch(`${API}/conform/otp?otp=${otp}`,{
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


export const getPostSerch = (token, skip, limit )=>{
    return fetch(`${API}/post/all?limit=${limit}&skip=${skip}`,{
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

export const singout = next =>{
    if (typeof window !== 'undefined') {
        localStorage.removeItem("jwt")
        next()
        return fetch(`${API}/singout`,{
            method:'GET'
        })
        .then(res => console.log('Singout successully'))
        .catch(err => console.log(err))
    } 
}