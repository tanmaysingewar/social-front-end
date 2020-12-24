import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthincated, isConformed } from './auth/helper'

function ConformIdRoutes({ component: Component, ...rest }) {

  if(isConformed() === 'true'){
   return <Redirect
          to={{
            pathname: "/profile/me"
          }}
        />
  }

  return (
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
)
}

export default ConformIdRoutes
