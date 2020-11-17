import React, { useEffect, useState } from 'react'
import Card from '../core/Card'
import BottomNav from '../core/BottomNav'
import { getPostByUserId, getUserById, isAuthincated } from '../auth/helper'
import { Link } from 'react-router-dom'
import ProfileCard from './ProfileCard'


function Profile() {
    const { user, token } = isAuthincated()
    const [data, setData] = useState({
        joines : '',
        joined : '',
        description : '',
        posts : '',
        name : '',
        email : '',
        username : '',
        verified : false,
        textColor: '',
        cardColor: '',
        loading : false
    })

    const [post, setPost] = useState([])

    console.log(post,'Post State 1')

    //****Verified will save on user database only and will be populated through user id in post request */
    const { joines ,joined , description , posts , name , email , username ,verified ,textColor ,cardColor ,loading} = data


    useEffect(() => {
        setData({...data,loading :true})
        getUserById( user._id , token)
        .then(data =>{
            setData({
                joines : data.joines,
                joined : data.joined,
                description : data.description,
                posts : data.posts,
                name : data.name,
                email : data.email,
                username : data.username ,
                verified : true,
                textColor: data.color.textColor,
                cardColor: data.color.cardColor,
                loading : false
            })
        })
        getPostByUserId(user._id , token)
        .then(data =>{
                console.log(data)
            setPost([data])
            console.log([data].length)
        })
    }, [])

    const onClickMentions = () =>{
        setPost([])
    }

    const onClickPost = () =>{
        getPostByUserId(user._id , token)
        .then(data =>{
                console.log(data)
            setPost([data])
            console.log([data].length)
        })
    }

    const onClickSave = () =>{
        setPost([])
    }

    let noPost =''
    
    if (post.map((postData)=>(postData.length)) == 0) {
        noPost ='Not yet posted'
    }
    let postlength =''
    if(post){
        postlength = post.map((postData)=>(postData.length)) 
    }
    
    if(loading){
        return (
            <div>
                <div class="progress">
                <div class="indeterminate"></div>
            </div>
            </div>
        )
    }else{
        return (
            <div>
                <div class="row">
                    <div class="col s12 m6">
                        {/***Crad here */}
                        <ProfileCard data={data} post={post} />
                        {/* <div class="card bm0" > */}
                        
                            {/* </div> */}
                    </div>{
                        //**** we are going to create seprate route for getting count of (how many post ,mentions and saved are there) all posts*/
                    }
                    <table className='bm0 profile-nav'>
                                <tr>
                                    <th className='text-center  profile-nav ' style={{paddingLeft: '5px'}}>
                                    <a onClick={() => onClickPost()}  >All {postlength}</a>
                                    </th>
                                    <th className='text-center  profile-nav'>
                                    <a onClick={() => onClickPost()} style={{color : '#252d2d'}} >Posts {postlength}</a>
                                    </th>
                                    <th className='text-center  profile-nav'>
                                        <a onClick={()=> onClickMentions()}  >Mentions</a>
                                    </th>
                                    <th className='text-center  profile-nav'>
                                        <a onClick={() => onClickSave()}  >Saved</a>
                                    </th>
                                </tr>
                            </table>
                </div>
                
        <h5 className='text-center notice mt-5'>{noPost}</h5>
    
                {/***Cards which user will post like
                 * <Post />
                 * <Mentions />
                 * <Saved />
                */}
                {/* <div class="progress">
                <div class="indeterminate"></div>
            </div> */}
                {/*** Print posts here */}
                {
                    post.map((postData)=>(
                        postData.map((cardData,index)=>(
                            <Card 
                            key={index}
                            cardData={cardData}
                             />
                        ))
                    ))
                }
                {/***create post buttton */}
                <div class="fixed-action-btn">
                    <Link className='btn-floating btn-large black pulse' to='/post'>
                        <i class="large material-icons ">mode_edit</i>
                    </Link>
                </div>
               
                <div class="row">
                <div class="col s12 m6">
                        <div class="card ">
                            <div class="card-content ">
                                <h6 className=' text-center'>About this Section</h6><br/>
                                    <p className='notice text-center'>We hope you have enjoyed using Materialize and if you feel like it has helped you out and want to support the team you can help us by donating or backing us on Patreon. Any amount would help support and continue development on this project and is greatly appreciated.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomNav />
                </div>
        )
    }   
}

export default Profile