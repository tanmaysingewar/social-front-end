import React from 'react'

function AddPostCard({values}) {
    const{title,post,textColor,cardColor,success} = values

    return (
        <div>
            <div class="row">
                <div class="col s12 m6">
                    <h5 className='text-center'>Create Post</h5>
                    <div class="card " style={{background : cardColor}} >
                        <div class="card-content " >
                            <div className='input-field'>
                                <table border='2px solid'>
                                    <td className='liketdwidth' style={{color : textColor}}><span>@tanmay</span></td>
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
