const reducer = (state = JSON.parse(sessionStorage.getItem('cart'))??[], action) =>{
switch (action.type){
    case "add":
        const finded = state.find(e=> e._id === action.payload._id);
        if(finded===undefined){
            action.payload.account = 1
            sessionStorage.setItem('cart', JSON.stringify(state.concat(action.payload)))
            return state.concat(action.payload) ;
        }else{
            let controlArray = [];
                finded.account ++;
                sessionStorage.setItem('cart', JSON.stringify(state.concat(controlArray)))
                return state.concat(controlArray)
            }     
    case "remove":
        let emptyArray = [];
        const findToRemove = state.find(e=> e._id === action.payload._id);
        const findToRemoveIndex = state.findIndex(e=>e._id === action.payload._id);
        if(findToRemove.account<=1){
            state.splice(findToRemoveIndex, 1);
            sessionStorage.setItem('cart', JSON.stringify(state));
            return state.concat(emptyArray)
        }else{
            findToRemove.account --;
            sessionStorage.setItem('cart', JSON.stringify(state));
            return state.concat(emptyArray)
        }
    case "remove-all":
        const filtered = state.filter(e=> e._id !== action.payload._id);
        sessionStorage.setItem('cart', JSON.stringify(filtered));
        return filtered;
    default:
        return state;
}
}

export default reducer;