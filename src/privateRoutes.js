import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthincated , isConformed } from './auth/helper'
import BottomNav from './core/BottomNav'
import TopNavBar from './core/TopNavBar'



function PrivateRoutes({ component: Component, ...rest }) {
  const { user } = isAuthincated()
  if(isConformed() === 'false'){
     return (
      <Route
      {...rest}
      render={ props =>
      <Redirect
        to={{
          pathname: `/conformId/${user.email}`,
          state: { from: props.location }
        }}
      />
    }
    />
    )
  }else{
    return (
      <>
      <Route
      {...rest}
      render={ props =>
        
          isAuthincated() ? (
          <Component {...props} />
        )  : (
          <Redirect
            to={{
              pathname: "/singin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
    <BottomNav />
    <TopNavBar />
    </>
  )
  }
    
}

export default PrivateRoutes
