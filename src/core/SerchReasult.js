import React from 'react'
import { Link} from 'react-router-dom'
import VerifiedSvg from './svg/Verified'

function SerchReasult({data}) {
    return (
        <Link to={'/profile/search/'+data._id}  >
              <div class="col s12">
                        <div class=" teal white" style={{padding : '8px' ,marginTop : '10px', border : '1px solid #dadce0', borderRadius : '5px'}}>
                            <span class="black" >
                                <table  style={{padding : '0px', fontFamily : 'sans-serif', color : 'black' }}>
                                    <tr style={{padding : '0px'}}>
                                        <td colSpan='2' style={{padding : '0px ', fontSize : '14px'}}><span className='search-result-text '>@{data.username}</span><span className='svgverify ' style={{marginTop : '10px'}}>{data.verified ? <VerifiedSvg/> : ''}</span></td> 
                                        <td rowSpan='2'
                                         className='text-center'
                                           style={{padding : '0px ', justifyContent :'center' , alignItems : 'center'}}>
                                             {/* <button 
                                             className='btn black' 
                                             style={{paddingLeft : '40px', paddingRight : '40px', fontSize : '12px', borderRadius : '5px', float : 'right'}}>
                                              Join
                                              </button> */}
                                              </td>
                                    </tr>
                                    <tr style={{padding : '0px'}}>
                                        <td style={{padding : '0px', fontSize : '12px'}} className='notice'><span>{data.name}</span></td>
                                    </tr>
                                </table>
                            </span>
                            
                        </div>
                    </div>
      </Link>
    )
}


                
                    

export default SerchReasult