import React,{useState,useEffect} from 'react'
import { isAuthincated} from '../auth/helper'
import { commentPost, islikedPost, likePost } from '../user/helper'
import Bookmark from './svg/Bookmark'
import VerifiedSvg from './svg/Verified'




function Card({index , cardData}) {

  const {user, token } = isAuthincated()

  const [like, setLike] = useState('')

  const [comments, setComment] = useState({
    comment: ''
  })

  const {comment} =comments

  const handleChange = (name)=> event =>{
    setComment({...comments,[name]:event.target.value})
  }

  useEffect(() => {
    islikedPost(cardData._id,token)
    .then(data =>{
      setLike(data.liked)
    })
  }, [])

  //Todo: verified should come here also
  let verified = true
  let vSvg = ''
  if (verified === true) {
    vSvg = <VerifiedSvg/>
    }else{
    vSvg = ''
}
  
  let likeclass = 'material-icons'

  if(like){
    likeclass = 'material-icons likeIcon'
    cardData.likes.count = cardData.likes.count 
  }

  const onLike = (likeclass) =>{
    if (likeclass == 'material-icons likeIcon') {
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
    cardData.likes.count = cardData.likes.count 
  }
  if(like === 'disliked'){
    likeclass = 'material-icons'
    cardData.likes.count = cardData.likes.count 
  }
 
  let commentData = ''
  if(cardData.comments.count > 0){
  commentData =  `See all ${cardData.comments.count} comments`
  }
  if(cardData.comments.count === 1){
    commentData =  `See comments`
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

  // const dateCompiler =(gotdate) =>{
  //   var date = gotdate
  //   var hours = date.getHours();
  //   var minutes = date.getMinutes();

  //   // Check whether AM or PM 
  //   var newformat = hours >= 12 ? 'PM' : 'AM';

  //   // Find current hour in AM-PM Format 
  //   hours = hours % 12;

  //   // To display "0" as "12" 
  //   hours = hours ? hours : 12;
  //   minutes = minutes < 10 ? '0' + minutes : minutes;

  //   date = hours + ':' + minutes + ' ' + newformat;

  //   console.log(date)
  // }

  // dateCompiler(cardData.createdAt)


    return (
        <div>
            <div class="row bm0">
              <div class="col s12 m6">
              <div class="card bm0" key={index} style={{background : cardData.color.cardColor}}>
              <div class="card-content bm0" >
              <div className='input-field'>
              <table border='2px solid'>
                <td className='liketdwidth' style={{color : cardData.color.textColor}}><span>@{cardData.author.username}</span></td>
                <td className='svgverify'>{vSvg}</td>
                  <td className='collection-icon'><Bookmark /></td>
              </table>
            </div>
            {/* <span class="card-title">Card Title</span> */}
            <p class="justify" style={{color : cardData.color.textColor}}>{cardData.post}</p><br/>
          </div>
        </div>
        <table className='liketable'>
              <td className='liketdwidth' onClick={()=> onLike(likeclass)}><i className={likeclass}>thumb_up</i></td>
              <td><spam>{cardData.likes.count}</spam></td>
        </table>
          <div class=" col s11 ">
            {/***Add link to the see all comment page  */}
          <span>{commentData}</span>
              <div className='input-field commentSection'>
                <input   class="materialize-textarea" data-length="100" placeholder='Comment' onChange={handleChange('comment')} value={comment} autoComplete='off' />
                <i class="material-icons prefix" onClick={onComment} >send</i>
              </div>
          </div>
      </div>
    </div>
  </div>
    )
}

export default Card
