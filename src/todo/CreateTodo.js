import React, {useState, useContext, useEffect} from 'react'
import {StateContext, ThemeContext} from '../Context'
import { useResource } from 'react-request-hook'
import {Link, useNavigation} from 'react-navi'
import {Container, Col} from 'react-bootstrap'


export default function CreateTodo () {
    const {primaryColor, secondaryColor, padding, border, margin, textAlign, color, boxShadow} = useContext(ThemeContext)
    const {state, dispatch} =useContext(StateContext)
    let max =0;
    state.todos.forEach(t =>{
        if (t.id > max)
            max = t.id
    });
    const id = max+1;
    var today = new Date(), cur = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' at ' + today.toLocaleTimeString();
    const [ name, setName] = useState('')
    const [ dateCreated] = useState(cur)
    const [ description, setDescription] = useState('')
    const [ completed] = useState(false)
    const [ dateCompleted] = useState('Not Complete')
    const {user} = state;
    function handleName (evt) {setName(evt.target.value)}
    function handleDescription (evt) {setDescription(evt.target.value)}
    const [todo, createToDo] = useResource(({name, dateCreated, description, completed, dateCompleted}) => ({
        url:'/todo/',
        method: 'post',
        headers: {"Authorization": state.user.access_token},
        data: {name, dateCreated, description, completed, dateCompleted}
    }))
    function handleCreate () {
        createToDo({name, dateCreated, description, completed, dateCompleted});
    }
    const navigation = useNavigation()

    useEffect(() => {
        if (todo && todo.data){
            dispatch({type: "CREATE_TODO", name: todo.data.name, dateCreated: todo.data.dateCreated, description: todo.data.description, completed: todo.data.complete, dateCompleted: todo.data.dateCompleted});
            console.log(todo.data)
            navigation.navigate('/todo/' + todo.data.id);
        }
    }, [todo])

    if (user.username === undefined)
        return (
            <Container style={{padding: '15vh', minHeight: '100vh', textAlign: textAlign}}>
                <h1>Please sign in to create a todo</h1>
            </Container>
        )
    else 
        return(
            <Container style={{padding: '15vh', minHeight: '100vh'}}>
                <Col></Col>

                <div><Link onClick={() => navigation.goBack()}>Back</Link></div>
                <form style={{border:border,  padding: padding, margin: margin, textAlign: textAlign, color: color, boxShadow: boxShadow}} onSubmit={e=>{e.preventDefault(); handleCreate()}}>
                    <h1>Create Todo item </h1>
                    <h3> CurrentDate: {dateCreated} </h3>
                    <row> 
                        Title: <input type="text" name="create-title" value={name} onChange={handleName} />
                        <label htmlFor="create-Description">Description:</label>
                        <input style={{overflowY: 'scroll', minHeight: '15vh, overflowWrap: anywhere;'}} type="text" name="create-Description" value={description} onChange={handleDescription}/>
                    </row>
                    
                    <input type="submit" value="Submit" disabled={name.length === 0 || description.length ===0 }/>
                </form> 
            </Container>  
        )
 }