const ADD = 'ADD';

const userUIDReducer = (state='',action)=>{
    switch(action.type){
        case ADD:
        return state.concat(action.userUID)
         default:
        return state;
    }
}

export default userUIDReducer;