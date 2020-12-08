import React from 'react'

function AddPostCard({values, username}) {
    const{title,post,textColor,cardColor} = values

    return (
        <div>
            <div class="row" style={{marginTop : '40px'}} >
                <div class="col s12 m6">
                    <h5 className='text-center'>Create Post</h5>
                    <div class="card " style={{background : cardColor }} >
                        <div class="card-content " >
                            <div className='input-field'>
                                <table border='2px solid'>
                                    <td className='liketdwidth' style={{color : textColor}}><span>@{username}</span></td>
                                    <td className='svgverify'></td>
                                    <td className='collection-icon'></td>
                                </table>
                            </div>
                            <div style={{color : textColor}}>
                                <span class="card-title">{title}</span>
                            {/* <span class="card-title">Card Title</span> */}
                                <p class="" id="postInput">{post}</p><br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPostCard
