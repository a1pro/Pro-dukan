import { GET_REGION_ALL } from './types'
import axios from 'axios'

export const getRegoinAll = () => dispatch => {
    axios
    .get("http://ec2-54-227-194-191.compute-1.amazonaws.com:3000/v1/admin/regions/fetchRegions")
    .then(res => dispatch({
            type: GET_REGION_ALL,
            payload: res.data
        })
    )
   .catch(error => dispatch({
        type: GET_REGION_ALL,
        payload: error.data
    }));
}