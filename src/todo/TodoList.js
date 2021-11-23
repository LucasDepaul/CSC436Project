import React from 'react'
import Todo from './Todo'
import {StateContext, ThemeContext} from '../Context'
import { useContext } from 'react'


export default function TodoList() {
    const {primaryColor, secondaryColor} = useContext(ThemeContext)
    const {textAlign} = useContext(ThemeContext)
    const{state}= useContext(StateContext)
    const {todos} = state;
    const {user} = state;

   return (
   	     <div style={{paddingTop: '10vh', textAlign: textAlign, minHeight: '100vh'}}>
            { user.username !== undefined && <h1 style={{ color: primaryColor}}>Todo List</h1>}
            {user.username === undefined && <h2 style={{color: secondaryColor, paddingTop: '30vh', height: '100vh'}}>Sign in to see your todos.</h2>} 
            {todos.length === 0 && user.username !== undefined && <h2 style={{paddingTop: '30vh', height: '100vh'}}>No todos found for current user.</h2>} 
            { todos.length > 0 && user.username!== undefined &&
            <div>        
              {todos.map((p, i) => <Todo short={true} id={p._id} {...p} key={'Todo-' + i} />)}
            </div>
          }
        </div>   
    )
}