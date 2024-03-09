import { POST_TYPES } from "../actions/postAction";

const initialState = {
    posts: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_TYPES.GET_POSTS:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
            default:
                return state;
    }
}

export default postReducer