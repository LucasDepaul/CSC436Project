import React, { useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import Todo from '../todo/Todo'
import {Link, useNavigation} from 'react-navi'
import {ThemeContext} from '../Context'
import {StateContext} from '../Context'
import {Container} from 'react-bootstrap'
import TodoList from '../todo/TodoList'


export default function ProfilePage ({username, id }) {

    const {state, dispatch}=useContext(StateContext)
    const [ todoList, gettodos ] = useResource(() => ({
        url: '/users/todos/'+id,
        method: 'get',
        data: {id: id}
    }))
  useEffect(()=>{
        gettodos()
    }, [state.user.access_token])

    useEffect(() => {
    if (todoList && todoList.isLoading === false && todoList.data) {
            dispatch({ type: 'FETCH_TODOS', todos: todoList.data.todos.reverse() })
        }
    }, [todoList])

    var t =[]
    if (todoList.data){
      //console.log(todoList.data.todos)
      t = todoList.data.todos
    }

    const {textAlign} = useContext(ThemeContext)
    const navigation = useNavigation()

    return (
        <Container style={{padding: '15vh'}}>
            <div><Link onClick={() => navigation.goBack()}>Back</Link></div>
            <div style={{ textAlign: textAlign}}>
                <h1>{username}'s Todos</h1>
                {(todoList && t.length === 0)&& <div>User has not created any todos </div>}
                {(todoList && todoList.data)
                    ? t.length > 0 && t.map((p, i) => <Todo completed={p.completed} id={p._id} {...p} key={'Todo-' + i} />)
                    : 'Loading...'
                }
                <hr />
            </div>
        </Container>
    )
}