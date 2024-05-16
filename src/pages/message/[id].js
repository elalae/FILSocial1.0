import React from 'react';
import LeftSide from '../../components/message/LeftSide';
import RightSide from '../../components/message/RightSide';

const Conversation = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/4 bg-gray-100 p-4 shadow-lg">
        <LeftSide />
      </div>
      <div className="w-3/4 flex justify-center items-center bg-white p-6">
       <RightSide />

      </div>
    </div>
  );
};

export default Conversation;