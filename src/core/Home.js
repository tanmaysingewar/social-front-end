import React, { useState, useEffect } from 'react'
import { getAllPost, isAuthincated } from '../auth/helper'
import BottomNav from './BottomNav'
import Card from './Card'
import TopNavBar from './TopNavBar'

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
                
                <TopNavBar />
                    <BottomNav />
            </div>
        )
    }

export default Home
