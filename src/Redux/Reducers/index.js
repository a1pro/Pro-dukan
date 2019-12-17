import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import ProductReducers from './ProductReducers'
import regionReducer from './regionReducer'
import RolesReducer from './RolesReducer'
import FeaturesReducer from './FeaturesReducer'
import PermissionsReducer from './PermissionsReducer'
import UsersReducer from './UsersReducer'
                 
export default combineReducers({
    session: sessionReducer,
    productDetail: ProductReducers,
    regionDetail: regionReducer,
    roles: RolesReducer,
    features: FeaturesReducer,
    permissions: PermissionsReducer,
    users: UsersReducer
});