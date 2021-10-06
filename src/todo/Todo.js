import React, {useState} from 'react'

export default function Todo({dispatch, name, description, dateCreated, completed, dateCompleted, id}) {
   function handleComplete (){
    console.log("Comlete button hit");
    var today = new Date(), cur = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' at ' + today.toLocaleTimeString();
    dispatch({type: "COMPLETE_TODO", name, description, dateCreated, completed, cur, id} );

   }
   function handleRemove() {
    console.log("remove button hit");
    dispatch({type: "DELETE_TODO", name, description, dateCreated, completed, dateCompleted, id} );

   }

	if (completed){
		return (
   	     <div>
            <h2>{name}</h2>
            <li>Created on: {dateCreated}</li>
            <li>completed on: {dateCompleted}</li>
            <li>{description}</li>
                <form onSubmit={e=>{e.preventDefault(); handleComplete()}}>
            <li><label for="completed">Complete</label><input type="checkbox" defaultChecked={completed} value={completed} onChange={handleComplete}/></li>
            </form>
            <form onSubmit={e=>{e.preventDefault(); handleRemove()}}>
                <li><button type="button onClick={handleRemove()}">Delete Todo</button></li>
            </form>
            
        </div>   
    )}
    else 
    			return (
   	     <div>
            <h2>{name}</h2>

            <li>created on: {dateCreated}</li>
            <li>{description}</li>
            <form onSubmit={e=>{ handleComplete()}}>
               <li><label for="completed">Complete</label><input type="checkbox" defaultChecked={completed} value={completed} onChange={handleComplete}/></li>
            </form>
            <form onSubmit={e=>{e.preventDefault(); handleRemove()}}>
               <li><button type="button onClick={handleRemove()}">Delete Todo</button></li>
            </form>

        </div>   
    )

}