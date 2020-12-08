import React,{useState} from 'react'
import { Redirect } from 'react-router-dom'
import { checkUsername, singup , authincate, isAuthincated} from '../auth/helper'


function Singup() {
  const { user } = isAuthincated()
  const [values, setValues] = useState({
    name: '',
    email:'',
    username:'',
    password:'',
    error:'',
    param:'',
    success: false
  })

  const [check, setCheck] = useState('')

  const {name,email,username, password,error,success,param} = values
  
  let usernameAvailable = ''
  let nameError =''
  let usernameError =''
  let emailError =''
  let passwordError =''
  let finalCheck=''

    if (param === 'checkValues') {
        finalCheck='*Check all fields all fields are mandetari*'
        if (name === '') {
         nameError ='*Name is require*'
        }
        if (email === '') {
        emailError ='*Email is require*'
        }
        if (username === '') {
          usernameError ='*Username is require*'
        }
        if (password === '') {
          passwordError ='*Password is require*'
        }
    }

    if (param) {
      if (param === 'email') {
        emailError ='*Email is not proper*'
      }
      if (param ==='emailRepet') {
        emailError ='*Email already exist please try another to avoid duplicacy*'
      }
      if (param === 'password') {
        passwordError ='*must contain a numbers*'
      }
    }
    if(check){
      if (check === 'avaliable') {
      usernameAvailable = 'Username is available'
    }else{
      usernameError = `Username ${check} is already taken`
    }
    if (check === 'empty') {
      usernameAvailable = ''
      usernameError = '*Username is require*'
    }
  }
  
  const handleChange  = name => event =>{
    setValues({...values,error:false,[name]: event.target.value})
    if ([name]=='username') {
      trigureUsername(event.target.value)
    }
  }
  
  const trigureUsername = (username) =>{
    let nsusername =username.replace(/ /g,"")
    if (nsusername.length === 0) {
      setCheck('empty')
    }else{
      checkUsername({username})
    .then(data =>{
      if (data.error) {
        setCheck(data.error)
      }else{
        setCheck(data.msg)
      }
    })
    }
  }

  const onSubmit = event =>{
    event.preventDefault()
    setValues({...values,error:true})
    if (check=='avaliable' && name && email && username && password ) {
    singup({name,email,username, password})
    .then(data =>{
        if (data.error) {
          setValues({...values, param: data.msg})
          if (data.param) {
            setValues({...values, param:'emailRepet'})
          }else{
            setValues({...values, param:data.error})
          }
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
                  name:'',
                  email:'',
                  username:'',
                  password:'',
                  error:'',
                  param:''
              })
          }
        }     
    })
    .catch(console.log('Error in Singup'))
  }else{
    if (name ==='' || email ==='' || username ==='' || password ==='')  {
      setValues({...values,param: 'checkValues'})
    }
  }
}
  
const performRedirection =()=>{
  if (success) {
  return <Redirect to={'/profile/'+user._id} />
  }
}

const form =()=>{
 return(
          <div className="row" style={{marginTop:'45px'}}>
            <div className="col s12 m6">
                <h2 className='text-center welcome-text'>Welcome!!</h2>
              <div className="card ">
                <div className="card-content ">
                    <h3 className='text-center'>Sing Up</h3>
                  <div className="row">
                      <p className='warning text-center'>{finalCheck}</p>
                    <form className="col s12" autoComplete='off'>
                      <div className="row singin-form" >
                        <div className="input-field col s12">
                          <input id="first_name" type="text" className="validate" placeholder='Name' onChange={handleChange('name')} value={name} required/>
                          {/* Name is require represent only after if noting is in input field */}
                          <p className='warning'>{nameError}</p>
                        </div>
                      </div>
                      <div className="row singin-form">
                        <div className="input-field col s12">
                          <input id="username" type="text" className="validate" placeholder='Username' onChange={handleChange('username')} value={username} required/>
                          {/* Password is require represent only after if noting is in input field */}
                          <p className='warning'>{usernameError}</p>
                          <p className='success'>{usernameAvailable}</p>
                        </div>
                      </div>
                      <div className="row singin-form">
                        <div className="input-field col s12">
                          <input id="email" type="text" className="validate" placeholder='Email'  onChange={handleChange('email')} value={email} required  />
                          {/* Email is require represent only after if noting is in input field */}
                          <p className='warning'>{emailError}</p>
                        </div>
                      </div>
                      <div className="row singin-form">
                        <div className="input-field col s12">
                          <input id="password" type="password" className="validate" placeholder='Password' onChange={handleChange('password')} value={password} required />
                          {/* Password is require represent only after if noting is in input field */}
                          <p className='warning'>{passwordError}</p>
                        </div>
                      </div>
                      <div className="row singin-form">
                        <div className="input-field col s12 text-center">
                          <button className="btn waves-effect waves-light" type="submit" name="action" onClick={onSubmit}>Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
return (
        <div>
            {form()}
            {performRedirection()}
        </div>
    )
}
export default Singup