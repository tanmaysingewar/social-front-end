import React from 'react'

function Deatils({data}) {
    const { joines ,joined , description , name , email , username ,verified } = data
    return (
        <>
            <div class="row bm0">
                <div class="col s12 m6">
                        <h6 className='text-center'>Profile Details</h6>
                    <div className='text-center'>
                        <p>Email : { email }</p>
                        <p>joines : { joines }</p>
                        <p>joined : { joined }</p>
                        <p>description : { description }</p>
                        <p>name : { name }</p>
                        <p>username : { username }</p>
                        <p>verified : { verified ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deatils
