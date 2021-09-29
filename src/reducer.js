function userReducer (state, action) {
    switch (action.type) {
        case 'LOGIN':
        case 'REGISTER':
            return action.username
        case 'LOGOUT':
            return ''
        default:
            return state;
    }
}

function todosReducer (state, action){
	switch (action.type){
		case 'CREATE_TODO':
			const newTodo = {
				name: action.name,
				dateCreated: action.dateCreated,
				description: action.description,
				completed: action.completed,
				dateCompleted: action.dateCompleted
			}
			return [newTodo, ...state]
		default: 
			return state;
	}
}

  export default function appReducer (state, action) {
    return {
        user: userReducer(state.user, action),
        todos: todosReducer(state.todos, action)
    }
}