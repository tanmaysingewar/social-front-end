import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthincated } from './auth/helper'


function PrivateRoutes({ component: Component, ...rest }) {
    return (
        <Route
        {...rest}
        render={ props =>
            isAuthincated() ? (
            <Component {...props} />
          ) : (
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

export default PrivateRoutes
