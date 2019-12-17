import { GET_SESSION, DESTROY_SESSION } from './types'

export const getSession = (sessionData) => dispatch => {
    let role = '';
    if(sessionData) {
        if(sessionData.scope === 'aws.cognito.signin.user.admin') {
            role = 'admin';
        }
    }
    dispatch({
        type: GET_SESSION,
        payload: sessionData,
        userRole: role
    });
};

export const destroySession = () => {
    return{
        type: DESTROY_SESSION
    };
};