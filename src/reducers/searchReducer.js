export default (state = {},action)=>{
    if(action.type === 'search'){
        // I care about this aciton!!!
        return action.payload.data
    }
    return state;
}
