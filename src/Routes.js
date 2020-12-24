import React from 'react'
import './materialize.min.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AddPost from './core/AddPost'
import Home from './core/Home'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import Search from './user/Search'
import Singin from './user/Singin'
import Singup from './user/Singup'
import PrivateRoutes from './privateRoutes'
import Comment from './core/coments'
import ConformIdRoutes from './ConformIdRoutes'
import Otp from './core/Otp'
import Alert from './user/Alert'
import Introduction from './core/Introduction'
import ProductionCard from './core/svg/ProductionCard'
import Setting from './user/Setting'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                    <Route path='/singin' exact component={Singin} />
                    <Route path='/singup' exact component={Singup} />
                    <ConformIdRoutes path='/conformId/:email' exact component={Otp} />
                    <PrivateRoutes path='/' exact component={Home} />
                    <PrivateRoutes path='/profile/:value' exact component={Profile} />
                    <PrivateRoutes path='/profile/search/:value' exact component={Profile} />
                    <PrivateRoutes path='/search' exact component={Search} />
                    <PrivateRoutes path='/add/post' exact component={AddPost} />
                    <PrivateRoutes path='/edit/profile' exact component={EditProfile} />
                    <PrivateRoutes path='/post/allcomments/:value' exact component={Comment} />
                    <PrivateRoutes path='/alert' exact component={Alert} />
                    <Route path='/introduction' exact component={Introduction} />
                    <PrivateRoutes path='/setting' exact component={Setting} />
                    <Route path='/production/card' exact component={ProductionCard} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
