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
    <div>
        <div class="row bm0">
            <div class="col s12 m6">
                <div class="card ">
                    <div class="card-content  ">
                        <h5 className='text-center'>Search</h5>
                    <div class="row">
                        <form class="col s12" autoComplete='off'>
                            <div class="row singin-form">
                                <div class="input-field col s11">
                                    <input id="email" type="text"  onChange={handleChang('searchTerm')} value={searchTerm} class="validate" placeholder='Search' />
                                    <i class="material-icons prefix" >search</i>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h5 className='text-center notice mt-5'>{noresult}</h5>
       {result}
        <BottomNav />
        </div>
    )
}

export default Search
