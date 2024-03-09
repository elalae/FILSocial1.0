import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import {postDataAPI, getDataAPI} from '../../utils/fetchData'

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',

}

export const createPost = ({ content, images, auth }) => async dispatch => {
    let media = [];
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        if (images.length > 0) media = await imageUpload(images);

        const res = await postDataAPI('posts', { content, images: media }, auth.token);
        dispatch({ type: POST_TYPES.CREATE_POST, payload: res.data.newPost });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    } catch (err) {
        let errorMsg = "An unexpected error occurred";
        if (err.response && err.response.data && err.response.data.msg) {
            errorMsg = err.response.data.msg;
        } else if (err.message) {
            errorMsg = err.message; 
        }
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: errorMsg }
        });
    }
};
