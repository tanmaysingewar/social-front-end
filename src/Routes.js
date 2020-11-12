import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AddPost from './core/AddPost'
import Home from './core/Home'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import Search from './user/Search'
import Singin from './user/Singin'
import Singup from './user/Singup'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/singin' exact component={Singin} />
                    <Route path='/singup' exact component={Singup} />
                    <Route path='/profile' exact component={Profile} />
                    <Route path='/search' exact component={Search} />
                    <Route path='/post' exact component={AddPost} />
                    <Route path='/add/post' exact component={AddPost} />
                    <Route path='/edit/profile' exact component={EditProfile} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
