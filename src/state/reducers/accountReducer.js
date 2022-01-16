const reducer = (state = JSON.parse(sessionStorage.getItem('cart'))??[], action) =>{
switch (action.type){
    case "add":
        sessionStorage.setItem('cart', JSON.stringify(state.concat(action.payload)))
        return state.concat(action.payload);
    case "remove":
        let emptyArray = [];
        const findedElement = state.findIndex(e=>e._id === action.payload._id);
        state.splice(findedElement, 1);
        sessionStorage.setItem('cart', JSON.stringify(state))
        return state.concat(emptyArray);
    default:
        return state;
}
}

export default reducer;