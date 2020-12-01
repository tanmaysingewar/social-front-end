import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AddPost from './core/AddPost'
import BottomNav from './core/BottomNav'
import Home from './core/Home'
import TopNavBar from './core/TopNavBar'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import Search from './user/Search'
import Singin from './user/Singin'
import Singup from './user/Singup'
import './materialize.min.css'
import PrivateRoutes from './privateRoutes'
import Comment from './core/coments'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                    <Route path='/singin' exact component={Singin} />
                    <Route path='/singup' exact component={Singup} />
                    <PrivateRoutes path='/' exact component={Home} />
                    <PrivateRoutes path='/profile/:value' exact component={Profile} />
                    <PrivateRoutes path='/search' exact component={Search} />
                    <PrivateRoutes path='/post' exact component={AddPost} />
                    <PrivateRoutes path='/add/post' exact component={AddPost} />
                    <PrivateRoutes path='/edit/profile' exact component={EditProfile} />
                    <PrivateRoutes path='/post/allcomments/:value' exact component={Comment} />
            </Switch>
            <BottomNav />
            <TopNavBar />
        </BrowserRouter>
    )
}

export default Routes
