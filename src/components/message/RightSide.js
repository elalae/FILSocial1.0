import React, {useState, useEffect} from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import MsgDisplay from './MsgDisplay'
import Icons from './Icons'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import {imageShow, videoShow} from '../../utils/mediaShow'
import {imageUpload} from '../../utils/imageUpload'
import {addMessage} from '../../redux/actions/messageAction'
import LoadIcon from '../../images/loading.gif'
const RightSide = () => {
    const {auth, message, socket} = useSelector(state => state)
    const dispatch = useDispatch()
    const [loadMedia, setLoadMedia] = useState(false)

    const {id} = useParams()
    const [user, setUser] = useState({})
    const [text, setText] = useState('')
    const [media, setMedia] = useState([])

    useEffect(() => {
        const newUser = message.users.find(user => user._id === id)
        if(newUser){
            setUser(newUser)
        }
    },[message.users, id])

    const handleChangeMedia = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newMedia = []

        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newMedia.push(file)
        })

        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setMedia([...media, ...newMedia])
    }

    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!text.trim() && media.length === 0) return;
        setText('')
        setMedia([])
        setLoadMedia(true)

        let newArr = [];
        if(media.length > 0) newArr= await imageUpload(media)

        const msg = {
            sender: auth.user._id,
            recipient: id,
            text,
            media: newArr,
            createdAt: new Date().toISOString()
        }
        setLoadMedia(false)
        dispatch(addMessage({msg, auth, socket}))
    }

  return (
    <>
    <div className="message_header">
        {
            user.length !== 0 &&
            <UserCard user={user}>
            <i className="fas fa-trash text-danger"/>
          </UserCard>
        }

    </div>

    <div className="chat_container"
    style={{height: media.length > 0 ? 'calc(100% - 180px)' : 'calc(100% - 120px)'}}>
        <div className="chat_display">
            {
                message.data.map((msg, index)=>(
                    <div key={index}>
                    {
                        msg.sender !== auth.user._id &&
                        <div className="chat_row other_message">
                        <MsgDisplay user={user} msg={msg} />
                    </div>
                    }

                    {
                         msg.sender === auth.user._id &&
                         <div className="chat_row your_message">
                         <MsgDisplay user={auth.user} msg={msg}/>
                     </div>
                    }
                    </div>
                ))
            }
           {
            loadMedia &&
            <div className="chat_row your_message">
                <img src={LoadIcon} alt="loading"/>
            </div>
           }

           
        </div>
    </div>

    <div className="show_media" style={{display: media.length > 0 ? 'grid' : 'none'}}>
     {
        media.map((item, index)=>(
            <div key={index} id="file_media">
                {
                    item.type.match(/video/i)
                    ? videoShow(URL.createObjectURL(item))
                    :imageShow(URL.createObjectURL(item))
                }
                <span onClick={() => handleDeleteMedia(index)}>&times;</span>
            </div>
        ))
     }
    </div>

    <form className="chat_input" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your message..." 
        value={text} onChange={e => setText(e.target.value)}/>

        <Icons setContent={setText} content={text} />

        <div className="file_upload">
          <i className="fas fa-image text-danger"/>
          <input type="file" name="file" id="file"
          multiple accept="image/*,video/*" onChange={handleChangeMedia} />
        </div>

        <button type="submit" className="material-icons"
        disabled={(text || media.length > 0) ? false: true}>
             near_me
        </button>
    </form>
    </>
  )
}

export default RightSide
