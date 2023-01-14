import React, {useState, useEffect} from 'react';
import {AiOutlineLike, AiFillLike} from 'react-icons/ai';
import {BiShare} from 'react-icons/bi';
import {GrView} from 'react-icons/gr';
import { useLocation } from 'react-router-dom';
import { publicRequest, userRequest } from '../requestMethods';
import Comments from './Comment/Comments';
import RecentVideos from './RecentVideos';
import '../spinner.css';
import moment from 'moment';
import {FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon} from 'react-share';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getVideo, likeVideo } from '../redux/videoSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function VideoContent({toast}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname.split('/')[3];
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const rVideo = useSelector((state) => state.video.currentVideo)
  const user = useSelector((state) => state.user.currentUser.user);
  

  // Fetch video when the component mounts
  useEffect(() => {
    const fetchVideo = async() => {
      try {
        setLoading(true);
        const res = await publicRequest.get(`/video/find/${path}`);
        dispatch(getVideo(res.data))
        setLoading(false);
      } catch (error) {
        toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
      }
      
    }

    fetchVideo();
  }, [path, dispatch, toast])


  // Like Video Functionality
  const handleLike = async(videoId) => {
    try {
      await userRequest.put(`/video/like/${videoId}`);
      dispatch(likeVideo(user._id));
    } catch (error) {
      toast.error(error.response.data)
      console.log(error)
    }
  }


  return (
    <>
      <ToastContainer autoClose={2000}/>
      <div className='container'>
        {loading ? <div className="loader">Loading...</div> : <div className="video-wrapper">
          <div className="row">
              <div className="left-container col-lg-8 col-md-12 col-sm-12 col-12">
                  <div className="video-container">
                    <video src={rVideo.videoUrl} controls></video>
                  </div>
                  <div className="video-title">
                    <p>{rVideo?.title}</p>
                  </div>
                  <div className="video-info">
                    <div className="left">
                      <div className="user-info">
                        <div className="image">
                          <img src={require('../assets/pastor1.jpg')} alt="" />
                        </div>
                        <div className="user-details">
                          <p>The Christians</p>
                          <p>Let the bible speak</p>
                        </div>
                      </div>
                    </div>
                    <div className="icons">
                      <div className="video-icons">

                        {rVideo?.likes.includes(user?._id) ? 
                        <div className="one" onClick={() => handleLike(rVideo._id)}>
                          <AiFillLike style={{ fontSize: '20px', marginRight: '10px' }} />
                          <p>{ rVideo?.likeCount}</p>
                        </div>  : 
                        <div className="one" onClick={() => handleLike(rVideo._id)}>
                          <AiOutlineLike style={{ fontSize: '20px', marginRight: '10px' }} />
                          <p>{ rVideo?.likeCount}</p>
                        </div>}

                        <div className="two">
                          <GrView style={{ fontSize: '20px', marginRight: '10px' }} />
                          <p>{rVideo?.views}</p>
                        </div>
                        <div className="three" onClick={() => handleOpen()}>
                          <BiShare style={{ fontSize: '20px', marginRight: '10px' }} />
                          <p>Share</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="video-description">
                    <div className="first-content">
                      <p>{rVideo?.views} views .</p>
                      <p style={{ fontSize: '12px', fontWeight: 400, paddingTop: 15 }}>{rVideo && moment(rVideo.createdAt).fromNow()}</p>
                    </div> 
                    <div className="second-content">
                      <p>{rVideo?.desc}</p>
                    </div>
                  </div>

                  {/* Modal Popup */}
                  {open ? 
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                      Share Via
                      </Typography>
                      <Box sx={{ marginTop: 2, display:'flex', justifyContent:'center' }}>
                        <Box>
                          <FacebookShareButton url='https://web.facebook.com/profile.php?id=100065639733006' style={{ marginRight:'10px' }}>
                            <FacebookIcon size={40} round={true} />
                          </FacebookShareButton>

                          <WhatsappShareButton url='https://web.facebook.com/profile.php?id=100065639733006' style={{ marginRight:'10px' }}>
                            <WhatsappIcon size={40} round={true}/>
                          </WhatsappShareButton>

                          <TelegramShareButton url='https://web.facebook.com/profile.php?id=100065639733006' style={{ marginRight:'10px' }}>
                            <TelegramIcon size={40} round={true}/>
                          </TelegramShareButton>
                        </Box>
                      </Box>
                    </Box>
                  </Modal> : 
                  <div></div>}


                  <Comments videoId={rVideo._id}/>
              </div>
              <div className="right-container col-lg-4 col-md-12 col-sm-12 col-12">
                  <RecentVideos />
              </div>
          </div>
        </div>}
      </div>
    </>
  )
}

export default VideoContent
