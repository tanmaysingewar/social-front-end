import React,{useState} from 'react'
import { Link } from 'react-router-dom';
function TopNavBar() {
    const [shownavbar, setshowNavbar] = useState(true)

    var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            setshowNavbar(true)
        }
         else {
            setshowNavbar(false)
        }
        prevScrollpos = currentScrollPos;
        }
        

        let displayNavBar = ''
        if (shownavbar) {
            displayNavBar = {top: '0'}
        }else{
            displayNavBar = {top: '-60px'}
        }

    return (
        <div>
             <nav className='navbar' style={displayNavBar} >
             <div class="nav-wrapper " >
                 <div style={{alignContent : 'flex-start',fontSize: '25px',paddingLeft : '10px'}}>
                    {/* <span class="material-icons">
                        keyboard_backspace
                    </span> */}
                     <Link to='/' style={{float : 'right'}} ><i  class="large material-icons " style={{fontSize: '25px',paddingRight : '10px'}}>settings</i></Link>
                    <Link className='logo-name' to='/' >Ficktree</Link>
                   
                 </div>    
                    </div>
                </nav>
        </div>
    )
}

export default TopNavBar
