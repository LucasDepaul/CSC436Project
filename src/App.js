import React, {useState, useEffect, useReducer} from 'react';
import { useResource } from 'react-request-hook';
import UserBar from './User/UserBar';
import TodoBar from './todo/TodoBar';
import appReducer from './reducer'
import Header from './Header'
import Context, {StateContext, ThemeContext} from './Context'
import ChangeTheme from './ChangeTheme'
import HeaderBar from './pages/HeaderBar'
import { Router, View } from 'react-navi'
import { mount, route } from 'navi'  
import HomePage from './pages/HomePage'
import TodoPage from './pages/TodoPage'
import UsersPage from './pages/UsersPage'
import CreateTodo from './todo/CreateTodo'
import ProfilePage from './pages/ProfilePage'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from 'react-bootstrap'


function App() { 


      const [state, dispatch] = useReducer(appReducer, {user: {}, todos: [] })
      const {user} = state;



      const [ theme, setTheme ] = useState({
        primaryColor: 'deepskyblue',
        secondaryColor: 'coral',
        color: 'black',
        backgroundColor: 'powderblue',
        textAlign: 'center',
        border: '1px solid black',
        margin: '10px',
        padding: '5px',
        boxShadow: '2px 5px #888888'
      })
      const {backgroundColor}=theme
      const {color}=theme

      const routes = mount({
        '/': route({ view: <HomePage /> }),
        '/todo/create':route({ view: <CreateTodo /> }),
        '/users':route({view: <UsersPage />}),
        '/users/:id/:username':route(req => {
            return {view: <ProfilePage username={req.params.username} id={req.params.id} />}
        }),
        '/todo/:id': route(req => {
            return { view: <TodoPage id={req.params.id} /> }
        }),
      })


      return (
        <ThemeContext.Provider value={theme}>
        <StateContext.Provider value ={{state: state, dispatch: dispatch}}>
          <div id="main" style={{backgroundColor: backgroundColor, color:color}}>
            <Router routes={routes}>
              <Container>
                <HeaderBar setTheme={setTheme} />
                <hr />
                <View />
              </Container>
            </Router>
          </div>
        </StateContext.Provider>
        </ThemeContext.Provider>
      )

  
}

export default App;