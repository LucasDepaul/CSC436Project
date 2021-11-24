import React, { useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import Todo from '../todo/Todo'
import {Link, useNavigation} from 'react-navi'
import {ThemeContext} from '../Context'
import {StateContext} from '../Context'
import {Container} from 'react-bootstrap'



export default function TodoPage ({ id }) {
    const {state}=useContext(StateContext)
    const [ todo, getTodo ] = useResource(() => ({
        url: `/todo/id/${id}`,
        data: {id},
        headers: {"Authorization": state.user.access_token},
        method: 'get'
    }))
    useEffect(getTodo, [id])
    const {textAlign} = useContext(ThemeContext)
    const navigation = useNavigation()


    return (
        <Container style={{padding: '15vh', minHeight: '100vh'}}>
            <div><Link onClick={() => navigation.goBack()}>Back</Link></div>
            <div style={{ textAlign: textAlign}}>
                {(todo && todo.data)
                    ? <Todo long={true} td={true} id={id} {...todo.data} />
                    : 'Loading...'
                }
                <hr />
            </div>
        </Container>
    )
}