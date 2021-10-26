import React, {useState, useContext} from 'react'
import {StateContext} from '../Context'
import { useResource } from 'react-request-hook';


export default function CreateTodo () {

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
    const [ complete] = useState(false)
    const [ dateCompleted] = useState('Not Complete')
    const {user} = state;
    function handleName (evt) {setName(evt.target.value)}
    function handleDescription (evt) {setDescription(evt.target.value)}
    const [todo, createToDo] = useResource(({name, dateCreated, description, complete, dateCompleted, id}) => ({
        url:'/todos',
        method: 'post',
        data: {name, dateCreated, description, complete, dateCompleted, id}
    }))
    function handleCreate () {
        //handleDateCreated()
        createToDo({name, dateCreated, description, complete, dateCompleted, id})
        dispatch({type: "CREATE_TODO", name, dateCreated, description, complete, dateCompleted, id});
    }

     return (
        
          <form onSubmit={e=>{e.preventDefault(); handleCreate()}}>
            <h1>Create Todo item </h1>
            <h3> CurrentDate: {dateCreated} </h3>
             
            <div>Title: <input type="text" name="create-title" value={name} onChange={handleName} /></div>

            <div>
                <label htmlFor="create-Description">Description:</label>
                <input type="text" name="create-Description" value={description} onChange={handleDescription}/>
            </div>

            
            <input type="submit" value="Submit" disabled={name.length === 0 || description.length ===0}/>
         </form>   
          )
 }