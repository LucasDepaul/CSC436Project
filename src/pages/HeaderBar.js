import React, { useContext,useState, useEffect } from 'react'
import CreateTodo from '../todo/CreateTodo'
import UserBar from '../User/UserBar'
import Header from '../Header'
import ChangeTheme from '../ChangeTheme'
import { ThemeContext, StateContext } from '../Context'
import {Link} from 'react-navi'
import {Navbar, Nav, Container, Button} from 'react-bootstrap'




export default function HeaderBar ({ setTheme}) {
	const theme = useContext(ThemeContext)
	const { state } = useContext(StateContext)
	const { user } = state
	const [title, setTitle] = useState('Todo list');
	const [showCreate, setShow] = useState(false);
	const handleClose = () => setShow(false);;
	const handleShow = () => setShow(true);;
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
     		 <Container>
		        <Navbar.Brand href="/"><Header text="Home" /></Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav justify className="me-auto">
				  {(user.username) &&
		        	<Button variant="link" onClick={(e) => setShow(true)}>
                        Create New Todo
                    </Button>
                  }
                    <CreateTodo show={showCreate}   handelClose={() => setShow(false)}/>
                    <CreateTodo/>
                	
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