import { GET_METHOD_PERMISSIONS } from './types'

export const fetchPermission = () => dispatch => {
	
    fetch('http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/permissions/fetchPermissions')
      .then(res => res.json())
      .then(posts =>
        dispatch({ 	 
          type: GET_METHOD_PERMISSIONS,
          payload: posts
        })
      );
  };

  