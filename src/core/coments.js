import React,{useEffect, useState} from 'react'
import { isAuthincated } from '../auth/helper'
import Card from './Card'
import { getAllComments } from './helper'


function Coments(props) {
    const { user , token} = isAuthincated()
    const [data, setData] = useState('')
    useEffect(() => {
        getAllComments(props.match.params.value, token)
        .then(data =>{
            console.log(data)
            setData(data.post)
        })
    }, [])

    if(!data){
        return ''
    }

    return (
        <div style={{marginTop:'45px'}}>
            <Card cardData={data} showComment={true} />  
        </div>
    )
}

export default Coments
