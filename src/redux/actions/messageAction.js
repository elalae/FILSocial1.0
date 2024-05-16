import { GLOBALTYPES, DeleteData } from '../actions/globalTypes'
import { postDataAPI, getDataAPI, deleteDataAPI } from '../../utils/fetchData'

export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    GET_MESSAGES: 'GET_MESSAGES',
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    DELETE_MESSAGES: 'DELETE_MESSAGES',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
    CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE'
}

export const addUser= ({user, message}) => dispatch => {
  if(message.users.every(item => item._id !== user._id)){
    dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text:'', media:[]}})
}
};

export const addMessage = ({msg, auth}) => async (dispatch) =>{
    dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})
    
    try {
        await postDataAPI('message', msg, auth.token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
};
export const getConversations = ( {auth} ) => async (dispatch) => {

   
    try {
        console.log(auth);
        const res = await getDataAPI('conversations', auth.token);
        console.log(res);

        dispatch({ type: MESS_TYPES.GET_CONVERSATIONS, payload: res.data });
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.message } });
    }
};





export const getMessages = ({auth, id}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/${id}`, auth.token)
        dispatch({type: MESS_TYPES.GET_MESSAGES, payload: res.data})
       
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const loadMoreMessages = ({auth, id, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = {...res.data, messages: res.data.messages.reverse()}

        dispatch({type: MESS_TYPES.UPDATE_MESSAGES, payload: {...newData, _id: id, page}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteMessages = ({msg, data, auth}) => async (dispatch) => {
    const newData = DeleteData(data, msg._id)
    dispatch({type: MESS_TYPES.DELETE_MESSAGES, payload: {newData, _id: msg.recipient}})
    try {
        await deleteDataAPI(`message/${msg._id}`, auth.token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteConversation = ({auth, id}) => async (dispatch) => {
    dispatch({type: MESS_TYPES.DELETE_CONVERSATION, payload: id})
    try {
        await deleteDataAPI(`conversation/${id}`, auth.token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}