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
       const newState = state.slice()
	switch (action.type){
		case 'CREATE_TODO':
			const newTodo = {
				name: action.name,
                description: action.description,
				dateCreated: action.dateCreated,
				dateCompleted: action.dateCompleted,
                completed: action.completed,
			}
			return [newTodo, ...state]
        case 'DELETE_TODO':
            newState.forEach((n) => console.log(n))
            const toRemove = {
                name: action.name,
                description: action.description,
                dateCreated: action.dateCreated,
                dateCompleted: action.dateCompleted,
                completed: action.completed
            }
            newState.filter((item) => item.name.localeCompare(toRemove.name))
            console.log("Item to be removed")
            console.log(toRemove.name)
            console.log("UpdatedState")
            newState.splice(action.id,1)
            newState.forEach((n) => console.log(n.name))

            return [...newState]
        case 'COMPLETE_TODO':
            console.log("Complete js")
            const toChange = {
                name: action.name,
                dateCreated: action.dateCreated,
                description: action.description,
                completed: !action.completed,
                dateCompleted: action.cur
            }
            newState[action.id] = toChange
            return [...newState]
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