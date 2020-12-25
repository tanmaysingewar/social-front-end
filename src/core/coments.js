import React,{useEffect, useState} from 'react'
import { isAuthincated } from '../auth/helper'
import Card from './Card'
import { getAllComments } from './helper'


function Coments(props) {
    const { token } = isAuthincated()
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
            getAllComments(props.match.params.value, token)
        .then(data =>{
            if(!data){
                return setData('')
            }
            if(data.error){
                return setData('')
            }
            setData(data.post)
            setLoading(false)
        })// eslint-disable-next-line 
        
    }, [])

    if(loading){
        return  <div>
          <div class="progress" style={{marginTop:'55px'}}>
          <div class="indeterminate"></div>
      </div>
      </div>
      }
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
