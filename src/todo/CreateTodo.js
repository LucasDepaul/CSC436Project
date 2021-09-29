import React, {useState} from 'react'


export default function CreateTodo ({todos, dispatch}) {

    var today = new Date(), cur = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
    const start = Date.now()
    const [ name, setName] = useState('')
    const [ dateCreated, setDateCreated] = useState(cur)
    const [ description, setDescription] = useState('')
    const [ complete, setComplete] = useState(false)
    const [ dateCompleted, setDateCompleted] = useState('Not Complete')
    function handleName (evt) {setName(evt.target.value)}
    function handleDescription (evt) {setDescription(evt.target.value)}
    function handleDateCreated (evt) {
        var today = new Date(), cur = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        setDateCreated(cur)}
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

            
            <input type="submit" value="Submit"/>
         </form>   
          )
 }