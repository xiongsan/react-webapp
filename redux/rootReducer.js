import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import todo from 'reducers/todo'
import chat from 'reducers/chat'
import file from 'reducers/file'
export default combineReducers({
    routing: routerReducer, todo,chat,file
})
