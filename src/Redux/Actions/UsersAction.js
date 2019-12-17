import { GET_METHOD_USERS, FETCH_ALL_USERS_STORE, 
  CLEAR_FILTER_USER, SEARCH_USERS, UPDATE_USERS,
  CLEAR_USER_MSG } from './types'
import axios from 'axios'

export const fetchUsers = () => dispatch => {
	
    fetch('http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/stores/fetchStores')
      .then(res => res.json())
      .then(posts =>
        dispatch({ 	 
          type: GET_METHOD_USERS,
          payload: posts
        })
      );      
};

export const getAllUsers = (data) => dispatch => {
  if(data.id === 'dropdown_search') {
    axios.get(`http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/stores/fetchStoreUsers/${data.val}`, {
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((res) => dispatch({
      type: FETCH_ALL_USERS_STORE,
      data: res.data
    }))
    .catch((err) => console.log(err));
  }
  if(data.id === 'search_data') {
    axios.get(`http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/stores/searchUsers/${data.val}`, {
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((res) => dispatch({
      type: SEARCH_USERS,
      data: res.data
    }))
    .catch((err) => console.log(err));
  }
  
}

export const searchUser = (id) => dispatch => {
  axios.get(`http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/stores/searchUsers/${id}`, {
    headers: {
      "Content-type": "application/json"
    }
  })
  .then((res) => dispatch({
    type: SEARCH_USERS,
    data: res.data
  }))
  .catch((err) => console.log(err));
}

export const updateUser = (userid) => dispatch => {
  const data = {
    "userId": userid.userId,
    "userRole": userid.userRole
  }
  const searchData = {
    "id": userid.searchVal,
    "val": userid.storeId
  }
  axios.post(`http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/stores/kci0809/updateUserRole`, data,{
    headers:{
      "Content-type": "application/json"
    }    
  })
  .then((res) => {
    dispatch({
      type: UPDATE_USERS,
      data: res.data
    });
    dispatch(getAllUsers(searchData));
    setTimeout(() => {
      dispatch(clearMsg());
    }, 3000)
  })
  .catch((err) => console.log(err));
}

export const clearFilterUserData = () => {
  return {
    type: CLEAR_FILTER_USER
  }
}

export const clearMsg = () => {
  return {
    type: CLEAR_USER_MSG
  }
}
