import React, {useState, useEffect, useReducer} from 'react';

import UserBar from './User/UserBar';
import TodoBar from './todo/TodoBar';
import appReducer from './reducer'


function App() { 
      const initialTodos = [
            {
              "name":"Brush teeth",
              "description":"I need to brush my teeth again",
              "dateCreated":"1975-1-1 at 2:48:57 AM",
              "dateCompleted":"2021-9-5 at 8:48:57 PM",
              "completed":true
            },
            {
              "name":"Take Shower",
              "description":"I should shower",
              "dateCreated":"2021-3-5 at 4:55:01 PM",
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