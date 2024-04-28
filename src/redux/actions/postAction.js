import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import {postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI} from '../../utils/fetchData'

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}

export const createPost = ({ content, images, auth }) => async dispatch => {
    let media = [];
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        if (images.length > 0) media = await imageUpload(images);

        const res = await postDataAPI('posts', { content, images: media }, auth.token)
        dispatch({
             type: POST_TYPES.CREATE_POST, 
             payload: {...res.data.newPost, user: auth.user} 
            });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
         })
    }
}

export const getPosts = (token) => async (dispatch) => {
    try{
        dispatch({type: POST_TYPES.LOADING_POST, payload: true})
        const res = await getDataAPI('posts', token)
       
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: {...res.data, page: 2}
        })

        dispatch({type: POST_TYPES.LOADING_POST, payload: false})
    }catch (err) {
     
     dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg }
     })
    }
 }

 export const updatePost = ({ content, images, auth, status }) => async dispatch => {
    let media = [];
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const imgNewUrl = images.filter(img => !img.url);
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

        const res = await patchDataAPI(`post/${status._id}`, {
            content,
            images: [...status.images.filter(img => img.url), ...media]
        }, auth.token);

        dispatch({
            type: POST_TYPES.UPDATE_POST,
            payload: { ...res.data.newPost }
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: 'Post updated successfully' } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};

export const likePost = ({post, auth}) => async (dispatch) => {

    const newPost = {...post, likes: [...post.likes, auth.user]}
    
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}

export const unLikePost = ({post, auth}) => async (dispatch) => {
   
    const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id)}
  

   dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }

} 

export const getPost = ({ id, auth }) => async (dispatch) => {
    try {
        const res = await getDataAPI(`post/${id}`, auth.token)
        dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const deletePost = ({post, auth}) => async (dispatch) => {
  
    dispatch({type: POST_TYPES.DELETE_POST, payload: post})
    try {
        deleteDataAPI(`post/${post._id}`, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

