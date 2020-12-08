import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthincated } from '../auth/helper'
import Edit from '../core/svg/Edit'
import VerifiedSvg from '../core/svg/Verified'
import { isUserJoined , JoinUser } from './helper'

function ProfileCard({data ,update}) {

    const { joines ,joined , description , posts  , name , email , username ,verified ,cardColor,textColor, _id} = data
    const {user , token} = isAuthincated()
    const [join, setJoin] = useState(false)

    useEffect(() => {
       if(_id){
        isUserJoined(_id , token)
        .then(data => {
            console.log(data)
            setJoin(data.msg)
        })
       }
    }, [_id])

    const onClickJoin = () => {
        if(join){
            setJoin(false)
        }else{
            setJoin(true)
        }
        JoinUser(_id , token)
        .then(data =>{
            setJoin(data.msg)
        })
    } 

    let vSvg = ''
    let showEdit =''

    if (verified) {
        vSvg = <VerifiedSvg color={textColor} />
    }

    let showButton =''
    if(_id !== user._id){
    showButton = <button className='btn-small joinbth'  style={!join ?{background : 'black'} :{background : 'transparent', color : 'black'} }  onClick={() => onClickJoin()}>{join ? 'Joined' : 'Join'}</button>
    }

    if(!update && user._id === _id){
        showEdit = <Link to='/edit/profile'><Edit color={textColor}/></Link>
    }

    if(update){
        showButton =''
    }

    return (
        <div style={{marginTop:'55px'}}>
           <div class="card " style={{background : cardColor }}>
                <div class="card-content " style={{color : textColor}}>
                    <table>
                        <tr>
                            <td className='authername'><span>{username}</span></td>
                            <td className='svgverify'>{vSvg}</td>
                            <td className='edit-icon'>{showEdit}</td>
                        </tr>
                    </table>
                        <span>{name}</span>
                    <div className='joining-section' >
                        <span className='heading' style={{color : textColor}}>Joines: {joines}</span><span className='heading ml-5' style={{color : textColor}}>Joined: {joined}</span>
                    </div>
                        <span className='description-text'>{description}</span>
                </div>
            </div>
            <div>
            {showButton}
            </div>
        </div>
    )
}

export default ProfileCard
