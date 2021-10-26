import React, {useState, useContext, useEffect} from 'react'
import {StateContext} from '../Context'
import { useResource } from 'react-request-hook';


export default function Login() {
    const{dispatch}= useContext(StateContext)
    const[username, setUsername]=useState('')
	function handleUsername (evt) {setUsername(evt.target.value)}
    const [ loginFailed, setLoginFailed ] = useState(false)
    const [ password, setPassword ] = useState('')
    function handlePassword (evt) { setPassword(evt.target.value) }
    const [ user, login ] = useResource((username, password) => ({
        url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
        method: 'get'
    }))
    useEffect(() => {
        if (user && user.data) {
            if (user.data.length > 0) {
                setLoginFailed(false)
                dispatch({ type: 'LOGIN', username: user.data[0].username })
        } else {
                setLoginFailed(true)
            }
        } 
    }, [user])


    return (
        <form onSubmit={e => { e.preventDefault(); login(username,password);}}>
            <label htmlFor="login-username">Username:</label>
            <input type="text" value={username} onChange={handleUsername} name="login-user" id="login-username" />
            <label htmlFor="login-password">Password:</label>
            <input type="password" value={password} onChange={handlePassword} name="login-password" id="login-password" />
            <input type="submit" value="Login" disabled={username.length === 0 || password.length ===0} />
            {loginFailed && <span style={{ color: 'red' }}>Invalid username or password</span>}
        </form>
    )
}