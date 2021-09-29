import React, {useState, useEffect, useReducer} from 'react';

import UserBar from './User/UserBar';
import TodoBar from './todo/TodoBar';
import appReducer from './reducer'


function App() { 
      const initialTodos = [
            {
              "name":"Do something",
              "description":"some thing I need to do",
              "dateCreated":"January 1st 1975",
              "dateCompleted":"January 1st 2021",
              "completed":true
            },
            {
              "name":"Do something else",
              "description":"some thing else I need to do",
              "dateCreated":"March 3rd 2021",
              "dateCompleted":"Incomplete",
              "completed":false
            }
      ]
      //const [user, dispatch] = useReducer(userReducer, '')
      //const [ todos, setTodos ] = useState(initialTodos)
      
      const [state, dispatch] = useReducer(appReducer, {user: '', todos: initialTodos})
      const {user, todos} = state;
      const [title, setTitle] = useState('Todo list');

      // use effect to change the page title 
      useEffect(() => {
        if (user) {
          setTitle(`${user}’s Todo List`)
          document.title = `${user}’s Todo List` 
         } 
         else {
          setTitle('Todo List')
          document.title = 'Todo List'
       }
      }, [user])

      return (
          <div id="main">
          <h1>{title}</h1>
              <UserBar user={user} dispatchUser={dispatch}/>
              <br/>
              <TodoBar user={user} todos={todos} dispatch={dispatch}/>
          </div>
      )

  
}

export default App;