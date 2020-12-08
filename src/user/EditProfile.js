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

    const TextColors = ['white','black','red','green'] 

    const { joines ,joined , description   , name , email , username ,verified ,cardColor ,textColor ,success,loading} = data

    useEffect(() => {
      setData({...data,loading : true})
      setTimeout(() => {
        getUserById( user._id , token)
        .then(data =>{
            setData({
                joines : data.joines.count,
                joined : data.joined.count,
                description : data.description,
                name : data.name,
                email : data.email,
                username : data.username ,
                verified : true ,
                textColor: data.color.textColor,
                cardColor: data.color.cardColor,
                loading : false
            })
        })
        getColors()
        .then(data =>{
          setColors(data)
        })
      }, 2000);
        
    }, [])

    const handleChange = (name)=> event =>{
        setData({...data,[name]: event.target.value})
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
        usernameMessageWarn = `${check.msg} is old username`
    }
    if(check.msg === 'avaliable'){
        usernameMessage = 'This username is avalable'
        usernameMessageWarn =''
    }if (username === '') {
        usernameMessageWarn = `username is required`
    }
   
    let isdisable = 'black'

    const onSubmit = () =>{
      setData({...data,loading : true})
        if (!check.msg || check._id === user._id || check.msg === 'avaliable') {
            updateProfile(user._id, token , {name ,username , description ,email, color : { textColor , cardColor} })
            .then(datas =>{
              console.log(datas)
              setData({...data,loading : false})
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
                    <a  class="btn" style={{backgroundColor: isdisable}} onClick={onSubmit}>Update</a>
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
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea  type="email" class="materialize-textarea" onChange={handleChange('description')} value={description}  placeholder='Textarea' style={{height:'70px'}} />
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
                   return <div className='template' style={{background: color}}
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
