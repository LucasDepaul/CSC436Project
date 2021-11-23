function userReducer (state, action) {
    switch (action.type) {
        case 'LOGIN':
        case 'REGISTER':
            return {
                "username": action.username,
                "access_token": action.access_token,
                "id": action.id
            }
        case 'LOGOUT':
            return {
                "username": undefined,
                "access_token": undefined
            }
        default:
            return state;
    }
}

function todosReducer (state, action){
       const newState = state.slice()
	switch (action.type){
		case 'CREATE_TODO':
			const newTodo = {
                _id: action.id,
				name: action.name,
                description: action.description,
				dateCreated: action.dateCreated,
				dateCompleted: action.dateCompleted,
                completed: action.completed,
			}
			return [newTodo, ...state]
        case 'DELETE_TODO':
            console.log("deleting item: "+ action.id);
            const newstate =  state.filter((p) => p._id !== action.id);
            console.log(newstate)
            return [...newstate];
            state.filter((p) => p.id !== action.id)
        case 'COMPLETE_TODO':
            console.log("Complete js on " + action.id)
            return state.map((p) => {
                if (p._id === action.id){

                    p.completed = !action.completed;
                    p.dateCompleted = action.cur;
                }console.log(p);
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