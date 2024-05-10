import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import {createPost, updatePost} from '../redux/actions/postAction'
import { generateImage } from '../utils/fetchData';

const StatusModal = () => {
  const {auth, theme, status, socket} = useSelector(state => state)
  const dispatch = useDispatch()




  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [stream, setStream] = useState(false)
  const videoRef = useRef()
  const refCanvas = useRef()
  const [tracks, setTracks] = useState('')
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');

  const handleGenerateImage = async () => {
    console.log(process.env.REACT_APP_OPENAI_API_KEY); // API key 
    if (!content.trim()) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Content is empty. Please enter some text to generate an image." } });
        return;
    }

    try {
        const imageData = await generateImage(content);
        if (imageData && imageData.images && imageData.images.length > 0) {
            const newImageUrl = imageData.images[0].url;
            setGeneratedImageUrl(newImageUrl); 
            setImages([...images, { url: newImageUrl }]); 
        }
    } catch (error) {
        console.error('Failed to generate image:', error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Failed to generate image. Please try again." } });
    }
};


  const handleChangeImages = e => {
    const files = [...e.target.files]
    let err = ""
    let newImages = []

    files.forEach(file => {
      if(!file) return err = "File does not exist."

      if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
        return err = "Image format is incorrect."
      }

      return newImages.push(file)
    })

    if(err) dispatch({type: GLOBALTYPES.ALERT, payload: {error: err}}) 
    setImages([...images, ...newImages])

  }

  const deleteImages = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
}



const handleStream = () => {
  setStream(true)
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({video: true})
      .then(mediaStream => {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()

          const track = mediaStream.getTracks()
          setTracks(track[0])
      }).catch(err => console.log(err))
  }
}

const handleCapture = () => {
  const width = videoRef.current.clientWidth;
  const height = videoRef.current.clientHeight;

  refCanvas.current.setAttribute("width", width)
  refCanvas.current.setAttribute("height", height)

  const ctx = refCanvas.current.getContext('2d')
  ctx.drawImage(videoRef.current, 0, 0, width, height)
  let URL = refCanvas.current.toDataURL()
  setImages([...images, {camera: URL}])
}



const handleStopStream = () => {
  tracks.stop()
  setStream(false)
}


const handleSubmit = e => {
  e.preventDefault()
  if(content.length===0)
  return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please add content."}})

  if(status.onEdit){
    dispatch(updatePost({content, images, auth, status}))
  }else {
    dispatch(createPost({content, images, auth, socket}))
  }
  

  setContent('')
  setImages([])
  if(tracks) tracks.stop()
  dispatch({type: GLOBALTYPES.STATUS, payload: false})
}

useEffect(() => {
   if (status.onEdit){
    setContent(status.content)
    setImages(status.images)
   } 
},[status])

  return (
<div className="fixed inset-0 z-50 overflow-y-auto">
  <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen">
    <div className="bg-white rounded-lg w-full max-w-md mx-auto border border-gray-200 shadow-lg">
      <div className="flex justify-between items-center border-b border-gray-200 p-5">
        <h5 className="text-lg font-medium">
          Create Post
        </h5>
        <button type="button" onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: false })} className="text-2xl font-semibold">
          &times;
        </button>
      </div>

      <div className="p-5">
        <textarea 
          name="content" 
          value={content} 
          placeholder={`${auth.user.username} what are you thinking?`} 
          onChange={e => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />

        <div className="flex flex-wrap -m-1">
          {images.map((img, index) => (
            <div key={index} className="p-1">
              <div className="relative">
              <img  
  src={img.camera 
    ? img.camera 
    : img.url ? img.url : (img instanceof File ? URL.createObjectURL(img) : undefined)}
  alt="images" 
  className="rounded-lg max-w-full h-auto align-middle border-none"
  style={{filter: theme ? 'invert(1)' : 'invert(0)' }}
/>


                <button type="button" onClick={() => deleteImages(index)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1">&times;</button>
              </div>
            </div>
          ))}
        </div>

        {stream && 
          <div className="relative mt-4">
            <video autoPlay muted ref={videoRef} className="w-full rounded-lg" style={{filter: theme ? 'invert(1)' : 'invert(0)' }}/>
            <button type="button" onClick={handleStopStream} className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1">&times;</button>
            <canvas ref={refCanvas} className="hidden"/>
          </div>
        }

        <div className="flex items-center gap-4 mt-4">
          {stream ? (
            <button type="button" className="text-xl" onClick={handleCapture}>
              <i className="fas fa-camera"></i>
            </button>
          ) : (
            <>
              <button type="button" className="text-xl" onClick={handleStream}>
                <i className="fas fa-camera"></i>
              </button>
              <div className="relative">
                <i className="fas fa-image text-xl"></i>
                <input 
                  type="file" 
                  name="file" 
                  id="file"
                  multiple 
                  accept="image/*" 
                  onChange={handleChangeImages}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-center p-5 border-t border-gray-200">
      <button onClick={handleGenerateImage} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Generate A.I. Image</button>



        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Post</button>
      </div>
    </div>
  </form>
</div>
  )
}

export default StatusModal
