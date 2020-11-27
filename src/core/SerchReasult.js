import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Profile from '../user/Profile'
import VerifiedSvg from './svg/Verified'

function SerchReasult({data}) {

  console.log(data._id)
    return (
        <Link to={'/profile/'+data._id}  >
              <div class="card bm0 p2 m5"  >
              <div class="search-card-content ">
                <span className='search-result-text'>@{data.username}</span><span className='svgverify '><VerifiedSvg/></span><br/>
                <span>{data.name}</span>
          </div>
        </div>
      </Link>
    )
}

export default SerchReasult