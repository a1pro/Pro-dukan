import { GET_METHOD_USERS, FETCH_ALL_USERS_STORE, 
	CLEAR_FILTER_USER, SEARCH_USERS, UPDATE_USERS,
	CLEAR_USER_MSG } from '../Actions/types'

const initalState = {
	userstore: [],
	usersOfStore: [],
	searchUserData: [],
	updateUser:'',
	updateUserStatus: false
}

export default function(state = initalState, action) {
	switch (action.type) {
		case GET_METHOD_USERS:
		  	return {
				...state,
				userstore: action.payload
		 	}
		case FETCH_ALL_USERS_STORE:
			return {
				...state,
				usersOfStore: action.data
			}
		case CLEAR_FILTER_USER:
			return {
				...state,
				usersOfStore: []
			}
		case SEARCH_USERS:
			return{
				...state,
				usersOfStore: action.data
			}
		case UPDATE_USERS:
			return{
				...state,
				updateUser: action.data,
				updateUserStatus: true
			}
		case CLEAR_USER_MSG:
			return{
				...state,
				updateUser: '',
				updateUserStatus: false
			}
        default:
			return state;
	}
}