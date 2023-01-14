import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import moment from 'moment';
import '../spinner.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecentVideos() {
  const [loading, setLoading] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async() => {
      try {
        setLoading(true);
        const res = await publicRequest.get('/video/trend');
        setVideos(res.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
      }
    }

    fetchVideos();
  }, [])

  return (
    <>
      <ToastContainer autoClose={2000}/>
      <div className="recent-videos">
          <p>Recent Videos</p>

          {loading ? <div className="loader">Loading...</div> : <div className="recent-content">
          {videos.map((video) => (
              <div className="row" key={video._id} onClick={() => navigate(`/teachings/videos/${video._id}`)}>
                <div className="left col-lg-6 col-md-5 col-sm-5 col-12">
                    <div className="image">
                    <img src={video.imgUrl} alt="" />
                    </div>
                </div>
                <div className="right col-lg-6 col-md-7 col-sm-7 col-12">
                    <p>{video.title}</p>
                    <p>The Christians</p>
                    <div className="views">
                      <div className='view'>{video.views} views .</div>
                      <div className='time'>{moment(video.createdAt).fromNow()}</div>
                    </div>
                </div>
              </div>
          ))}
          </div>}
      </div>
    </>
  )
}

export default RecentVideos
