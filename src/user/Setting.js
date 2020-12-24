import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { singout } from '../auth/helper'

function Setting() {

    const [success, setsuccess] = useState(false)
    const performRedirect = ()=>{
        if (success) {
          return <Redirect to='/singin' />
        }
    }
    return (
        <div style={{background : 'black' ,height : '100vh'}}>
            <div className='white-text' style={{paddingTop : '50px' , marginLeft : '20px'}}>
            <h5 >Settings</h5>
            <Link to='/singup'><p>Login</p></Link>
            <Link to='/singin'><p>Signup</p></Link>
            <p onClick={() => singout(()=>{
                setsuccess(true)
            })} class='warning'>Log out</p>
           
            </div>
            {performRedirect()}
            
        </div>
    )
}

export default Setting
