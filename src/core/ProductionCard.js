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
                            <div><span>Tanmay Singewar</span></div>
                            <span>singewartanmay@gmail.com</span><br/><br/>
                            <span>Web Developers</span>
                            
                        </div>
                        
                    </div>
                    <div className='text-center'>
                                <h5>Recent Projects</h5>
                                <table className='text-center'>
                                    <tr className='text-center'>
                                        <td className='text-center'><span><b>Weather Forecast</b></span></td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Show weather forecast of your city. Just enter your city name and the application will show the temperature, wind speed & direction, climate conditions, humidity</td>
                                    </tr>
                                    <tr>
                                    <td className='text-center'><span><b>News Site</b></span></td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Current news and events according to category & also a special section of COVID-19 counts daily updated records. You can also search your personal interest topics and  category </td>
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
