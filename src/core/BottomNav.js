import React,{useState} from 'react'
import { Link } from 'react-router-dom'

function BottomNav() {

    const [highlight, setHighlight] = useState(true)

    let home = {color : '#7f7f7f'}
    let search = {color : '#7f7f7f'}
    let notify = {color : '#7f7f7f'}
    let person = {color : '#252d2d'}

    if (highlight === 'home') {
        home = {color : '#252d2d'}
        search = {color : '#7f7f7f'}
        notify = {color : '#7f7f7f'}
        person = {color : '#7f7f7f'}
    }
    if (highlight === 'search') {
        home = {color : '#7f7f7f'}
        search = {color : '#252d2d'}
        notify = {color : '#7f7f7f'}
        person = {color : '#7f7f7f'}
    }
    if (highlight === 'notify') {
        home = {color : '#7f7f7f'}
        search = {color : '#7f7f7f'}
        notify = {color : '#252d2d'}
        person = {color : '#7f7f7f'}
    }
    if (highlight === 'person') {
        home = {color : '#7f7f7f'}
        search = {color : '#7f7f7f'}
        notify = {color : '#7f7f7f'}
        person = {color : '#252d2d'}
    }

   
    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <nav class="nav">
                    <Link to='/' class="nav__link">
                    <i onClick={() => setHighlight('home')} style={home} class="material-icons nav__icon nav__link--active">home</i>
                    </Link>
                    <Link to='/search' class="nav__link">
                    <i onClick={() => setHighlight('search')} style={search} class="material-icons nav__icon">search</i>
                    </Link>
                    <Link to='/' class="nav__link">
                    <i onClick={() => setHighlight('notify')} style={notify} class="material-icons nav__icon">notification_important</i>
                    </Link>
                    <Link to='/profile' class="nav__link">
                    <i onClick={() => setHighlight('person')} style={person} class="material-icons nav__icon">person</i>
                    </Link>
                </nav>
        </div>
    )
}

export default BottomNav
