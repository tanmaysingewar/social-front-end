import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { authincate, singin  } from '../auth/helper'

function Singin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    success : false,
    error:'',
    param: '',
    params : {
      email : '',
      password : ''
    }
  })

  const { email, password , success  ,param ,params} = values


  let mainMessage = ''
  let emailMessage = ''
  let passwordlMessage = ''

  if (param) {
    mainMessage = '*Email and password dosent match param*'
  }
  if (param === 'email'){
    emailMessage= '*Email is require*'
  }
  if (param === 'password'){
    passwordlMessage = '*Password is required*'
  }
  if (params.email === 'emptyinputs-email') {
    emailMessage= 'Email is require'
  }
  if (params.password === 'emptyinputs-password') {
    passwordlMessage = '*Password is required*'
  }

  const handleChange = (name) => event =>{
    setValues({...values,[name]:event.target.value})
  }

  const onSubmit = (event) =>{
    event.preventDefault()
    if (email && password) {
      singin({email , password})
    .then(data =>{
      if (data.error) {
          setValues({...values,param: data.error})
      }
      else{
        if (!data) {
          setValues({...values, param:'finalCheck'})
        }else{
          authincate(data,()=>{
            //Redirection will be there afteward
            setValues({...values, success:true})
          })
            setValues({
                ...values,
                email:'',
                password:'',
                error:'',
                param:''
            })
        }
      }
    })
    }else{
      
      }if(password === ''){
        setValues({...values,params:{
          password : 'emptyinputs-password'
        }})
      }
      if(email === ''){
        setValues({...values,params:{
          email : 'emptyinputs-email'
        }})
      }
      if (email === '' && password === '') {
        setValues({...values,params:{
          email : 'emptyinputs-email',
          password : 'emptyinputs-password'
        }})
      
    }
}

  const performRedirect = ()=>{
      if (success) {
        return <Redirect to='/profile' />
      }
  }


    return (
        <div>
          <div class="row">
            <div class="col s12 m6">
                  <h2 className='text-center welcome-text'>Welcome!!</h2>
              <div class="card ">
                <div class="card-content ">
                  <h3 className='text-center'>Sing In</h3>
                      <p className='warning text-center'>{mainMessage}</p>
                  <div class="row">
                    <form class="col s12" autoComplete='off'>
                      <div class="row singin-form">
                        <div class="input-field col s12">
                          <input id="email" type="text" class="validate" placeholder='Email' onChange={handleChange('email')} value={email} />
                            {/* Email is require represent only after if noting is in input field */}
                            <p className='warning'>{emailMessage}</p>
                        </div>
                      </div>
                      <div class="row singin-form">
                        <div class="input-field col s12">
                          <input id="password" type="password" class="validate" placeholder='Password' onChange={handleChange('password')} value={password} />
                          {/* Email is require represent only after if noting is in input field */}
                      <p className='warning'>{passwordlMessage}</p>
                        </div>
                      </div>
                      <div class="row singin-form">
                        <div class="input-field col s12 text-center">
                        <button class="btn waves-effect waves-light" type="submit" name="action" onClick={onSubmit}>Submit </button><br/><br/>
                        <p>Dont have accoutn ? Singin</p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
            {performRedirect()}
        </div>
    )
}

export default Singin
