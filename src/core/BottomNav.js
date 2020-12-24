import React,{useState} from 'react'
import { Link } from 'react-router-dom'

function BottomNav() {
    const [highlight, setHighlight] = useState(true)

    let home = {color : '#7f7f7f'}
    let search = {color : '#7f7f7f'}
    let notify = {color : '#7f7f7f'}
    let person = {color : '#252d2d'}
    let bgColor = {backgroundColor : 'white'}
    console.log(window.location.pathname)
    if (highlight === 'home' || window.location.pathname === '/' ) {
        home = {color : '#252d2d'}
        search = {color : '#7f7f7f'}
        notify = {color : '#7f7f7f'}
        person = {color : '#7f7f7f'}
    }
    if (highlight === 'search' || window.location.pathname === '/search') {
        home = {color : '#7f7f7f'}
        search = {color : '#252d2d'}
        notify = {color : '#7f7f7f'}
        person = {color : '#7f7f7f'}
    }
    if (highlight === 'notify' || window.location.pathname === '/alert') {
        home = {color : '#7f7f7f'}
        search = {color : '#7f7f7f'}
        notify = {color : '#252d2d'}
        person = {color : '#7f7f7f'}
    }
    if (highlight === 'person' || window.location.pathname.includes('/profile/') ) {
        home = {color : '#7f7f7f'}
        search = {color : '#7f7f7f'}
        notify = {color : '#7f7f7f'}
        person = {color : '#252d2d'}
    }

    if(window.location.pathname === '/setting'){
        bgColor = {backgroundColor : 'black'}
        home = {color : '#7f7f7f'}
        search = {color : '#7f7f7f'}
        notify = {color : '#7f7f7f'}
        person = {color : '#7f7f7f'}
    }

   
    return (
        <div >
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <nav class="nav" style={bgColor}>
                    <Link to='/' class="nav__link">
                    <i onClick={() => setHighlight('home')} style={home} class="material-icons nav__icon nav__link--active">home</i>
                    </Link>
                    <Link to='/search' class="nav__link">
                    <i onClick={() => setHighlight('search')} style={search} class="material-icons nav__icon">search</i>
                    </Link>
                    <Link to='/alert' class="nav__link">
                    <i onClick={() => setHighlight('notify')} style={notify} class="material-icons nav__icon">notification_important</i>
                    </Link>
                    <Link to={'/profile/me' }class="nav__link">
                    <i onClick={() => setHighlight('person')} style={person} class="material-icons nav__icon">person</i>
                    </Link>
                </nav>
        </div>
    )
}

export default BottomNav
