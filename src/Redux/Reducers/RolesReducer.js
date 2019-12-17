import { GET_METHOD_ROLES, GET_POST_ROLES  } from '../Actions/types'

const initalState = {
	rolesTypes: {},
	item: {}
};

export default function(state = initalState, action) {
	switch (action.type) {
		case GET_METHOD_ROLES:
		  return {
			...state,
			rolesTypes: action.payload
		  };
		
		case GET_POST_ROLES:
			return {
			  ...state,
			  item: action.payload
			};
		
		default:
			return state;
	}
}