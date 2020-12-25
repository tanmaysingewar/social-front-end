import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAuthincated, singout } from '../auth/helper'
import { postReview } from './helper'

function Setting() {

   
    const { token} = isAuthincated()

    const [success, setsuccess] = useState(false)

    const [review, setreview] = useState('')
    const performRedirect = ()=>{
        if (success) {
          return <Redirect to='/singin' />
        }
    }


    const Onsubmit = () =>{
        if(review.replace(/ /g,"") === ''){
            return ''
        }
        postReview(review , token)
        .then((data) =>{
            if(!data){
                return ''
            }
            setreview('')
        })
    }


    const handleChange = (name) => event =>{
        setreview(event.target.value)
    }
    return (
        <div style={{backgroundColor :'#2B3436' ,height : '100vh',  marginTop: '40px'}}>
            <div className='white-text' style={{paddingTop : '20px' , marginLeft : '10px', marginRight : '10px'}}>
            <h5 >Settings</h5>
            <Link to='/singup'><p>Sign up</p></Link>
            <Link to='/singin'><p>Log In</p></Link>
            <button onClick={() => singout(()=>{
                setsuccess(true)
            })} class='btn' style={{backgroundColor : 'red'}}>Log out</button>
           
           <div className='card' style={{marginTop : '40px'}}>
               <div className='card-content text-center'>
               <h5 style={{color : 'black'}} >Review</h5>
           <span className='notice'>“Your opinion matters.” Plz let us know</span><br/>
           <span className='notice' style={{fontSize : '10px'}}>You can also mention bugs and error in application</span>
               <div class="row">

                <div class="input-field col s12">
                    <textarea onChange={handleChange()}  type="text" class="materialize-textarea " placeholder='Review' value={review}  style={{height:'100px'}} ></textarea> 
                                      
                    </div>
                </div>
                <div className='text-center'>
                    <button className='btn black' onClick={() => Onsubmit()}>Send</button><br/><br/>
                    <span className='notice' style={{fontSize : '12px'}}>Created and managed by</span><br/>
                    <span className='notice' style={{fontSize : '15px'}}><b>Tanmay Singewar Productions</b></span>
                </div>
               </div>

           </div>
           
                
            </div>
            {performRedirect()}
            
        </div>
    )
}

export default Setting
