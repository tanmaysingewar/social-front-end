import React,{useState, useEffect} from 'react'
import { getAllPost, getPostSerch, isAuthincated, searchUser } from '../auth/helper'
import Card from '../core/Card'
import SerchReasult from '../core/SerchReasult'
import { TopUsers } from './helper'


function Search() {

    const {token } = isAuthincated()
    const [search, setSearch] = useState({
        searchTerm : ''
    })

    const [searchData, setSerchData] = useState('')

    const [TopUser, setTopUser] = useState('')

    const [TopPost, setTopPost] = useState('')

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

    useEffect(() => {
        setLoading(true)
            TopUsers(token)
            .then(data =>{
                if(!data){
                   return setTopUser('')
                }
                if(data.error){
                    return setTopUser('')
                }
                setTopUser(data.user)
            })
            
            getPostSerch(token , 0 , 3)
            .then(data =>{
                if(!data){
                    return setTopPost('')
                }
                if(data.error){
                    return  setTopPost('')
                }
                console.log(data)
                setTopPost(data.post)
                setLoading(false)
            })   
        
    }, [])

    
    const onSerch = (search) =>{
        setLoading(true)
        if (search === '') {
            setLoading(false)
            return setSerchData('')
         }
         
             // lOding query place here
             searchUser(search)
                 .then(data =>{
                 setSerchData(data)
                 setLoading(false)
             })
        
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
        ///******Your code here */
        // result = ''
        if(TopUser === '' || TopPost === ''){
            result = ''
        }else{
            result =<>
             <div class="row" tyle={{float : 'left'}}>
                <span className='mini-title'>Top users</span> 
                {TopUser ? TopUser.map((data) => < SerchReasult  data={data} /> ): ''}
                </div>
            <div>
                <div style={{paddingTop : '10px'}}>
                <span  className='mini-title'>Top posts</span>
                 { TopPost ? TopPost.map((cardData,index) =>{
                    return <Card key={index} cardData={cardData} />
                    })
                 : ''}
                </div>
            </div>
            </>
        }
    }else{
        if(!searchData){
             noresult ='Not able to connect'
        }else{
            if (searchData.msg === 'No search Found' || !searchData) {
                noresult = searchData.msg ? searchData.msg : 'No search Found'
            } else {
                result =(
                    <div class="row" tyle={{float : 'left'}}>
                       { searchData.data.map((data) => < SerchReasult  data={data} />)}

                    </div>
                ) 
            }
        }
    }
    return (
        <>
            <div style={{padding : '10px' , marginTop : '50px'}}>
                <nav>
                    <div class="nav-wrapper" >
                        <form autoComplete='off' >
                            <div class="input-field black" style={{borderRadius : '50px', border : '1px solid dimgray'}} >
                                <input  type="search" style={{borderRadius : '50px'}}  required onChange={handleChang('searchTerm')} value={searchTerm} />
                                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                                <i class="material-icons " style={{WebkitTapHighlightColor : 'transparent'}} onClick={() => onClear()} >close</i>
                                <button onClick={(event) => event.preventDefault()} type='submit' style={{display : 'none'}} ></button>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>
            {loder}
            {result}
            <h5 className='text-center notice mt-5'>{noresult}</h5>
           </> 
    )
}
export default Search
