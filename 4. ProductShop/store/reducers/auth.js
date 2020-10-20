import * as actions from '../actions/auth';

const initialState = {
    token: null,
    userId: null
}
export default (state = initialState, action) => {
    switch (action.type){
        case actions.AUTHENTICATE:
            return authenticate(action);
        // case actions.SIGNUP:
        //     return signUp(action);
        default:
            return state;
    }
}

const authenticate = (action) => {
    return {
        token: action.token,
        userId: action.userId
    };
};
//
// const signUp = (action) => {
//     return {
//         token: action.token,
//         userId: action.userId
//     };
// };
