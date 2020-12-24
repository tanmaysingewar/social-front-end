import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { checkUsername, singup , authincate} from '../auth/helper'


function Singup() {
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

  const [intLoading, setintLoading] = useState(false)

  const [disableButton, setdisableButton] = useState(false)

  const {name,email,username, password,success,param} = values
  
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
    if (check === 'sm') {
      usernameAvailable = ''
      usernameError = '*Something went wrong*'
    }
  }
  
  const handleChange  = name => event =>{
    if ([name]=='username') {
      trigureUsername(event.target.value)
      let nsusername =event.target.value.replace(/ /g,"")
     return setValues({...values,error:false,[name]: nsusername})
    }
    setValues({...values,error:false,[name]: event.target.value})
    
  }
  
  const trigureUsername = (username) =>{
    let nsusername =username.replace(/ /g,"")
    if (nsusername.length === 0) {
      setCheck('empty')
    }else{
      checkUsername({username})
    .then(data =>{
      if(!data){
       return setCheck('sm')
      }
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
    setdisableButton(true)
    setintLoading(true)
    setValues({...values,error:true})
    if (check==='avaliable' && name && email && username && password ) {
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
                  username:'',
                  password:'',
                  error:'',
                  param:''
              })
          }
        }     
        setdisableButton(false)
        setintLoading(false)
    })
    .catch(console.log('Error in Singup'))
  }else{
    if (name ==='' || email ==='' || username ==='' || password ==='')  {
      setValues({...values,param: 'checkValues'})
      setdisableButton(false)
      setintLoading(false)
    }
  }
}
  
const performRedirection =()=>{
  if (success) {
  return <Redirect to={`/conformId/${email}`} />
  }
}

let rednderData = ''
if(intLoading){
  rednderData =  <div class="progress">
  <div class="indeterminate"></div>
</div>
}

const form =()=>{
 return(
   <>
      
          <div className="row" style={{marginTop:'45px'}}>
            <div className="col s12 m6">
                {/* <h2 className='text-center welcome-text'>Welcome!!</h2> */}
              <div className="card ">
                <div className="card-content ">
                {rednderData}
                    <h4 className='text-center'>Sing Up</h4>
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
                          <button className="btn waves-effect waves-light" id="mySubmit"  disabled={disableButton} type="submit" name="action" onClick={onSubmit}>Submit
                          </button><br/><br/>
                          <p>I already have account <Link to='/singin'>SingIn</Link></p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
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