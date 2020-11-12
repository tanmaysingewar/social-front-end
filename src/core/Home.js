import React, { useState, useEffect } from 'react'
import { getAllPost, isAuthincated } from '../auth/helper'
import BottomNav from './BottomNav'
import Card from './Card'



function Home() {

    const { user, token } = isAuthincated()

    const [posts, setPosts] = useState('')
    console.log(posts)
    console.log('happy')

    useEffect(() => {
        getAllPost(token)
        .then(data =>{
            setPosts(data)
            console.log(data)
        })
    }, [])

    let load = ''
    if (posts.post == undefined) {
        return load = ''
    } else {
        load = posts.post.map((cardData,index) =>{
            console.log(cardData)
            return <Card key={index} cardData={cardData} />
        })
    }

    return (
            <div>
                {load}
                { }
                    <BottomNav />
            </div>
        )
    }

export default Home
