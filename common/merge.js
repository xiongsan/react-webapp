export default function merge(state, ...obj) {
    return Object.assign({}, state, ...obj)
}