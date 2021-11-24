import React, {useContext, useState, useEffect} from 'react'
import { ThemeContext, StateContext } from '../Context'
import { useResource } from 'react-request-hook';
import {Link, useNavigation} from 'react-navi'
import {Container, Col, Row, Card, Button, Label} from 'react-bootstrap'
import { CalendarCheck, Calendar, Clipboard, ClipboardCheck} from 'react-bootstrap-icons'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


 function Todo({name, description, dateCreated, completed, dateCompleted, id, author, short=false, long=false, td=false}) {
  const {primaryColor, secondaryColor, padding, border, margin, textAlign, color, boxShadow, backgroundColor} = useContext(ThemeContext)
  const {state, dispatch} = useContext(StateContext)  
  let processedDescription = description
  const navigation = useNavigation()
    var a=''
  var u=''
  var h = '15'
  if (long)
    h='inherit'
  
  if (short) {
    if (description.length > 30) {
      processedDescription = description.substring(0, 30) + '...'
    }
  }

  // the authors name is required so that we can put a readable name for the author on the todo card
  const [gname, getName] = useResource(() => ({
        url:'users/getname/'+author,
        method:'get'
  }))
  useEffect( ()=>{getName()}, [author])
  if (gname.data)
    a = gname.data.username
    u = state.user.id


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
    console.log("Is it getting here: " + e)
    console.log(u+" : "+ author)
    if (u === author){
      console.log("actual:" + e)
      var today = new Date(), cur = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' at ' + today.toLocaleTimeString();
      UpdateToDo({name, description, dateCreated, c: e, cur, id});
      dispatch({type: "COMPLETE_TODO", name, description, dateCreated, completed: !e, cur, id} );
    }
   }
  async function handleRemove() {
    if (u === author){
    console.log("remove button hit. Attempting to remove todo #" + id);
    await DeleteToDo({name, dateCreated, description, completed, dateCompleted, id});
    await dispatch({type: "DELETE_TODO", id} );
    if (td)
      navigation.navigate('/')
    }

   }
  async function handleSeeFull(){
    navigation.navigate('/todo/'+id)
  }


    return (
      <Container style={{textAlign: textAlign}}>
        <Row>
           <Col></Col>
           <Col>
        <Card style={{background: primaryColor, color: color, padding: padding, border: border, margin: margin, boxShadow: boxShadow, width: 'inherit' }}>
          <Card.Body>
             <Card.Title><Link href={'/todo/'+id}><h2 style={{color: secondaryColor,textAlign: textAlign}}>{name}</h2></Link></Card.Title>
              <h3>Author: {a} </h3>
              <Card.Text>
               <div style={{background: secondaryColor, border: border, margin: margin, width: '66vh', height: 'inherit'}}>
               <Row>
               <Col><Clipboard style={{ fontSize: '7vh', color: backgroundColor, paddingRight: '1vh'}}/></Col>
               <Col xs={6} xm={6} xl={6}>{processedDescription}</Col>
               <Col></Col>
               </Row>
               {(completed)

              ?
              <Row>
                <Col><CalendarCheck style={{ fontSize: '7vh', color: backgroundColor, paddingRight: '1vh'}}/></Col>
                <Col xs={6} xm={6} xl={6}><Row>
                  <Col xs={6} xm={6} xl={6}>Created on: {dateCreated.substring(0,18) + dateCreated.substring(21) }</Col>
                  <Col xs={6} xm={6} xl={6}>Completed on: {dateCompleted.substring(0,18) + dateCreated.substring(21) }</Col>
                </Row></Col>
                <Col></Col>
              </Row>
              
              :
              <Row>
                <Col><Calendar style={{ fontSize: '7vh', color: backgroundColor, paddingRight: '1vh'}}/></Col>
                <Col style={{textAlign: 'left'}} xs={9} xm={9} xl={9}>Created on: {dateCreated.substring(0,18) + dateCreated.substring(21) }</Col>
              </Row>

              }
               </div>
                {
                  short && 
                  <div style={{paddingBottom: '1vh'}} >
                    <Button onClick={handleSeeFull}>View full todo</Button>
                  </div>
              }
              {(u === author) && 
              <form style={{paddingBottom: '1vh'}} onSubmit={e=>{e.preventDefault(); handleRemove()}}>
                 <Button width={120} type="button onClick={handleRemove()}">Delete Todo</Button>
              </form>
            }
            {(u === author) && 
              <><label>Complete?</label><BootstrapSwitchButton  height={25} width="inherit" onstyle="success" offstyle="danger" onlabel="Done" offlabel="X" checked={completed} value={completed} onChange={(checked: boolean) => {handleComplete(checked) }}/></>
            }  
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