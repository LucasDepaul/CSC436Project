import React, {useContext, useState} from 'react'
import { ThemeContext, StateContext } from '../Context'
import { useResource } from 'react-request-hook';



export default function Todo({name, description, dateCreated, completed, dateCompleted, id}) {
  //const [toggle, setToggle] = useState(completed)
  const {secondaryColor} = useContext(ThemeContext)
  const {dispatch} = useContext(StateContext)
  const {textAlign} = useContext(ThemeContext)
  const {color} = useContext(ThemeContext)  
  const [todo, DeleteToDo] = useResource(({name, dateCreated, description, completed, dateCompleted, id}) => ({
        url:'/todos/'+id,
        method: 'delete',
        data: {name, dateCreated, description, completed, dateCompleted, id}
  }))
  const [complete, UpdateToDo] = useResource(({completed}) => ({
         url:'/todos/' + id,
         method: 'put',
         data: {name, dateCreated, description, completed, dateCompleted, id}
   }))
  function handleComplete (){
    console.log("Comlete button hit");
    var today = new Date(), cur = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' at ' + today.toLocaleTimeString();
    completed = !completed;
    UpdateToDo({name, description, dateCreated, completed, cur, id});
    completed = !completed;
    dispatch({type: "COMPLETE_TODO", name, description, dateCreated, completed, cur, id} );

   }
  function handleRemove() {
    console.log("remove button hit. Attempting to remove todo #" + id);
    DeleteToDo({name, dateCreated, description, completed, dateCompleted, id});
    dispatch({type: "DELETE_TODO", name, description, dateCreated, completed, dateCompleted, id} );

   }


	if (completed){
		return (
   	     <div style={{color: color}}>
             <h2 style={{ color: secondaryColor }}>{name}: Todo #{id}</h2>
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
   	     <div style={{color: color}}>
            <h2 style={{color: secondaryColor}}>{name}: Todo #{id}</h2>

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