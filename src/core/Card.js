import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthincated} from '../auth/helper'
import { commentPost, islikedPost, likePost } from '../user/helper'
import { isPostSaved, savePost , ondeletePost} from './helper'
import Bookmark from './svg/Bookmark'
import VerifiedSvg from './svg/Verified'

function Card({index , cardData, showComment = false}) {
  
  const {user, token } = isAuthincated()
  const [like, setLike] = useState('')
  const [save, setSave] = useState('')
  const [comments, setComment] = useState({
    comment: ''
  })
  const [deletePost, setDeletePost] = useState(false)
  const {comment} =comments
  const handleChange = (name)=> event =>{
    setComment({...comments,[name]:event.target.value})
  }

  useEffect(() => {
    islikedPost(cardData._id,token)
    .then(data =>{
      setLike(data.liked)
    })

    isPostSaved(cardData._id, user._id, token)
    .then(data => {
      setSave(data.msg)
    })// eslint-disable-next-line 
  }, [cardData._id])

  
  //Todo: verified should come here also
  let vSvg = ''
  if(cardData.author){
    if (cardData.author.verified === true ) {
      vSvg = <VerifiedSvg color={cardData.color.textColor}/>
      }else{
      vSvg = ''
  }
  }
  
  
  let likeclass = 'material-icons'

  if(like){
    likeclass = 'material-icons likeIcon'
    // cardData.likes.count = cardData.likes.count 
  }

  const onLike = (likeclass) =>{
    if (likeclass === 'material-icons likeIcon') {
      cardData.likes.count = cardData.likes.count - 1
      setLike('disliked')
    }else{
      cardData.likes.count = cardData.likes.count + 1
      setLike('liked')
    }
    likePost(cardData._id,user._id,token)
  }

  if(like === 'liked'){
    likeclass = 'material-icons likeIcon'
    // cardData.likes.count = cardData.likes.count 
  }
  if(like === 'disliked'){
    likeclass = 'material-icons'
    // cardData.likes.count = cardData.likes.count 
  }
 
  let commentData = 'Add comments'
  if(cardData.comments.count > 0){
  commentData =  `See all ${cardData.comments.count} comments`
  }
  if(cardData.comments.count === 1){
    commentData =  `See comments`
    }
  if(showComment){
    commentData = `Add comments`
  }


  const onComment =(event)=>{
    event.preventDefault()
    const com =comments.comment.replace(/ /g,"")
    if(com.length < 1){
      return setComment({...comment,comment:''})
    }
    commentPost(cardData._id,token,comments)
    cardData.comments.count = cardData.comments.count + 1
    setComment({...comment,comment:''})
  }

  const onSavePost = () =>{
    if(save === 'unsaved'){
      setSave('saved')
    }
    if(save === 'saved'){
      setSave('unsaved')
    }
    savePost(cardData._id, user._id, token)
    .then(data =>{
      // setSave
    })
  }

  const ondelete = () =>{
    ondeletePost(cardData._id, user._id, token)
    .then(date =>{
      setDeletePost('deleted')
    })
  }

  const commentSection = () =>{
      let displayComment = ''
      if(showComment){
        displayComment = cardData.comments.comment.map((comments)=>{
          return <div style={{marginBottom : '10px'}}>
                   <b style={{padding: '0px'}}>@{comments.username.username}</b><br/>
                   <span style={{marginLeft : '15px'}}>{comments.commentText}</span>
               </div>
       })
      }

      return <div class="col s11 ">
      {/***Add link to the see all comment page  */}
          <span style={{fontSize : '12px'}}><Link to={"/post/allcomments/"+ cardData._id} className='notice'>{commentData}</Link></span>
            <div className='input-field commentSection'>
              <input className="commentitextarea" data-length="100" placeholder='Comment' onChange={handleChange('comment')} value={comment} autoComplete='off' />
                <i class="material-icons prefix" onClick={onComment}  style={{fontSize : '23px',marginTop : '-2px',marginLeft : '5px'}}>send</i>
               {displayComment}
            </div>
            
    </div>
    
  }

  let date = new Date(cardData.createdAt);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();
  
  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  let deleteButton = ''
  
  if(cardData.author){if (user._id === cardData.author._id) {
    deleteButton = <span class="material-icons" onClick={() => setDeletePost(true)}> delete </span>
  }}

    let render = ''
    if(!cardData.author){
      return render =''
    }
    if(!deletePost ){
      render =  <div class="row bm0">
                  <div class="col s12 m6">
                    <div class="card bm0" key={index} style={{background : cardData.color.cardColor }}>
                      <div class="card-content bm0">
                        <div className='input-field' >
                          <table border='2px solid'>
                            <td className='authername' style={{color : cardData.color.textColor}}><Link to={'/profile/'+ cardData.author._id}><span style={{color : cardData.color.textColor}}>@{cardData.author ? cardData.author.username : ''}</span></Link></td>
                            <td className='svgverify'>{vSvg}</td>
                            <td className='collection-icon' ><div onClick={() => onSavePost()}><Bookmark color={cardData.color.textColor} saved={save}/></div></td>
                          </table>
                        </div>
                          <span class="card-title truncate" style={{color : cardData.color.textColor}}>{cardData.postTitle}</span>
                          <p class="justify " style={{color : cardData.color.textColor, whiteSpace: 'pre-line'}}>{cardData.post}</p><br/>
                          <p className='dateoncard'  style={{color : cardData.color.textColor}}>{dt+'-' + month + '-'+year}</p>
                      </div>
                    </div>
                    <table className='liketable'>
                          <td className='liketdwidth' onClick={()=> onLike(likeclass)}><i className={likeclass}>thumb_up</i></td>
                          <td><spam>{cardData.likes.count}</spam></td>
                    <td style={{float : 'right', paddingRight: '10px'}} >{deleteButton}</td>
                    </table>
                    {commentSection()}
                </div>
              </div>
            }
            else{
                render = 
                  <div class="row bm0">
                    <div class="col s12 m6">
                      <div class=" bm0" key={index} >
                        <div style={{padding : '10px'}}>
                              <span>Delete this post!!</span>
                              <button  className='btn-small delete-ok-button' onClick={() => ondelete()} >Ok</button>
                              <span className='delete-cancel' onClick={()=> setDeletePost(false)}>cancel</span>
                          </div>
                        </div>
                      </div>
                    </div>
              }

              if(deletePost === 'deleted'){
                render = ''
              }
      return ( 
        <div >
           {render}
        </div>
    )
}


export default Card
