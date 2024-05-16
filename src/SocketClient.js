import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_TYPES } from './redux/actions/postAction';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { NOTIFY_TYPES } from './redux/actions/notifyAction'
import { MESS_TYPES } from './redux/actions/messageAction'
import { addMessage } from './redux/actions/messageAction';




const SocketClient = () => {
    const { auth, socket, notify} = useSelector(state => state);
    const dispatch = useDispatch();
    
    // Join user
    useEffect(() => {
        socket.emit('joinUser', auth.user._id);
    }, [socket, auth.user._id]);

    // Handle like events
    useEffect(() => {
        const likeToClient = newPost => {
            try {
                if (!newPost) throw new Error("Received undefined newPost in likeToClient.");
                dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
            } catch (error) {
                console.error("Error handling likeToClient:", error);
            }
        };

        socket.on('likeToClient', likeToClient);
        return () => socket.off('likeToClient', likeToClient);
    }, [socket, dispatch]);

    // Handle unlike events
    useEffect(() => {
        const unLikeToClient = newPost => {
            try {
                if (!newPost) throw new Error("Received undefined newPost in unLikeToClient.");
                dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
            } catch (error) {
                console.error("Error handling unLikeToClient:", error);
            }
        };

        socket.on('unLikeToClient', unLikeToClient);
        return () => socket.off('unLikeToClient', unLikeToClient);
    }, [socket, dispatch]);

    // Handle create comment events
    useEffect(() => {
        const createCommentToClient = newPost => {
            try {
                if (!newPost) throw new Error("Received undefined newPost in createCommentToClient.");
                dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
            } catch (error) {
                console.error("Error handling createCommentToClient:", error);
            }
        };

        socket.on('createCommentToClient', createCommentToClient);
        return () => socket.off('createCommentToClient', createCommentToClient);
    }, [socket, dispatch]);

    // Handle delete comment events
    useEffect(() => {
        const deleteCommentToClient = newPost => {
            try {
                if (!newPost) throw new Error("Received undefined newPost in deleteCommentToClient.");
                dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
            } catch (error) {
                console.error("Error handling deleteCommentToClient:", error);
            }
        };

        socket.on('deleteCommentToClient', deleteCommentToClient);
        return () => socket.off('deleteCommentToClient', deleteCommentToClient);
    }, [socket, dispatch]);


           // Follow
           useEffect(() => {
            socket.on('followToClient', newUser => {
                
                dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser }});
            });
    
            return () => socket.off('followToClient');
        }, [socket, dispatch, auth]);
    
    useEffect(() => {
        socket.on('unFollowToClient', newUser =>{
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })

        return () => socket.off('unFollowToClient')
    },[socket, dispatch, auth])

    
    //Notification

    useEffect(() => {
        socket.on('createNotifyToClient', msg =>{
            dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg})
        })

        return () => socket.off('createNotifyToClient')
    },[socket, dispatch])
    
    
    useEffect(() => {
        socket.on('removeNotifyToClient', msg =>{
            dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg})
        })

        return () => socket.off('removeNotifyToClient')
    },[socket, dispatch])

     // Message
     useEffect(() => {
        socket.on('addMessageToClient', msg =>{
            dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})

            dispatch({
                type: MESS_TYPES.ADD_USER, 
                payload: {
                    ...msg.user, 
                    text: msg.text, 
                    media: msg.media
                }
            })
        })

        return () => socket.off('addMessageToClient')
    },[socket, dispatch])

    
    return null; 

    
};



export default SocketClient;
