import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthincated } from '../auth/helper'
import Edit from '../core/svg/Edit'
import VerifiedSvg from '../core/svg/Verified'

function ProfileCard({data ,update}) {

    const {user , token} = isAuthincated()
    let vSvg = ''
    let showEdit =''
    const { joines ,joined , description , posts  , name , email , username ,verified ,cardColor,textColor, _id} = data

    if (verified) {
        vSvg = <VerifiedSvg color={textColor} />
    }

    let showButton =''

    if(_id !== user._id){
        showButton = <button className='btn-small' style={{width : '100%',marginBottom: '10px'}}>Join</button>
    }
    if(!update){
        showEdit = <Link to='/edit/profile'><Edit color={textColor}/></Link>
    }
    if(update){
        showButton =''
    }
    

    

    return (
        <div style={{marginTop:'50px'}}>
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
