import { GLOBALTYPES, EditData , DeleteData} from './globalTypes'
import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'




export const PROFILE_TYPES = {
    LOADING: 'LOADING_PROFILE',
    GET_USER: 'GET_PROFILE_USER',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS: 'GET_PROFILE_POSTS',
    UPDATE_POST: 'UPDATE_PROFILE_POST'
}


export const getProfileUsers = ({id, auth}) => async (dispatch) => {
    dispatch({type: PROFILE_TYPES.GET_ID, payload: id})

    try {
        dispatch({type: PROFILE_TYPES.LOADING, payload: true})
        const res = getDataAPI(`/user/${id}`, auth.token)
       
        
        const users = await res;
       

        dispatch({
            type: PROFILE_TYPES.GET_USER,
            payload: users.data
        })



        dispatch({type: PROFILE_TYPES.LOADING, payload: false})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {error: err.response.data.msg}
        })
    }
    
}


export const updateProfileUser = ({userData, avatar, auth}) => async (dispatch) => {
    if(!userData.fullname) {
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please add your full name."}})
    }

    if(userData.fullname.length > 25) {
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your full name is too long."}})
    }

    if(userData.story && userData.story.length > 200) {
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your story is too long."}})
    }

    try {
        let media;
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        
        if(avatar) {
            const imageResponse = await imageUpload([avatar]);
            media = imageResponse[0].url; 
        }

        const res = await patchDataAPI("user", {
            ...userData,
            avatar: avatar ? media : auth.user.avatar
        }, auth.token)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                    avatar: avatar ? media : auth.user.avatar,
                }
            }
        })

        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {error: err.response ? err.response.data.msg : err.message}
        })
    } finally {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    }
}

export const follow = ({users, user, auth}) => async (dispatch) => {
    let newUser= {...user, followers:[...user.followers, auth.user]}

    dispatch({type: PROFILE_TYPES.FOLLOW, payload: newUser})

    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            ...auth,
            user: {...auth.user, following:[...auth.user.following, newUser] }
        }
    })
}

export const unfollow = ({users, user, auth}) => async (dispatch) => {
    let newUser= {
        ...user, 
        followers: DeleteData(user.followers, auth.user._id) 
    }

   console.log(newUser)

   dispatch({type: PROFILE_TYPES.FOLLOW, payload: newUser})
   
   dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
        ...auth,
        user: {
            ...auth.user,
            following: DeleteData(auth.user.following, newUser._id ) 
        }
    }
})
   
}


