import React from 'react'
import Todo from './Todo'
import {StateContext, ThemeContext} from '../Context'
import { useContext } from 'react/cjs/react.development'


export default function TodoList() {
    const {primaryColor} = useContext(ThemeContext)
    const {textAlign} = useContext(ThemeContext)
    const{state}= useContext(StateContext)
    const {todos} = state;

   return (
   	     <div style={{ textAlign: textAlign}}>
            <h1 style={{ color: primaryColor}}>Todo List</h1>    
            <div>        
              {todos.map((p, i) => <Todo id={i} {...p} key={'Todo-' + i} />)}
            </div>
        </div>   
    )
}