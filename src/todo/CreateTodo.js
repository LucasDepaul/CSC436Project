import React, {useState, useContext, useEffect} from 'react'
import {StateContext, ThemeContext} from '../Context'
import { useResource } from 'react-request-hook'
import {Link, useNavigation} from 'react-navi'
import {Modal, Form, Button} from 'react-bootstrap'


export default function CreateTodo ({handelClose, show}) {
    const {primaryColor, secondaryColor, padding, border, margin, textAlign, color, boxShadow} = useContext(ThemeContext)
    const {state, dispatch} =useContext(StateContext)
    var today = new Date(), cur = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' at ' + today.toLocaleTimeString();
    const [ name, setName] = useState('')
    const [ dateCreated] = useState(cur)
    const [ description, setDescription] = useState('')
    const [ completed] = useState(false)
    const [ dateCompleted] = useState('Not Complete')
    const {user} = state;
    function handleName (evt) {setName(evt.target.value)}
    function handleDescription (evt) {setDescription(evt.target.value)}
    const [ CreateFailed, setCreateFailed ] = useState(false)
    console.log("user: " + user.id)
    const [todo, createToDo] = useResource(({name, dateCreated, description, completed, dateCompleted, author}) => ({
        url:'/todo/',
        method: 'post',
        headers: {"Authorization": state.user.access_token},
        data: {name, dateCreated, description, completed, dateCompleted, author}
    }))
    function handleCreate () {
        console.log("user: " + user.id)
        createToDo({name, dateCreated, description, completed, dateCompleted, author: user.id});
    }

    useEffect(() => {
        if (todo && todo.isLoading === false &&  (todo.data || todo.error) ){

            if (todo.error){
                setCreateFailed(true)
                alert('failed')
            }
            else {
                console.log(todo.data)
                dispatch({type: "CREATE_TODO", name: todo.data.name, dateCreated: todo.data.dateCreated, description: todo.data.description, completed: todo.data.complete, dateCompleted: todo.data.dateCompleted});
            
            }
        
    }}, [todo])


            return(
                <Modal show={show} onHide={handelClose}>
                    <Form onSubmit={e => { e.preventDefault(); handleCreate(); handelClose() }}>
                        <Modal.Header closeButton>
                          <Modal.Title>Create Todo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Label htmlFor="create-title">Title:</Form.Label>
                          <Form.Control type="text" value={name} onChange={handleName} name="create-title" id="create-title" />
                          <Form.Label htmlFor="login-password">Description:</Form.Label>
                          <Form.Control type="text" value={description} onChange={handleDescription} name="create-title" id="create-title" />
                          {CreateFailed && <Form.Text style={{ color: 'red' }}>Please enter a title or description.</Form.Text>}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handelClose}>Cancel</Button>
                          <Button variant="primary" type="submit" disabled={name.length === 0 || description.length ===0 }>Submit</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

            )
 }