import React, { useEffect, useState } from 'react'
import Card from '../core/Card'
import { getPostByUserId, getUserById, isAuthincated } from '../auth/helper'
import { Link } from 'react-router-dom'
import ProfileCard from './ProfileCard'
import { PostCounts, savedPosts } from './helper'
import Deatils from './Deatils'

function Profile(props) {
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
        loading : false,
        intLoding : false
    })

    const [post, setPost] = useState([])

    const [counts, setCounts] = useState('')

    const [highlight, setHighlight] = useState('all')

    const [clickedMore, setClickedMore] = useState(false)

    const [skip, setSkip] = useState(0)

    const [bottomLoding, setBottomLoding] = useState(false)

    const [loadsAll, setloadsAll] = useState(true)

    const [loadsPosts, setLoadsPosts] = useState(false)

    const [end, setEnd] = useState(false)

    let limit = 3

    console.log(post)


    //****Verified will save on user database only and will be populated through user id in post request */
    const { joines ,joined , description , name , email , username ,verified ,textColor ,cardColor ,loading,intLoding, _id} = data

    
    let profileid = ''
    if(props.match.params.value === 'me'){
        profileid = user._id
    }
    else if(props.match.params.value){
        profileid = props.match.params.value
    }else{
        profileid = user._id
    }
    useEffect(() => {
        setData({...data,loading :true})
        setTimeout(() => {
        PostCounts(profileid , token)
        .then(data =>{
           setCounts(data) 
        })
        }, 2000);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getUserById( profileid , token)
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
                    cardColor: data.color.cardColor
                })
            })
        },2000)
    },[profileid])

    useEffect(() => {
        console.log('load Post triggered')
        if(end)return(setloadsAll(false));
        if(!loadsAll)return;
        setBottomLoding(true)
        getPostByUserId(profileid , token, skip , limit)
        .then(data =>{
            if(data.length < limit || data.length === 0){
                setEnd(true)
            }
                console.log('1')
                setTimeout(() => {
                    let newData = post.concat([data])
                    setPost(newData)
                    setBottomLoding(false)
                    setloadsAll(false)
                },2000)
        })
        let nextCount = skip + limit
        setSkip(nextCount)
        
    },[loadsAll])

    useEffect(() => {
        if(end)return(setLoadsPosts(false));
        else{
            if(!loadsPosts)return;
            if(highlight === 'saved'){
                setBottomLoding(true)
                savedPosts(profileid , token , skip,limit)
                .then(data =>{
                    console.log(data.savedPost.length , 'Data length')
                    if(data.savedPost.length < limit || data.savedPost.length === 0){
                        setEnd(true)
                    }
                        console.log('1')
                        setTimeout(() => {
                            let newData = post.concat([data.savedPost])
                            setPost(newData)
                            setBottomLoding(false)
                            setLoadsPosts(false)
                        },2000)
                })
                let nextCount = skip + limit
                setSkip(nextCount)
            }
        }
        
    },[loadsPosts])




    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadsPosts, loadsAll]);




    const onClickAllPost =  () =>{
        setEnd(false)
        setClickedMore(false)
        setHighlight('all')
        setData({...data,intLoding : true})
        setSkip(0)
        setPost([])
        setloadsAll(true)
        setData({...data,intLoding : false})
    }

    const onClickPost =  () =>{
        setEnd(false)
        setClickedMore(false)
        setHighlight('posts')
        setData({...data,intLoding : true})
        setSkip(0)
        setPost([])
        setloadsAll(true)
        setData({...data,intLoding : false})
    }

    const onClickMentions = () =>{
        setEnd(false)
        setClickedMore(false)
        setHighlight('mentions')
        setData({...data,intLoding : true})
        setTimeout(() => {
        setPost([])
        setData({...data,intLoding : false})
        }, 2000);
    }

    const onClickSave = () =>{
        setEnd(false)
        setClickedMore(false)
        setHighlight('saved')
        setData({...data,intLoding : true})
        setSkip(0)
        setPost([])
        setLoadsPosts(true)
        setData({...data,intLoding : false})
    }

    const onClickMore = ( ) =>{
        setEnd(false)
        setClickedMore(true)
        setHighlight('saved')
        setData({...data,intLoding : true})
        setTimeout(() => {
        setPost([])
        setData({...data,intLoding : false})
        }, 2000);
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

    
    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if(highlight === 'all' || highlight === 'posts'){
                setloadsAll(true);
            }
        else if (highlight === 'saved'){
                    setLoadsPosts(true);
                }
        }
    let noPost =''
    let createPostStyle = 'btn-floating btn-large black'
    
    if (post === [' ']) {
        noPost =''
    }else if (bottomLoding){
        noPost =''
    }
    else if( post.map((postData)=>(postData.length)) == 0 ) {
        noPost ='Not yet posted'
        createPostStyle = 'btn-floating btn-large black pulse'
    }
    if(user._id !== profileid){
        createPostStyle = 'displayNone'
    }

    let rednderData =''

    if(intLoding){
        rednderData =  <div class="progress" >
        <div class="indeterminate"></div>
      </div>
    }
    else{
        if(!clickedMore){
        rednderData =<div>
        <h5 className='text-center notice mt-5'>{noPost}</h5>
        {post.map((postData)=>(
            postData.map((cardData,index)=>(
                <Card 
                key={index}
                cardData={cardData}
                 />
            ))
        ))}
        </div>
    }
    else{
        rednderData = <Deatils data={data} />
    }
}
    let displayBotomLoding = ''
    if(bottomLoding){
        displayBotomLoding = <div class="progress" style={{marginBottom : '40px'}}>
        <div class="indeterminate"></div>
      </div>
    }
    if(loading){
        return (
            <div>
                <div class="progress" style={{marginTop:'55px'}}>
                <div class="indeterminate"></div>
            </div>
            </div>
        )
    }
    else{
        let showSavedPost = ''
        if(user._id === profileid){
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
                {/*** Print posts here */}
                {rednderData}
                {displayBotomLoding}
                {/***create post buttton */}
                <div class="fixed-action-btn">
                    <Link className={createPostStyle} to='/post'>
                        <i class="large material-icons ">mode_edit</i>
                    </Link>
                </div>
               
                
            </div>
        )
    }   
}

export default Profile