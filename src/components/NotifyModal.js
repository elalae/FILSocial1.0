import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from './alert/Avatar'; // Ensure this path is correct based on your project structure
import moment from 'moment';
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from '../redux/actions/notifyAction';

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleIsRead = (msg) => {
        dispatch(isReadNotify({ msg, auth }));
    };

    const handleSound = () => {
        dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
    };

    const handleDeleteAll = () => {
        if (notify.data.filter(item => !item.isRead).length === 0 ||
            window.confirm(`You have unread notices. Are you sure you want to delete all?`)) {
            dispatch(deleteAllNotifies(auth.token));
        }
    };

    return (
        <div className="min-w-[300px] max-w-md bg-white rounded-lg shadow-lg flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <i className={`fas ${notify.sound ? 'fa-bell' : 'fa-bell-slash'} text-red-500 cursor-pointer`}
                   onClick={handleSound}></i>
            </div>

            {notify.data.map((msg, index) => (
    <li key={index} className="px-4 py-2 hover:bg-gray-50" onClick={() => handleIsRead(msg)}>
        <Link to={`${msg.url}`} className="flex items-center w-full text-gray-900 hover:text-blue-600">
            <Avatar src={msg.user.avatar} size="medium-avatar" />
            <div className="ml-3 flex-1">
                <p className="text-sm font-semibold">{msg.user.username} {msg.text}</p>
                <p className="text-xs text-gray-500">{moment(msg.createdAt).fromNow()}</p>
            </div>
        </Link>
    </li>
))}


            <div className="px-4 py-3 border-t border-gray-200 text-right">
                <button className="text-red-500 hover:text-red-700 text-sm"
                        onClick={handleDeleteAll}>Delete All</button>
            </div>
        </div>
    );
};

export default NotifyModal;
