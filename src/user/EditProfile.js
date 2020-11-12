import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { checkUsername, getUserById, isAuthincated } from '../auth/helper'
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
        success : false
    })

    const [check, setCheck] = useState('')

    const { joines ,joined , description   , name , email , username ,verified ,cardColor ,textColor ,success} = data


    useEffect(() => {
        getUserById( user._id , token)
        .then(data =>{
            console.log(data)
            setData({
                joines : data.joines,
                joined : data.joined,
                description : data.description,
                name : data.name,
                email : data.email,
                username : data.username ,
                verified : true ,
                textColor: data.color.textColor,
                cardColor: data.color.cardColor
            })
        })
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
            console.log(data)
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
        if (!check.msg || check._id === user._id || check.msg === 'avaliable') {
            updateProfile(user._id, token , {name ,username , description ,email, color : { textColor , cardColor} })
            .then(data =>{
                return setData({...data,success:true})
        })
        }
    }
    const performRedirect = () =>{
       if (success) {
        return <Redirect to='/profile' />
       }
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
          <input  id="disabled" type="text" class="validate" onChange={handleChange('username')} value={username}/>
        <span className='success'>{usernameMessage}</span>
        <span className='warning'>{usernameMessageWarn}</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="text" class="validate" onChange={handleChange('name')} value={name} />
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="email" type="email" class="materialize-textarea" onChange={handleChange('description')} value={description}/>
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
        <div className='template-text' style={{background: 'white',border: '0.5px solid grey'}}
            onClick={()=> setData({...data,textColor:'white'})}
        ></div>
        <div className='template-text' style={{background: 'black'}}
             onClick={()=> setData({...data,textColor:''})}
        ></div>
        <div className='template-text' style={{background: 'red'}}
        ></div>
        <div className='template-text' style={{background: 'green'}}
        ></div>
        </div>
        </div>
        <div class="col s12">
                This is an card colour input field:
        <div class="input-field inline">
        <input  type="color" class="validate" />
        </div>
        <div className='template-box'>
                <div className='template' style={{background: 'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'}}
                    onClick={()=> setData({...data,cardColor:'linear-gradient(to right, #2980b9, #6dd5fa, #6dd5fa)'})}
                ></div>
                <div className='template' style={{background: 'linear-gradient(to right, #ff0099, #493240)'}}
                onClick={()=> setData({...data,cardColor:'linear-gradient(to right, #ff0099, #493240)'})}
                ></div>
                <div className='template' style={{background: 'linear-gradient(to right, #1f4037, #99f2c8)'}}
                ></div>
                <div className='template' style={{background: 'linear-gradient(to right, #f953c6, #b91d73)'}}
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
  {performRedirect()}
        </div>
    )
}

export default EditProfile