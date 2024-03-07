import React from 'react';
import Avatar from '../alert/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

function Status() {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    
    return (
        <div className="mt-2 mb-2 flex items-center space-x-3 p-3 bg-white shadow-md rounded-lg transition duration-300 ease-in-out">
            <Avatar src={auth.user.avatar} size="small" />
            <button className="flex-grow py-2 px-4 bg-gray-100 text-gray-900 rounded-full leading-snug hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: true})}
            >
                {auth.user.fullname}, what are you thinking?
            </button>
        </div>
    );
}

export default Status;
