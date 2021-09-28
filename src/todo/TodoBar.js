import TodoList from './TodoList'
import CreateTodo from './CreateTodo'

export default function TodoBar({user, todos, setTodos}) {
        return (
            <>
                <TodoList todos={todos}/>
                <br/>
                <br/>
                {user && <CreateTodo todos={todos} setTodos={setTodos}/>}
            </>
        )
    } 