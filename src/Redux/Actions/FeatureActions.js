import { GET_METHOD_FEATURES} from './types'

export const fetchFeatures = () => dispatch => {
	
    fetch('http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/features/fetchFeatures')
      .then(res => res.json())
      .then(posts =>
        dispatch({ 	 
          type: GET_METHOD_FEATURES,
          payload: posts
        })
      );      
};

