import React,{useState} from 'react'
import { searchUser } from '../auth/helper'
import SerchReasult from '../core/SerchReasult'


function Search() {
    const [search, setSearch] = useState({
        searchTerm : ''
    })

    const [searchData, setSerchData] = useState('')

    const [loading, setLoading] = useState(false)

    const { searchTerm } = search

    const handleChang = (name) => event =>{
        setSearch({...search, [name]: event.target.value})
        onSerch(event.target.value)
    }
    const onClear = () =>{
        setSearch({...search, searchTerm: ''})
        setSerchData('')
        setLoading(false)
    } 

    
    const onSerch = (search) =>{
        setLoading(true)
        if (search === '') {
            setLoading(false)
            return setSerchData('')
         }
         
        setTimeout(() => {
             // lOding query place here
             searchUser(search)
                 .then(data =>{
                 setSerchData(data)
                 setLoading(false)
             })
        }, 2000);
        
    }  
    let result = ''
    let noresult =''
    let loder = ''
    if(loading){
        loder =  <div class="progress" >
                    <div class="indeterminate"></div>
                </div>
    }
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
        <div className='card-content' style={{marginTop : '45px'}} >
            <div style={{padding : '10px'}}>
                <nav>
                    <div class="nav-wrapper">
                        <form autoComplete='off'>
                            <div class="input-field black" style={{padding : '0px'}}>
                                <input id="search" type="search" required onChange={handleChang('searchTerm')} value={searchTerm} />
                                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                                <i class="material-icons" onClick={() => onClear()} >close</i>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>
            {loder}
            <h5 className='text-center notice mt-5'>{noresult}</h5>
            {result}
        </div>
    )
}
export default Search
