import TodoList from './TodoList'
import CreateTodo from './CreateTodo'
import {useContext} from 'react'
import {StateContext} from '../Context'
import HomePage from '../pages/HomePage'

export default function TodoBar() {
	const{state}= useContext(StateContext)
        return (
            <>
                <HomePage />
            </>
        )
    } 