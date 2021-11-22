import React, {useContext, useState} from 'react'
import {StateContext} from '../Context'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import {Button} from 'react-bootstrap'


export default function UserBar() {
    const{state}= useContext(StateContext)
    const h1Style = {
        textDecortionLine: 'underline !important',
    };
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const Logout = React.lazy(() => import('./Logout'))


    if (state.user.username) {
        return <Logout/>
    } else {
        return (
                <div className="justify-content-end">
                    <Button variant="link" onClick={(e) => setShowLogin(true)}>
                        Login
                    </Button>
                    <Login show={showLogin} handleClose={() => setShowLogin(false)} />
                    <Button variant="link" onClick={(e) => setShowRegister(true)}>
                        Register
                    </Button>
                    <Register show={showRegister} handleClose={() => setShowRegister(false)} />
                    <Register/>
                </div>
        )
    } 
}