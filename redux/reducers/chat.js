import merge from 'common/merge'
const initialState = {
    todoList: [],
    title: '',
    filter: 'all'
}

export default function todo(state = initialState, action) {
    switch (action.type) {
        case 'todo.titleChange':
            return merge(state, {title: action.title})
        case 'todo.addTodo':
            return merge(state, {title: action.title})
        case 'todo.changeFilter':
            return merge(state, {filter: action.filter})
        case 'todo.TodoList':
            return merge(state,{todoList:action.todoList})
        default:
            return state
    }
}