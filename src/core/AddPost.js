import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthincated } from '../auth/helper'
import AddPostCard from './AddPostCard'
import { createPost , getColors } from './helper'

function AddPost() {

    const{user,token } = isAuthincated()

    const [colors, setColors] = useState([])

    const [warningMsg, setWarningMsg] = useState({
        title : '',
        post : ''
    })

    const [disableButton, setDisableButton] = useState(false)

    const TextColor = ['black','white','red','green']

    useEffect(() => {
        getColors()
        .then(data =>{
            if(!data){
                return setColors([])
            }
            setColors(data)
        }) 
    }, [])

    const [values, setValues] = useState({
        title : '',
        post: '',
        textColor : 'black',
        cardColor: 'white',
        success: false,
        loading : false
    })

    const{title,post,textColor,cardColor,success,loading} = values

    const handleChange = (name)=> event =>{
        if(name == 'title'){
            if(event.target.value.length > 25){
                setDisableButton(true)
                setWarningMsg({... warningMsg, title : 'title is too long'})
                return setValues({...values,[name]: title})
            }
            setWarningMsg({... warningMsg, title : ''})
        }
        if(name == 'post'){
            
            if(event.target.value.length > 1000){
                setDisableButton(true)
                setWarningMsg({... warningMsg, post : 'post is too long'})
                return setValues({...values,[name]: post})
            }
            setWarningMsg({... warningMsg, post : ''})
            if(event.target.value.length === 0) setWarningMsg({... warningMsg, post : 'post is required'})
        }
        setDisableButton(false)
        setValues({...values,[name]:event.target.value})
    }
    

    const onSubmit = () =>{
        setDisableButton(true)
        setValues({...values,loading : true})
            if(!post  || warningMsg.title || warningMsg.post === 'post is too long'){
                setValues({...values,loading : false})
                setWarningMsg({... warningMsg, post : 'post is required'})
                return setValues({...values,success : false})
            }
            //loding
            createPost({postTitle : title,post,color:{textColor, cardColor}},token,user._id)
            .then(data =>{
                 //loding close
                 if(data){
                    setValues({...values,success : true})
                 }
                 if(data.error){
                    setValues({...values,loading : false})
                   return setValues({...values,success : false})
                 }
                 setDisableButton(false)
                 setValues({...values,loading : false})
            }) 
        
    }

    const performRedirect = ()=>{
        if (success) {
          return <Redirect to={'/profile/me'} />
        }
    }

    if(loading){
        return  <div class="progress" style={{marginTop:'60px'}}>
        <div class="indeterminate"></div>
      </div>
    }

    return (
        <div>
            <AddPostCard values={values} username={user.username} />
            <div class="row">
                <div className='text-center' >
                    <button  class="btn black" disabled={disableButton}  onClick={onSubmit}>Post</button>
                    <p className='notice'>Click here to post</p>
                </div>
                <div class="col s12 m6">
                    <div class="card" >
                        <div class="card-content" >
                            <h6 className='text-center notice'>Fill the given below fields</h6>
                        <div class="row">
                            <div class="col s12">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input   id="disabled" type="text" class="validate" placeholder='Title' onChange={handleChange('title')} value={title} autoComplete='off'/>
                                        <p className='warning'>{warningMsg.title}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <textarea  type="text" class="materialize-textarea" placeholder='Post' onChange={handleChange('post')} style={{height:'100px'}} value={post} ></textarea>
                                        <p className='warning'>{warningMsg.post}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12">
                                            This is an text colour input field:
                                        <div class="input-field inline " >
                                            <input  type="color" class="validate" onChange={handleChange('textColor')} value={textColor}  />
                                        </div>
                                        <div className='template-box-text'>
                                            {
                                            TextColor.map(color =>{
                                            return  <div className='template-text' style={{background: color ,border: '0.5px solid grey'}}
                                                onClick={()=> (setValues({...values,textColor: color}))}
                                                ></div>
                                            })
                                            }
                                        </div>
                                    </div>
                                    <div class="col s12">
                                        This is an card colour input field:
                                        <div class="input-field inline">
                                            <input  type="color" class="validate" onChange={handleChange('cardColor')} value={cardColor} />
                                        </div>
                                    </div>
                                </div>
                                <div className='template-box'>
                                    {colors.map(color => {
                                    return <div className='template' style={{background: color,border : '1px solid #dadce0'}}
                                        onClick={()=> setValues({...values,cardColor: color})}
                                    ></div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {performRedirect()}
        </div>
    )
}

export default AddPost
