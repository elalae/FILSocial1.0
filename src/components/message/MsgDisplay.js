import React from 'react';
import Avatar from '../alert/Avatar';
import { imageShow, videoShow } from '../../utils/mediaShow';

const MsgDisplay = ({ user, msg }) => {
  return (
    <div className="flex flex-col space-y-1 p-2 rounded-lg bg-white shadow-sm max-w-sm">
      <div className="flex items-center space-x-2 mb-1">
        <Avatar src={user.avatar} />
        <span className="font-semibold text-gray-800">{user.username}</span>
      </div>
      {msg.text && (
        <div className="bg-blue-200 text-gray-800 p-2 rounded-md">
          {msg.text}
        </div>
      )}
      {msg.media && msg.media.length > 0 && (
        <div className="flex flex-col space-y-1">
          {msg.media.map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              {item.url.match(/video/i) ? videoShow(item.url) : imageShow(item.url)}
            </div>
          ))}
        </div>
      )}
      <div className="text-gray-500 text-xs mt-1 self-end">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default MsgDisplay;
