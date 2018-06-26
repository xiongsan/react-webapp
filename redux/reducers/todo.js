import merge from 'common/merge'
const initialState = {
    todoList: [],
    title: '',
    filter: 'all',
    dataSource:[],
    pageSize:10,
    current:1,
    total:0,
    loading: false
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
        case 'todoPage':
            return merge(state,action.state)
        default:
            return state
    }
}