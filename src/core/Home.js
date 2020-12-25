import React, { useState, useEffect } from 'react'
import { getAllPost, isAuthincated } from '../auth/helper'
import Card from './Card'

function Home() {
    const { token } = isAuthincated()
    const [posts, setPosts] = useState('')
    const [loading, setLoading] = useState(false)
    const [skip, setSkip] = useState(0)
    const [loads, setloads] = useState(false)
    const [intLoding, setIntLoding] = useState(false)
    const [end, setend] = useState(false)
    
    let limit = 6

    useEffect(() => {
        setLoading(true)
            getAllPost(token,skip,limit)
            .then((data) =>{
                if(!data){
                    return setPosts([])
                }
                if(data.error){
                    return setPosts([])
                }
                if(limit > data.data.length || data.data.length === 0){
                    setend(true)
                }
                if(posts){
                    
                    let newData = posts.concat(data.data)
                    setPosts(newData)
                }else{
                    setPosts(data.data)
                }
                setLoading(false) 
            })
            let nextCount = skip + limit
            setSkip(nextCount) 
            
       // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        console.log('1111')
        if(!loads) return ;
        if(end) return;
        setIntLoding(true)
            
                getAllPost(token,skip,limit)
                .then((data) =>{
                    console.log(data)
                    if(!data){
                        setIntLoding(false)
                        return setPosts([])
                    }
                    if(limit > data.data.length){
                        setend(true)
                    }
                    if(posts){
                        let newData = posts.concat(data.data)
                        setPosts(newData)
                        setloads(false)
                      
                    }else{
                        setPosts(data.data)
                        setloads(false)
                    }
                    setIntLoding(false)  
                })  
            
            let nextCount = skip + limit
            setSkip(nextCount) 
            
           
        console.table(posts)// eslint-disable-next-line 
    },[loads])

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);// eslint-disable-next-line 
    // }, []);


    // function handleScroll() {
    //     console.log(window.innerHeight + document.documentElement.scrollTop,document.documentElement.offsetHeight)
    //     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loads) return;
    //     setloads(true);
    // }

    // window.onscroll = debounce(() => {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop
    //         === document.documentElement.offsetHeight
    //       ) {
    //         // Do awesome stuff like loading more content!
    //         setloads(true);
    //       }
    // } , 0)
        
   

    

    let load = ''
    if(loading){
        return load =  <div class="progress" style={{marginTop:'55px'}}>
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
         internalLoading =  <div class="loader text-center"></div>
         
    }
    return (
            <div style={{marginTop:'50px'}}>
                <div id='infinite-list' >
                    {load}
                    {internalLoading}
                    {!end && !intLoding ?(<div className='text-center loadbtnshell' >
                    <p className='loadbtn' onClick={() =>   setloads(true)} >{end ? 'No more load' : 'Load more'}</p>
                </div>)
                    : <div className='text-center loadbtnshell' >
                        <p className='text-center notice' style={{margin : '10px'}} >{!end ? '' : <span>Looks like <b style={{color : 'black'}}>End</b> of home page join more people to see more cards</span>}</p>
                        </div> 
                    }
                    
                </div>
                
            </div>
        )
    }
export default Home
