import React, {useContext, useState, useEffect} from 'react'
import { ThemeContext, StateContext } from '../Context'
import { useResource } from 'react-request-hook';
import {Link} from 'react-navi'
import {Container, Col, Row, Card} from 'react-bootstrap'
import Todo from '../todo/Todo'
import { PersonCircle } from 'react-bootstrap-icons';


 function User({username, todos, _id}) {
  console.log("user rendereed")
  const {primaryColor, secondaryColor, padding, border, margin, textAlign, color, boxShadow} = useContext(ThemeContext)
  const {state, dispatch} = useContext(StateContext)  
  
  const { data, isLoading } = todos;
  const [ todolist, gettodos ] = useResource(() => ({
        url: '/users/todos/'+_id,
        method: 'get',
        data: {id: _id}
    }),[])
  useEffect(()=>{
        gettodos()
    }, [state.user.access_token])

    useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
            dispatch({ type: 'FETCH_TODOS', todos: todos.data.todos.reverse() })
        }
    }, [todolist])

    var t =[]
    if (todolist.data){
      t = todolist.data.todos
    }
    var prof = '/users/' +_id + '/'+username
  return (
      <Container>
        <Row>
           <Col></Col>
           <Col >
        <Card style={{width: 'inherit', background: secondaryColor, color: primaryColor, padding: padding, border: border, margin: margin, boxShadow: boxShadow}}>
          <Card.Body>
             <Card.Title>
                <Col>
                  <PersonCircle style={{color: 'white'}}/> 
                </Col>
                <Col style={{color: primaryColor}}>
                  {username}
                </Col>
              </Card.Title>
              <Card.Text>
              <Link href={prof} ><li>{username}'s profile</li></Link>
              </Card.Text>
            </Card.Body>
        </Card> 
        </Col>   
          <Col></Col>
      </Row>
    </Container>  
    )

}

export default React.memo(User);