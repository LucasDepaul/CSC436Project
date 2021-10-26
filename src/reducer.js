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
                id: action.id,
				name: action.name,
                description: action.description,
				dateCreated: action.dateCreated,
				dateCompleted: action.dateCompleted,
                completed: action.completed,
			}
			return [newTodo, ...state]
        case 'DELETE_TODO':
            /*newState.forEach((n) => console.log(n))
            const toRemove = {
                id: action.id,
                name: action.name,
                description: action.description,
                dateCreated: action.dateCreated,
                dateCompleted: action.dateCompleted,
                completed: action.completed
            }
            newState.filter((item) => item.id === action.id)
            console.log("Item to be removed")
            console.log(toRemove.name)
            console.log("UpdatedState")
            newState.splice(action.id,1)
            newState.forEach((n) => console.log(n.name))

            return [...newState]*/
            return state.filter((p) =>  p.id !== action.id)
        case 'COMPLETE_TODO':
            console.log("Complete js on " + action.id)
            /*const toChange = {
                id: action.id,
                name: action.name,
                description: action.description,
                dateCreated: action.dateCreated,
                dateCompleted: action.cur,
                completed: !action.completed
            }
            newState[action.id] = toChange
            return [...newState]*/
            return state.map((p) => {
                if (p.id === action.id){
                    p.completed = !action.completed;
                    p.dateCompleted = action.cur;
                    console.log(p);
                }
                return p;
            })
        case 'FETCH_TODOS':
            return action.todos
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