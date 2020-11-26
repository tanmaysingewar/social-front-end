import React, { useEffect, useState } from 'react'
import Card from '../core/Card'
import { getPostByUserId, getUserById, isAuthincated } from '../auth/helper'
import { Link } from 'react-router-dom'
import ProfileCard from './ProfileCard'
import { PostCounts, savedPosts } from './helper'
import Deatils from './Deatils'

function Profile() {
    const { user, token } = isAuthincated()
    const [data, setData] = useState({
        _id : '',
        joines : '',
        joined : '',
        description : '',
        name : '',
        email : '',
        username : '',
        verified : false,
        textColor: '',
        cardColor: '',
        loading : false
    })

    const [post, setPost] = useState([])

    const [counts, setCounts] = useState('')

    const [highlight, setHighlight] = useState('all')

    const [clickedMore, setClickedMore] = useState(false)


    //****Verified will save on user database only and will be populated through user id in post request */
    const { joines ,joined , description , name , email , username ,verified ,textColor ,cardColor ,loading, _id} = data


    useEffect(() => {
        setData({...data,loading :true})
        getUserById( user._id , token)
        .then(data =>{
            setData({
                _id : data._id,
                joines : data.joines.count,
                joined : data.joined.count,
                description : data.description,
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
            setPost([data])
        })

        PostCounts(user._id , token)
        .then(data =>{
           setCounts(data) 
        })
    }, [])


    const onClickAllPost = () =>{
        setClickedMore(false)
        setHighlight('all')
        getPostByUserId(user._id , token)
        .then(data =>{
            setPost([data])
        })
    }

    const onClickPost = () =>{
        setClickedMore(false)
        setHighlight('posts')
        getPostByUserId(user._id , token)
        .then(data =>{
            setPost([data])
        })
    }

    const onClickMentions = () =>{
        setClickedMore(false)
        setHighlight('mentions')
        setPost([])
    }

    const onClickSave = () =>{
        setClickedMore(false)
        setHighlight('saved')
        savedPosts(user._id , token)
        .then(data =>{
            setPost([data.savedPost])
        })
    }

    const onClickMore = ( ) =>{
        setHighlight('saved')
        setPost([' '])
        setClickedMore(true)
    }

    let rednderData =''

    if(!clickedMore){
        rednderData = post.map((postData)=>(
            postData.map((cardData,index)=>(
                <Card 
                key={index}
                cardData={cardData}
                 />
            ))
        ))
    }else{
        rednderData = <Deatils data={data} />
    }

    let allHighLight = {color : '#7f7f7f'}
    let postsHighLight = {color : '#7f7f7f'}
    let mentionHighLight = {color : '#7f7f7f'}
    let savedHighLight = {color : '#7f7f7f'}

    if(highlight){
        if (highlight === 'all') {
             allHighLight = {color : '#252d2d'}
             postsHighLight = {color : '#7f7f7f'}
             mentionHighLight = {color : '#7f7f7f'}
             savedHighLight = {color : '#7f7f7f'}
        }
        if (highlight === 'posts') {
            allHighLight = {color : '#7f7f7f'}
            postsHighLight = {color : '#252d2d'}
            mentionHighLight = {color : '#7f7f7f'}
            savedHighLight = {color : '#7f7f7f'}
       }
       if (highlight === 'mentions') {
            allHighLight = {color : '#7f7f7f'}
            postsHighLight = {color : '#7f7f7f'}
            mentionHighLight = {color : '#252d2d'}
            savedHighLight = {color : '#7f7f7f'}
        }if (highlight === 'saved') {
            allHighLight = {color : '#7f7f7f'}
            postsHighLight = {color : '#7f7f7f'}
            mentionHighLight = {color : '#7f7f7f'}
            savedHighLight = {color : '#252d2d'}
}
    }


    let noPost =''
    let createPostStyle = 'btn-floating btn-large black'
    
    if (post.map((postData)=>(postData.length)) == 0) {
        noPost ='Not yet posted'
        createPostStyle = 'btn-floating btn-large black pulse'
    }
    
    
    if(loading){
        return (
            <div>
                <div class="progress">
                <div class="indeterminate"></div>
            </div>
            </div>
        )

    

    }
    
    else{
        let showSavedPost = ''
        if(_id === user._id){
            showSavedPost =<th className='text-center  profile-nav'>
            <a onClick={() => onClickSave()} style={savedHighLight} >Saved  </a>
        </th>
        }else{
            showSavedPost =<th className='text-center  profile-nav'>
                     <a onClick={() => onClickMore()} style={savedHighLight} > More  </a>
                </th>
        }
        return (
            <div >
                
                <div class="row">
                    <div class="col s12 m6">
                        {/***Crad here */}
                        <ProfileCard data={data} post={post} />
                    </div>
                    <table className='bm0 profile-nav' >
                                <tr  >
                                    <th className='text-center  profile-nav ' style={{paddingLeft: '5px'}} >
                                    <a onClick={() => onClickAllPost()} style={allHighLight}  >All </a>
                                    </th>
                                    <th className='text-center  profile-nav'   >
                                    <a onClick={() => onClickPost()} style={postsHighLight} >Posts {counts.posts}</a>
                                    </th>
                                    <th className='text-center  profile-nav' >
                                        <a onClick={()=> onClickMentions()} style={mentionHighLight} >Mentions </a>
                                    </th>
                                    {showSavedPost}
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
                   rednderData
                }
                {/***create post buttton */}
                <div class="fixed-action-btn">
                    <Link className={createPostStyle} to='/post'>
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
            </div>
        )
    }   
}

export default Profile