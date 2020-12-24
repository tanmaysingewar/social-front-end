import React from 'react'
import { Link } from 'react-router-dom'

function ProductionCard() {
    return (
        <div>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300&display=swap" rel="stylesheet" />

            <div style={{marginTop : '20px'}}>
            <div class="row ">
                <div class="col s12 m5">
                    <div class="card-panel teal black white-text">
                        <h5 style={{fontFamily : 'Teko, sans-serif'}}>Tanmay Singewar Production</h5>
                        <div style={{fontSize : '12px'}}>
                            <div><span>Tanmay Singewar, CEO, Founder</span></div>
                            <span>singewartanmay@gmail.com</span><br/><br/>
                            <span>Web Developers</span>
                            
                        </div>
                        
                    </div>
                    <div className='text-center'>
                                <h5>Recent Projects</h5>
                                <table className='text-center'>
                                    <tr className='text-center'>
                                        <td ><a href='https://radiant-cove-28954.herokuapp.com/'>Weather Forecast</a></td>
                                        <td className='text-center'><a href='https://tanmaysingewar-news-site.herokuapp.com/'>News Site</a></td>
                                    </tr>
                                </table>
                            </div><br/>
                    <div className='text-center'>
                        <Link to='/profile/me' ><button className='btn '>Continue</button></Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ProductionCard
