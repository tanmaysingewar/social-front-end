import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthincated } from '../auth/helper'
import AddPostCard from './AddPostCard'
import { createPost , getColors } from './helper'

function AddPost() {

    const{user,token } = isAuthincated()

    const [colors, setColors] = useState([])

    const TextColor = ['black','white','red','green']

    useEffect(() => {
        getColors()
        .then(data =>{
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
        setValues({...values,[name]:event.target.value})
    }
    let isdisable = 'black'
    if(post === ''){
         isdisable = '#cecece'
    }

    const onSubmit = () =>{
        setValues({...values,loading : true})
        setTimeout(() => {
            if(!post){
                return ''
            }
            //loding
            createPost({postTitle : title,post,color:{textColor, cardColor}},token,user._id)
            .then(data =>{
                 //loding close
            setValues({...values,success : true})
            setValues({...values,loading : false})
            }) 
        }, 2000);
        
    }

    const performRedirect = ()=>{
        if (success) {
          return <Redirect to={'/profile/'+ user._id} />
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
                    <a  class="btn" style={{backgroundColor: isdisable}} onClick={onSubmit}>Post</a>
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
                                        <p className='warning'>*title is totally optional*</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <textarea  type="text" class="materialize-textarea" placeholder='Post' onChange={handleChange('post')} value={post} ></textarea>
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
                                    return <div className='template' style={{background: color}}
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
