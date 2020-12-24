import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { checkUsername, getUserById, isAuthincated } from '../auth/helper'
import { getColors } from '../core/helper'
import { updateProfile } from './helper'
import ProfileCard from './ProfileCard'

function EditProfile() {

    const { user, token } = isAuthincated()

    const [data, setData] = useState({
        joines : '',
        joined : '',
        description : '',
        name : '',
        email : '',
        username : '',
        verified : false,
        textColor: '',
        cardColor: '',
        success : false,
        loading : false
    })

    const [check, setCheck] = useState('')

    const [colors, setColors] = useState([])

    const [disableButton, setdisableButton] = useState(false)

    const [warningMsg, setWarningMsg] = useState({
      name : '',
      description : ''
    })

    const TextColors = ['white','black','red','green'] 

    const {  description   , name , email , username  ,cardColor ,textColor ,success,loading} = data

    useEffect(() => {
      setData({...data,loading : true})
        getUserById( user._id , token)
        .then(data =>{
          if(!data){
            return setData([])
          }
          if(data.error){
            return setData([])
          }
            setData({
                joines : data.joines.count,
                joined : data.joined.count,
                description : data.description,
                name : data.name,
                email : data.email,
                username : data.username ,
                verified : data.verified ,
                textColor: data.color.textColor,
                cardColor: data.color.cardColor,
                loading : false
            })
        })
        getColors()
        .then(data =>{
          if(!data){
            return setColors([])
          }
          setColors(data)
        })// eslint-disable-next-line 
    }, [])


    

    const handleChange = (namez)=> event =>{

      if(namez == 'username'){
        let nsusername =event.target.value.replace(/ /g,"")
        if(nsusername.length > 20){
          setdisableButton(true)
          setCheck('countu')
          return setData({...data,[namez]: username})
        }
        setdisableButton(false)
        setData({...data,[namez]: nsusername})// eslint-disable-next-line 
        if ([namez]=='username') {
            trigureUsername(nsusername)
        }
      }
      if(namez == 'name'){
        if(event.target.value.length > 30){
          setdisableButton(true)
          setWarningMsg({...warningMsg , name : 'Name is too long'})
          return setData({...data,[namez]: name})
        }
        setData({...data,[namez]: event.target.value })
        setWarningMsg({...warningMsg , name : ''})
        setdisableButton(false)
      }

      if(namez == 'description'){
        if(event.target.value.length > 90){
          setdisableButton(true)
          setWarningMsg({...warningMsg , description : 'Description is too long'})
          return setData({...data,[namez]: description})
        }
        setData({...data,[namez]: event.target.value })
        setWarningMsg({...warningMsg , description : ''})
        setdisableButton(false)
      }
      
        
    }

    const trigureUsername = (username) =>{
        if (username.length === 0) {
          setdisableButton(true)
          setCheck('empty')
        }
        else if(username.length > 19){
          setCheck('countu')
        }
        else{
          checkUsername({username})
        .then(data =>{
          if(!data){
            return setCheck('')
          }
          if(data.error) {
            setCheck(data.error)
          }else{
            setCheck(data)
          }
        })
        }
    }
 


    let usernameMessage = ''
    let usernameMessageWarn = ''
    

    if(check){
      usernameMessageWarn = `${username} is already taken`
    }
    if (check._id === user._id) {
        usernameMessageWarn = `${check.msg} is your old username`
    }
    if(check.msg === 'avaliable'){
        usernameMessage = 'This username is avalable'
        usernameMessageWarn =''
    }if (username === '') {
        usernameMessageWarn = `username is required`
    }
    if(check === 'countu'){
      usernameMessageWarn = `username is too long`
    }
    


   

    const onSubmit = () =>{
      setdisableButton(true)
      setData({...data,loading : true})
      if(check === 'count' || warningMsg.name || warningMsg.description){
        return  setData({...data,loading : false})
      }
        if (!check.msg || check._id === user._id || check.msg === 'avaliable') {
            updateProfile(user._id, token , {name ,username , description ,email, color : { textColor , cardColor} })
            .then(res =>{
              setData({...data,loading : false})
              setdisableButton(false)
                return setData({...data,success:true})
        })
        }
    }
    const performRedirect = () =>{
       if (success) {
        return <Redirect to={'/profile/'+user._id} />
       }
    }

    if(loading){
      return (
        <div class="progress" style={{marginTop:'60px'}}>
          <div class="indeterminate"></div>
        </div>
      )
    }
  

    return (
        <div className='row'>
            {/***Card here */}
            <div class="col s12 m6">
            <ProfileCard data={data} update={true} />
            <div className='text-center' >
                    <button  class="btn" disabled={disableButton} style={{backgroundColor: 'black'}} onClick={onSubmit}>Update</button>
                    <p className='notice'>Click here to update</p>
                </div>
                    <div class="card ">
                        <div class="card-content ">
            <div class="row">
           
    <form class="col s12" autoComplete='off'>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" class="validate" onChange={handleChange('username')} value={username} placeholder='Username'/>
        <span className='success'>{usernameMessage}</span>
        <span className='warning'>{usernameMessageWarn}</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" class="validate" onChange={handleChange('name')} value={name} placeholder='Full Name' />
          <span className='warning'>{warningMsg.name}</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea  type="email" class="materialize-textarea" onChange={handleChange('description')} value={description}  placeholder='Textarea' style={{height:'70px'}} />
          <span className='warning'>{warningMsg.description}</span>
        </div>
      </div>
    </form>
  </div>
  <div class="row">

        <div class="col s12">
            This is an text colour input field:
        <div class="input-field inline " >
            <input  type="color" class="validate"  />
        </div>
        <div className='template-box-text'>
          {
            TextColors.map(color =>{
              return <div className='template-text' style={{background: color,border: '0.5px solid grey'}}
              onClick={()=> setData({...data,textColor: color})}
          ></div>
            })
          }
        </div>
        </div>
        <div class="col s12">
                This is an card colour input field:
        {<div class="input-field inline">
        <input  type="color" class="validate" />
        </div>}
        {/* Template here */}
        <div className='template-box'>
                {colors.map(color => {
                   return <div className='template' style={{background: color,border : '1px solid #dadce0'}}
                    onClick={()=> setData({...data,cardColor: color})}
                ></div>
                })}
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

export default EditProfile
