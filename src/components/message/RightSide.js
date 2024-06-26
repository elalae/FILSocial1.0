import React, { useState, useEffect, useRef } from 'react';
import UserCard from '../UserCard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MsgDisplay from './MsgDisplay';
import Icons from './Icons';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { imageShow, videoShow } from '../../utils/mediaShow';
import { imageUpload } from '../../utils/imageUpload';
import { MESS_TYPES, addMessage, getMessages } from '../../redux/actions/messageAction';
import LoadIcon from '../../images/loading.gif';

const RightSide = () => {
    const { auth, message, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    const { id } = useParams();
    const [user, setUser] = useState({});
    const [text, setText] = useState('');
    const [media, setMedia] = useState([]);
    const [loadMedia, setLoadMedia] = useState(false);

    const refDisplay = useRef();
    const pageEnd = useRef();
    const [page, setPage] = useState(1);

    useEffect(() => {
        const newUser = message.users.find(user => user._id === id);
        if (newUser) {
            setUser(newUser);
        }
    }, [message.users, id]);

    const handleChangeMedia = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newMedia = [];

        files.forEach(file => {
            if (!file) return err = "File does not exist.";
            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb.";
            }
            return newMedia.push(file);
        });

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setMedia([...media, ...newMedia]);
    };

    const handleDeleteMedia = (index) => {
        const newArr = [...media];
        newArr.splice(index, 1);
        setMedia(newArr);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() && media.length === 0) return;
        setText('');
        setMedia([]);
        setLoadMedia(true);

        let newArr = [];
        if (media.length > 0) newArr = await imageUpload(media);

        const msg = {
            sender: auth.user._id,
            recipient: id,
            text,
            media: newArr,
            createdAt: new Date().toISOString()
        };
        setLoadMedia(false);
        await dispatch(addMessage({ msg, auth, socket }));
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    useEffect(() => {
        if (id) {
            const getMessagesData = async () => {
                dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { messages: [], result: 0, page: 1 } });
                setPage(1);
                await dispatch(getMessages({ auth, id, page: 1 }));

                if (refDisplay.current) {
                    refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
                }
            };

            getMessagesData();
        }
    }, [id, dispatch, auth]);

    useEffect(() => {
        if (page > 1) {
            dispatch(getMessages({ auth, id, page }));
        }
    }, [page, dispatch, auth, id]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        }, {
            threshold: 0.1
        });

        if (pageEnd.current) {
            observer.observe(pageEnd.current);
        }

        return () => {
            if (pageEnd.current) {
                observer.unobserve(pageEnd.current);
            }
        };
    }, []);

    useEffect(() => {
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [text]);
return (
    <>
        <div className="message_header bg-gray-100 p-4 border-b border-gray-300" style={{ marginBottom: '10px' }}>
            {user.length !== 0 && (
                <UserCard user={user}>
                    <i className="fas fa-trash text-red-500" />
                </UserCard>
            )}
        </div>

        <div className="chat_container flex-1 overflow-y-auto" style={{ height: 'calc(100% - 152px)' }}>
            <div className="chat_display" ref={refDisplay}>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2 opacity-0"
                    style={{ marginTop: '-25px' }}
                    ref={pageEnd}
                >
                    Load More
                </button>
                {message.data.map((msg, index) => (
                    <div key={index}>
                        {msg.sender === auth.user._id ? (
                            <div className="chat_row your_message p-2 my-2 text-right">
                                <MsgDisplay user={auth.user} msg={msg} />
                            </div>
                        ) : (
                            <div className="chat_row other_message p-2 my-2 text-left">
                                <MsgDisplay user={user} msg={msg} />
                            </div>
                        )}
                    </div>
                ))}
                {loadMedia && (
                    <div className="chat_row your_message p-2 my-2 text-right">
                        <img src={LoadIcon} alt="loading" />
                    </div>
                )}
            </div>
        </div>

        <div className="show_media grid grid-cols-3 gap-2 p-2" style={{ display: media.length > 0 ? 'grid' : 'none' }}>
            {media.map((item, index) => (
                <div key={index} id="file_media" className="relative">
                    {item.type.match(/video/i) ? videoShow(URL.createObjectURL(item)) : imageShow(URL.createObjectURL(item))}
                    <span
                        onClick={() => handleDeleteMedia(index)}
                        className="absolute top-0 right-0 text-white bg-red-600 rounded-full cursor-pointer"
                    >
                        &times;
                    </span>
                </div>
            ))}
        </div>

        <form className="chat_input bg-white p-4 border-t border-gray-300 flex items-center" style={{ height: '64px' }} onSubmit={handleSubmit}>
            <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <Icons setContent={setText} content={text} />

            <div className="file_upload ml-2">
                <label htmlFor="file" className="cursor-pointer">
                    <i className="fas fa-image text-red-500" />
                </label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleChangeMedia}
                />
            </div>

            <button
                type="submit"
                className="material-icons ml-2 p-2 text-blue-500"
                disabled={text || media.length > 0 ? false : true}
            >
                near_me
            </button>
        </form>
    </>
);

    
    

    
};

export default RightSide;