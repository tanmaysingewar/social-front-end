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
        verified : '',
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

    const [profile, setprofile] = useState('')
    let limit = 6

    //****Verified will save on user database only and will be populated through user id in post request */
    const { loading,intLoding} = data

    let profileid = ''
    if(props.match.params.value === 'me'){
        profileid = user._id
    }
    else if(props.match.params.value){
        profileid = props.match.params.value
    }else{
        profileid = user._id 
    }
    console.log(post)
  useEffect(() => {
      onClickAllPost()
      setprofile(window.location.href)// eslint-disable-next-line 
  }, [window.location.href])

    

    useEffect(() => {
        setData({...data,loading :true})
        PostCounts(profileid , token)
        .then(data =>{
           setCounts(data) 
        })// eslint-disable-next-line 
    }, [profile])

    useEffect(() => {
            getUserById( profileid, token)
            .then(data =>{
                if(!data){
                    return setData([])
                }
                if(data.error){
                    return setData([{name : 'No user found'}])
                }
                setData({
                    _id : data._id,
                    joines : data.joines.count,
                    joined : data.joined.count,
                    description : data.description,
                    name : data.name,
                    email : data.email,
                    username : data.username ,
                    verified : data.verified,
                    textColor: data.color.textColor,
                    cardColor: data.color.cardColor
                })
            })// eslint-disable-next-line 
    },[profile])

    

    useEffect(() => {
        if(end)return(setloadsAll(false));
        if(!loadsAll)return;
        setBottomLoding(true)
            getPostByUserId(profileid, token, skip , limit)
        .then(data =>{
            if(!data){
                return setPost([])
            }
            if(data.error){
                return setPost([])
            }
            if(data.length < limit || data.length === 0){
              setEnd(true)
            }
                    let newData = post.concat([data])
                    setPost(newData)
                    setBottomLoding(false)
                    setloadsAll(false)
                    
        })
        let nextCount = skip + limit 
        setSkip(nextCount)
        
        // eslint-disable-next-line 
    },[loadsAll])

    useEffect(() => {
        if(end)return(setLoadsPosts(false));
        else{
            if(!loadsPosts)return;
            if(highlight === 'saved'){
                setBottomLoding(true)
                    savedPosts(profileid, token , skip,limit)
                .then(data =>{
                    if(!data){
                        setEnd(true)
                        return setPost([])
                    }
                    if(data.error){
                        setEnd(true)
                        return setPost([])
                    }
                    if(data.savedPost.length < limit || data.savedPost.length === 0){
                       setEnd(true)
                    }
                            let newData = post.concat([data.savedPost])
                            setPost(newData)
                            setBottomLoding(false)
                            setLoadsPosts(false)
                })
                
                let nextCount = skip + limit
                setSkip(nextCount)
            }
        }
        // eslint-disable-next-line 
    },[loadsPosts])

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll); // eslint-disable-next-line 
    // }, [loadsPosts, loadsAll]);

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
        setPost([])
        setData({...data,intLoding : false})
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
        setPost([])
        setData({...data,intLoding : false})
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

    
    // function handleScroll() {
    //     if (window.innerHeight + document.documentElement.scrollTop  !== document.documentElement.offsetHeight) return;
    //     if(highlight === 'all' || highlight === 'posts'){
    //             setloadsAll(true);
    //         }
    //     else if (highlight === 'saved'){
    //                 setLoadsPosts(true);
    //             }
    //     }

    let noPost =''
    let createPostStyle = 'btn-floating btn-large black'
    
    if (post === [' ']) {
        noPost =''
    }else if (bottomLoding){
        noPost =''
    }
    // eslint-disable-next-line 
    else if( post.map((postData)=>(postData.length)) == 0 ) {
        if(highlight === 'mentions'){
            noPost ='Mentions are not active yet'
        }else{
            noPost ='Not yet posted'
        }
        
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
        displayBotomLoding = <div class="loader text-center"></div>
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
            <Link onClick={() => onClickSave()} style={savedHighLight} >Saved  </Link>
        </th>
        }else{
            showSavedPost =<th className='text-center  profile-nav'>
                     <Link onClick={() => onClickMore()} style={savedHighLight} > More  </Link>
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
                                    <Link onClick={() => onClickAllPost()} style={allHighLight}  >All </Link>
                                    </th>
                                    <th className='text-center  profile-nav'   >
                                    <Link onClick={() => onClickPost()} style={postsHighLight} >Posts {counts ?  counts.posts : ''}</Link>
                                    </th>
                                    <th className='text-center  profile-nav' >
                                        <Link onClick={()=> onClickMentions()} style={mentionHighLight} >Mentions </Link>
                                    </th>
                                    {showSavedPost}
                                </tr>
                            </table>
                </div>
                {/*** Print posts here */}
                {rednderData}
                {displayBotomLoding}
                {!end && !bottomLoding && !noPost?(<div className='text-center loadbtnshell' >
                    <p className='loadbtn' onClick={() => highlight === 'all' || highlight === 'post' ? setloadsAll(true) : setLoadsPosts(true)   } >{end ? 'No more load' : 'Load more'}</p>
                </div>)
                    : <div className='text-center loadbtnshell' >
                        <p className='text-center notice' style={{margin : '10px'}} >{!end || noPost === 'Not yet posted' ? '' : <span>Looks like <b style={{color : 'black'}}>End</b> of profile page create more cards to showcase them</span>}</p>
                        </div> 
                    }
                {/***create post buttton */}
                <div class="fixed-action-btn" id='mydiv' >
                    <Link  className={createPostStyle} to='/add/post' >
                        <i id='mydiv'  class="large material-icons ">mode_edit</i>
                    </Link>
                </div> 
            </div>
        )
    }   
}

export default Profile