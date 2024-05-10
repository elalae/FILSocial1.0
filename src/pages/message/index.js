import React from 'react';
import LeftSide from '../../components/message/LeftSide';

const Message = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/4 bg-gray-100 p-4 shadow-lg">
        <LeftSide />
      </div>
      <div className="w-3/4 flex justify-center items-center bg-white p-6">
        <div className="text-center w-full max-w-md">
          <i className="fab fa-facebook-messenger text-orange-500 text-9xl"></i>
          <h4 className="text-xl mt-4 font-semibold">Welcome to FILSMessenger! :D</h4>
        </div>
      </div>
    </div>
  );
};

export default Message;
