import UserBar from './User/UserBar';
import TodoBar from './todo/TodoBar';
import React, {useState} from 'react'

function App() { 
      const initialTodos = [
            {
              "name":"Do something",
              "description":"some text",
              "dateCreated":"January 1st 1975",
              "dateCompleted":"some date",
              "completed":true
            },
            {
              "name":"Do something else",
              "description":"some text",
              "dateCreated":"March 3rd 2021",
              "dateCompleted":"some date",
              "completed":false
            }
      ]
      const [ user, setUser] = useState('')
      const [ todos, setTodos ] = useState(initialTodos)
      return (
          <div id="main" className = "col-mid-12">
              <UserBar user={user} setUser={setUser}/>
              <br/>
              <TodoBar user={user} todos={todos} setTodos={setTodos}/>
          </div>
        
              
      )

  
}

export default App;