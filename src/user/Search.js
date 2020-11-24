import React,{useState, useEffect} from 'react'
import { searchUser } from '../auth/helper'
import BottomNav from '../core/BottomNav'
import SerchReasult from '../core/SerchReasult'


function Search() {

    const [search, setSearch] = useState({
        searchTerm : ''
    })

    const [searchData, setSerchData] = useState('')

    const { searchTerm } = search

    console.log(searchData)

    const handleChang = (name) => event =>{
        setSearch({...search, [name]: event.target.value})
        onSerch(event.target.value)
    }
   
    const onClear = () =>{
        setSearch({...search, searchTerm: ''})
        setSerchData('')
    } 

    
    const onSerch = (search) =>{
        if (search === '') {
           return setSerchData('')
        }
        // lOding query place here
        searchUser(search)
            .then(data =>{
            setSerchData(data)
        })
    }  
    

    let result = ''
    let noresult =''
    if (searchData === '') {
        result = ''
    }else{
        if (searchData.msg == 'No search Found') {
            noresult = searchData.msg
        } else {
            result = searchData.data.map((data) => < SerchReasult  data={data} />)
        }
    }
    return (
    <div className='card-content' >
        <div style={{padding : '10px'}}>
    <nav>
    <div class="nav-wrapper">
      <form autoComplete='off'>
        <div class="input-field">
          <input id="search" type="search" required onChange={handleChang('searchTerm')} value={searchTerm} />
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons" onClick={() => onClear()} >close</i>
        </div>
      </form>
    </div>
  </nav>
  </div>
    <h5 className='text-center notice mt-5'>{noresult}</h5>
       {result}
        </div>
    )
}

export default Search
