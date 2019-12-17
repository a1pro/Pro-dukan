import { GET_METHOD_FEATURES, NEW_POST } from '../Actions/types'

const initalState = {
	feacturesTypes: [],
	item: {}
};

export default function(state = initalState, action) {
	switch (action.type) {
		case GET_METHOD_FEATURES:
		  return {
			...state,
			feacturesTypes: action.payload
		  };

		  case NEW_POST:
			return {
			  ...state,
			  item: action.payload
			};
		
		default:
			return state;
	}
}