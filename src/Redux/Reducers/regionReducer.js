import { GET_REGION_ALL } from '../Actions/types'

const initialState = {
    getAllRegion: [],
    loadRegionGet: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_REGION_ALL:
            return {
                ...state,
                getAllRegion: action.payload,
                loadRegionGet: true
            }
        default:
            return state;
    }
}