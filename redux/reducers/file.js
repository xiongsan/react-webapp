import merge from 'common/merge'
const initialState = {
    fileList: [],
    dataSource:[],
    pageSize:10,
    current:1,
    total:0,
    loading: false,
    inputValue:''
}

export default function todo(state = initialState, action) {
    switch (action.type) {
        case 'file.loading':
            return merge(state,action.state)
        case 'file.list':
            return merge(state,action.state)
        case 'file.inputValue':
            return merge(state,{inputValue:action.inputValue})
        default:
            return state
    }
}