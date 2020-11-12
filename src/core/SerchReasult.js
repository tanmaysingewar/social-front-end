import React from 'react'
import VerifiedSvg from './svg/Verified'

function SerchReasult({data}) {
    return (
        <div>
            <div class="row bm0">
              <div class="col s12 m6">
              <div class="card ">
              <div class="card-content ">
                <span className='search-result-text'>@{data.username}</span><span className='svgverify '><VerifiedSvg/></span><br/>
                <span>{data.name}</span>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default SerchReasult
