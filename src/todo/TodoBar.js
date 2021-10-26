import TodoList from './TodoList'
import CreateTodo from './CreateTodo'
import {useContext} from 'react'
import {StateContext} from '../Context'

export default function TodoBar() {
	const{state}= useContext(StateContext)
        return (
            <>
                <TodoList/>
                <br/>
                <br/>
                {state.user && <CreateTodo/>}
            </>
        )
    } 