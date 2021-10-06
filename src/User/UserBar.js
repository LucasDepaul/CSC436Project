import React from 'react'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

export default function UserBar({user, dispatchUser}) {
    const h1Style = {
        textDecortionLine: 'underline !important',
    };


    if (user) {
        return <Logout style={h1Style} user={user} dispatchUser={dispatchUser}/>
    } else {
        return (
            <div style={h1Style}>
              <Login dispatchUser={dispatchUser}/>
              <Register dispatchUser={dispatchUser}/>
            </div>
        )
    } 
}