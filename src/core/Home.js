import React, { useState, useEffect } from 'react'
import { getAllPost, isAuthincated } from '../auth/helper'
import Card from './Card'

function Home() {
    const { user, token } = isAuthincated()
    const [posts, setPosts] = useState('')

    useEffect(() => {
        getAllPost(token)
        .then(data =>{
            setPosts(data)
        })
    }, [])

    let load = ''
    if (posts.post == undefined) {
        return load = ''
    } else {
        load = posts.post.map((cardData,index) =>{
            return <Card key={index} cardData={cardData} />
        })
    }


    return (
            <div style={{marginTop:'45px'}}>
               <div >
                    {load}
               </div>
            </div>
        )
    }

export default Home
