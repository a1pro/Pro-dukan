
import { GET_METHOD_ROLES , GET_POST_ROLES } from './types'

export const fetchRoles = () => dispatch => {
	
    fetch('http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/roles/fetchRoles')
      .then(res => res.json())
      .then(posts =>
        dispatch({ 	 
          type: GET_METHOD_ROLES,
          payload: posts
        })
      );
  };
  
export const createPost = (post) => dispatch => {
  fetch('http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/roles/addRole', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(post)
  })
  .then(res => res.json())
  .then(post =>
    dispatch({
        type: GET_POST_ROLES,
        payload: post
    })
  )
};

  