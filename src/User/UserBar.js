import React, {useContext} from 'react'
import {StateContext} from '../Context'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'

export default function UserBar() {
    const{state}= useContext(StateContext)
    const h1Style = {
        textDecortionLine: 'underline !important',
    };


    if (state.user) {
        return <Logout style={h1Style}/>
    } else {
        return (
            <div style={h1Style}>
              <Login/>
              <Register/>
            </div>
        )
    } 
}