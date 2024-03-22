import React from 'react';
import UserCard from '../UserCard';
import FollowBtn from './FollowBtn';
import { useSelector } from 'react-redux';

const Following = ({ users, setShowFollowing }) => {
    const { auth } = useSelector(state => state);
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
            <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                <h5 className="text-center text-xl font-semibold">Following</h5>
                <hr className="my-4"/>

                <div className="follow_content max-h-96 overflow-y-auto">
                    {
                        users.map(user => (
                            <div key={user._id} className="mb-2 last:mb-0">
                                <UserCard user={user} setShowFollowing={setShowFollowing}>
                                    {auth.user._id !== user._id && <FollowBtn user={user} />}
                                </UserCard>
                            </div>
                        ))
                    }
                </div>

                <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button 
                        type="button" 
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setShowFollowing(false)}
                    >
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Following;