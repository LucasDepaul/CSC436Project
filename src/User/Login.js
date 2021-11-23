import React, {useState, useContext, useEffect} from 'react'
import {StateContext} from '../Context'
import { useResource } from 'react-request-hook';
import {Modal, Form, Button} from 'react-bootstrap'


export default function Login({handleClose, show}) {
    const{dispatch}= useContext(StateContext)
    const[username, setUsername]=useState('')
    const [ loginFailed, setLoginFailed ] = useState(false)
    const [ password, setPassword ] = useState('')

	function handleUsername (evt) {setUsername(evt.target.value)}
    function handlePassword (evt) { setPassword(evt.target.value) }
    
    const [ user, login ] = useResource((username, password) => ({
        url: `/auth/login`,
        method: 'post',
        data: {username, password}
    }))
   
/*    useEffect(() => {
        if (user && user.data) {
            if (user.data.length > 0) {
                setLoginFailed(false)
                dispatch({ type: 'LOGIN', username: user.data[0].username })
        } else {
                setLoginFailed(true)
            }
        } 
    }, [user])*/

    useEffect(() => {
      if (user && user.isLoading === false && (user.data || user.error)){
        if (user.error){
          setLoginFailed(true)
          alert('failed')
        }
        else {
          setLoginFailed(false)
          console.log("Just logged in: "+user.data._id)
          dispatch({ type: 'LOGIN', id: user.data._id, username, access_token: user.data.access_token})

        }
      }
    }, [user])


    return (
        <Modal show={show} onHide={handleClose}>
        <Form onSubmit={e => { e.preventDefault(); login(username, password); handleClose() }}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="login-username">Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={handleUsername} name="login-username" id="login-username" />
          <Form.Label htmlFor="login-password">Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePassword} name="login-password" id="login-password" />
          {loginFailed && <Form.Text style={{ color: 'red' }}>Invalid username or password</Form.Text>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" disabled={username.length === 0} type="submit">Login</Button>
        </Modal.Footer>
        </Form>
        </Modal>
    )
}