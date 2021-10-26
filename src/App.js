import React, {useState, useEffect, useReducer} from 'react';
import { useResource } from 'react-request-hook';

import UserBar from './User/UserBar';
import TodoBar from './todo/TodoBar';
import appReducer from './reducer'
import Header from './Header'
import Context, {StateContext, ThemeContext} from './Context'
import ChangeTheme from './ChangeTheme'


function App() { 

  const [ todos, getTodos ] = useResource(() => ({
    url: '/todos',
    method: 'get'
  }))
  useEffect(getTodos, [])

  useEffect(() => {
      if (todos && todos.data) {
          dispatch({ type: 'FETCH_TODOS', todos: todos.data.reverse() })
      }
  }, [todos])
      //const [user, dispatch] = useReducer(userReducer, '')
      //const [ todos, setTodos ] = useState(initialTodos)
      
      const [state, dispatch] = useReducer(appReducer, {user: '', todos: [] })
      const {user} = state;
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


      const [ theme, setTheme ] = useState({
        primaryColor: 'deepskyblue',
        secondaryColor: 'coral',
        color: 'black',
        backgroundColor: 'powderblue',
        textAlign: 'center'
      })
      const {backgroundColor}=theme
      const {color}=theme
      return (
        <ThemeContext.Provider value={theme}>
        <StateContext.Provider value ={{state: state, dispatch: dispatch}}>
          <div id="main" style={{backgroundColor: backgroundColor, color:color}}>
          <Header text={title}/>
          <ChangeTheme theme={theme} setTheme={setTheme} />
              <UserBar/>
              <br/>
              <TodoBar/>
          </div>
        </StateContext.Provider>
        </ThemeContext.Provider>
      )

  
}

export default App;