import React, {useState} from 'react'

export default function Todo({name, description, dateCreated, completed, dateCompleted}) {
   const [complete, setComplete] = useState('') 
   function handleComplete (evt) { setComplete(evt.target.checkbox)}

	if (completed){
		return (
   	     <div>
            <h2>{name}</h2>

            <p>completed on: {dateCompleted}</p>
            <div>{description}</div>
            <i><label for="completed">Complete</label><input type="checkbox" defaultChecked={completed} value={completed} onChange={handleComplete}/></i>
        </div>   
    )}
    else 
    			return (
   	     <div>
            <h2>{name}</h2>

            <p>created on: {dateCreated}</p>
            <div>{description}</div>
            <i><label for="completed">Complete</label><input type="checkbox" defaultChecked={completed} value={completed} onChange={handleComplete}/></i>
        </div>   
    )

}