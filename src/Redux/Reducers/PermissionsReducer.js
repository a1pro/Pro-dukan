import { GET_METHOD_PERMISSIONS, NEW_POST_PERMISSIONS } from '../Actions/types'

const initalState = {
	permission: [],
	item: {}
};

export default function(state = initalState, action) {
	switch (action.type) {
		case GET_METHOD_PERMISSIONS:
		  return {
			...state,
			permission: action.payload
		  };
		  
		  case NEW_POST_PERMISSIONS:
			return {
			  ...state,
			  item: action.payload
			};
          
    default:
		return state;
	}
}