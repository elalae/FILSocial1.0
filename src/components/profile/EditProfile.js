import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkImage } from '../../utils/imageUpload';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { updateProfileUser } from '../../redux/actions/profileAction';
const EditProfile = ({ setOnEdit }) => {
    const initState = {
        fullname: '', mobile: '', address: '', website: '', story: '', gender: ''
    };

    const [userData, setUserData] = useState(initState);
    const { fullname, mobile, address, website, story } = userData;

    const [avatar, setAvatar] = useState('');

    const { auth, theme } = useSelector(state => state);
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])

    const changeAvatar = (e) => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if (err) return dispatch({ type: GLOBALTYPES, payload: { error: err } });
        setAvatar(file);
    };

    const handleInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const closeModal = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            setOnEdit(false);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateProfileUser({userData, avatar, auth}))
    }

    return (
        <div className="modal-overlay fixed w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-50" onClick={closeModal}>
            <div className="edit_profile bg-white shadow-lg rounded-lg p-4 relative">
                <button className="btn btn-danger btn_close" onClick={() => setOnEdit(false)}>
                x
                </button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar flex flex-col items-center">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                         alt="avatar" className={`w-32 h-32 rounded-full object-cover ${theme ? 'filter invert' : ''}`} />
                    <span className="mt-2">
                        <i className='fas fa-camera'></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                               accept="image/*" className="text-sm text-grey-500"
                               onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form_group mt-4">
                    <label htmlFor="fullname" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input type="text" name="fullname" id="fullname" value={fullname}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInput} />
                    <small className="text-danger d-block text-right">
                        {fullname.length}/25
                    </small>
                </div>

                <div className="mt-4">
                    <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input type="number" name="mobile" value={mobile}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInput} />
                </div>

                <div className="mt-4">
                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                    <input type="text" name="address" value={address}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInput} />
                </div>

                <div className="mt-4">
                    <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">Website</label>
                    <input type="text" name="website" value={website}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInput} />
                </div>

                <div className="mt-4">
                    <label htmlFor="story" className="block text-gray-700 text-sm font-bold mb-2">Story</label>
                    <textarea name="story" value={story} cols="30" rows="4"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInput}></textarea>
                    <small className="text-danger d-block text-right">
                        {story.length}/300
                    </small>
                </div>

                <div className="mt-4">
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                    <select name="gender" id="gender"
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                    Save
                </button>
            </form>
        </div>
        </div>
    );
};

export default EditProfile;
