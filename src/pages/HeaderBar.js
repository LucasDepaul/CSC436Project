import React, { useContext,useState, useEffect } from 'react'
import CreateTodo from '../todo/CreateTodo'
import UserBar from '../User/UserBar'
import Header from '../Header'
import ChangeTheme from '../ChangeTheme'
import { ThemeContext, StateContext } from '../Context'
import {Link} from 'react-navi'
import {Navbar, Nav, Container} from 'react-bootstrap'




export default function HeaderBar ({ setTheme}) {
	const theme = useContext(ThemeContext)
	const { state } = useContext(StateContext)
	const { user } = state
	const [title, setTitle] = useState('Todo list');
	      // use effect to change the page title 
    useEffect(() => {
    	if (user) {
          setTitle(`${user.username}’s Todo List`)
          document.title = `${user.username}’s Todo List` 
         } 
         else {
          setTitle('Todo List')
          document.title = 'Todo List'
       }
    }, [user])
	return (
		<>
	 		<Navbar fixed="top" bg="light" expand="lg">
     		 <Container style={{width:'100vh'}}>
		        <Navbar.Brand href="/"><Header text="Home" /></Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav justify className="me-auto">
		            {user.username && <Nav.Link><Link href="/todo/create">Create New Post</Link></Nav.Link>}
		            <Nav.Link><Link href='/users'>Users</Link></Nav.Link>
		            <ChangeTheme theme={theme} setTheme={setTheme} />
		          </Nav>
		          <React.Suspense fallback={"Loading..."}>
		            <UserBar />
		          </React.Suspense>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>
		</>
	)
}