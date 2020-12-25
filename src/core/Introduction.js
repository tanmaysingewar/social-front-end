import React from 'react'
import { Link } from 'react-router-dom'

function Introduction() {
    return (
        <div style={{marginTop : '20px'}}>
            <div class="row ">
                <div class="col s12 m5">
                    <div class="card-panel teal ">
                        <div class=""><p>Hello everyone 🤗  !! </p>
                        Welcome to <b>Ficktree</b>, here you can create and post your thoughts in the form of cards. Express your thoughts and join the new journey with us. We are continuously working and improving to give an incredible experience. Still, we are in beta version your continuous support will encourage us to build this platform to the level of industry-standard. We just 2 months old program in this fields your. Your feedback is valuable thing you can present us.<br/>
                        <div>
                            <h5 className='text-center'>Term & Conditions</h5>
                            <p>If you continue to use  this application you agree with the term & conditions 
                        there are a few T&C </p>
                        <div>
                        <p style={{fontStyle :'italic'}}>1. You can't use <b>abusive</b> and any <b>vulgar</b> words in posts and comments section</p>
                        <p style={{fontStyle :'italic'}}>2. Be polite with the <b>community</b> and any act violating T&C will <b>bang</b> your profile </p>
                        </div> 
                        <p>Thanks for joining us</p>
                       <h6>Welcome to family 🥳</h6> <br/>
                       <span >~Tanmay Singewar Production</span>
                        </div>
                    </div>
                    </div>
                    <div className='text-center'>
                        <Link to='/production/card' > <button className='btn '>Continue</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Introduction
