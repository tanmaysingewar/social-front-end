import React from 'react'
import VerifiedSvg from './svg/Verified'

function SerchReasult({data}) {
    return (
        <div>
              <div class="card bm0 p2 m5">
              <div class="search-card-content ">
                <span className='search-result-text'>@{data.username}</span><span className='svgverify '><VerifiedSvg/></span><br/>
                <span>{data.name}</span>
          </div>
        </div>
      </div>
    )
}

export default SerchReasult