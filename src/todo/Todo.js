import React, {useContext, useState, useEffect} from 'react'
import { ThemeContext, StateContext } from '../Context'
import { useResource } from 'react-request-hook';
import {Link} from 'react-navi'
import {Container, Col, Row, Card} from 'react-bootstrap'


 function Todo({name, description, dateCreated, completed, dateCompleted, id, author, short=false}) {
  const {primaryColor, secondaryColor, padding, border, margin, textAlign, color, boxShadow} = useContext(ThemeContext)
  const {state, dispatch} = useContext(StateContext)  
  let processedDescription = description

  
  if (short) {
    if (description.length > 30) {
      processedDescription = description.substring(0, 30) + '...'
    }
  }
  // the signed in users id is needed to check agianst the todos id to make sure that the user is allowed to alter the todo
  const [checkAuth, getCheck] = useResource(() => ({
        url:'users/getUser/'+state.user.username,
        method:'get'
  })) 
  // the authors name is required so that we can put a readable name for the author on the todo card
  const [gname, getName] = useResource(() => ({
        url:'users/getname/'+author,
        method:'get'
  }))
  useEffect( ()=>{
    getName()
  }, [])
    useEffect( ()=>{
    getCheck()
  }, [])
     var a=''
   var u=''
   if (gname.data)
    a = gname.data.username
   if (checkAuth.data){
     console.log("Signed in: " + state.user.username+ " Auth: " + checkAuth.data.at(0)._id)
    u = checkAuth.data.at(0)._id
  }
  const [todo, DeleteToDo] = useResource(({name, dateCreated, description, completed, dateCompleted, id}) => ({
        url:'/todo/delete/'+id,
        method: 'delete',
        headers: {"Authorization": state.user.access_token},
        data: {author:u, name, dateCreated, description, completed, dateCompleted, id}
  }))

  const [toggle, UpdateToDo] = useResource(({c, cur}) => ({
         url:'/todo/toggle/' + id +'/'+c,
         method: 'put',
         headers: {"Authorization": state.user.access_token},
         data: {author: u, completed: c, dateCompleted: cur}
   }))
  async function handleComplete (e){
    console.log(u+" : "+ author)
    if (u === author){
      console.log("actual:" + e.target.checked)
      var today = new Date(), cur = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' at ' + today.toLocaleTimeString();
      UpdateToDo({name, description, dateCreated, c: e.target.checked, cur, id});
      dispatch({type: "COMPLETE_TODO", name, description, dateCreated, completed: !e.target.checked, cur, id} );
    }
   }
  async function handleRemove() {
    if (u === author){
    console.log("remove button hit. Attempting to remove todo #" + id);
    await DeleteToDo({name, dateCreated, description, completed, dateCompleted, id});
    await dispatch({type: "DELETE_TODO", id} );
    }

   }
	if (completed){
		return (
      <Container>
        <Row>
           <Col></Col>
           <Col>
   	    <Card style={{ background: primaryColor, color: color, padding: padding, border: border, margin: margin, boxShadow: boxShadow, width: 'inherit' }}>
          <Card.Body>
             <Card.Title><Link href={'/todo/'+id}><h2 style={{color: secondaryColor}}>{name}</h2></Link></Card.Title>
              <h3>Author: {a} </h3>
              <div style={{background: secondaryColor, border: border, margin: margin, width: '66vh'}}>{processedDescription}</div>
              <li>Created on: {dateCreated}</li>
              <li>completed on: {dateCompleted}</li>
              <Card.Text>
              {short && <div>
              <Link href={'/todo/'+id}>View full todo</Link> 
              </div>}
              <form onSubmit={e=>{e.preventDefault(); handleComplete()}}>
              <li><label for="completed">Complete</label><input type="checkbox" defaultChecked={completed} value={toggle} onChange={handleComplete}/></li>
              </form>
              <form onSubmit={e=>{e.preventDefault(); handleRemove()}}>
                  <li><button type="button onClick={handleRemove()}">Delete Todo</button></li>
              </form>
              </Card.Text>
            </Card.Body>
        </Card> 
        </Col>   
          <Col></Col>
      </Row>
    </Container> 
    )}
    else 
    	return (
      <Container>
        <Row>
           <Col></Col>
           <Col >
        <Card style={{background: primaryColor, color: color, padding: padding, border: border, margin: margin, boxShadow: boxShadow, width: 'inherit' }}>
          <Card.Body>
             <Card.Title><Link href={'/todo/'+id}><h2 style={{color: secondaryColor}}>{name}</h2></Link></Card.Title>
              <h3>Author: {a} </h3>
              <Card.Text>
               <div style={{background: secondaryColor, border: border, margin: margin, width: '66vh'}}>{processedDescription}</div>
               <li>created on: {dateCreated}</li>
                {short && <div>
                <Link href={'/todo/'+id}>View full todo</Link>
                </div>}
              <form onSubmit={e=>{ handleComplete()}}>
                 <li><label for="completed">Complete</label><input type="checkbox" defaultChecked={completed} value={toggle} onChange={handleComplete}/></li>
              </form>
              <form onSubmit={e=>{e.preventDefault(); handleRemove()}}>
                 <li><button type="button onClick={handleRemove()}">Delete Todo</button></li>
              </form>
              </Card.Text>
            </Card.Body>
        </Card> 
        </Col>   
          <Col></Col>
      </Row>
    </Container>  
    )

}

export default React.memo(Todo);