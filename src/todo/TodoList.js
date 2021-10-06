import React from 'react'
import Todo from './Todo'

export default function TodoList({todos = [],dispatch}) {
  	const h1Style = {
  	textAlign: 'center',
	  textDecortionLine: 'underline !important',
	};
   return (
   	     <div>
            <h1 style={h1Style}>Todo List</h1>
            <div style={h1Style}>
            	{todos.map((p, i) => <Todo dispatch={dispatch} id={i} {...p} key={'Todo-' + i} />)}
            </div>
        </div>   
    )
}