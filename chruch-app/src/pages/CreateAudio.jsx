import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import  app  from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import {userRequest} from '../requestMethods';

function CreateAudio() {
    const [inputs, setInputs] = useState('');
    const [audio, setAudio] = useState('');
    const [audioPerc, setAudioPerc] = useState(0);
    const [image, setImage] = useState('');
    const [imgPerc, setImgPerc] = useState(0);
    const navigate = useNavigate()


    // Upload file logic
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    

    uploadTask.on('state_changed', 
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imageUrl" ? setImgPerc(Math.ceil(progress)) : setAudioPerc(Math.round(progress));
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
    (error) => {
        toast.error(error.message)
    }, 
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
        audio && uploadFile(audio, "audioUrl");
      }, [audio]);
    
      useEffect(() => {
          image && uploadFile(image, "imageUrl");
      }, [image]);

      

    // Set the input values
    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    };

    // Save Inputs in database and navigate to video page when successful
  const handleUpload = async (e) => {
    try {
        e.preventDefault();
        const res = await userRequest.post('/audio/add', {title:inputs.title, img:inputs.imageUrl, audio:inputs.audioUrl});
        res.status === 200 && navigate(`/dashboard/audios`)
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
                                    <h6>Add an Audio</h6>
                                </div>

                                <div className="eu-form">

                                    {/* Title Input */}
                                    <input type="text" name='title' placeholder='Add a title' onChange={handleChange}/>

                                    {/* Image Input */}
                                    <label htmlFor="image" className='imageLabel'>Choose Image</label>
                                    <input accept="image/*" id='image' type="file" onChange={(e) => setImage(e.target.files[0])}/>
                                    {imgPerc > 0 && imgPerc < 100 ? <div style={{ mt:2,  display:'flex', alignItems:'center' }}>
                                        <div style={{ width: 30, height: 30 }}>
                                            <CircularProgressbar  value={imgPerc} text={`${imgPerc}`} />
                                        </div>
                                        <p style={{ mt:2, ml:2 }}>
                                            Uploading Video. Please wait...
                                        </p>
                                    </div> : <div></div>}
                                    
                                    {/* Audio Input */}
                                    <label htmlFor="audio" className='imageLabel'>Choose Audio</label>
                                    <input accept="audio/*" id='audio' type="file" onChange={(e) => setAudio(e.target.files[0])}/>
                                    {audioPerc > 0 && audioPerc < 100 ? <div style={{ mt:2, display:'flex', alignItems:'center' }}>
                                        <div style={{ width: 30, height: 30 }}>
                                            <CircularProgressbar  value={audioPerc} text={`${audioPerc}`} />
                                        </div>
                                        <p style={{ mt:2, ml:2 }}>
                                            Uploading Video. Please wait...
                                        </p>
                                    </div> : <div></div>}

                                    {/* Button Input */}
                                    {inputs === '' || audioPerc !== 100 || imgPerc !== 100 ? 
                                    <input disabled={true} className='eu-btn' style={{ backgroundColor: 'grey' }} type="button" value='Submit'/> :
                                    <input className='eu-btn' style={{ backgroundColor: '#f45d48' }} type="button" value='Submit' onClick={handleUpload}/>}
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

export default CreateAudio
