import { GET_SESSION, DESTROY_SESSION } from '../Actions/types'

const initialState = {
    userSession: [],
    isAuthenticated : null,
    userRole: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SESSION:
            // console.log(action.payload);
            return{
                ...state,
                isAuthenticated: true,
                userSession: action.payload,
                userRole: action.userRole
            }
        case DESTROY_SESSION:
            return{
                ...state,
                userSession: [],
                isAuthenticated: false,
                userRole: ''
            }
        default:
            return state;
    }
}