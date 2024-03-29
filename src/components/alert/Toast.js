import React from 'react';

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div className={`fixed ${bgColor} text-white p-4 rounded-lg shadow-md`}
         style={{ top: '20px', right: '20px', minWidth: '200px', zIndex: 50 }}>
      <div className={`flex items-center justify-between ${bgColor}`}>
        <strong className="flex-grow">{msg.title}</strong>
        <button className="ml-2 text-lg" onClick={handleShow}>&times;</button>
      </div>
      <div className="mt-2">
        {msg.body}
      </div>
    </div>
  );
}

export default Toast;
