import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import modal from './modalReducer'
import profile from './profileReducer'
import status from './statusReducer'
import homePosts from './postReducer'

export default combineReducers({
    auth,
    alert,
    modal,
    profile,
    status,
    homePosts
})
