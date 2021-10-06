import React, {useState} from 'react'


export default function CreateTodo ({todos, dispatch}) {

    var today = new Date(), cur = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' at ' + today.toLocaleTimeString();
    const [ name, setName] = useState('')
    const [ dateCreated] = useState(cur)
    const [ description, setDescription] = useState('')
    const [ complete] = useState(false)
    const [ dateCompleted] = useState('Not Complete')
    function handleName (evt) {setName(evt.target.value)}
    function handleDescription (evt) {setDescription(evt.target.value)}
    function handleCreate () {
        //handleDateCreated()
        dispatch({type: "CREATE_TODO", name, dateCreated, description, complete, dateCompleted});
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