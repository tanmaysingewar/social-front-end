import React,{useState} from 'react'

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
                        </div>
                </nav>
        </div>
    )
}

export default TopNavBar
