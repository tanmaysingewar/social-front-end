import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { authincate, singin  } from '../auth/helper'

function Singin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    success : false,
    error:'',
    param: ''
  })

  const [intLoading, setintLoading] = useState(false)

  const [disableButton, setdisableButton] = useState(false)

  const { email, password , success  ,param } = values


  let mainMessage = ''
  let emailMessage = ''
  let passwordlMessage = ''

  if(param){
    if(email === '' || param === 'email'){
      emailMessage = 'Email is required'
    }
    if(password === '') {
      passwordlMessage = 'Password is required'
    }
    if(param === 'noUser') {
      mainMessage = 'Email and password dosent match'
    }
    if(param === 'password'){
      passwordlMessage = 'Password should be at least 6 lettes long'
    }
    if(param === 'USER email Does not exist'){
      mainMessage = <span>No Account found please <Link to='/singup'>Signup</Link></span>
    }
    if(param === 'Email and password dosent match'){
      mainMessage = param
    }
    if(param === 'sm'){
      mainMessage = 'Something went wrong '
    }
  }

  const handleChange = (name) => event =>{
    setValues({...values,[name]:event.target.value})
  }

  const onSubmit = (event) =>{
    event.preventDefault()
    setintLoading(true)
    setdisableButton(true)
    if (email && password) {
      singin({email , password})
    .then(data =>{
      if(!data){
        return setValues({...values,param: 'sm'})
      }
      if (data.error) {
          setValues({...values,param: data.error})
      }
      else{
        if (!data) {
          setValues({...values, param:'noUser'})
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
      setintLoading(false)
      setdisableButton(false)
    })
    }else{
      if(email ==='' || password === ''){
        setintLoading(false)
        setdisableButton(false)
        setValues({...values, param:'Check'})
      }
    }
}

  const performRedirect = ()=>{
      if (success) {
        return <Redirect to='/profile/me' />
      }
  }

  let rednderData = ''
  if(intLoading){
    rednderData =  <div class="progress">
    <div class="indeterminate"></div>
  </div>
  }

    return (
        <div>
          <div class="row" style={{marginTop:'45px'}}>
            <div class="col s12 m6">
                  <h2 className='text-center welcome-text'>Welcome!!</h2>
              <div class="card ">
                <div class="card-content ">
                  {rednderData}
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
                        <button class="btn waves-effect waves-light" disabled={disableButton} type="submit" name="action" onClick={onSubmit}>Submit </button><br/><br/>
                        <p>Dont have accoutn ? <Link to='/singup' >Signup</Link></p>
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
