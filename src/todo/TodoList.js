import React from 'react'
import Todo from './Todo'

export default function TodoList({todos = []}) {
   return (
   	     <div>
            <h1>Todo Lists</h1>
            <br />
            <div>
            	{todos.map((p, i) => <Todo {...p} key={'Todo-' + i} />)}
            </div>
        </div>   
    )
}