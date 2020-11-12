import React,{useState} from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthincated } from '../auth/helper'
import AddPostCard from './AddPostCard'
import { createPost } from './helper'
function AddPost() {

    const{user,token } = isAuthincated()
    const [values, setValues] = useState({
        title : '',
        post: '',
        textColor : '',
        cardColor: '',
        success: false
    })

    const{title,post,textColor,cardColor,success} = values

    const handleChange = (name)=> event =>{
        setValues({...values,[name]:event.target.value})
    }
    let isdisable = 'black'
    if(post === ''){
         isdisable = '#cecece'
    }

    const onSubmit = () =>{
        if(!post){
            return ''
        }
        //loding
        createPost({title,post,color:{textColor, cardColor}},token,user._id)
        .then(data =>{
             //loding close
        setValues({...values,success : true})
        })
    }

    const performRedirect = ()=>{
        if (success) {
          return <Redirect to='/profile' />
        }
    }

    return (
        <div>
            <AddPostCard values={values} />
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
                        <div className='template-text' style={{background: 'white',border: '0.5px solid grey'}}
                    onClick={()=> (setValues({...values,textColor:'white'}))}
                ></div>
                <div className='template-text' style={{background: 'black'}}
                     onClick={()=> (setValues({...values,textColor:''}))}
                ></div>
                <div className='template-text' style={{background: 'red'}}
                     onClick={()=> (setValues({...values,textColor:'red'}))}
                ></div>
                <div className='template-text' style={{background: 'green'}}
                     onClick={()=> (setValues({...values,textColor:'green'}))}
                ></div>
                </div>
                    </div>
                        <div class="col s12">
                                This is an card colour input field:
                        <div class="input-field inline">
                        <input  type="color" class="validate" onChange={handleChange('cardColor')} value={cardColor} />
                        </div>
                    </div>
                    
                    </div>
                    <h6 className='mb-5' >Cards templates</h6><br/>
                    <div className='template-box'>
                <div className='template' style={{background: 'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'}}
                    onClick={()=> (setValues({...values,cardColor:'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'}))}
                ></div>
                <div className='template' style={{background: 'linear-gradient(to right, #ff0099, #493240)'}}
                     onClick={()=> (setValues({...values,cardColor:'linear-gradient(to right, #ff0099, #493240)'}))}
                ></div>
                <div className='template' style={{background: 'linear-gradient(to right, #1f4037, #99f2c8)'}}
                     onClick={()=> (setValues({...values,cardColor:'linear-gradient(to right, #1f4037, #99f2c8)'}))}
                ></div>
                <div className='template' style={{background: 'linear-gradient(to right, #f953c6, #b91d73)'}}
                     onClick={()=> (setValues({...values,cardColor:'linear-gradient(to right, #f953c6, #b91d73)'}))}
                ></div>
                <div className='template' style={{background: 'linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #8360c3, #2ebf91)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #009fff, #ec2f4b)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to left, #009fff, #ec2f4b)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #654ea3, #eaafc8)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #a8ff78, #78ffd6)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #fdc830, #f37335)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #ad5389, #3c1053)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'}}></div>
                <div className='template' style={{background: 'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'}}></div>
                
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
