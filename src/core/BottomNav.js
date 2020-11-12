import React from 'react'
import { Link } from 'react-router-dom'

function BottomNav() {
    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <nav class="nav">
                    <Link to='/' class="nav__link">
                    <i class="material-icons nav__icon nav__link--active">home</i>
                    </Link>
                    <Link to='/search' class="nav__link">
                    <i class="material-icons nav__icon">search</i>
                    </Link>
                    <Link to='/' class="nav__link">
                    <i class="material-icons nav__icon">notification_important</i>
                    </Link>
                    <Link to='/profile' class="nav__link">
                    <i class="material-icons nav__icon">person</i>
                    </Link>
                </nav>
        </div>
    )
}

export default BottomNav
