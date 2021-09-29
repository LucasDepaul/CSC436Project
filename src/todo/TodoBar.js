import TodoList from './TodoList'
import CreateTodo from './CreateTodo'

export default function TodoBar({user, todos, dispatch}) {
        return (
            <>
                <TodoList todos={todos}/>
                <br/>
                <br/>
                {user && <CreateTodo todos={todos} dispatch={dispatch}/>}
            </>
        )
    } 