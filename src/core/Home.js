import React, { useState, useEffect } from 'react'
import { getAllPost, isAuthincated } from '../auth/helper'
import Card from './Card'

function Home() {
    const { user, token } = isAuthincated()
    const [posts, setPosts] = useState('')
    const [loading, setLoading] = useState(false)
    const [skip, setSkip] = useState(0)
    const [loads, setloads] = useState(false)
    const [intLoding, setIntLoding] = useState(false)

    console.log(posts)
    let limit = 3

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getAllPost(token,skip,limit)
            .then((data) =>{
                if(posts){
                    console.log('1')
                    let newData = posts.concat(data.post)
                    setPosts(newData)
                  
                }else{
                    setPosts(data.post)
                }
            })
            let nextCount = skip + limit
            setSkip(nextCount) 
            setLoading(false)  
        }, 2000);
    }, [])

    useEffect(() => {
        if(!loads) return ;
        setIntLoding(true)
        setTimeout(() => {
            getAllPost(token,skip,limit)
            .then((data) =>{
                if(posts){
                    console.log('1')
                    let newData = posts.concat(data.post)
                    setPosts(newData)
                    setloads(false)
                  
                }else{
                    setPosts(data.post)
                    setloads(false)
                }
            })
            let nextCount = skip + limit
            setSkip(nextCount) 
            
            setIntLoding(false)  
        }, 2000);
    },[loads])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loads) return;
        setloads(true);
    }

    let load = ''
    if(loading){
        return load =  <div class="progress" style={{marginTop:'60px'}}>
        <div class="indeterminate"></div>
      </div>
    }
    else if (posts === '') {
        return load = ''
    } else {
        load = posts.map((cardData,index) =>{
            return <Card key={index} cardData={cardData} />
        })
    }

    let internalLoading = ''
    if(intLoding){
         internalLoading = <div class="progress" style={{marginTop:'10px'}}>
        <div class="indeterminate"></div>
      </div>
    }
    return (
            <div style={{marginTop:'45px'}}>
               <div>
                    {load}
                    {internalLoading}
               </div>
            </div>
        )
    }
export default Home
