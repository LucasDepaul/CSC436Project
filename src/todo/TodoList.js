import React from 'react'
import Todo from './Todo'

export default function TodoList({todos = []}) {
  	const h1Style = {
  	textAlign: 'center',
	  textDecortionLine: 'underline !important',
	};
   return (
   	     <div>
            <h1 style={h1Style}>Todo Lists</h1>
            <div style={h1Style}>
            	{todos.map((p, i) => <Todo {...p} key={'Todo-' + i} />)}
            </div>
        </div>   
    )
}