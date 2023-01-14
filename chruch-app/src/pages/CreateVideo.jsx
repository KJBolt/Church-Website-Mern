import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import  app  from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import {userRequest} from '../requestMethods';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateVideo() {
  const [inputs, setInputs] = useState('');
  const [video, setVideo] = useState('');
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [image, setImage] = useState('');
  const navigate = useNavigate()

  // Set the input values
  const handleChange = (e) => {
    setInputs((prev) => {
        return {...prev, [e.target.name]: e.target.value}
    });
  };


  // Upload file logic
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    

    uploadTask.on('state_changed', 
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imageUrl" ? setImgPerc(Math.ceil(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
            break;
            default:
        }
    }, 
    (error) => {}, 
    () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInputs((prev) => {
                return {...prev, [urlType]: downloadURL};
            })
        });
      }
    );
  }

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
      image && uploadFile(image, "imageUrl");
  }, [image]);


  // Save Inputs in database and navigate to video page when successful
    const handleUpload = async (e) => {
        try {
            e.preventDefault();
            const res = await userRequest.post('/video', {title:inputs.title, desc:inputs.desc, imgUrl:inputs.imageUrl, videoUrl:inputs.videoUrl});
            res.status === 200 && navigate(`/teachings`)
        } catch (error) {
            toast.error(error.response.data)
        }
    }
      

  

  return (
    <div>
      <Navbar />
      <ToastContainer autoClose={2000}/>

      <div className="dashboard-container">
                <div className="dashboard-wrapper">
                    <div className="row">
                      <div className="left col-md-3 col-sm-12 col-12">
                          <Sidebar/>
                      </div>
                      <div className="right col-md-9 col-sm-12 col-12">
                          <div className="eu-container">
                            <div className='eu-wrapper'>
                                <div className="eu-title">
                                    <h6>Add a Video</h6>
                                </div>

                                <div className="eu-form">

                                    {/* Image Input */}
                                    <label htmlFor="image" className='imageLabel'>Choose Image</label>
                                    <input accept="image/*" id='image' type="file" onChange={(e) => setImage(e.target.files[0])}/>
                                    {imgPerc > 0 && imgPerc < 100 ? <div style={{ mt:2, display:'flex' }}>
                                        <div style={{ width: 50, height: 50 }}>
                                            <CircularProgressbar  value={imgPerc} text={`${imgPerc}`} />
                                        </div>
                                        <p style={{ mt:2, ml:2 }}>
                                            Uploading Video. Please wait...
                                        </p>
                                    </div> : <div></div>}
                                    
                                    {/* Video Input */}
                                    <label htmlFor="video" className='imageLabel'>Choose Video</label>
                                    <input accept="video/*" id='video' type="file" onChange={(e) => setVideo(e.target.files[0])}/>
                                    {videoPerc > 0 && videoPerc < 100 ? <div style={{ mt:2, display:'flex' }}>
                                        <div style={{ width: 50, height: 50 }}>
                                            <CircularProgressbar  value={videoPerc} text={`${videoPerc}`} />
                                        </div>
                                        <p style={{ mt:2, ml:2 }}>
                                            Uploading Video. Please wait...
                                        </p>
                                    </div> : <div></div>}

                                    {/* Title Input */}
                                    <input type="text" name='title' placeholder='Add a title' onChange={handleChange}/>

                                    {/* Text Input */}
                                    <textarea name="desc" id="" cols="20" rows="5" placeholder='Add a description..' onChange={handleChange}></textarea>
                                    
                                    {/* Button Input */}
                                    {inputs === '' || videoPerc !== 100 || imgPerc !== 100 ? <input disabled className='eu-btn' style={{ backgroundColor: 'grey '}} type="button" value='Submit'/> :
                                    <input className='eu-btn' style={{ backgroundColor: '#d45140' }} type="button" value='Submit' onClick={handleUpload}/>}
                                </div>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CreateVideo
