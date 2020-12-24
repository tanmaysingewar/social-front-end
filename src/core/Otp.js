import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { authincate, checkOtp, isAuthincated, sendOtp } from '../auth/helper'

function Otp(props) {
    const {token} = isAuthincated()

    const [resend, setresend] = useState(false)
    useEffect(() => {
        sendOtp(token)
        .then(data =>{
        }) // eslint-disable-next-line 
    }, [resend])
    

    const [otp, setOtp] = useState('')

    const [warningMsg, setWarningMsg] = useState(false)

    const [success, setSuccess] = useState(false)

    const [intLoading, setintLoading] = useState(false)

    const handleChange = (name) => event =>{
        setOtp( event.target.value)
    }

    const onSubmit = (e) =>{
        if(otp === '') return
        setintLoading(true)
        checkOtp(token , otp)
        .then(data =>{
            if(!data.match){
                setresend(!resend)
                return setWarningMsg(true)
            }
            authincate(data,()=>{
                //Redirection will be there afteward
                setintLoading(false)
                setSuccess(true)

              })
        })
    }

    let rednderData = ''
  if(intLoading){
    rednderData =  <div class="progress">
    <div class="indeterminate"></div>
    </div>
  }

    var message = ''

    if(warningMsg){
        message = `OTP doen't match. we have send you new otp`
        
    }

    const performRedirect = ()=>{
        if (success) {
          return <Redirect to='/profile/me' />
        }
    }


    return (
        <div>   
            <div class="row" style={{marginTop:'50px'}}>
            <div class="col s12 m6">
              <div class="card ">
                <div class="card-content ">
                  {rednderData}
                  <h5 className='text-center'>OTP </h5>
                    <p className='success text-center'>Entre OTP here to procide</p>
                    <p className=' text-center'>{props.match.params.email}</p>
                  <div class="row">
                      <div class="row singin-form col s12">
                        <div class="input-field col s12">
                          <input  type="number" class="validate" onChange={handleChange()} placeholder='Enter OTP'/>
                            <p className='warning'>{message}</p>
                        </div>
                      </div>
                      <div class="row singin-form">
                        <div class="input-field col s12 text-center">
                        <button class="btn waves-effect waves-light" type="submit" name="action"  onClick={() => onSubmit()} >Submit </button><br/><br/>
                        <p>Resend the otp</p>
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

export default Otp
