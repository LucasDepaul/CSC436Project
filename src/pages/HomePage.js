import React, { useEffect, useContext } from 'react'
import { StateContext } from '../Context'
import { useResource } from 'react-request-hook'
import TodoList from '../todo/TodoList'

export default function HomePage () {
    const { state, dispatch } = useContext(StateContext)
    const [ todos, gettodos ] = useResource(() => ({
        url: '/todo/',
        method: 'get',
        headers: {"Authorization": state.user.access_token}
    }))
    const { data, isLoading } = todos;

    useEffect(() => {
        if (state.user.access_token)
            gettodos()
    }, [])
    useEffect(()=>{
        gettodos()
    }, [state.user.access_token])

    useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
            dispatch({ type: 'FETCH_TODOS', todos: todos.data.todos.reverse() })
        }
    }, [todos])
    
    return (
        <>
          {isLoading && 'Todos loading...'} <TodoList />
        </>
    )
} 